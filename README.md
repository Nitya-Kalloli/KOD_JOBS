# KOD JOBS - Job Portal

## Overview
KOD JOBS is a modern job portal that connects job seekers with top companies and career opportunities. It allows users to browse job listings, apply for positions, and manage their accounts seamlessly.

## Features
- User authentication (Login & Signup)
- Browse available job listings
- Apply for jobs directly from the platform
- Responsive UI built with modern technologies
- Uses **Muse API** for fetching job listings

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** JSON file (users.json for user management)
- **API Integration:** Muse API

## Folder Structure
```
KOD_JOBS/
│── node_modules/
│── public/
│   ├── index.html
│   ├── woman-laptop.png
│── src/
│   ├── components/
│   ├── services/
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── users.json
│── .env
│── .gitignore
│── package-lock.json
│── package.json
│── postcss.config.js
│── README.md
│── server.js
│── tailwind.config.js
```

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone  https://github.com/Nitya-Kalloli/KOD_JOBS
   cd KOD_JOBS
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env`:
   ```sh
   MUSE_API_KEY=your_api_key
   ```
4. Start the server:
   ```sh
   node server.js
   ```
5. Start the frontend:
   ```sh
   npm start
   ```


## Application Screenshots

### Home Page
![Home Page](/public/images/home.png)

### Login Interface
![Login Page](/public/images/login.png)

### Sign Up Form
![Signup Page](/public/images/signup.png)

### Dashboard View
![Dashboard](/public/images/dashboard.png)

### Dashboard Styling and Features

#### Job Level Color Coding
- Entry Level: Light Blue (#E3F2FD)
- Mid Level: Sage Green (#E8F5E9)
- Senior Level: Soft Purple (#F3E5F5)

#### Filter Implementation
The dashboard includes a comprehensive filtering system:


## API Usage
This project fetches job listings from the **Muse API**. Ensure you have a valid API key and update the `.env` file accordingly.

## Contact
For any queries or contributions, feel free to reach out at: **nityakalloli.dev@gmail.com**

## Contributing
Feel free to contribute by submitting issues or pull requests. 

## License
This project is licensed under the MIT License.



