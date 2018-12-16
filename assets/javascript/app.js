//INITIAL ARRAY
var topics = ["happy", "livid", "depressed", "excited", "what", "talk to the hand", "gimme"];

//API CALL AND DUMPING JSON CONTENT INTO DIV FOR EACH BUTTON/CALL
function displayInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=2IEIoZt4UFtYQc6eWV76573S5jcC9zFH&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gifDiv'>");

            var rating = results[i].rating;
            var pRating = $("<p>").text("Rating: " + rating);
            gifDiv.prepend(pRating);

            var gif = $("<img>");
            gif.attr("data-animate", results[i].images.original.url);
            gif.attr("data-still", results[i].images.original_still.url);
            gif.attr("data-state", "still");
            gif.attr("src", results[i].images.original_still.url);
            gif.addClass("bothGif");


            gifDiv.append(gif);
            $("#gif-view").prepend(gifDiv);

            console.log(response);
        }
    });
}


$(document).on("click", ".bothGif", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    console.log("I clicked");
});

//CREATING THE BUTTONS FROM THE ARRAY AND GIVING THEM ATTRIBUTES
function renderButtons() {

    $("#topics-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var topicsButton = $("<button>");
        topicsButton.addClass("topic");
        topicsButton.attr("data-name", topics[i]);
        topicsButton.text(topics[i]);
        $("#topics-view").append(topicsButton);
    }
}

//CLICK EVENT TO ADD BUTTON FROM USER INPUT
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
});

//CLICK FUNCTION TO DISPLAY THE JSON CONTENT
$(document).on("click", ".topic", displayInfo);

//INITIAL LOAD DISPLAY
renderButtons();