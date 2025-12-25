import express from "express";
import postRouter from "./routers/posts.js";
import postList from "./data/postList.js";

const app = express();
app.use(express.json());
const port = 3000;

app.use(express.static("public"));
app.use("/posts", postRouter);

app.listen(port, () => {
    console.log("Aperto l'host locale su porta " + port);
});

app.get("/", (req, res) => {
    res.send("Server del mio blog");
});

app.get("/bacheca", (req, res) => {
    res.json(postList);    
});
