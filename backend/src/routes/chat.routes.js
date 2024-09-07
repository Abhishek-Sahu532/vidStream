import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  newGroupCreation,
} from "../controller/chat.controller.js";

const router = Router();

router.route("/create-a-group").post(verifyJWT, newGroupCreation);
router.route("/my-chats").get(verifyJWT, getMyChats);
router.route("/my-groups").get(verifyJWT, getMyGroups);
router.route("/add-members").put(verifyJWT, addMembers);

export default router;
