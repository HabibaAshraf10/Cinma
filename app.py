from flask import Flask, session, flash, render_template, request, redirect, jsonify ,url_for, make_response

app = Flask(__name__)

# Secret key for session management (keep it secure in a real app)
app.secret_key = 'key'

# Sample user data (Temporary store in-memory for this example)
users_db = {
    "admin@gmail.com": {
        "full_name": "Admin User",
        "user_name": "admin",
        "password": "admin123",
        "email": "admin@gmail.com"
    }
}

# بيانات ثابتة للفيلم
movies_schedule = [
    {"id": 1, "title": "Red One", "time": "10:00 AM", "price": 50},
    {"id": 2, "title": "Kraven", "time": "12:00 PM", "price": 60},
    {"id": 3, "title": "Venom", "time": "02:00 PM", "price": 70},
    {"id": 4, "title": "Moana2", "time": "04:00 PM", "price": 150},
    {"id": 5, "title": "The Wild Robot", "time": "06:00 PM", "price": 80},
    {"id": 6, "title": "الهوى سلطان", "time": "08:00 PM", "price": 90},
    {"id": 7, "title": "ابو علي", "time": "10:00 PM", "price": 100},  # تم إضافة الفاصلة هنا
]


movies = {
    "comedy": [
        {"id": 1, "title": "Red One", "year": 2024, "image": "comedy1.png", 
        "description": "A fun and thrilling movie. It has a great cast and amazing effects. The plot is unpredictable, and the twists will keep you on the edge of your seat. Perfect for a weekend adventure with friends.", 
    "rating": 7.8, "show_time": "2h 10m", "actors": ["Chris Hemsworth", "Emma Roberts"]},
    ],
    "action": [
        {"id": 2, "title": "Kraven", "year": 2024, "image": "action1.png", 
"description": "An action-packed adventure. Explosions, high-speed chases, and intense moments. The protagonist faces moral dilemmas while battling the forces of evil. A gripping tale filled with suspense and adrenaline.", "rating": 8.2, "show_time": "1h 55m", "actors": ["Aaron Taylor-Johnson", "Russell Crowe"]},
        {"id": 3, "title": "Venom", "year": 2024, "image": "action2.png", 
        "description": "Superhero meets villain. A thrilling battle ensues between Venom and Spider-Man. The characters struggle with their own darker impulses while facing intense threats. The film explores themes of identity and heroism.", 
        "rating": 7.5, "show_time": "2h 5m", "actors": ["Tom Hardy", "Michelle Williams"]},
    ],
    "cartoon": [
        {"id": 4, "title": "Moana2", "year": 2024, "image": "cartoon1.png", 
        "description": "A cartoon filled with magic. An inspiring journey through enchanted islands. Moana continues her adventure, learning valuable life lessons and uncovering ancient secrets. The vibrant animation and heartwarming story will captivate audiences of all ages.", 
        "rating": 9.0, "show_time": "1h 45m", "actors": ["Auli'i Cravalho", "Dwayne Johnson"]},
        {"id": 5, "title": "The Wild Robot", "year": 2024, "image": "cartoon2.png", 
    "description": "An adventurous robot story about survival and friendship. A robot is stranded on a remote island and must learn to adapt and understand the world around it. The journey involves overcoming challenges and forming connections with nature.",  "rating": 8.5, "show_time": "1h 30m", "actors": ["Jon Hamm", "Jane Krakowski"]},
    ],
    "romance": [
        {"id": 6, "title": "الهوى سلطان", "year": 2024, "image": "romance1.png",  "description": "A romantic journey with heartwarming moments and a beautiful setting. Love blossoms in unexpected places, and the characters are tested by time and challenges. The film explores the complexity of relationships and the power of love.",  "rating": 8.3, "show_time": "2h 20m", "actors": ["Ahmed Dawod", "Menna Shalbi"]},
        {"id": 7, "title": "ابو علي", "year": 2005, "image": "romance2.png", 
        "description": "A timeless love story, filled with drama and romance. Two souls are drawn together by fate, navigating the complexities of life, love, and loss. The movie is a journey through the highs and lows of human emotion.", 
    "rating": 7.4, "show_time": "2h 10m", "actors": ["Karim Abdallaziz", "Mona Zaki"]},
    ],
}


seats = [
    {"row": 1, "seats": ["available", "available", "available", "sold", "sold", "available", "available", "available"]},
    {"row": 2, "seats": ["available", "available", "available", "sold", "sold", "available", "available", "available"]},
    {"row": 3, "seats": ["available", "available", "available", "available", "available", "available", "sold", "sold"]},
    {"row": 4, "seats": ["available", "available", "available", "available", "available", "available", "available", "available"]},
    {"row": 5, "seats": ["available", "available", "available", "sold", "sold", "available", "available", "available"]},
    {"row": 6, "seats": ["available", "available", "available", "available", "sold", "sold", "sold", "available"]},
]

# Root route that redirects to login
@app.route('/')
def index():
    return redirect(url_for('home'))

# Login & Signup 
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # email = request.form['email']
        # password = request.form['password']
        # or we can use .get like this ↓↓
        email = request.form.get('email')
        password = request.form.get('password')
        rememberMeCheck = request.form.get('rememberMe') # Check if the checkbox is checked or not.

        # Check if the email exists and password matches
        if email in users_db and users_db[email]['password'] == password:
            session['user'] = email  # Store the user email in the session # user is the dictionary key
            session['username'] = users_db[email]['user_name'] # Retrieve the user name from users_db and Store it in the session
            # return jsonify({"success": True, "email": email}), 200  # Send success response as JSON

            admin = None
            if(session['username'] == 'admin'):
                admin = '1'
            else:
                admin = '0'

            response = make_response(jsonify({"success": True, "email": email}))
            response.set_cookie('login_check', 'True', max_age=7*24*60*60, httponly=False) # I will use it to remove the li login in the nav bar if the user is not logged in. # Set `httponly=False` to allow JavaScript access
            response.set_cookie('admin_check', admin, max_age=7*24*60*60)
            # If "Remember Me" is checked, set a cookie
            if rememberMeCheck == '1':
                response.set_cookie('remember_email', email, max_age=7*24*60*60) # Put the user email in a cookie, and it will exist for 7 days 
                response.set_cookie('remember_me', users_db[email]['user_name'], max_age=7*24*60*60)  # Put the username in a cookie, and it will exist for 7 days 
                response.set_cookie('remember_me_check', 'True', max_age=14*24*60*60) # Persist checkbox state for 14 days (It will expires in 14 days)
                return response
            else:
                response.set_cookie('remember_me_check', '', expires=0) 
                return response
                            
        else:
            return jsonify({"success": False}), 401  # Send failure response as JSON
        
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        full_name = request.form['full_name']
        user_name = request.form['user_name']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        
        # Check if the email already exists
        if email in users_db:
            return jsonify(success=False, error="Email already exists."), 400
        
         # Check if the username already exists
        for user in users_db.values():
            if user['user_name'] == user_name:
                return jsonify(success=False, error="Username already exists."), 400

        # Check if passwords match
        if password != confirm_password:
            return jsonify(success=False, error="Passwords do not match."), 400     

        # Save user data
        users_db[email] = {
            'full_name': full_name,
            'user_name': user_name,
            'password': password,
            'email': email
        }
        flash("Account created successfully!", 'success')
        # return redirect(url_for('login'))
        return jsonify(success=True, message="Account created successfully!"), 200
    
    return render_template('signup.html')

@app.route('/logout')
def logout():
    response = make_response(redirect(url_for('home')))  # Initialize response in both branches
    if 'user' in session:
        # session.pop('user', None)  # Remove user from session, logging the user out
        # session.pop('username', None)
        session.clear() # Clear the session 
        response.set_cookie('remember_email', '', expires=0)
        response.set_cookie('remember_me', '', expires=0)
        response.set_cookie('remember_me_check', '', expires=0)
        response.set_cookie('login_check', '', expires=0)
        response.set_cookie('admin_check', '', expires=0)
        flash('You have been logged out.', 'success')
    else:
        flash('You are already logged out.', 'success')
    return response

# الصفحة الرئيسية
@app.route('/movies')
def home():
    # ⚠️⚠️ This commented code doesn't handle the remember me property when we close the web browser and open it again ⚠️⚠️
    #                                 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    # remember_me_value = request.cookies.get('remember_me') # Get the value(username) that is stored in the remember_me cookie 
    # remember_me_checked_value = request.cookies.get('remember_me_check') # Get the value(checked or not) that is stored in the remember_me_check cookie 

    # if remember_me_checked_value == 'True':
    #     username = None  # Initialize the variable with a default value
    #     if 'username' in session:  # Check if user is logged in
    #         if remember_me_value is not None:
    #             username = remember_me_value  # Get the logged-in user's name
    #         else: # If the cookie doesn't exist
    #             session.clear() # Clear the session if the cookie was expired
    #             response=make_response(render_template('movies.html', movies=movies, username=username))
    #             response.set_cookie('remember_me_check', '', expires=0)
    #     return render_template('movies.html', movies=movies, username=username)
    # else:
    #     username = None
    #     if 'username' in session:
    #         username = session['username']
    #     return render_template('movies.html', movies=movies, username=username)

    email = request.cookies.get('remember_email')
    remember_me_value = request.cookies.get('remember_me')  # Get the username stored in the remember_me cookie 
    remember_me_checked_value = request.cookies.get('remember_me_check')  # Get the checkbox state from the cookie

    username = None  # Initialize the username variable
    if remember_me_checked_value == 'True' and remember_me_value:
        # If the session doesn't exist or is expired, use the cookie to restore the user state
        if 'username' not in session:
            username = remember_me_value  # Set the username from the cookie
            session['user'] = email       # Restore the session of the email
            session['username'] = username  # Optionally restore session if using cookie
        else: 
            username = session['username']  # Otherwise, use the session value (normal logged-in user)

    elif remember_me_checked_value == 'True' and remember_me_value is None:
        session.clear() # Clear the session if the cookie has expired
        response = make_response(render_template('movies.html', movies=movies, username=username))
        response.set_cookie('remember_me_check', '', expires=0)  # Clear the remember_me_check cookie if the cookie of the user has expired
        response.set_cookie('login_check', '', expires=0)
        response.set_cookie('admin_check', '', expires=0)
        return response

    else: # If remeber me checkbox wasn't checked so there is no cookies
        if 'username' in session:
            username = session['username'] # Use the session value for a logged-in user
        else:
            response = make_response(render_template('movies.html', movies=movies, username=username))
            response.set_cookie('login_check', '', expires=0)
            return response

    # Return the template with the appropriate username
    return render_template('movies.html', movies=movies, username=username)

# صفحة الدفع المحددة
@app.route('/payment')
def payment():
    remember_me_value = request.cookies.get('remember_me') # Get the value(username) that is stored in the remember_me cookie 
    remember_me_checked_value = request.cookies.get('remember_me_check') # Get the value(checked or not) that is stored in the remember_me_check cookie 

    if remember_me_checked_value == 'True':
        if 'user' not in session:  # Check session
            flash('Please log in to access this page.', 'error')
            return redirect(url_for('home'))
        else: # If the user in session
            if remember_me_value is None:
                flash('Please log in to access this page.', 'error')
                return redirect(url_for('home'))
        return render_template('payment.html', movies=movies_schedule)
    else:
        if 'user' not in session:  # Check session
            flash('Please log in to access this page.', 'error')
            return redirect(url_for('home'))
        return render_template('payment.html', movies=movies_schedule)

@app.route('/booking')
def booking():
    remember_me_value = request.cookies.get('remember_me') # Get the value(username) that is stored in the remember_me cookie 
    remember_me_checked_value = request.cookies.get('remember_me_check') # Get the value(checked or not) that is stored in the remember_me_check cookie 

    if remember_me_checked_value == 'True':
        if 'user' not in session:  # Check session
            flash('Please log in to access this page.', 'error')
            return redirect(url_for('home'))
        else:
            if remember_me_value is None:
                flash('Please log in to access this page.', 'error')
                return redirect(url_for('home'))
        return render_template('booking.html', movies=movies_schedule, seats=seats)
    else:
        if 'user' not in session:  # Check session
            flash('Please log in to access this page.', 'error')
            return redirect(url_for('home'))
        return render_template('booking.html', movies=movies_schedule, seats=seats)

@app.route('/book_seats', methods=['POST'])
def book_seats():
    data = request.json
    selected_seats = data.get('selected_seats')
   
    # Here you can update the seat status in the database or memory

    return jsonify({
        "selected_seats": selected_seats
    })

# @app.route('/movies')  # المسار الذي يعرض صفحة Movie Genres
# def movies_page():
#     return render_template('movies.html')

@app.route('/api/movies/<genre>')
def api_movies_by_genre(genre):
    import copy
    genre_movies = copy.deepcopy(movies.get(genre, []))

    for movie in genre_movies:
        movie["image"] = url_for('static', filename=movie["image"])  # تأكد من استخدام url_for بشكل صحيح
    return jsonify(genre_movies)


@app.route('/description/<int:id>', methods=['GET'])
def movie_description(id):
    # Iterate over the movie categories to find the movie with the given id
    for category, movies_list in movies.items():
        for movie in movies_list:
            if movie['id'] == id:
                return render_template('Descriaption.html', movie=movie)
    

@app.route("/snacks.html")
def snacks():
    return render_template("snacks.html")

@app.route("/confirm.html")
def confirm():
    return render_template("confirm.html")



if __name__ == '__main__':
    app.run(debug=True)



# about cookies
#-----------------
# @app.route('/set_cookie')
# def set_cookie():
#     username = session.get('username', None)
#     response = make_response(render_template('home.html'))
#     response.set_cookie('username', username)  # Store session value in a cookie (The first argument is for the key, and the second for the value.)
#     return response

# @app.route('/get_cookie')
# def get_cookie():
#     #cookie_value = request.cookies['username']
#     cookie_value = request.cookies.get("username")
#     return cookie_value

# @app.route('/delete_cookie')
# def delete_cookie():
#     response = make_response("Cookie has been deleted!")
#     response.set_cookie("username", "", expires=0)
#     return response