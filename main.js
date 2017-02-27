//api key 90960496dfd147611e1a6639d58febc7
//**************** use this for location: http://ip-api.com/json
var unitType = "imperial";

function init() {
    getData();
    $("#toggle").click(function() {
         $( "#container" ).fadeOut( "slow", function() {
            if (unitType === "imperial") {
            unitType = "metric";
            $("#toggle").html("Change to fahrenheit");
        } else {
            unitType = "imperial";
            $("#toggle").html("Change to celsius");
        }
        console.log("unit type = " + unitType);
        getData();
    });
  });
        
}

function getData() {
    //testing
    $.getJSON("http://ip-api.com/json", function(data) {
        city = data.city;
        apiCall(city);
    });
    //AJAX request
}

function apiCall(city) {
    console.log("city= "+ city);
    console.log("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unitType + "&APPID=90960496dfd147611e1a6639d58febc7");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unitType + "&APPID=90960496dfd147611e1a6639d58febc7", function(data) {
        updateWeather(data); //Update Weather parameters
    });
}

function updateWeather(json) {
    var mainDes = json.weather[0].main;
    var country = json.sys.country;
    var city = json.name;
    var temp = json.main.temp;
    var iconCode = json.weather[0].icon
    var tempUnit;
    if (unitType === "imperial") {
        tempUnit = " °F";
    } else {
        tempUnit = " °C";
    }
    $("#location").html(city + ", " + country);
    $("#temp").html(mainDes + " | " + temp + tempUnit);
    $("#icon").html('<img src= "http://openweathermap.org/img/w/' + iconCode + '.png">');
         $( "#container" ).fadeIn( "slow", function() {
  });
}