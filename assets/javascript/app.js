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


// Capture user input for User Submitted Recipes
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


// Update User Submitted Recipes table dynamically
database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    // update local variables with database data
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




// Ingredient VARIABLES
var ingredientCount = 0;
var likesCounter = 0;


// AJAX call from Spoonacular API - User ingredients input outputs recipes
$(document.body).on('click', '#addIngredient', function() {

    var ingredient = $('#ingredient').val().trim();
    var cuisineinput = $('#cuisine').val().trim();   
    var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?addRecipeInformation=true&cuisine=' + cuisineinput + '&includeIngredients=' + ingredient + '&limitLicense=false&&number=5&offset=0&query=' + ingredient + '&ranking=1&type=main+course'

    console.log(ingredient);
    console.log(cuisineinput);
    console.log(queryURL);

    $('#dishes').empty();
    $('#recipes').empty();
    $('#ingredientList').empty();

    $.ajax({
            url: queryURL,
            method: 'GET',
            beforeSend: function(xhr) { xhr.setRequestHeader('X-Mashape-Key', 'H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z'); }
        })
        .done(function(response) {

        console.log(queryURL);

        // adding dishes to the page
        for (var j = 0; j < response.results.length; j++) {

            var ingredientsDiv = $('<div>');
            ingredientsDiv.addClass('col-md-4');
            ingredientsDiv.addClass('height');

            var title = response.results[j].title;

            var ingredientImage = $('<img>');
            ingredientImage.attr('src', response.results[j].image);
            ingredientImage.addClass('ingredientImage');
            ingredientImage.addClass('img-responsive');
            ingredientImage.attr('data-recipeId', response.results[j].id);
            ingredientImage.attr('data-sourceUrl', response.results[j].sourceUrl);


            var recipeIdResult = "recipeIdTab" + response.results[j].id;
            var recipeIdData = response.results[j].id;


            // when 'Like' button is clicked, value in firebase is updated - 'Like' button functionality is coded below
            database.ref(recipeIdResult).on("value", function(snapshot) {
                 
                if (snapshot.val() != null) {
                                                
                    currentlikes = parseInt(snapshot.val().currentlikes);
                        
                    var likes = $('<button>');
                    likes.addClass('btn btn-primary');
                    likes.addClass('likesButton');
                    likes.html("Like: " + currentlikes);
                    likes.attr('data-like', currentlikes);
                    likes.attr('data-id', recipeIdData);

                    ingredientsDiv.html("<h6>" + title + "</h6>").append(ingredientImage).append(likes);

                   $('#dishes').append(ingredientsDiv);
                } 

                else{
                    var likes = $('<button>');
                    likes.addClass('btn btn-primary');
                    likes.addClass('likesButton');
                    likes.html("Like: " + likesCounter);
                    likes.attr('data-like', 0);
                    likes.attr('data-id', response.results[j].id);

                    ingredientsDiv.html("<h6>" + title + "</h6>").append(ingredientImage).append(likes);

                    $('#dishes').append(ingredientsDiv);
                }

            }, function (errorObject) {

                console.log("The read failed: " + errorObject.code);

            }); // updating firebase value

        } // for loop to add dishes to the page

    }); // AJAX call

    return false;
}); // clicking ingredient button




// clicking like button increments currentLikes variable and updates data in firebase
$(document).on('click', '.likesButton', function(){
    var currentlikes = $(this).data("like");
    var currentId = $(this).data("id");

    currentlikes = currentlikes + 1;

    $(this).data('like', currentlikes);
    $(this).html("Like: " + currentlikes);
    
    database.ref('/recipeIdTab' + currentId).update({
        currentlikes: currentlikes,
    });
});





// Click the recipe image from the AJAX call to display step-by-step recipe instructions
$(document).on('click', '.ingredientImage', function() {

    var recipeID = $(this).attr('data-recipeId');
    console.log(recipeID);

    var sourceUrl = $(this).attr('data-sourceUrl')
    console.log(sourceUrl)


    var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=true&url=' + sourceUrl;

    $.ajax({
            url: queryURL,
            method: 'GET',
            beforeSend: function(xhr) { xhr.setRequestHeader('X-Mashape-Key', 'H0b5sYxWgxmshQsh24XuzEO37FLZp1CxJbVjsnjmz7uj7v8W0z'); }
        })
        .done(function(response) {

            console.log(response);
            console.log(queryURL);
            console.log("clicked img = " +response.title);

            $('#recipes').empty();
            $('#ingredientList').empty();

            var recipeTitle =  response.title;
            $('#ingredientList').html('<h2>' + recipeTitle +'</h2>');


            for (var i = 0; i < response.extendedIngredients.length; i++) {
                console.log(response.extendedIngredients[i].originalString);
                console.log(response.text);
               
                var exIngList = response.extendedIngredients[i].originalString;
               
                $('#ingredientList').append('<li>' + exIngList + '</li>'); 
            }  

            var recipeText = response.text;               
            var recipeDirections = $('<p>');
            recipeDirections.html('<br>' + recipeText +  '<br>');
            $('#recipes').append(recipeDirections);

            var recInstructions = response.instructions;
            recipeDirections.html(recInstructions);
        });
});