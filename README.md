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
