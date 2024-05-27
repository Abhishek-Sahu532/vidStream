import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleVideoLikeDislike, getUsersLikedVideo } from "../controller/like.controller.js";
;


const router = Router();

router.route('/add-a-likeDislike/:videoId').post(verifyJWT, toggleVideoLikeDislike)

router.route('/liked-videos').get(verifyJWT, getUsersLikedVideo )




export default router;