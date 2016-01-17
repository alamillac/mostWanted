function compileTemplates(templatesData) {
    return templatesData.map(function(templateData) {
        return compile(templateData.data, templateData.name);
    });
}

function compile (source, filepath, fullFilename) {
    var path = require("path"),
        dust = require("dustjs-linkedin"),
        name, extension;

    if (typeof fullFilename === "function") {
        name = fullFilename(filepath);
    } else if (fullFilename) {
        name = filepath;
    } else {
        extension = path.extname(filepath);
        name = filepath.substr(0, filepath.lastIndexOf(extension));
    }

    if (name !== undefined) {
        try {
            return dust.compile(source, name);
        } catch (e) {
            grunt.log.error(e);
            grunt.fail.warn('Dust.js failed to compile template "' + name + '".');
        }
    }

    return '';
}

module.exports = function(grunt) {

    'use strict';

    var path = require("path");

    grunt.registerMultiTask('compileTemplates', 'Compile main template for development or production environments', function () {
        var dust = require('dustjs-linkedin'),
        dustHelpers = require('dustjs-helpers');

        // Extend with the default options if none are specified
        var options = this.options({
                fullname: false,
                transformQuote: false,
                prepend : '',
                append : ''
            }),
            templates = [],
            templateFileName = this.data.templateFile + ".dust",
            templateFile = path.join(process.cwd(), templateFileName),
            sourceCode = grunt.file.read(templateFile),
            r = /\{>\s?"([\w-\/]*)"[^\}]*\/\}/g,
            parts,
            _srcFile,
            _sourceCode,
            compiledTemplates,
            that = this;

        dust.config.whitespace = true;

        templates.push({name: this.data.templateFile, data: sourceCode});

        //Añadimos los parciales
        while ((parts = r.exec(sourceCode)) !== null) {
            _srcFile = parts[1] + ".dust";
            _sourceCode = grunt.file.read(_srcFile);
            templates.push({name: parts[1], data: _sourceCode});
        }
        
        // Compilamos el template con los parciales
        compiledTemplates = compileTemplates(templates);
        compiledTemplates.forEach(function (compiled) {
            dust.loadSource(compiled);
        });

        // Obtenemos el HTML y lo guardamos en el fichero de destino
        dust.render(this.data.templateFile, {
            requireScript: this.data.requireScript,
        }, function(err, out) {
            if (!err) {
                grunt.file.write(that.data.destFile, out);
                grunt.verbose.or.writeln("[dustjs] Compiled " + that.data.destFile);
            } else {
                grunt.log.error(err.stack);
            }
        });
    });
};
