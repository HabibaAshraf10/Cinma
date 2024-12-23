// Load and display payment and booking details in the confirmation page
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve saved payment data from localStorage
    const savedData = JSON.parse(localStorage.getItem("paymentData"));

    if (savedData) {
        // Populate the confirmation details
        document.getElementById("movie_details").value = savedData.movie_title || "N/A";
        document.getElementById("seats_count").value = savedData.seats || "0";
        document.getElementById("total_price").value = savedData.total_price || "0 EGY";
        document.getElementById("payment_method").value = savedData.payment_method || "N/A";
        document.getElementById("currency").value = savedData.currency || "EGY";
    } else {
        // If no data is found, redirect to the booking page
        alert("No booking data found. Redirecting to the booking page.");
        window.location.href = '/booking';
    }

    // Add event listener to the Confirm button
    const confirmButton = document.querySelector(".btn-confirm");
    if (confirmButton) {
        confirmButton.addEventListener("click", showMessage);
    }
});

// Get the value of the cookie
function getCookieValue(cookieName) {
    const cookies = document.cookie.split("; "); // Split cookies into an array
    for (let cookie of cookies) {
        const [key, value] = cookie.split("="); // Split each cookie into key and value
        if (key === cookieName) {
            return value; // Return the value if the key matches
        }
    }
    return null; // Return null if the cookie is not found
}

// Show a confirmation message with all booking details
function showMessage() {
    // Retrieve booking details from the page
    const movieName = document.getElementById("movie_details").value || "N/A";
    const seatsCount = document.getElementById("seats_count").value || "0";
    const seatsPrice = parseFloat(document.getElementById("total_price").value) || 0; // Convert to number
    const paymentMethod = document.getElementById("payment_method").value || "N/A";
    const currency = document.getElementById("currency").value || "EGY";

    const snacksPrice = parseFloat(getCookieValue("snack_total_price")) || 0; // Convert to number
    const totalPrice = seatsPrice + snacksPrice;

    // Create the message content
    const message = `
        تم تأكيد البيانات بنجاح!
        ----------------------------
        Movie Details: ${movieName}
        Seats Count: ${seatsCount}
        Seats Price: ${seatsPrice} ${currency}
        Snacks Price: ${snacksPrice} ${currency}
        Total Price: ${totalPrice} ${currency}
        Payment Method: ${paymentMethod}
        ----------------------------
        Thank you!
    `;

    // Show the message
    alert(message);
    window.location.href = "/movies";
    document.cookie = "snack_total_price=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove the cookie
    alert("♥ نتمنى لكم مشاهدة ممتعة ♥")


    // Mark the selected seats as a sold after confirmation 
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats && selectedSeats.length > 0) {
      selectedSeats.forEach((seatIndex) => {
        const seat = document.querySelectorAll(".row .seat")[seatIndex];
        if (seat) {
          seat.classList.add("sold"); // Mark the seat as sold
          seat.classList.remove("selected"); // Remove the 'selected' class
          seat.disabled = true; // Prevent the seat from being clicked again
        }
      });
       // Save the sold seats in localStorage
       localStorage.setItem("soldSeats", JSON.stringify(selectedSeats));
    }


    // Remove the payment data and selected seats
    localStorage.removeItem("paymentData");
    localStorage.removeItem("selectedSeats");

    

    // Reset input fields in the payment form (text inputs, checkboxes, radio buttons)
    const inputFields = document.querySelectorAll("#payment-form input, #payment-form textarea");
    inputFields.forEach(input => {
        input.value = ''; // Reset each input's value
        if (input.type === "radio" || input.type === "checkbox") {
            input.checked = false; // Reset radio buttons and checkboxes
        }
    });

    // Reset the select dropdowns to empty
    // const selectFields = document.querySelectorAll("#payment-form select");
    // selectFields.forEach(select => {
    //     select.selectedIndex = -1; // Set the selected index to -1 to clear the selection
    // });

    
}
