var myFavoritesEl = document.getElementById("my-favorites");


//Making my home button go to the initial page
home.addEventListener("click", function(){
    //console.log("hello")
    window.location.replace("index.html")
})

//Making my favorites button go to the favorites page
myfav.addEventListener("click", function(){
    //console.log("hello")
    window.location.replace("myfav.html")
})

//Making my search button go to find the movies
searchButton.addEventListener("click", function(){
    //console.log("hello")
    window.location.replace("search.html")
})

//saving the favorites in my local storage
var saveFavorites = function () {
    localStorage.setItem("favorites", JSON.stringify(favorites))
}

// we want the array for the favorites
var favorites = [];

//function for the favorites to appear in the screem
var loadFavorites = function(){
    var loadedFav = localStorage.getItem("favorites")//getting the title of the movie

    for (var i = 0; i < loadedFav.length; i++) {
        var myFavoritesEl = document.createElement("li");
        myFavoritesEl.ClassName = "favorites";
        myFavoritesEl.innerText = loadedFav[i];
        listHighScoreEl.appendChild(myFavoritesEl);

        favorites.push(loadedFav[i]);
        
    }
}

loadFavorites()


