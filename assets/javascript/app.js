// Make a ingredients list
var ingredientCount = 0;

	// Display user ingredients to page
	$("#addIngredient").on("click", function(){

		// get the ingredient "value" from the textbox
		var ingredientTask = $('#ingredient').val().trim();

		// display user input in a paragraph
		var ingredientItem = $('<p>');
		ingredientItem.attr("id", "item-" + ingredientCount);
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
		$('#list').val("");

		// increment the the todoCount
		ingredientCount++;

		// Prevent Form from Refreshing (return false)
	return false;

});














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
