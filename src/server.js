import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authorRoutes from "./Author/index.js";
import {
  forbiddenErrorHaandling,
  notFoundDebugging,
  serverSideError,
  smthWentWrong,
} from "./errorHandler.js";

const server = express();
const port = 3001;
const handleMiddlewares = (req, res, next) => {
  console.log("successfully requested on ", new Date());
  next();
};
server.use(handleMiddlewares);
server.use(cors());
server.use(express.json());
server.use("/author", authorRoutes);
server.use(notFoundDebugging);
server.use(smthWentWrong);
server.use(forbiddenErrorHaandling);
server.use(serverSideError);
console.log(listEndpoints(server));
server.listen(port, () => {
  console.log(port);
});
