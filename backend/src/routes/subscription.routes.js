import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createASubscriber} from '../controller/subscription.controller.js'

const router = Router();


router.route('/create-a-subscriber/:channel').post(verifyJWT, createASubscriber )


export default router