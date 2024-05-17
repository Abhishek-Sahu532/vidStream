import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createASubscriber, deleteASubscriber} from '../controller/subscription.controller.js'

const router = Router();


router.route('/create-a-subscriber/:channel').post(verifyJWT, createASubscriber )

router.route('/delete-a-subscriber/:channel').delete(verifyJWT, deleteASubscriber )


export default router