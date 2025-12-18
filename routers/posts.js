import express from "express";
import postsController from "../controllers/postsController.js";

const router = express.Router();

//INDEX
router.get("/", postsController.index);

//SHOW
router.get("/:id", postsController.show);

//STORE
router.post("/", postsController.store);

//UPDATE
router.put("/:id", postsController.update);

//MODIFY
router.patch("/:id", postsController.modify);

//DESTROY
router.delete("/:id", postsController.destroy);

export default router;