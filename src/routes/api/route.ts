import express, { Router } from "express";
const routes: Router = express.Router();
const resizeImageController = require("../../controller/index");

routes.get("/images", resizeImageController.resizeImage);
export default routes;
