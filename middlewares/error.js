const { StatusCodes } = require("http-status-codes");
import { response } from "../utils";

export const errorMiddleware = (error, req, res) => {
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send(
    response(
      error.message,
      error.data,
      error.stack
    )
  );
};
