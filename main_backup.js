var query_endpoint = "https://en.wikipedia.org/w/api.php";
var search_string = "test";
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
    console.log(apiResult);
    movetoResultsLayout();
    //console.log(Object.keys(apiResult.query.pages)[0]);
    $("container")html
    for (var key in apiResult.query.pages) {
  console.log(key, apiResult.query.pages[key].extract);
}
    for (var i = 0; i < Object.keys(apiResult.query.pages).length; i++) {

        //console.log(apiResult.query.pages[i].title);
        // console.log(apiResult.query.pages[i].fullurl);
        // console.log(apiResult.query.pages[i].extract);

    }
}


function movetoResultsLayout() {
    $("#main_form").animate({
        marginTop: "-=175px",

    }, 500, function () {

    });
}

