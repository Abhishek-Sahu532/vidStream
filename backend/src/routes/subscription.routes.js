import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";


const router = Router();


router.route('/create-a-subscriber').post(verifyJWT, )