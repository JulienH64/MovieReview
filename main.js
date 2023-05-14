document.getElementById('searchButton').addEventListener('click', function () {
    const searchValue = document.getElementById('searchInput').value;
    fetch(`/search/${searchValue}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('movieList').innerHTML = '';
            data.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie-item');

                const movieImg = document.createElement('img');
                movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                movieImg.alt = `${movie.title} poster`;

                const movieInfoDiv = document.createElement('div');
                movieInfoDiv.innerHTML = `
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Rating: ${movie.vote_average}</p>
                `;

                const writeReviewLink = document.createElement('a');
                writeReviewLink.textContent = "Write a review";
                writeReviewLink.href = "write.html";
                writeReviewLink.addEventListener('click', () => {
                    sessionStorage.setItem('movieTitle', movie.title);
                    sessionStorage.setItem('moviePoster', movie.poster_path);
                });

                movieInfoDiv.appendChild(writeReviewLink);

                const seeReviewsLink = document.createElement('a');
                seeReviewsLink.textContent = "See reviews";
                seeReviewsLink.href = "reviews.html";
                seeReviewsLink.addEventListener('click', () => {
                    sessionStorage.setItem('movieTitle', movie.title);
                });
                movieInfoDiv.appendChild(seeReviewsLink);
                movieDiv.appendChild(movieImg);
                movieDiv.appendChild(movieInfoDiv);
                document.getElementById('movieList').appendChild(movieDiv);
            });
        });
});
