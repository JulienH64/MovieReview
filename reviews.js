window.addEventListener('load', function () {
    const movieTitle = sessionStorage.getItem('movieTitle');
    const moviePoster = sessionStorage.getItem('moviePoster');
    document.getElementById('movieTitle').textContent = movieTitle;
    document.getElementById('moviePoster').src = `https://image.tmdb.org/t/p/original${moviePoster}`;

    fetch(`/reviews/${movieTitle}`)
        .then(response => response.json())
        .then(data => {
            const reviewsList = document.getElementById('reviewsList');
            data.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review-item');

                const userNameDiv = document.createElement('div');
                userNameDiv.textContent = review.userName;

                const ratingDiv = document.createElement('div');
                ratingDiv.textContent = `Rating: ${review.rating}`;

                const textDiv = document.createElement('div');
                textDiv.textContent = review.review;

                reviewDiv.appendChild(userNameDiv);
                reviewDiv.appendChild(ratingDiv);
                reviewDiv.appendChild(textDiv);

                reviewsList.appendChild(reviewDiv);
            });
        });
});
