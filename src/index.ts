import express, { Request, Response } from "express";
import routes from "./routes/api/route";

const app = express();
const port = 3000;

app.use("/", express.static(__dirname + "/view"));
app.use("/images", express.static(__dirname + "/images/thumb"));
app.use("/api", routes);
app.use("/api/images", routes);
app.use("*", (req: Request, res: Response): void => {
	res.status(404).send("Page not found");
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});

export default app;
