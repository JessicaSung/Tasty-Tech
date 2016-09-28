// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_VPm_7dN7gNGOUqyvQtlpo1EmcWrpvcU",
    authDomain: "tasty-tech-f4e06.firebaseapp.com",
    databaseURL: "https://tasty-tech-f4e06.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "325466871965"
};
firebase.initializeApp(config);

//VARIABLES
var database = firebase.database();

var nameInput = "";
var dishNameInput = "";
var ingredientsInput = "";
var preparationInput = "";

var dishesID = [];

// var currentlikes = 0;






// AJAX call dishes with ingredients from spoonacular
$(document.body).on('click', '#addIngredient', function() {


    var ingredient = $('#ingredient').val().trim();
    var cuisineinput = $('#cuisine').val().trim();
    // var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=" + ingredient;
    var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=false&cuisine=' + cuisineinput + '&includeIngredients=' + ingredient + '&limitLicense=false&&number=5&offset=0&query=' + ingredient + '&ranking=1&type=main+course'

    console.log(ingredient);
    console.log(cuisineinput);
    console.log(queryURL);

    $.ajax({
            url: queryURL,
            method: 'GET',
            beforeSend: function(xhr) { xhr.setRequestHeader('X-Mashape-Key', 'H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z'); }
        })
        .done(function(response) {


            console.log(queryURL);

            console.log(response.results);

            dishesID = [];

            // adding dishes to the page
            for (var j = 0; j < response.results.length; j++) {

                var ingredientsDiv = $('<div>');
                ingredientsDiv.addClass('col-md-4');
                ingredientsDiv.addClass('height');

                    // If there are more than 3 dishes returned, add the ones more than 3 in a new row
                    //         if ($('#dishes > .row > div.col-md-4') > 3) {
                    // var newRow = $('<div>');
                    // newRow.addClass('row');

                    // // add the row to the page
                    // $('#dishes').append(newRow);
                    //         }


                var title = response.results[j].title;

                var ingredientImage = $('<img>');
                ingredientImage.attr('src', response.results[j].image);
                ingredientImage.addClass('ingredientImage');
                ingredientImage.addClass('img-responsive');
                ingredientImage.attr('data-recipeId', response.results[j].id);


                var likes = $('<button>');
                likes.addClass('btn btn-primary');
                likes.addClass('likesButton');
                likes.html("Like: " + currentlikes);

                //button like and id for like increment use---------

                likes.attr('data-like', 0);
                likes.attr('data-id', response.results[j].id);

                //---------------------------------

                // push recipe ID's to array dishesID
                dishesID.push(response.results[j].id);

                var currentlikes = 0;

                ingredientsDiv.html("<h6>" + title + "</h6>").append(ingredientImage).append(likes);

                $('#dishes').append(ingredientsDiv);
            }

        });

    return false;
});


                // Clicking like button increments the number of likes in the firebase database

                // $(document).on('click', '.likesButton', function() {
                //     currentlikes++;
                //     console.log(currentlikes);

                //     database.ref().set({
                //         currentlikes: currentlikes
                //     });

                // });

//--------------------------------------------

// Like button functionality locally
$(document).on('click', '.likesButton', function(){
    currentlikes = $(this).data("like");
    var currentId = $(this).data("id");
    console.log("currentId:  " + currentId);

    currentlikes = currentlikes + 1;

    $(this).data('like', currentlikes);
    

                //var newvar = recipeID + "like"
                
                // database.ref('/recipeIdTab' + currentId).update({
                //     currentlikes: currentlikes,
                // });


    // Storing Like button data on firebase
    database.ref('/recipeIdTab' + currentId).set({
        currentlikes: currentlikes
    });
    

    // Updating the Like counter in firebase and then displaying it on the page
    database.ref().on("value", function(snapshot) {

        // Then we console.log the value of snapshot
        console.log(snapshot.val());

        // comparing the array of recipe ID's from the AJAX call (after the call, before clicking like) to the snapshot (update, aka clicking like)
        for (var key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {
                console.log(key + " -> " + snapshot.val()[key]);
                console.log(snapshot.val()[key]);
            }
        }


        // // Then we change the html associated with the number.        
        // $('.likesButton').html("Like: " + currentlikes);
        // console.log("currentlikes=  " + currentlikes);
        
        //         // Then update the clickCounter variable with data from the database. 
        //         // ???
        //         // currentlikes = snapshot.val().currentlikes;
        //         // $('likesButton').html("Like: " + currentlikes);

        //         // If there is an error that Firebase runs into -- it will be stored in the "errorObject" <-- can name this anything we want
    
    }, function (errorObject) {

        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
    
    });


});

//--------------------------------------------


                // // Updating likes button on the page with the value in the firebase database
                // database.ref().on("value", function(snapshot) {

                //     // Print the current data to the console.
                //     console.log(snapshot.val());

                //     // Change the currentlikes to match the data in the database
                //     currentlikes = snapshot.val().currentlikes;

                //     // Change the html to reflect the current currentlikes
                //     $(".likesButton").html("Like: " + currentlikes);

                //     // Log the value of the currentlikes
                //     console.log(currentlikes);

                //     // If any errors are experienced, log them to console.
                // }, function(errorObject) {

                //     console.log("The read failed: " + errorObject.code);
                // });




// Click the dish to find the recipe steps
$(document).on('click', '.ingredientImage', function() {

    var recipeID = $(this).attr('data-recipeId');

    console.log(recipeID);



    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/analyzedInstructions";

    $.ajax({
            url: queryURL,
            method: 'GET',
            beforeSend: function(xhr) { xhr.setRequestHeader('X-Mashape-Key', 'H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z'); }
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

            }
        });
});









// User adds recipe
$(document).on('click', '#addRecipe', function() {
    nameInput = $('#nameInput').val().trim();
    dishNameInput = $('#dishInput').val().trim();
    ingredientsInput = $('#ingredientsInput').val().trim();
    preparationInput = $('#preparationInput').val().trim();

    console.log(nameInput);
    console.log(dishNameInput);
    console.log(ingredientsInput);
    console.log(preparationInput);

    database.ref().push({
        nameInput: nameInput,
        dishNameInput: dishNameInput,
        ingredientsInput: ingredientsInput,
        preparationInput: preparationInput
    });

    return false;
});


// auto update of user added recipes
database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    // update the variable with data from the database
    nameInput = snapshot.val().nameInput;
    dishNameInput = snapshot.val().dishNameInput;
    ingredientsInput = snapshot.val().ingredientsInput;
    preparationInput = snapshot.val().preparationInput;

    // add table
    var tr = $('<tr>');
    var a = $('<td>');
    var b = $('<td>');
    var c = $('<td>');
    var d = $('<td>');

    a.append(nameInput);
    b.append(dishNameInput);
    c.append(ingredientsInput);
    d.append(preparationInput);

    tr.append(a).append(b).append(c).append(d);
    $('#newRecipes').append(tr);


}, function(errorObject) {

    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);

});




















//--------------------------------------------
// Unused code below

// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + ingredient + "&api_key=dc6zaTOxFJmzC&limit=1";


// "http://food2fork.com/api/search?key=" + key + "&q=" + ingredient;
// 3ddf33388a85595eb6bcc15116a16e16


// Spoontacular MashApe API
// H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z


// var results = response.data;



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
