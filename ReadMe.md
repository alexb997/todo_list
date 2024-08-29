# Task Management System

## Overview

This is a Task Management System designed to manage tasks with the integration of a calendar. The application uses MongoDB as the database and a Node.js backend with a React frontend. Users can create, view, update, and delete tasks, and filter tasks by date.

## Features

- **Task Management**: Create, update, delete, and list tasks.
- **Calendar Integration**: Visualize tasks based on their start and end dates using a calendar.
- **Date Filtering**: Filter tasks based on specific dates or date ranges (due dates and creation dates).
- **User Management**: Tasks are linked to users, and each user can see their own tasks.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/todo_list.git
   cd todo_list
   ```
Project Structure
    /todo-list-backend: Contains the Express backend and Mongoose models
    /todo-list-frontend: Contains the React frontend with components for managing tasks and displaying the calendar.

Usage
Access the Frontend

    Visit http://localhost:3000 to access the frontend.

API Endpoints

    GET /api/tasks/all: Fetch all tasks for the user.
    POST /api/tasks: Create a new task.
    PUT /api/tasks/update/ : Update a task by ID.
    DELETE /api/tasks/ : Delete a task by ID.
    GET /api/tasks/due: Fetch tasks due between two dates.
    GET /api/tasks/due-on: Fetch tasks due on a specific date.
    GET /api/tasks/created: Fetch tasks created between two dates.
    GET /api/tasks/created-on: Fetch tasks created on a specific date.
