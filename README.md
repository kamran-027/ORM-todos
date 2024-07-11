# Todo App with Prisma as ORM

Creating a backend server for todos using Prisma as ORM & postgres as DB

## Running the appliation

Create js file form the src and run it using node

```bash
tsc -b
node dist/index.js
```

## Server Operations

Follwing are server operations

1.  User Signup
    The required parameters for endpoint is username & password where both are string

```javascript
localhost:3000/signup  //User Signup Endpoint
const req.body = { username :  string, password: string}
```

2. Add Todos
   To add any todo for a specific user, Title & user Id are mandatory to be passed in body with description as optional

   ```javascript
   localhost:3000/addTodo  //Add Todo Endpoint
   const req.body = {Title: string, Description?: string, userId: number}
   ```

3. Get Todos
   For retrieving todos based on user Id pass it in query params

   ```javascript
   localhost: 3000 / getTodos / 1; //Fethcing todos Endpoint
   ```
