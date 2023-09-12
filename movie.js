const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get("id");
const movieImageContainer = document.querySelector(".movie-image-container");
const moviePlot = document.querySelector(".movie-plot-text");
const movieTitle = document.querySelector(".movie-title");

// Function to fetch movie details from OMDB API
async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=a57dc866&i=${imdbID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}
// Function to display movie details
function displayMovieDetails(movie) {
   if (movie) {
        moviePlot.textContent = movie.Plot;
        movieTitle.textContent = movie.Title;
        movieImageContainer.innerHTML = `<img src="${movie.Poster}" alt="Movie Poster" class="movie-image">`;
        
        // Add additional details to the movie-info section
        const movieInfo = document.querySelector(".movie-info");
        const additionalDetails = [
            `Year: ${movie.Year}`,
            `Rated: ${movie.Rated}`,
            `Released: ${movie.Released}`,
            `Runtime: ${movie.Runtime}`,
            `Genre: ${movie.Genre}`,
            `Director: ${movie.Director}`,
            `Writer: ${movie.Writer}`,
            `Actors: ${movie.Actors}`,
            `Language: ${movie.Language}`,
            `Country: ${movie.Country}`,
            `Awards: ${movie.Awards}`,
            `Metascore: ${movie.Metascore}`,
            `IMDb Rating: ${movie.imdbRating}`,
            `IMDb Votes: ${movie.imdbVotes}`,
            `Type: ${movie.Type}`,
            `Total Seasons: ${movie.totalSeasons}`
        ];

        additionalDetails.forEach((detail) => {
            const p = document.createElement("p");
            p.textContent = detail;
            movieInfo.appendChild(p);
        });
    } else {
        moviePlot.textContent = "Movie Not Found";
    }
}

// Load and display movie details
async function loadMovieDetails() {
    const movie = await fetchMovieDetails(imdbID);
    if (movie) {
        displayMovieDetails(movie);
    }
}
// Function to update the URL and history
function updateURL(imdbID) {
    window.history.pushState({}, '', `movie.html?id=${imdbID}`);
}


// Initialize the movie details page
loadMovieDetails();
