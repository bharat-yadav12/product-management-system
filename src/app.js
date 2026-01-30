import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js"
import helmet from "helmet";
const app = express()


app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js";

app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRoutes);



app.use((err, req, res, next) => {
 console.log(" Error middleware is called");

  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    error = new ApiError(
      statusCode,
      message,
      err.errors || []
    );
  }
  console.error({
    name: err.name,
    message: err.message,
    statusCode: error.statusCode,
    errors: error.errors,
    stack: err.stack
  });

  return res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack
    })
  });
});

export { app }