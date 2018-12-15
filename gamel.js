
// We create an array 
var desserts = ["cake", "pie", "muffin", "cookies", "bread pudding", "brownie", "ice cream", "fudge"]

// We create a for loop that appends a button for each string in the array
function renderButtons() {
// we empty out the buttons div each time  go though the for loop
// This prevents repeat buttons
  $("#dessertsButtons").empty();

  for ( i = 0; i < desserts.length; i++) {
    // we create a variable called "button"
    var button = $("<button>");

    button.addClass("dessertGroup");
    button.attr("data-name", desserts[i]);
    button.text(desserts[i]);
    $("#dessertsButtons").append(button);  
  }

}

renderButtons();




// When the user clicks a button, the page grabs 10 static, non animated gif images from the giphy API
// Under every gif, we display the rating
$(document).on("click", ".dessertGroup" , function displayDessertGroups() {
  console.log("I pressed a buttons");
  
  var girlGroup = $(this).attr("data-name")
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + girlGroup + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"

  }).done(function(response) {
    var searchResults = response.data;

    console.log(queryURL)

      for (i=0; i<searchResults.length; i++){
        var gifDiv = $("<div>");
        var rating = searchResults[i].rating;
        var p = $("<p>").text("This gif is rated: " + rating);
        var dessertGroupGif = $("<img>");
        dessertGroupGif.addClass(".gif")
        dessertGroupGif.attr("src", searchResults[i].images.fixed_width_still.url);
        dessertGroupGif.attr("data-state" , "still");
        dessertGroupGif.attr("data-animate", searchResults[i].images.fixed_width.url)
        dessertGroupGif.attr("data-still", searchResults[i].images.fixed_width_still.url)

        gifDiv.append(dessertGroupGif);
        gifDiv.append(p);

        $("#dessertGroups").prepend(gifDiv);

      }
    
    })

});

// // When the user click one of the still GIPHY images, the gif animates. 
$(document).on("click", "img", function toggleAnimation(){
  
    var state = $(this).attr("data-state");
    
    

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

    // If the user clicks the gif again, it stops playing
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");

    }

});

$(document).on("click", "#addDessertGroup", function addNewGroups () {
  event.preventDefault();
  var newGroup = $("#dessertGroupInput").val().trim();
  desserts.push(newGroup);
  console.log(desserts);
  renderButtons();

  

})


  


  

// If the user clicks the gif again, it stops playing


// We add a form that take the value from a user and pushes it to our topic array

// We create a function that clears the buttons div and repopulates it with all new buttons
