// Displays Modal function







// Section displaying movies list

const inputEl = document.getElementById('movie-input');
const homeScreenEl = document.getElementById("home-page");
const listEl = document.getElementById("list-page");
const closeModalBtn = document.getElementById("close-modal-button");
const trailerBtn = document.querySelectorAll('.trailer-button');
const favBtn = document.querySelectorAll('.fav-button');
const buttonEl = document.getElementById('search-button');
const homeBtn = document.getElementById('home-button')
const searchHistoryEl = document.getElementById('search-history')



function searchTrailer (movieTitle){ 
    const query = encodeURIComponent(`${movieTitle} trailer`);
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&type=video&key=AIzaSyDMDgHedzc8VgICMrD9qIKyvsbOIk7L41k`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const videoId = data.items[0].id.videoId;
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    
    const videoPlayer = document.getElementById('video-player');
    videoPlayer.innerHTML = `
      <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
    `;
  })
  .catch(error => {
    console.error(error);
  });

}


function closeModal() {
    const modal = document.getElementById('defaultModal');
    const iframe = modal.querySelector('iframe');
    iframe.src = ''; // stop the video by setting the src to an empty string
  }



function displayList() {

    homeScreenEl.setAttribute("class","hide");
    listEl.removeAttribute("class");
            const movieTitle = inputEl.value;
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=2451dabb039e62438aa41e0f80395638&language=en-US&query=${movieTitle}&page=1&include_adult=false`)
                .then(response => response.json())
                .then(data => {
                    for(i=0;i<5;i++){
                        document.getElementById("movie"+(i+1)+"title").innerHTML= data.results[i].title; 
                        document.getElementById("overview"+(i+1)).innerHTML="<b>Overview: </b>" + data.results[i].overview;
                        document.getElementById("img"+(i+1)).src = "https://image.tmdb.org/t/p/w500/"+ data.results[i].poster_path;
                        trailerBtn[i].dataset.title=data.results[i].title;
                        trailerBtn[i].addEventListener("click",function(e) {
                        console.log(e.target.dataset.title);
                        searchTrailer(e.target.dataset.title);
                        });
/*                         favBtn[i].dataset.favorite=data.results[i].title;
                        favBtn[i].addEventListener("click",function(e) {
                        console.log(e.target.dataset.title);
                        }); */

                        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
                        if (!searchHistory.includes(movieTitle)) {
                          searchHistory.push(movieTitle);
                          localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                          window.location.href = 'myfav.html';
                        }
 
                    }
                })
       
}





// Next function switch classes of list section and search section to give a change of screen effect
function refreshPage () { 
    listEl.setAttribute("class","hide");
    homeScreenEl.removeAttribute("class");
    homeScreenEl.setAttribute("class","bottom");
}


buttonEl.addEventListener("click", displayList);
homeBtn.addEventListener("click", refreshPage); // Switches the classes to give a change of screen effect
closeModalBtn.addEventListener("click",closeModal); // Button that calls closeModal finction which allows to "pause" the video when the modal closes and avoid hearing the previous video.
function returnHome () {
    window.location.replace("index.html");
}




function displaySearchHistory() {
    const searchHistoryDiv = document.getElementById('search-history');
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
    searchHistoryDiv.innerHTML = '';
  
    searchHistory.forEach(movieTitle => {
      const button = document.createElement('div');
      button.classList.add("side-right" , "bg-gradient-to-b" , "from-blue-400");
      button.textContent = movieTitle;
      button.addEventListener('click', () => {
        document.getElementById('movie-input').value = movieTitle;
        handleFormSubmit(event);
      });
      searchHistoryDiv.appendChild(button);
    });
}





 /*var myFavoritesEl = document.getElementById("my-favorites");


// Making my favorites button go to the favorites page
myfav.addEventListener("click", function(){
    window.location.replace("myfav.html")
    displaySearchHistory()
})
// Let us return from favorites to home



//Making my search button go to find the movies
// searchButton.addEventListener("click", function(){
    //console.log("hello")
   // window.location.replace("search.html")
// })

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

 */