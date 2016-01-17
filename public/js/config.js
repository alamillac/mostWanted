define(function(){
    var URLBASE_LOCAL='http://localhost:8888/',
        URLBASE_PROD='http://mostsearchedcelebrity.com/',
        URLBASE_DEV='http://develop.mostsearchedcelebrity.com/';
    //prueba@test.com 123

    //Timer in seconds
    var _MAX_TIME_TO_ANSWER=10,
        _COLOR_TIMER="#f9ca55";

    //API keys
    //Freebase
    var _FREEBASE_API_KEY='AIzaSyCH66P4-hZ3BfXJS4zt8yp6xS416YHpW_8',
        _DEBUG=true,
        _PERIODICAL_TASK=false,
        _PERIODICAL_TIME = 2000 * 60;  //2 min

    return {
        URLBASE: URLBASE_DEV,
        _MAX_TIME_TO_ANSWER: _MAX_TIME_TO_ANSWER,
        _COLOR_TIMER: _COLOR_TIMER,
        _FREEBASE_API_KEY: _FREEBASE_API_KEY,
        _DEBUG: _DEBUG,
        _PERIODICAL_TASK: _PERIODICAL_TASK,
        _PERIODICAL_TIME: _PERIODICAL_TIME
    };
});
