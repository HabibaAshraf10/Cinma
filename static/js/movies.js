document.addEventListener("DOMContentLoaded", () => {
    const genreLinks = document.querySelectorAll(".btn");
    const movieListContainer = document.getElementById("movie-list");
    const genreTitle = document.getElementById('genre-title');

    genreLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // منع التنقل الافتراضي عند الضغط على الزر
            const genre = link.getAttribute("data-genre");  // استخراج النوع من الزر
            fetchMovies(genre);  // استدعاء الدالة لتحميل الأفلام
            updateTitle(genre);  // تحديث النص بالاسم الصحيح
        });
    });

    // دالة لتحميل الأفلام من الـ API
    function fetchMovies(genre) {
        fetch(`/api/movies/${genre}`)
            .then(response => response.json())
            .then(movies => {
                displayMovies(movies);  // عرض الأفلام في الـ HTML
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
            });
    }

    // دالة لتحديث النص الموجود في العنوان
    function updateTitle(genre) {
        genreTitle.textContent =` ${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`; // تحديث النص
        genreTitle.style.display = 'block';  // إظهار العنوان عند اختيار النوع
    }

    // دالة لعرض الأفلام في القائمة
    function displayMovies(movies) {
        movieListContainer.innerHTML = '';  // تنظيف القائمة أولاً

        if (movies.length === 0) {
            movieListContainer.innerHTML = '<li>No movies found for this genre.</li>';
        } else {
            movies.forEach(movie => {
                const movieItem = document.createElement('li');
                movieItem.classList.add('movie-card');

                // تحميل الصورة من التخزين المحلي أو من الرابط في حال عدم وجودها
                let movieImageUrl = localStorage.getItem(movie.title);
                if (!movieImageUrl) {
                    movieImageUrl = movie.image;
                    // تخزين الصورة في الـ LocalStorage (نحتاج إلى رابط الصورة فقط)
                    localStorage.setItem(movie.title, movieImageUrl);
                }

                movieItem.innerHTML = `
                    <img src="${movieImageUrl}?t=${new Date().getTime()}" alt="${movie.title}" class="movie-image">
                    <div class="movie-info">
                        <strong>${movie.title}</strong> (${movie.year})
                    </div>
                    <button class="btn-description" onclick="goToDescriptionPage('${movie.id}')">Description</button>
                `;
                movieListContainer.appendChild(movieItem);
            });
        }
    }

    // دالة للتوجيه إلى صفحة جديدة مع وصف الفيلم
    window.goToDescriptionPage = function (moviedId) {
        window.location.href = `/description/${encodeURIComponent(moviedId)}`;
    };



    const loginNavBar = document.getElementById("login_li")

    function getCookie(name) {
        const cookies = document.cookie.split('; '); // Split cookies into an array
        for (let i = 0; i < cookies.length; i++) {
            const [key, value] = cookies[i].split('='); // Split each cookie into key and value
            if (key === name) {
                return value; // Return the cookie value if it matches
            }
        }
        return null; // Cookie not found
    }
    
    const loginCheck = getCookie('login_check');
    const snacksPrice = getCookie('snack_total_price');
    
    if (loginCheck) {
        loginNavBar.remove();
    }
    else {
        localStorage.removeItem("selectedSeats");
        localStorage.removeItem("paymentData"); // Clear saved data
    }
    
    if (snacksPrice) {
        document.cookie = "snack_total_price=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove the cookie
    }
    

});
