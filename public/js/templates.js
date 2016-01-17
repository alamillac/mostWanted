define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["public/js/templates/ContenderView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<img title="' +
((__t = ( name)) == null ? '' : __t) +
'" alt="' +
((__t = ( name)) == null ? '' : __t) +
'" class="person img-responsive" src="https://usercontent.googleapis.com/freebase/v1/image' +
((__t = ( image)) == null ? '' : __t) +
'?errorid=/freebase/no_image_png&key=' +
((__t = ( freebase_key)) == null ? '' : __t) +
'&maxwidth=' +
((__t = ( img_max_size)) == null ? '' : __t) +
'&maxheight=' +
((__t = ( img_max_size)) == null ? '' : __t) +
'&mode=fillcropmid">\n<div data-mid="' +
((__t = ( mid)) == null ? '' : __t) +
'" class="entity-name _mid_data">' +
((__t = ( name)) == null ? '' : __t) +
'</div>\n';

}
return __p
};

this["JST"]["public/js/templates/FooterView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p class="text-center">Powered by Google</p>';

}
return __p
};

this["JST"]["public/js/templates/GameView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="gamePage">\n    <div class="info-box">\n        <div class="inner-box">\n            <img alt="Who is the most wanted" title="Who is the most wanted" class="logo img-responsive" src="images/whos_the_most_wanted.jpg">\n        </div>\n        <div class="inner-box background-box _results">\n            <div id="noResults">\n                <i class="icon-question"></i>\n                <div id="countdownTimer"></div>\n            </div>\n            <div id="results">\n                <div class="score">\n                    <div class=\'more-info\'>\n                        <div class=\'triangle\'></div>\n                        <i class=\'icon-plus\'></i>\n                    </div>\n                    <p class="strong show_correct">RIGHT <span class="happy-face face-result">:)</span></p>\n                    <p class="strong show_incorrect">NOT RIGHT <span class="unhappy-face face-result">:(</span></p>\n                    <p class="_winner_class"><strong id="winnerName"></strong> it is!</p>\n                </div>\n                <div id="graph_results"></div>\n                <div class="game_status alert alert-danger hidden">GAME OVER</div>\n            </div>\n        </div>\n    </div>\n    <div class="contender-box">\n        <div class="inner-box entity-box entity1 _contender _contender1"></div>\n        <div class="inner-box entity-box entity2 _contender _contender2"></div>\n    </div>\n\n    <div class="button-box">\n        <button class="_next_match">\n            NEXT\n        </button>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["public/js/templates/HeaderView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!--<div class="col-md-push-4 col-xs-12 col-md-4">\n    <span class="badge">42</span>\n</div>-->\n\n\n<div class="container-fluid">\n    <div class="navbar-header">\n        <div class="triangle"></div>\n        <a href="" id="menu-toggle" type="button">\n            <i class="icon-menu"></i>\n        </a>\n    </div>\n    <!--<div>\n        <p class="navbar-text navbar-right">Signed in as <a href="#" class="navbar-link">Mark Otto</a></p>\n    </div>-->\n    <div class="header-center">\n        <ul class="social-buttons">\n            <li class="social"><i class="icon-facebook"></i><span class="social-count">19k</span></li>\n            <li class="social"><i class="icon-twitter"></i><span class="social-count">19k</span></li>\n            <li class="social"><i class="icon-g-plus"></i><span class="social-count">19k</span></li>\n        </ul>\n    </div>\n    <div class="header-right"></div>\n</div>\n\n';

}
return __p
};

this["JST"]["public/js/templates/LandingView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="landingPage">\n    ' +
((__t = ( mainBox )) == null ? '' : __t) +
'\n    <div class="button-box">\n        <div class="btn-send">\n            <a class="_send_action" href="#game">TRY</a>\n        </div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["public/js/templates/LoginLocalView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginPage">\n    <div class="brand-box">\n        <img class="logo" src="images/whos_the_most_wanted.jpg">\n    </div>\n    <form id="loginForm" role="form" class="sign-up-form">\n        <div class="form-group">\n            <input id="userName" name="userName" type="text" class="form-control" placeholder="Email">\n        </div>\n        <div class="form-group">\n            <input id="password" name="password" type="password" class="form-control" placeholder="Password">\n        </div>\n        <button type="submit" class="btn btn-custom btn-block">OK</button>\n    </form>\n</div>\n';

}
return __p
};

this["JST"]["public/js/templates/LoginSocialView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="loginPage">\n    <div class="brand-box">\n        <img class="logo" src="images/whos_the_most_wanted.jpg">\n    </div>\n    <h3>LOGIN WITH</h3>\n    <div class="box-group">\n        <div class="box-login color-background-1">\n            <a href class="_login_twitter">\n                <i class="icon-twitter"></i>\n            </a>\n        </div>\n        <div class="box-login color-background-2">\n            <a href class="_login_facebook">\n                <i class="icon-facebook"></i>\n            </a>\n        </div>\n    </div>\n    <button class="_login_local">\n        I DON\'T HAVE IT\n    </button>\n</div>\n';

}
return __p
};

this["JST"]["public/js/templates/MainBoxView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="info-box">\n    <div class="inner-box">\n        <img alt="Who is the most wanted" title="Who is the most wanted" class="logo img-responsive" src="images/whos_the_most_wanted.jpg">\n    </div>\n    <div class="inner-box background-yellow">\n        <p class="intro h4 text-right"><span class="highlight">Who is the most wanted Celebrity?</span></p>\n    </div>\n</div>\n<div class="contender-box">\n    <div class="inner-box entity-box entity1">\n        <img title="Justin Bieber" alt="Justin Bieber" class="person loser img-responsive" src="images/justin.jpg">\n        <div class="entity-name">Justin Bieber</div>\n    </div>\n    <div class="inner-box entity-box entity2">\n        <img title="Brad Pitt" alt="Brad Pitt" class="person img-responsive" src="images/brad.jpg">\n        <div class="entity-name">Brad Pitt</div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["public/js/templates/NewUserFormView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="col-lg-push-3 col-xs-12 col-lg-6">\n<div class="box">\n    <div class="box-header">\n        <div class="title">\n        Create account\n        </div>\n    </div>\n    <div class="box-content">\n        <form id="userForm" class="form form-horizontal" style="margin-bottom: 0;" method="post" action="#" accept-charset="UTF-8">\n            <div class="form-group">\n                <label class="col-md-2 control-label" for="name">Full name</label>\n                <div class="col-md-5">\n                    <input class="form-control" id="name" placeholder="Full name" type="text" name="name">\n                </div>\n            </div>\n            <div class="form-group">\n                <label class="col-md-2 control-label" for="email">Email</label>\n                <div class="col-md-5">\n                    <input class="form-control" id="email" placeholder="Email" type="text" name="email">\n                </div>\n            </div>\n            <div class="form-group">\n                <label class="col-md-2 control-label" for="password">Password</label>\n                <div class="col-md-5">\n                    <input class="form-control" id="password" placeholder="Password" type="password" name="password">\n                </div>\n            </div>\n            <div class="form-group">\n                <label class="col-md-2 control-label" for="repeatPassword">Confirm Password</label>\n                <div class="col-md-5">\n                    <input class="form-control" id="repeatPassword" placeholder="Confirm Password" type="password" name="repeatPassword">\n                </div>\n            </div>\n            <div class="form-group">\n                <label class="col-md-2 control-label">Terms</label>\n                <div class="col-md-10">\n                    <div class="checkbox">\n                        <label>\n                            <input type="checkbox" value="true" id="terms" name="terms">I agree all your <a href="#terms">Terms of Services</a>\n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class="form-actions form-actions-padding-sm">\n                <div class="row">\n                    <div class="col-md-10 col-md-offset-2">\n                        <button class="btn btn-primary" type="submit">\n                            <i class="icon-save"></i>\n                            Create Account\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n</div>\n';

}
return __p
};

this["JST"]["public/js/templates/ScoreView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="scoreWrapper">\n    <div class="score-box">\n        <div class="lives">\n        ';
 for( var i=0; i<errors; i++) { ;
__p += '\n            <span class="live_lost"></span>\n        ';
} ;
__p += '\n        ';
 for( var i=0; i<lives; i++) { ;
__p += '\n            <span class="live"></span>\n        ';
} ;
__p += '\n        </div>\n    </div>\n    <div class="score-box">\n        <div class="score"><p><strong>SCORE</strong> ' +
((__t = ( score )) == null ? '' : __t) +
'</p></div>\n    </div>\n    <div class="score-box">\n        <div class="rank"><p><strong>RANK</strong> ' +
((__t = ( ranking )) == null ? '' : __t) +
'</p></div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["public/js/templates/SideBarView.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<!--<li class="sidebar-brand">\n    <a href="#">\n        Who is the most wanted\n    </a>\n</li>-->\n<li>\n    <a class="color-mw-red" href="#leaderboard">Leaderboard</a>\n</li>\n<li>\n    <a class="color-mw-yellow" href="#terms">Terms & Conditions</a>\n</li>\n<li>\n    <a class="color-mw-blue" href="#privacy">Privacy statement</a>\n</li>\n<li>\n    <a class="upper color-white" href="#contact">Contact</a>\n</li>\n<li  id="sidebar-footer">\n    <a href="/">\n        <img class="img-responsive" src="images/whos_the_most_wanted.jpg">\n    </a>\n</li>\n\n\n';

}
return __p
};

  return this["JST"];

});