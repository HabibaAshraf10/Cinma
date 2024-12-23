
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
    
    if (loginCheck) {
        loginNavBar.remove();
    }
// تأكد من أن الصفحة جاهزة وتحميل البيانات
document.addEventListener("DOMContentLoaded", function() {
    calculateTotalPrice();
    loadFormData(); // Load saved data when the page loads
});

// حساب السعر الكلي عند تغيير الفيلم أو عدد المقاعد
function calculateTotalPrice() {
    const movieSelect = document.getElementById("movie");
    const seatsInput = document.getElementById("seats");
    const totalPriceInput = document.getElementById("total_price");

    const moviePrice = parseInt(movieSelect.selectedOptions[0].dataset.price);
    const numSeats = parseInt(seatsInput.value);
    const totalPrice = moviePrice * numSeats;

    if(movieSelect.value =='') // If the user didn't select the movie
    {
        totalPriceInput.value = '';
        return;
    }
    totalPriceInput.value = totalPrice; // تغيير العملة حسب ما تم اختياره
}

// تأكد من أن الصفحة جاهزة وتحميل البيانات
document.addEventListener("DOMContentLoaded", function() {
    loadFormData(); // Load saved data when the page loads
    loadSeats();
    calculateTotalPrice();
});

function loadSeats(){

    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    
    if (!selectedSeats || selectedSeats.length === 0) {
        document.getElementById("seats").value = 0;
    } else {
        document.getElementById("seats").value = selectedSeats.length;
    }

    if(document.getElementById("seats").value == 0){
        window.location.href = '/booking';
        alert("⚠️⚠️You have to select seats first⚠️⚠️");
    }
}

// Add event listener to form submission to validate and save data
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع تقديم النموذج
    if (saveFormData()) {
        window.location.href = 'confirm.html'; // إعادة توجيه إلى confirm.html
    }
});
// Get data from localStorage and pre-fill the form
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem("paymentData"));

    if (savedData) {
        document.getElementById("movie").value = savedData.movie_id || '';
        document.getElementById("seats").value = savedData.seats || 0;
        document.getElementById("name_on_card").value = savedData.name_on_card || '';
        document.getElementById("card_number").value = savedData.card_number || '';
        document.getElementById("expiration_date").value = savedData.expiration_date || '';
        document.getElementById("cvv").value = savedData.cvv || '';
        document.getElementById("discount_code").value = savedData.discount_code || '';
        document.getElementById("currency").value = savedData.currency || 'EGY';
        document.querySelector(`input[name="payment_method"][value="${savedData.payment_method}"]`).checked = true; // Set the selected payment method
        calculateTotalPrice(); // Recalculate the price with pre-loaded data
    }
}

// Save the form data to localStorage
function saveFormData() {
    const movieSelect = document.getElementById("movie");
    const seatsInput = document.getElementById("seats");
    const nameOnCard = document.getElementById("name_on_card");
    const cardNumber = document.getElementById("card_number");
    const expirationDate = document.getElementById("expiration_date");
    const cvv = document.getElementById("cvv");
    const discountCode = document.getElementById("discount_code");
    const currencySelect = document.getElementById("currency");
    const paymentMethod = document.querySelector('input[name="payment_method"]:checked');

    // Validate the required fields
    if (!movieSelect.value || !seatsInput.value || !nameOnCard.value || !cardNumber.value || !expirationDate.value || !cvv.value || !paymentMethod) {
        alert("Please fill in all required fields!");
        return false;
    }

    const formData = {
        movie_id: movieSelect.value,
        movie_title: movieSelect.selectedOptions[0].text, // إضافة اسم الفيلم
        show_time: movieSelect.selectedOptions[0].dataset.showTime, // إضافة وقت العرض
        hall_number: movieSelect.selectedOptions[0].dataset.hallNumber, // إضافة رقم القاعة
        seats: seatsInput.value,
        name_on_card: nameOnCard.value,
        card_number: cardNumber.value,
        expiration_date: expirationDate.value,
        cvv: cvv.value,
        discount_code: discountCode.value,
        currency: currencySelect.value,
        payment_method: paymentMethod.value,
        total_price: document.getElementById("total_price").value // إضافة السعر الكلي
    };

    // Save data to localStorage
    localStorage.setItem("paymentData", JSON.stringify(formData));

    return true;
}

// Add event listener to form submission to validate and save data
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع تقديم النموذج
    if (saveFormData()) {
        window.location.href = 'confirm.html'; // إعادة توجيه إلى confirm.html
    }
});

loadSeats();

