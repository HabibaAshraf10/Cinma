document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const seats = document.querySelectorAll(".row .seat:not(.sold)");
  const count = document.getElementById("count");
  const checkoutButton = document.querySelector(".checkout-button");

  let soldSeats = []; // Temporary storage for sold seats in the current run

  // Save selected seats
  function setSeatsData(seatsIndex) {
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  }

  // Update total and count
  function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    setSeatsData(seatsIndex);
    count.innerText = selectedSeats.length;

    // Enable or disable checkout button
    checkoutButton.classList.toggle("disabled", selectedSeats.length === 0);
  }

  // Populate UI with data from localStorage
  function populateUI() {
    // Restore selected seats from localStorage for the current session
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add("selected");
        }
      });
    }

    // This code is responsible for making the seats sold and disabled
    //           ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // Mark sold seats as sold (from localStorage)
    const soldSeats = JSON.parse(localStorage.getItem("soldSeats"));
    if (soldSeats !== null && soldSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (soldSeats.indexOf(index) > -1) {
                seat.classList.add("sold");
                seat.disabled = true; // Disable the sold seats
            }
        });
    }
  }

  // Seat click event
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
      e.target.classList.toggle("selected");
      updateSelectedCount();
    }
  });

  // Checkout button click event
  checkoutButton.addEventListener("click", () => {
    if (!checkoutButton.classList.contains("disabled")) {
      const modal = document.querySelector(".modal");
      modal.style.display = "block";
    }
  });

  // Modal option handlers
  document.querySelector(".snacks-option").addEventListener("click", () => {
    window.location.href = "snacks.html"; // Redirect to snacks page
    
  });

  document.querySelector(".payment-option").addEventListener("click", () => {
    window.location.href = "payment"; // Redirect to payment page
  });

  // Close modal
  document.querySelector(".close-modal").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
  });

  // Initialize UI
  populateUI();
  updateSelectedCount();

});



const loginNavBar = document.getElementById("login_li")
const paymentNavBar = document.getElementById("payment_li")
// const availableBtn = document.getElementById("make-available-btn")
const resetBtn = document.getElementById("reset-btn")

paymentNavBar.remove();

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
    const adminCheck = getCookie('admin_check');
    console.log(adminCheck);
    
    if (loginCheck) {
        loginNavBar.remove();
    }

    if (adminCheck == '0') {
      // availableBtn.remove();
      resetBtn.remove();
    }



    function makeAllSeatsAvailable() {
      // Get all the seats on the page
      const seats = document.querySelectorAll(".row .seat");
  
      // Loop through all the seats and reset them
      seats.forEach((seat) => {
          seat.classList.remove("sold"); // Remove the "sold" class
          seat.classList.remove("selected"); // Remove the "selected" class
          seat.disabled = false; // Enable the seat (allow it to be clicked again)
      });
  
      // Optionally, you can clear the "soldSeats" data from localStorage if needed
      localStorage.removeItem("soldSeats");
  
      // Reset any other session data or tracking variables as needed
  }
  