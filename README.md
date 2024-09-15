<div align="center">
  <img src="./public/banner.png" style="align:center">
</div>

# Fitnexp

## A fitness tracking and workout management web application

You are currently in the the repository for the backend source code of Fitnexp.

Fitnexp is a web-based fitness application designed to help users track their workouts, exercises, and performance over time. Users can create custom workout routines, monitor progress with detailed charts and statistics, and manage their exercise history. The app aims to provide a personalized and data-driven fitness experience, allowing users to improve their training with insightful feedback.

## Key Features:

-   **User Authentication**: Users can register and log in with their own credentials.
-   **Exercise Library**: Users can browse through a comprehensive list of more than 870 exercises stored in the system and view detailed descriptions and instructions for each exercise.
-   **Workout Creation**: Users can build and customize workout routines, including adding exercises, setting repetitions, weights, and rest times.
-   **Performance Monitoring**: Detailed graphs and tables help users track their progress for individual exercises and overall workout performance.

## Installation Instructions

Before proceeding with the installation, make sure you meet the following prerequisites:

-   Node.js and its default package manager, npm, are installed.
-   You have an operational MongoDB server, either locally or remotely.
-   Git is installed and properly configured to clone repositories.

This guide assumes that the mentioned prerequisites are already correctly configured.To install and configure the backend of this application, follow these steps:

### Clone the Repository

First, clone the application's repository from GitHub:

```
git clone https://github.com/Fitnexp/fitnexp-backend.git
cd fitnexp-backend
```

### Install dependencies

Install the necessary dependencies using npm:

```
npm install
```

### Configure the .env file

Create a .env file in the root of the project and copy the provided content:

```
MONGODB_URI=
MONGODB_URI_TEST=
PORT=8080

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRATION=7d
```

Where:

-   **MONGODB_URI:** MongoDB connection URI for development. Example: `mongodb://127.0.0.1:27017/fitnexp`
-   **MONGODB_URI_TEST:** MongoDB connection URI for testing. Example: `mongodb://127.0.0.1:27017/fitnexp-tests`
-   **PORT:** Port on which the application will listen. Example: `8080`
-   **ACCESS_TOKEN_SECRET:** Secret key for signing access tokens. Example: `9465F185614F32B59E824E8CDDFAC`
-   **ACCESS_TOKEN_EXPIRATION:** Access token expiration time.
-   **REFRESH_TOKEN_SECRET:** Secret key for signing refresh tokens. Example: `9S7V2FU5614F32B59E824E8CDDFAC`
-   **REFRESH_TOKEN_EXPIRATION:** Refresh token expiration time.

### Populate the database

Make sure the MongoDB database is running before executing the command to populate the database:

```
npm run populate
```

### Run the application

To start the application in development mode, use the following command:

```
npm run dev
```

This will start the server on the port specified in the `.env` file. If everything went well, the message `Server is running, docs are available at http://localhost:8080/api/docs` will appear on the console.

If you're interested, you can see a list of all the available scripts in the application by running the following command:

```
npm run
```

### Run tests

o run the tests, make sure the test database is correctly configured (i.e., `MONGODB_URI_TEST` in the `.env` file). Then, execute the following command:

```
npm run test
```
