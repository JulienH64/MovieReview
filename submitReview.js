window.addEventListener('load', function () {
    const movieTitle = sessionStorage.getItem('movieTitle');
    const moviePoster = sessionStorage.getItem('moviePoster');

    document.getElementById('movieTitle').textContent = movieTitle;
    document.getElementById('moviePoster').src = `https://image.tmdb.org/t/p/w500${moviePoster}`;

    document.getElementById('reviewForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const userName = document.getElementById('userName').value;
        const rating = document.getElementById('rating').value;
        const review = document.getElementById('review').value;

        const reviewData = {
            movieTitle: movieTitle,
            userName: userName,
            rating: rating,
            review: review
        };

        fetch('/submitReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(response => response.json())
            .then(data => {
                alert('Review submitted successfully!');
                location.href = "index.html";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});
