import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createASubscriber,
  deleteASubscriber,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controller/subscription.controller.js";

const router = Router();

router
  .route("/create-a-subscriber/:channel")
  .post(verifyJWT, createASubscriber);

router
  .route("/delete-a-subscriber/:channel")
  .delete(verifyJWT, deleteASubscriber);

router.route("/:channelId").get(verifyJWT, getUserChannelSubscribers);

router.route('/subscribed-channels/:channelId').get(verifyJWT,getSubscribedChannels )

export default router;
