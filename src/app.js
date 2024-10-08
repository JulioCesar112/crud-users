/*
  Essential module imports:
  - express: web framework
  - cors: handling cross-origin resource sharing (CORS) requests
  - config: configuration file
  - db: database connection
*/

const express = require("express")
const cors = require("cors")
const config = require("./config")
const db = require("./utils/database")

/*
  Router imports:
  - userRouter: routes for user management
  - authRouter: routes for user authentication
*/
const userRouter = require("./users/users.router")
const authRouter = require("./auth/auth.router")

const app = express()

// Middleware
app.use(cors())
app.use(express.json());

// Rutes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)

// Connection to the database
const initDatabase = async () => {
  try {
    await db.authenticate();
    console.log('Connection to the database has been established successfully.');
    await db.sync({ alter: true });
    console.log("DB Synced");
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

initDatabase()



app.listen(config.port, () => {
  console.log(`Server started at port ${config.port}`)
})