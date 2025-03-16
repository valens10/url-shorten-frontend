# URL Shortener Frontend

This is the frontend for the URL shortener web application, built using Angular 19 and Bootstrap 5. It provides a clean and user-friendly interface for shortening URLs, managing links, and tracking analytics.

## Features
- User Authentication (login & registration)
- Shorten long URLs instantly
- Manage and track your shortened URLs
- Responsive UI with Bootstrap 5
- API integration with the backend
- Docker support for easy deployment

## Tech Stack
- **Frontend Framework**: Angular 19
- **Styling**: Bootstrap 5
- **State Management**: Services & Observables
- **API Communication**: HTTPClient with bearer token
- **Deployment**: Docker

## Installation

### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI
- Docker (if using containerization)

### Steps to Run Locally
```sh
# Clone the repository
git clone https://github.com/valens10/url-shorten-frontend.git
cd url-shorten-frontend

# Install dependencies
npm install

# Run the Angular development server
ng serve --open
```
The app will be available at `http://localhost:4200/`.

## Environment Configuration
Create a `.env` file (or update `environment.ts`) with the following details:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```
## API Integration
The frontend communicates with the backend API for authentication, URL shortening, and analytics. Ensure the backend is running and update `apiUrl` in the environment file accordingly.

### Example API Endpoints Used:
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login and obtain JWT tokens
- **POST** `/shorten` - Shorten a URL
- **GET** `/urls` - Retrieve user-specific URLs
- **GET** `/logout` - Logout current user
- **GET** `/refresh_token` - Refresh token
- **GET** `/analytics/:shortUrl` - Get analytics for a shortened URL

## Deployment
This project can be deployed using any web server that supports Angular apps. For Docker-based deployment:
```sh
docker-compose up -- build -d
```
## Screenshots

![image](https://github.com/user-attachments/assets/aa40cf99-9acf-4248-bdca-b8d867c5c2ae)
![image](https://github.com/user-attachments/assets/3b514b46-c1cf-4370-a584-dff1dec66b67)
![image](https://github.com/user-attachments/assets/f4acaba6-9658-4c87-bc3b-dea9d6a80ed8)




### Author
Developed by **Valens** 🚀

