"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/api/route"));
const app = (0, express_1.default)();
const port = 3000;
app.use("/", express_1.default.static(__dirname + "/view"));
app.use("/images", express_1.default.static(__dirname + "/images/thumb"));
app.use("/api", route_1.default);
app.use("/api/images", route_1.default);
app.use("*", (req, res) => {
    res.status(404).send("Page not found");
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
