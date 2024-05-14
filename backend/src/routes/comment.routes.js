import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment, getVideoComments } from "../controller/comment.controller.js";



const router = Router();

router.route('/create-a-comment/:videoId').post(verifyJWT, createComment)
router.route('/getcomments/:videoId').get(getVideoComments)

export default router;