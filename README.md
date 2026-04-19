```markdown
# Aurélia Grand Hotel - Reservation System

A full-stack hotel reservation and management system featuring a responsive, elegant vanilla JavaScript frontend and a robust Node.js/Express backend. 

## 🌟 Features

* **User Authentication:** Secure sign-up and login functionality using `bcrypt` for password hashing and `jsonwebtoken` (JWT) for session management.
* **Room Browsing:** View various room types (Single, Double, Triple, Luxury, Deluxe) with associated pricing and amenities.
* **Reservation Management:** Authenticated guests can book rooms by selecting check-in and check-out dates.
* **Dashboard:** A personalized guest dashboard to view, modify, or cancel upcoming reservations, as well as update profile information.
* **Dynamic Cost Calculation:** Automatically calculates the total cost of a stay based on the room rate and duration of the booking.
* **Responsive Design:** A fully responsive UI that works seamlessly across desktop and mobile devices.

## 🛠️ Tech Stack

**Frontend:**
* HTML5 / CSS3 (Custom responsive styling, CSS variables)
* Vanilla JavaScript (Event-driven DOM manipulation, Fetch API)

**Backend:**
* Node.js & Express.js
* MySQL (Database)
* `bcrypt` (Password encryption)
* `jsonwebtoken` (API route protection)

## 📁 Project Structure

```text
├── Config/
│   └── db.js                 # Database connection setup
├── Controllers/
│   ├── guestController.js    # Handles user auth and profile logic
│   └── reservationController.js # Handles booking logic and cost calculations
├── Middleware/
│   └── AuthenticationMiddleware.js # Verifies JWT for protected routes
├── Models/
│   ├── guestModel.js         # Database queries for users
│   ├── reservationModel.js   # Database queries for reservations
│   └── roomModel.js          # Database queries for room availability/rates
├── Routes/
│   ├── guestRoutes.js        # API endpoints for guests
│   └── reservationRoutes.js  # API endpoints for reservations
├── Services/
│   └── calculateReservationCost.js # Business logic for pricing
├── index.html                # Main frontend application
├── app.js                    # Express server entry point
└── package.json              # Project dependencies
```

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ishaanparashar2025/hotel-reservation-system.git](https://github.com/ishaanparashar2025/hotel-reservation-system.git)
   cd hotel-reservation-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Configuration:**
   * Ensure you have a MySQL server running.
   * Check `Config/db.js` and update your database credentials (host, user, password, database name) as necessary. 
   * *Note: You will need to create the appropriate `guests`, `rooms`, and `reservations` tables in your SQL database to match the queries in the `Models/` folder.*

4. **Environment Variables:**
   If you move your JWT Secret or DB credentials to a `.env` file (recommended for production), create a `.env` file in the root directory and add them.

5. **Start the server:**
   ```bash
   node app.js
   ```
   The backend API will run on `http://localhost:5000` (or the port specified in `app.js`).

6. **Run the Frontend:**
   You can open `index.html` directly in your browser, or serve it using a simple live server extension (like VS Code Live Server). Make sure the `BASE_URL` in the `index.html` `<script>` tag points to your running backend (e.g., `http://localhost:5000`).

## 🔌 API Reference

### Guest Routes (`/api/guest`)
* `POST /` - Create a new guest account. *(Requires name, phn_no, email, password)*
* `POST /login` - Authenticate a user and return a JWT.
* `GET /` - Retrieve the logged-in guest's profile. *(Requires JWT)*
* `PUT /` - Update the guest's profile. *(Requires JWT)*
* `DELETE /` - Permanently delete the guest's account. *(Requires JWT)*

### Reservation Routes (`/api/reservations`)
* `GET /` - Get all reservations for the logged-in guest. *(Requires JWT)*
* `POST /` - Create a new reservation. *(Requires start_date, end_date, room_type)* *(Requires JWT)*
* `GET /:id` - Get details of a specific reservation. *(Requires JWT)*
* `PUT /:id` - Modify an existing reservation. *(Requires JWT)*
* `DELETE /:id` - Cancel a reservation. *(Requires JWT)*
* `GET /cost/:id` - Calculate and return the total cost of a specific reservation. *(Requires JWT)*

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
```
