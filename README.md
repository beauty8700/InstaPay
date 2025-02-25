# Money Transfer and Lending Application API

This project is an Express.js-based API that allows users to register, authenticate, and manage their accounts. Users can add and send money, add friends, share funds, and lend money securely.

## Features
- User registration and login
- JWT authentication for protected routes
- User profile management
- Account balance retrieval
- Secure deposits, transfers, and lending functionalities
- Adding friends for easy transactions

## Technologies Used
- **Node.js** and **Express.js** for server-side development
- **MongoDB** with Mongoose for database management
- **Zod** for request validation
- **bcryptjs** for password hashing
- **jsonwebtoken (JWT)** for authentication

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vampire20045/Instantpay.git
   ```
2. Navigate to the project directory:
   ```sh
   cd project-directory
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables (e.g., `Sec` for JWT secret) in a `.env` file.

## API Endpoints

### Authentication Routes

#### `POST /signUp`
Registers a new user.
##### Request Body:
```json
{
  "First_name": "John",
  "Last_name": "Doe",
  "Username": "john.doe@example.com",
  "password": "securepassword"
}
```
##### Response:
```json
{
  "message": "User created successfully",
  "token": "<JWT Token>"
}
```

#### `POST /login`
Authenticates a user.
##### Request Body:
```json
{
  "Username": "john.doe@example.com",
  "password": "securepassword"
}
```
##### Response:
```json
{
  "message": "User logged in successfully",
  "token": "<JWT Token>"
}
```

### User Management Routes

#### `POST /update` (Protected)
Updates user details.
##### Request Body:
```json
{
  "First_name": "Jane",
  "Last_name": "Doe",
  "password": "newpassword"
}
```
##### Response:
```json
{
  "message": "User updated successfully"
}
```

#### `GET /bulk` (Protected)
Retrieves a list of users filtered by name.
##### Query Parameter:
`filter=<name>`

##### Response:
```json
{
  "users": [
    {
      "username": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "_id": "<UserID>"
    }
  ]
}
```

### Account Management Routes

#### `GET /balance` (Protected)
Retrieves the current balance of the authenticated user.
##### Response:
```json
{
  "balance": 100
}
```

#### `POST /deposit` (Protected)
Deposits funds into the authenticated user's account.
##### Request Body:
```json
{
  "amount": 50
}
```
##### Response:
```json
{
  "message": "Amount deposited successfully"
}
```

#### `POST /transfer` (Protected)
Transfers funds between users.
##### Request Body:
```json
{
  "amount": 30,
  "to": "<RecipientUserID>"
}
```
##### Response:
```json
{
  "message": "Transfer successful"
}
```

### Friends and Lending Routes

#### `POST /addFriend` (Protected)
Adds a friend to the user's list.
##### Request Body:
```json
{
  "friendId": "<UserID>"
}
```
##### Response:
```json
{
  "message": "Friend added successfully"
}
```

#### `POST /shareMoney` (Protected)
Shares money with a friend.
##### Request Body:
```json
{
  "amount": 20,
  "to": "<FriendUserID>"
}
```
##### Response:
```json
{
  "message": "Money shared successfully"
}
```

#### `POST /lendMoney` (Protected)
Lends money to a friend.
##### Request Body:
```json
{
  "amount": 50,
  "to": "<FriendUserID>",
  "dueDate": "2025-03-01"
}
```
##### Response:
```json
{
  "message": "Money lent successfully"
}
```

## Security Measures
- **Password Hashing**: Uses bcrypt to securely store passwords.
- **JWT Authentication**: Protects sensitive routes using JSON Web Tokens.
- **Transaction Handling**: Uses MongoDB sessions to ensure atomic fund transfers.

## Running the Server
To start the server, run:
```sh
npm start
```

## License
This project is licensed under Apache License


