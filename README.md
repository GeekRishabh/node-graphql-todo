<h1>Graphql Todo with Auth</h1>

**Features**

- Login
- Register
- CRUD a todo (Need login to CUD)

**What used**  
Back-end : Node.js, Express.js  
Data fetching : GraphQL, Mongoose  
Authentication : JWT

**Pre-work**

- MongoDB and Node.js must be installed in your computer.
- MongoDB must be run in your computer.

**How to run**

1. Clone or download project
2. Go to the project directory in command prompt
3. Install dependencies -> "npm install"
4. Run app -> "DEBUG=/:\* npm start"
5. Load "localhost:3001" in web browser

You can go to url : <a target="_blank" href="http://localhost:3001/graphql">localhost:3001/graphql</a> to test graphql api

**GraphQL queries and mutations**

#### Update here

**Web endpoint**

- /graphql  
   **- GraphQL Page - Test queries and mutations**

**Mongoose Schema**

- User - id(\_id) - password - email - name
- Todo - id(\_id) - user_id - title - completed - createdAt
