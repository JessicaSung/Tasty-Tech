// Make a ingredients list
var ingredientCount = 0;

	// display user ingredients to page
	// $(document).on('click', '#addIngredient', function(){

	// 	// get the ingredient "value" from the textbox
	// 	var ingredientTask = $('#ingredient').val().trim();
	// 	console.log(ingredientTask);

	// 	// display user input in a paragraph
	// 	var ingredientItem = $('<button>');
	// 	ingredientItem.attr("id", "item-" + ingredientCount);
	// 	ingredientItem.addClass("ingredientButton");
	// 	ingredientItem.attr("data-user", ingredientTask);
	// 	ingredientItem.append(" " + ingredientTask);

	// 	// create a button that can be clicked to delete ingredient
	// 	var ingredientClose = $("<button>");
	// 	ingredientClose.attr("data-ingredient", ingredientCount);
	// 	ingredientClose.addClass("checkbox");
	// 	ingredientClose.append("X");

	// 	// add the X button in front of the user input paragraph
	// 	ingredientItem = ingredientItem.prepend(ingredientClose);

	// 	// add the button and paragraph to the page
	// 	$("#list").append(ingredientItem);

	// 	// clear the textbox when done
	// 	$('#ingredient').val("");

	// 	// increment the the todoCount
	// 	ingredientCount++;

	// 	// prevent Form from Refreshing (return false)
	// 	return false;

	// });

	// // Delete button (X) functionality
	// $(document.body).on('click', '.checkbox', function(){

	// 	// get the ingredientNumber of the button from its data attribute.
	// 	var ingredientNumber = $(this).data("ingredient");

	// 	// // empty the specific <p> element that previously held the ingredient item.
	// 	// $("#item-" + ingredientNumber).empty();

	// 	// remove button
	// 	$("#item-" + ingredientNumber).remove();

	// });


// AJAX call with ingredient button from spoonacular
$(document.body).on('click', '#addIngredient', function(){


	var ingredient = $('#ingredient').val().trim();
	
	var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=" + ingredient;

	console.log(ingredient);
	console.log(queryURL);

	  $.ajax({
            url: queryURL,
            method: 'GET',
            beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z');}           
        })
        .done(function(response) {
            

            console.log(queryURL);

            console.log(response);
            

            for (var j = 0; j < response.length; j++) {

	            var ingredientsDiv = $('<div>');
	            ingredientsDiv.addClass('col-md-4');
	            ingredientsDiv.addClass('height');

	            var title = response[j].title;

	            var ingredientImage = $('<img>');
	            ingredientImage.attr('src', response[j].image);
	            ingredientImage.addClass('ingredientImage');
	            ingredientImage.addClass('img-responsive');
	            ingredientImage.attr('data-recipeId', response[j].id);

	            ingredientsDiv.html(title).append(ingredientImage);

	            $('#dishes').append(ingredientsDiv);
	        }

	       
           
      	});


      	return false;
});


$(document).on('click','.ingredientImage', function(){

	var recipeID = $(this).attr('data-recipeId');

	console.log(recipeID);



	var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/analyzedInstructions";

	$.ajax({
            url: queryURL,
            method: 'GET',
            beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z');}           
        })
        .done(function(response) {
            

            console.log(queryURL);

            console.log(response);

            $('#recipes').empty();
			
			for (var i = 0; i < response[0].steps.length; i++) {
				var stepN = response[0].steps[i].number;
				var step = response[0].steps[i].step;
				var stepByStep = $('<p>');
				stepByStep.html('<br>' + stepN + ',  ' + step + '<br>');
				$('#recipes').append(stepByStep);


			};           

            
           
      	});


});













// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ingredient + "&api_key=dc6zaTOxFJmzC&limit=1";



// "http://food2fork.com/api/search?key=" + key + "&q=" + ingredient;
// 3ddf33388a85595eb6bcc15116a16e16



// Spoontacular MashApe API
// H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z


// var results = response.data;





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