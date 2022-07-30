import "dotenv/config";
import express, {
  Application,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import CreateHttpError from "http-errors";
import cors from "cors";
import helmet from "helmet";

import userRoute from "./services/users/user.route";
import employeeRoute from "./services/employees/employee.route";

const app: Application = express();
const VERSION: string = process.env.VERSION || "v1";

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoints
app.use(`/${VERSION}/users`, userRoute);
app.use(`/${VERSION}/employees`, employeeRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new CreateHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
};

app.use(errorHandler);

export default app;
