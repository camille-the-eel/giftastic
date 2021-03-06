//INITIAL ARRAY
var topics = ["happy", "livid", "depressed", "excited", "what", "talk to the hand", "gimme"];

//CREATING THE BUTTONS FROM THE ARRAY AND GIVING THEM ATTRIBUTES
function renderButtons() {

    $("#topics-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var topicsButton = $("<button>");
        topicsButton.addClass("topic btn waves-effect");
        topicsButton.attr("id", "button")
        topicsButton.attr("data-name", topics[i]);
        topicsButton.text(topics[i]);
        $("#topics-view").append(topicsButton);
    }
}

//API CALL AND DUMPING JSON CONTENT INTO DIV FOR EACH BUTTON/CALL
function displayInfo() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=2IEIoZt4UFtYQc6eWV76573S5jcC9zFH&limit=12";
    
    var count = 0;
    var classArray = [".gif-view-1", ".gif-view-2", ".gif-view-3"];

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifClass = $(classArray[count]);
            count++;
            if (count > 2) {
                count = 0;
            }

            var card = $("<div class='gifDiv card'>");
            var cardGif = $("<div class='card-image'>");
            var gif = $("<img>");
            gif.attr("data-animate", results[i].images.original.url);
            gif.attr("data-still", results[i].images.original_still.url);
            gif.attr("data-state", "still");
            gif.attr("src", results[i].images.original_still.url);
            gif.addClass("bothGif");

           
            card.append(cardGif);
            cardGif.append(gif);

            var rating = results[i].rating;
            var uppRating = rating.toUpperCase();
            var pRating = $("<p class='rating card-action'>").text("RATING: " + uppRating);
            card.append(pRating);
            
            gifClass.prepend(card);

            console.log(response);
        }
    });
}

$(document).ready(function() {

    //CLICK EVENT TO ADD BUTTON FROM USER INPUT
    $("#add-topic").on("click", function(event) {
        event.preventDefault();

        var topic = $("#topic-input").val().trim();

        //VALIDATION FOR EMPTY FIELD
        if (topic === null || topic === "") {
            alert("Please Fill In Required Field Before Adding");
            return false
        }

        topics.push(topic);
        renderButtons();
        $("#topic-input").val("");
    });

    //CLICK FUNCTION TO DISPLAY THE JSON CONTENT
    $(document).on("click", ".topic", displayInfo);

    //CLICK FUNCTION TO PAUSE/PLAY
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

    //INITIAL LOAD DISPLAY
    renderButtons();

});
