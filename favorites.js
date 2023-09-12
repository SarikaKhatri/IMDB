const favoriteMoviesContainer = document.getElementById("favorite-list");

// Function to display favorite movies
function displayFavoriteMovies() {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMoviesContainer.innerHTML = '';

    if (storedFavorites.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'You have no favorite movies yet.';
        favoriteMoviesContainer.appendChild(emptyMessage);
        return;
    }

    storedFavorites.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('col-md-4', 'mb-3');

        movieCard.innerHTML = `
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">${movie.Year}</p>
                    <button class="btn btn-danger btn-block remove-favorite" data-imdbid="${movie.imdbID}">Remove from Favorites</button>
                </div>
            </div>
        `;

        const removeButton = movieCard.querySelector('.remove-favorite');
        removeButton.addEventListener('click', () => removeFromFavorites(movie));

        favoriteMoviesContainer.appendChild(movieCard);
    });
}

// Function to remove a movie from favorites
function removeFromFavorites(movie) {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const updatedFavorites = storedFavorites.filter(m => m.imdbID !== movie.imdbID);

    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    displayFavoriteMovies(); // Reload and display updated favorites
}
// Display favorite movies on page load
displayFavoriteMovies();
