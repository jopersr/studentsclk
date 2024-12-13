# SMS - Student Management System

**Overview**  
This application provides a complete web solution for managing students and classes. It allows you to create, edit, and delete both students and classes, and easily navigate through a responsive interface. The backend is built with NestJS, the frontend with React (using Vite), and MongoDB is used as the database. The application has been containerized to run smoothly on a Linux environment using Docker and Docker Compose.

**Key Features**

- **Student Management:** Create, edit, and delete students, each having fields like first name, last name, email, and custom numeric IDs.
- **Class Management:** Create and manage classes with a name and year. Assign multiple classes to a single student.
- **CRUD Operations:** Fully functional CRUD endpoints and UI.
- **Responsive UI:** Frontend built with React (Vite) and Material UI for a clean, modern interface.
- **Dockerized:** Backend, Frontend, and MongoDB each run in their own container.
- **Easy Setup:** Quickly spin up the entire stack with a single `docker-compose` command.

## Requirements

- **Operating System:** Linux (tested on Ubuntu)
- **Docker:** Ensure Docker is installed and running.
- **Docker Compose:** Ensure Docker Compose is installed.

If you need instructions on how to install Docker and Docker Compose, please refer to the official documentation:

- [Install Docker](https://docs.docker.com/engine/install/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

# Getting Started

## Quick set up

1. **Create a new folder for run the project**

```bash
  mkdir sms-project
```

2. **Add docker-compose.yml provided file**

```bash
  cp ~/docker-compose.yml sms-project
  cd sms-project
```

3. **Pull docker images**

```bash
  docker-compose pull
```

4. **Run the project**

```bash
  docker-compose up -d
```

5. **Visit the UI**
   Go the the browser to the follow url: localhost:8080

## Run the project without docker

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/jopersr/studentsclk.git
   cd studentsclk

   ```

2. **Set Up Environment Variables (Optional):**
   If you need to customize the connection to MongoDB or other parameters, adjust the .env files in the respective backend or frontend directories.

3. **Build and Run the Project with Docker Compose:**

   ```bash
   docker-compose up --build

   ```

   This command will:

- Build the backend image from backend/Dockerfile.
- Build the frontend image from frontend/Dockerfile.
- Pull the mongo:latest image for the database.
- Start all services: mongo, backend, and frontend.

Once completed, you will have:

- MongoDB running at localhost:27017
- Backend running at http://localhost:3000
- Frontend running at http://localhost:8080

4. ** Access the Application: Open your browser and go to: **

```bash
  http://localhost:8080
```

You should see the Student Management System UI.

## Managing Services

** Stop the service **

```bash
  docker-compose down
```

** Run in the detached mode **

```bash
  docker-compose up -d
```

## Conclusion

This README has guided you through setting up the entire Student Management System with Docker and Docker Compose on Linux. By following these steps, you can quickly deploy, test, and share the application with your team or stakeholders.
