# Niramaya - Healthcare Management System

Welcome to **Niramaya**, a comprehensive Healthcare Management System designed to simplify patient-doctor interactions, manage appointments, maintain medical records, and provide an efficient experience for doctors, patients, and admins alike. This project contains both frontend and backend services built using modern web technologies.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

**Niramaya** is a web-based platform that offers:

- Patient and Doctor portals for managing health records, appointments, and communication.
- Admin dashboard for overseeing and representing data related to doctors and patients.
- Integration with third-party services like Google Maps API for hospital and pharmacy locators.
- Enhanced patient support with features like medicine reminders, chatbots, and more.

The project is built with a scalable architecture and complies with healthcare data protection standards.

## Features

### Landing Page
- Introduction to the system with easy navigation to sign-up or login.

### Sign-Up/Login
- Secure login for doctors and patients, with OTP verification for patients.

### Doctor Portal
- **Profile Management:** Edit and update doctor profile.
- **Appointment Management:** View and manage patient appointments.
- **Patient Profiles:** View current patient details and medical history.
- **Medical History Management:** Append notes to patient records.
- **Report Review:** Review and comment on patient reports.

### Patient Portal
- **Health Card:** View digital health card with patient details.
- **Profile Management:** Edit and manage patient profile.
- **Medical History:** Access past medical records and prescriptions.
- **Prescription QR Code:** QR code generation for medicine schedules.
- **Weekly Medicine Calendar:** View weekly medicine intake schedule.
- **Appointment Booking:** Search and book appointments with doctors.
- **Medicine Reminders:** Get email reminders for medicine intake.
- **Hospital & Pharmacy Locator:** Locate nearby hospitals and pharmacies via Google Maps API.
- **Chatbot:** AI-powered chatbot for assistance.

### Admin Dashboard
- **Data Representation:** Visual representation of data on doctors and patients with insights.

### Security
- OTP verification and data encryption for sensitive actions.

## Technology Stack

### Backend
- **Node.js** with **Express.js** for API development.
- **MongoDB** for database management.
- **JWT** for authentication and authorization.
- **Mongoose** for MongoDB object modeling.
- **Nodemailer** for sending OTPs via email.
- **Google Maps API** for hospital and pharmacy locators.

### Frontend
- **React.js** for building the user interface.
- **Axios** for API requests.
- **React Router** for page navigation.
- **Material-UI** and **CSS** for UI design.
- **FontAwesome** icons for enhancing the UI.
  
## Setup Instructions

### Prerequisites
- **Node.js** installed on your machine.
- **MongoDB** installed and running.
- **Git** for version control.

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/niramaya.git
   cd niramaya/backend
Install dependencies:

bash
Copy code
npm install
Create .env file:

Create a .env file in the root of the backend folder with the following variables:

plaintext
Copy code
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
EMAIL_SERVICE=<your-email-service>
EMAIL_USER=<your-email-address>
EMAIL_PASSWORD=<your-email-password>
Start the backend server:

bash
Copy code
npm run start
The server should now be running on http://localhost:5000.

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install frontend dependencies:

bash
Copy code
npm install
Create .env file:

Create a .env file in the root of the frontend folder with the following variable:

plaintext
Copy code
REACT_APP_BACKEND_URL=http://localhost:5000
Start the frontend development server:

bash
Copy code
npm run start
The frontend should now be running on http://localhost:3000.

API Endpoints
Auth Routes
POST /api/auth/signup: Sign up a new patient.
POST /api/auth/login: Log in a doctor or patient.
POST /api/auth/verify-otp: Verify OTP for patient login.
Doctor Routes
GET /api/doctors: Fetch all doctors.
GET /api/doctors/
: Fetch doctor by ID.
POST /api/doctors/update-profile: Update doctor profile.
GET /api/doctors/
/appointments: Get appointments for a specific doctor.
Patient Routes
GET /api/patients/
: Fetch patient profile by ID.
POST /api/patients/update-profile: Update patient profile.
GET /api/patients/
/appointments: Get appointments for a specific patient.
Appointment Routes
POST /api/appointments/book: Book an appointment with a doctor.
GET /api/appointments/active: Get all active appointments for a patient.
GET /api/appointments/completed: Get completed appointments for a patient.
Admin Routes
GET /api/admin/dashboard: Fetch data for admin dashboard.
Contributing
If you would like to contribute to this project:

Fork the repository.
Create a new branch for your feature or bugfix.
Submit a pull request for review.
License
This project is licensed under the MIT License. See the LICENSE file for details.
