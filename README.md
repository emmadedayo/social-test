# Social Media Platform API

## Introduction

Welcome to the Social Media Platform API! This project is a scalable and robust backend API built using Express.js and TypeScript, designed to facilitate user interactions and data management for a social media platform.

## Features

- User registration and authentication
- Post creation with optional media attachments
- Following users and personalized feeds
- Likes and comments on posts
- Notifications for mentions, likes, and comments

## Technical Stack

- **Backend Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **Caching:** Redis
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone github.com:emmadedayo/social-test.git
   cd social-test
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Running the API

#### Development

To run the API in development mode with automatic restarts on file changes:

```sh
npm run dev
```

#### Production

To build and run the API in production mode:

```sh
npm run build
npm start
```

### Scripts

- `nodemon`: Runs the nodemon for development
- `prod`: Runs the production build
- `dev`: Runs the development server with nodemon
- `build`: Compiles TypeScript to JavaScript
- `lint`: Fixes linting errors
- `check-types`: Checks TypeScript types
- `check-format`: Checks code formatting with Prettier
- `check-lint`: Checks linting errors
- `format`: Formats code with Prettier
- `test`: Runs unit tests with Jest
- `test:watch`: Runs tests in watch mode
- `test:coverage`: Generates test coverage report
- `test-all`: Runs all checks and tests
- `start`: Starts the production server
- `postinstall`: Compiles TypeScript after installing dependencies

### API Documentation

The API endpoints, request/response formats, and authentication requirements are documented [here](https://documenter.getpostman.com/view/3080167/2sA3e1BVod).

### Contributing

Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on contributing to this project.

### License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

This README provides a clear overview of the project setup, dependencies, and instructions on how to run the API. Make sure to adjust the content to reflect your project's specific details and configuration.
# social-test
