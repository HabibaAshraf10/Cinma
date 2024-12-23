// دالة عرض الوصف
function showDescription(movieId) {
    fetch(`/description/${movieId}`)
    // تصحيح طريقة كتابة URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching movie details');
            }
            return response.text(); // استرجاع HTML من Flask
        })
        .then(html => {
            const descriptionModal = document.getElementById('movie-description');
            descriptionModal.innerHTML = html; // إضافة الوصف إلى المودال
            descriptionModal.style.display = 'block'; // عرض المودال
        })
        .catch(error => console.error(error)); // التعامل مع الخطأ إذا حدث
}

// دالة إغلاق الوصف
function closeDescription() {
    const descriptionModal = document.getElementById('movie-description');
    descriptionModal.style.display = 'none'; // إخفاء المودال
}

// دالة إرسال الاستبيان
function submitPoll() {
    const form = document.getElementById('poll-form');
    const selected = form.poll.value; // الحصول على القيمة المختارة من الاستبيان

    let ratingValue = 0; // القيمة الافتراضية للتقييم

    // تحديد القيمة بناءً على الخيار المختار
    switch (selected) {
        case 'excellent':
            ratingValue = 5;
            break;
        case 'good':
            ratingValue = 3;
            break;
        case 'average':
            ratingValue = 2.5;
            break;
        case 'poor':
            ratingValue = 1;
            break;
    }

    // تحديث النجوم بناءً على التقييم
    updateStars(ratingValue);

    // إرسال النتائج إلى السيرفر (محاكاة هنا)
    const results = {
        excellent: 50,
        good: 30,
        average: 15,
        poor: 5
    };

    showResults(results);
}

// دالة تحديث النجوم
function updateStars(ratingValue) {
    const starsContainer = document.getElementById('stars-container');
    const ratingNumber = document.getElementById('rating-number');
    let starsHTML = ''; // تفريغ النجوم القديمة

    // إضافة النجوم الممتلئة
    for (let i = 0; i < Math.floor(ratingValue); i++) {
        starsHTML += '<span class="star full">★</span>';
    }

    // إذا كانت القيمة تحتوي على جزء عشري، نضيف نصف نجمة
    if (ratingValue % 1 !== 0) {
        starsHTML += '<span class="star half">★</span>';
    }

    // إضافة النجوم الفارغة المتبقية
    for (let i = Math.ceil(ratingValue); i < 5; i++) {
        starsHTML += '<span class="star empty">☆</span>';
    }

    starsContainer.innerHTML = starsHTML; // تحديث النجوم في الصفحة
    ratingNumber.textContent = ratingValue.toFixed(1); // تحديث الرقم بجانب النجوم
}

// دالة عرض نتائج الاستبيان
function showResults(results) {
    const resultsDiv = document.getElementById('poll-results');
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = ''; // مسح النتائج القديمة

    for (const [key, value] of Object.entries(results)) {
        const li = document.createElement('li');
        li.textContent = `${key}: ${value}%`; // تصحيح التنسيق
        resultsList.appendChild(li);
    }

    resultsDiv.style.display = 'block'; // عرض نتائج الاستبيان
}