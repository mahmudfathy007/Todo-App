
# TodoApp

TodoApp is a simple mobile application built with React Native that allows users to manage their daily tasks or to-do lists. It provides user registration and login functionality, as well as the ability to create, read, update, and delete tasks. The app uses Expo for the mobile development environment, Express.js for the backend API, Prisma.js as the database ORM, and MongoDB as the database.

## Technologies Used

- **Mobile Development:**
  - React Native
  - Expo

- **Backend:**
  - Express.js (API)
  - Prisma.js (Database ORM)
  - MongoDB (Database)

## Features

- User registration and login functionality
- Create a new task with a title and description
- Read and display user's tasks
- Update task status (completed or active)
- Delete a task

## Setup Instructions

To set up and run the TodoApp, follow these steps:

### Backend (API)

1. Clone the repository:

   ```bash
   git clone https://github.com/mahmudfathy007/Todo-App.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd Todo-App/backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` directory and configure the following environment variables:

   ```plaintext
   DATABASE_URL=<Your MongoDB connection URL>
   JWT_SECRET=<Your JWT secret key>
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

### Frontend (Mobile)

1. Install Expo CLI globally:

   ```bash
   npm install -g expo-cli
   ```

2. Navigate to the frontend directory:

   ```bash
   cd Todo-App/frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `frontend` directory and configure the following environment variables:

   ```plaintext
   API_URL=http://localhost:3000  # Update this if your backend server is running on a different URL
   ```

5. Start the React Native app:

   ```bash
   npm start
   ```

   This will start the Metro bundler and provide you with options to run the app on an emulator or physical device.

6. Follow the Expo CLI instructions to run the app on your preferred platform.

## API Endpoints

The backend API provides the following endpoints:

- `POST /api/register` - Register a new user
- `POST /api/login` - Log in an existing user
- `GET /api/todos` - Retrieve all user todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update the status of a todo
- `DELETE /api/todos/:id` - Delete a todo

Please refer to the API documentation or the source code for more details on request and response formats.

## Contributing

Contributions to the TodoApp are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

The TodoApp is open-source and released under the [MIT License](LICENSE).

## Contact

If you have any questions or need assistance, you can reach out to the project owner:

- Name: Mahmud Fathy
- GitHub: [mahmudfathy007](https://github.com/mahmudfathy007)

Feel free to explore and use the TodoApp to manage your tasks efficiently!
