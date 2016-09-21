// Make a ingredients list
var ingredientCount = 0;

	// Display user ingredients to page
	$(document).on('click', '#addIngredient', function(){

		// get the ingredient "value" from the textbox
		var ingredientTask = $('#ingredient').val().trim();
		console.log(ingredientTask);

		// display user input in a paragraph
		var ingredientItem = $('<button>');
		ingredientItem.attr("id", "item-" + ingredientCount);
		ingredientItem.addClass("ingredientButton");
		ingredientItem.attr("data-user", ingredientTask);
		ingredientItem.append(" " + ingredientTask);

		// create a button that can be clicked to delete ingredient
		var ingredientClose = $("<button>");
		ingredientClose.attr("data-ingredient", ingredientCount);
		ingredientClose.addClass("checkbox");
		ingredientClose.append("X");

		// add the X button in front of the user input paragraph
		ingredientItem = ingredientItem.prepend(ingredientClose);

		// add the button and paragraph to the page
		$("#list").append(ingredientItem);

		// clear the textbox when done
		$('#ingredient').val("");

		// increment the the todoCount
		ingredientCount++;

		// Prevent Form from Refreshing (return false)
	return false;

	});

	// X Delete button functionality
	$(document.body).on('click', '.checkbox', function(){

		// Get the ingredientNumber of the button from its data attribute.
		var ingredientNumber = $(this).data("ingredient");

		// // Empty the specific <p> element that previously held the ingredient item.
		// $("#item-" + ingredientNumber).empty();

		// Remove button
		$("#item-" + ingredientNumber).remove();

	});


// AJAX call with ingredient button for gifs
$(document.body).on('click', '.ingredientButton', function(){


	var ingredient = $(this).data("user");
	// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ingredient + "&api_key=dc6zaTOxFJmzC&limit=1";
	var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=" + ingredient;

	console.log(ingredient);
	console.log(queryURL);

	  $.ajax({
            url: queryURL,
            method: 'GET',
            beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z');}
            // crossDomain: true,
            // dataType: "JSONP",
            // jsonp: false
        })
        .done(function(response) {
            

            console.log(queryURL);

            console.log(response);

            // var results = response.data;

            for (var j = 0; j < response.length; j++) {

	            var ingredientsDiv = $('<div>');
	            ingredientsDiv.addClass('col-md-4');
	            ingredientsDiv.addClass('height');

	            var ingredientImage = $('<img>');
	            ingredientImage.attr('src', response[j].image);
	            ingredientImage.addClass('ingredientImage');
	            ingredientImage.addClass('img-responsive');

	            ingredientsDiv.append(ingredientImage);

	            $('#dishes').append(ingredientsDiv);
	        }
           
      	});
});








// // AJAX call on one ingredient
// $(document).on('click', '#addIngredient', function(){
// 	var ingredient = $('#ingredient').val().trim();
// 	var key = "3ddf33388a85595eb6bcc15116a16e16";
// 	var queryURL = "http://food2fork.com/api/search?key=" + key + "&q=" + ingredient;

// 	console.log(ingredient);
// 	console.log(key);
// 	console.log(queryURL);

// 	  $.ajax({
//             url: queryURL,
//             method: 'GET',
//             // crossDomain: true,
//             // dataType: "JSONP",
//             // jsonp: false
//         })
//         .done(function(response) {
            

//             console.log(queryURL);

//             console.log(response);

//             var results = response.data;
           
//       	});
// });











// "http://food2fork.com/api/search?key=" + key + "&q=" + ingredient;
// 3ddf33388a85595eb6bcc15116a16e16



// Spoontacular MashApe API
// H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z





// Initialize Firebase
// var config = {
// apiKey: "AIzaSyB_VPm_7dN7gNGOUqyvQtlpo1EmcWrpvcU",
// authDomain: "tasty-tech-f4e06.firebaseapp.com",
// databaseURL: "https://tasty-tech-f4e06.firebaseio.com",
// storageBucket: "",
// messagingSenderId: "325466871965"
// };
// firebase.initializeApp(config);

// VARIABLES
// var database = firebase.database();







// AJAX call
