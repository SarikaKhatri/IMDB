const apiKey = 'a57dc866'; // Replace with your API key
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');
const favoriteMovies = [];

// Function to fetch movie suggestions from OMDB API
async function fetchMovieSuggestions(query) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await response.json();
        return data.Search || [];
    } catch (error) {
        console.error('Error fetching movie suggestions:', error);
        return [];
    }
}

// Event listener for search input
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
        const suggestions = await fetchMovieSuggestions(query);
        displaySuggestions(suggestions);
    } else {
        clearSuggestions();
    }
});

// Function to display suggestions
function displaySuggestions(suggestions) {
    const datalist = document.getElementById('movie-suggestions');
    datalist.innerHTML = '';

    suggestions.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.Title;
        datalist.appendChild(option);
    });
}

// Function to clear suggestions
function clearSuggestions() {
    const datalist = document.getElementById('movie-suggestions');
    datalist.innerHTML = '';
}

// Function to fetch movie data from OMDB API
async function fetchMovieData(movieTitle) {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&&s=${movieTitle}`);
        const data = await response.json();
        return data.Search;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

// Function to display search results
function displaySearchResults(results) {
    movieList.innerHTML = '';
    if (!results) return;

    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('col-md-4', 'mb-3');

        movieCard.innerHTML = `
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">${movie.Year}</p>
                    <button class="btn btn-primary btn-block add-favorite" data-imdbid="${movie.imdbID}">Add to Favorites</button>
                    <a href="movie.html?id=${movie.imdbID}" class="btn btn-info btn-block">More Info</a>
                </div>
            </div>
        `;

        const addButton = movieCard.querySelector('.add-favorite');
        addButton.addEventListener('click', () => addToFavorites(movie));

        movieList.appendChild(movieCard);
    });
}

// // Function to add a movie to favorites
// function addToFavorites(movie) {
//     if (!favoriteMovies.some(m => m.imdbID === movie.imdbID)) {
//         favoriteMovies.push(movie);
//         saveFavoritesToLocalStorage();
//         alert(`${movie.Title} has been added to your favorites.`);
//     } else {
//         alert(`${movie.Title} is already in your favorites.`);
//     }
// }

// Function to save favorites to local storage




// Event listener for search input
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
        const results = await fetchMovieData(query);
        displaySearchResults(results);
    } else {
        movieList.innerHTML = '';
    }
});
// Function to add a movie to favorites
function addToFavorites(movie) {
    if (!favoriteMovies.some(m => m.imdbID === movie.imdbID)) {
        favoriteMovies.push(movie);
        saveFavoritesToLocalStorage();
        alert(`${movie.Title} has been added to your favorites.`);
        // Change the button text
        const addButton = document.querySelector(`[data-imdbid="${movie.imdbID}"]`);
        if (addButton) {
            addButton.textContent = 'Added to Favorites';
            addButton.disabled = true;
        }
    } else {
        alert(`${movie.Title} is already in your favorites.`);
    }
}

function saveFavoritesToLocalStorage() {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}
