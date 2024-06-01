# KryptoniteApp

## Introduction

KryptoniteApp is a RESTful API for managing user registration, authentication, and image uploads on planet Krypton. It employs a two-factor authentication (2FA) system for secure logins and allows users to upload images, which are stored in Base64 format and accessible publicly.

## Features

User registration with email confirmation
OTP-based 2FA login
Image uploads with API key authentication
Public access to uploaded images
Technology Stack
Node.js
Express.js
MongoDB
Redis
gmail smtp

## Prerequisites

Ensure you have the following tools and technologies set up on your local environment:

Node.js and npm
MongoDB
Redis
Gmail account
Installation

### Clone the repository:

git clone https://github.com/obaikoko/kryptonite.git
cd kryptonite

### Install dependencies:

### npm install

#### Set up environment variables:

Create a .env file in the root directory and add the following:

PORT = 5000

REDIS_PASSWORD = #####

REDIS_URI = #######

REDIS_PORT = ###

OTPEXPIRY = 300

GMAILEMAIL = ###########

GMAILPASSWORD = ########

MONGO_URI = ##########

### start server

node server.js

## API Documentation

## 1. Authentication

### Register User

Endpoint: POST /api/auth/register

Description: Registers a new Kryptonian user with their email address.

Request Body:

{
"email": "user@example.com"
}

Response:

{

    "message": "User registered successfully",

    "user":

     {

        "_id": "60d...12",
        "email": "user@example.com",
        "apiKey": "84f...4e"

    }

}

### Send OTP

Endpoint: POST /api/auth/send-otp

Description: Sends a six-digit OTP to the provided email address.

Request Body:

{
"email": "user@example.com"
}

Response:

{
"message": "OTP sent to email"
}

### Verify OTP

Endpoint: POST /api/auth/verify-otp

Description: Verifies the OTP and generates an API key for the user.

Request Body:

{
"email": "user@example.com",
"otp": "123456"
}

Response:

{
"message": "OTP verified",
"apiKey": "84f...4e"
}

## 2. File Upload

### Upload Image

Endpoint: POST /api/images/upload

Description: Uploads an image file for a user. Only image files in Base64 format are allowed. The API key must be provided in the headers.

Headers:

api-key: your-api-key

Request Body:

{
"file": "data:image/png;base64,...base64-encoded-string..."
}

Response:

{

    "message": "Image uploaded successfully",

    "image": {
        "_id": "60d...12",
        "owner": "60d...12",
        "base64": "base64-encoded-string...",
        "uploadedAt": "2023-06-01T12:00:00.000Z"
    }

}

## 3. Image Access

### Get All Images

Endpoint: GET /api/images

Description: Retrieves all images. No authentication is required.

Response:

[

    {
        "_id": "60d...12",
        "owner": "60d...12",
        "base64": "base64-encoded-string...",
        "uploadedAt": "2023-06-01T12:00:00.000Z"
    },

    ...

]

### Get Image by ID

Endpoint: GET /api/images/:id

Description: Retrieves a specific image by its ID. No authentication is required.

Response:

{
"\_id": "60d...12",
"owner": "60d...12",
"base64": "base64-encoded-string...",
"uploadedAt": "2023-06-01T12:00:00.000Z"
}

## Error Handling

Errors are returned with appropriate HTTP status codes and a message.

Example Error Response:

{
"message": "Invalid API key"
}

## Contributing

We welcome contributions to improve KryptoniteApp. Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

This README file provides a comprehensive overview of the KryptoniteApp, including setup instructions, API documentation, and project structure. Ensure to replace placeholder values like your-elasticemail-api-key with actual values before running the application.
