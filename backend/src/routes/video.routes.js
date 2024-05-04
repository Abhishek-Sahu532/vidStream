import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllVideos, publishAVideo } from "../controller/video.controller.js";


const router = Router();


router.route('/publish-a-video').post(verifyJWT, upload.fields([
    {
        name : 'videoFile',
        maxCount : 1
    },
    {
        name : "thumbnail",
        maxCount : 1
    }
]), publishAVideo )

router.route('/all-videos').get(getAllVideos)



export default router;