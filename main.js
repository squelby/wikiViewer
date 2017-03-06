
/*
to do:
Finish styling results boxes
Add rollover action to boxes
*/
var query_endpoint = "https://en.wikipedia.org/w/api.php";
var search_string = "test";
var state = 1;
/*
format=json
https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&continue=&srsearch=wikipedia&srwhat=text&srprop=timestamp
*/
function init() {
    //event listeners
    $("#search_btn").click(function () {
        searchClick();
    });
    $("#close_btn").click(function () {
        closeSearch();
    });
    $("#form_search_btn").click(function (e) {
        e.preventDefault();
        formSubmit();
    });
    //form events
    $("#search_form").focus(function () {
        var fmValue = $("#search_form").val();
        if (fmValue === "Search Wikipedia") {
            $("#search_form").val('');
        }
    });

    $("#search_form").focusout(function () {
        var fmValue = $("#search_form").val();
        console.log(fmValue);
        if (fmValue === "") {
            $("#search_form").val('Search Wikipedia');
        }
    });
}

function searchClick() {
    $("#main_form").css("display", "block");
    $("#initial_state").animate({
        top: "-=500px",
    }, 500);
    $("#main_form").animate({
        marginTop: "-300px",
        opacity: "1"
    }, 500);

    state = 2;
}

function closeSearch() {
    $("#initial_state").animate({
        top: "+=500px",
    }, 500);
    $("#main_form").animate({
        marginTop: "0px",
        opacity: "0"
    }, 500, function () {
        $("#main_form").css("display", "none")
    });
    state = 1;
    $("#results_all").html("");
}

function formSubmit() {
    search_string = $("#search_form").val();
    var urlBuild = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + search_string + "&prop=info|extracts&exchars=300&exlimit=max&exintro=&inprop=url&format=json";
    console.log(urlBuild);
    $.ajax({
        url: urlBuild,
        type: "post",
        format: 'json',
        dataType: 'jsonp',
        cache: false,
        success: function (data, status, error) {
            processResult(data);
        },
        error: function (data, status, error) {
            console.log('error', data, status, error);
        }
    });
}

function processResult(apiResult) {
    var tempString = "";
    $.each(apiResult.query.pages, function (index, value) {
        tempString += '<a href="' + value.fullurl + 'target="_new"><div id="results_box"><div class="results_box"><h2>' + value.title + '</h2><br><div class="excerpt">' + value.extract + '</div></div></a>';
    });
    console.log(tempString);
    //$("#results_all").html(tempString);
    if (state === 2) {
        movetoResultsLayout(tempString);
    }else{
        console.log(tempString);
        $("#results_all").html(tempString);
    }
    state = 3;
}


function movetoResultsLayout(tempString) {
    $("#main_form").animate({
        marginTop: "-=175px",

    }, 500, function () {
        $("#results_all").html(tempString);
    });
}

