# Movie Booking System

This project is a movie booking system built with Flask, which includes user authentication (login/signup), movie browsing, seat booking, and payment options. Users can select movies, book seats, and view detailed descriptions of movies. The system also implements a "Remember Me" feature to persist the user's login status.

---

## Features

### User Authentication
- Login and signup pages
- Sessions and cookies for user state management
- "Remember Me" functionality
- Logout functionality

### Movie Listings
- Movies categorized by genre: Comedy, Action, Cartoon, Romance
- Movie schedules with time and price
- Detailed movie descriptions including actors, ratings, and images

### Seat Booking
- Users can select available seats for a specific movie showtime
- Seat availability dynamically updated (sold seats are unavailable)

### Payment
- Secure payment page accessible only to logged-in users

### Persistent Data
- Session and cookies are used to persist user data (e.g., username and login status)

---

## Installation

To run this project locally, follow the steps below:

### Requirements
- Python 3.x
- Flask

### Steps
1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd movie-booking
    ```
2. Create and activate a virtual environment (optional but recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Run the Flask application:
    ```bash
    python app.py
    ```
5. Open your browser and go to `http://127.0.0.1:5000/` to start using the system.

---

## Directory Structure
```bash
/movie-booking
│
├── app.py                     # Main Flask application
├── templates/                 # HTML templates
│   ├── login.html             # Login page
│   ├── signup.html            # Signup page
│   ├── movies.html            # Home page displaying movies
│   ├── payment.html           # Payment page
│   ├── booking.html           # Booking page with available seats
│   ├── confirm.html           # Confirmation page
│   └── snacks.html            # Snacks selection page
├── static/                    # Static files (images, CSS, JS)
│   ├── action1.png            # Movie poster
│   ├── comedy1.png            # Movie poster
│   ├── romance1.png           # Movie poster
│   └── style.css              # CSS styles
├── requirements.txt           # Python dependencies
└── README.md                  # Project documentation (this file)

Endpoints
	1.	/login
	•	GET: Displays the login form.
	•	POST: Authenticates the user and creates a session.
	2.	/signup
	•	GET: Displays the signup form.
	•	POST: Registers a new user.
	3.	/logout
	•	Logs out the user and clears the session and cookies.
	4.	/movies
	•	Displays movies based on their genre.
	•	Uses the “Remember Me” functionality to restore user session using cookies.
	5.	/payment
	•	Displays the payment page where users can confirm their booking.
	•	Access is restricted to logged-in users.
	6.	/booking
	•	Displays available seats for a selected movie.
	•	Allows users to book seats for a movie showtime.
	7.	/api/movies/<genre>
	•	Returns a JSON response with a list of movies for a specific genre.
	8.	/description/<int:id>
	•	Displays the detailed description of a movie, based on its ID.
	9.	/book_seats
	•	POST: Books the selected seats and updates the seat status.
	10.	/snacks and /confirm
	•	Pages for selecting snacks and confirming the booking respectively.

Cookies and Sessions

The system uses both cookies and sessions for user authentication and state management:
	•	Session: Stores user login information temporarily, providing secure and private state across requests.
	•	Cookies: Used to remember the user’s email and username for future visits (via the “Remember Me” checkbox).

Cookies Used:
	•	login_check: Tracks if the user is logged in.
	•	remember_email: Stores the user’s email if they check the “Remember Me” option.
	•	remember_me: Stores the username for the “Remember Me” option.
	•	remember_me_check: Tracks the state of the “Remember Me” checkbox.

JavaScript

The snacks.html, booking.html, and payment.html pages include JavaScript to manage seat selection and persist selected seats in localStorage. Users can select seats, and their choices are saved even if the page is refreshed.

License

This project is open-source and available under the MIT License.

Acknowledgments
	•	Flask: For creating the web application framework.
	•	Jinja2: For rendering dynamic HTML pages.