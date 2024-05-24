import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleVideoLikeDislike } from "../controller/like.controller.js";
;


const router = Router();

router.route('/add-a-likeDislike/:videoId').post(verifyJWT, toggleVideoLikeDislike)




export default router;