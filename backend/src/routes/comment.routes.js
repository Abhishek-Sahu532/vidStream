import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment } from "../controller/comment.controller.js";



const router = Router();

router.route('/create-a-comment/:videoId').post(verifyJWT, createComment)


export default router;