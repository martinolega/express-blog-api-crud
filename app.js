import express from "express";
import postRouter from "./routers/posts.js";
import postList from "./data/postList.js";
import routeNotFound from "./middlewares/routeNotFound.js";
import error from "./middlewares/error.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Server del mio blog");
});

app.get("/bacheca", (req, res) => {
    res.json(postList);    
});

app.use("/posts", postRouter);

app.use(routeNotFound);

app.use(error);

app.listen(port, () => {
    console.log("Aperto l'host locale su porta " + port);
});