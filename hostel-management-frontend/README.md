# Hostel Management System - Frontend

## Overview
The Hostel Management System is a web application designed to facilitate the management of hostel allocations for students. This frontend application allows students to apply for rooms, check availability, and track their application status, while providing a user-friendly interface for navigation and interaction.

## Features
- **User Registration and Login**: Students can create an account and log in securely.
- **Room Application**: Students can fill out an application form to apply for a room.
- **Room Availability**: Users can view which rooms are currently vacant.
- **Application Tracking**: Students can check the status of their room applications (Pending, Approved, Rejected).
- **Profile Management**: Users can update their personal information.

## Tech Stack
- **Frontend**: React, Axios, CSS
- **Backend**: Node.js, Express.js (not covered in this frontend project)
- **Database**: MongoDB (not covered in this frontend project)

## Project Structure
```
hostel-management-frontend
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── RoomCard.jsx
│   │   └── ApplicationForm.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   └── RoomStatus.jsx
│   ├── services
│   │   └── api.js
│   ├── App.jsx
│   ├── index.js
│   └── styles
│       └── global.css
├── package.json
├── .gitignore
└── README.md
```

## Getting Started
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd hostel-management-frontend
   ```

2. **Install Dependencies**: 
   ```
   npm install
   ```

3. **Run the Application**: 
   ```
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.