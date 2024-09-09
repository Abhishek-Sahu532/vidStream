import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  newGroupCreation,
  removeMembers,
  leaveGroup,
  getChatDetails,
  renameGroup,
  getMessages,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
} from "../controller/chat.controller.js";

const router = Router();

router.route("/create-a-group").post(verifyJWT, newGroupCreation);
router.route("/my-chats").get(verifyJWT, getMyChats);
router.route("/my-groups").get(verifyJWT, getMyGroups);
router.route("/add-members").put(verifyJWT, addMembers);

router.route("/remove-member").delete(verifyJWT, removeMembers);

router.route("/leave/:id").delete(verifyJWT, leaveGroup);
router.route("/message/:id").get(verifyJWT, getMessages);

router.route("/:id").get(verifyJWT, getChatDetails).put(verifyJWT, renameGroup);

router.route('/searchUser').get(verifyJWT, searchUser)
router.route('/sendrequest').put(verifyJWT, sendFriendRequest)

router.route('/acceptrequest').put(verifyJWT, acceptFriendRequest)

export default router;
