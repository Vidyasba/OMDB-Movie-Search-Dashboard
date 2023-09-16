document.addEventListener('DOMContentLoaded', function () {
    const apiKeyInput = document.getElementById('apiKey');
    const movieTitleInput = document.getElementById('movieTitle');
    const resultContainer = document.getElementById('resultContainer');
    const loader = document.getElementById('loader');
    let timeout;

    function searchMovies() {
        const apiKey = '75fb6cba';
        const movieTitle = movieTitleInput.value;

        if (!apiKey || !movieTitle) {
            resultContainer.innerHTML = '';
            return;
        }

        //  loader while fetching data
        loader.style.display = 'block';

        // Construction of the OMDB API URL
        const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

        // Fetch movie data
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Hide the loader
                loader.style.display = 'none';

                if (data.Response === 'True') {
                    // Display movie information
                    resultContainer.innerHTML = data.Search.map(movie => `
                        <div class="movie">
                        <img src="${movie.Poster === 'N/A' ? 'placeholder.jpg' : movie.Poster}" alt="${movie.Title} Poster">
                            <h2>${movie.Title}</h2>
                            <p>Year: ${movie.Year}</p>
                            <p>Type: ${movie.Type}</p>
                            
                        </div>
                    `).join('');
                } else {
                    resultContainer.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Hide the loader and show an error message
                loader.style.display = 'none';
                resultContainer.innerHTML = '<p>An error occurred while fetching data.</p>';
            });
    }
    

    // Listen to changes in the movie title input field
    movieTitleInput.addEventListener('input', function () {
        // Use a timeout to prevent excessive API requests while the user is typing
        clearTimeout(timeout);
        timeout = setTimeout(searchMovies, 500); // Delay search by 500 milliseconds
    });

   

});
