import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { emitEvent } from "../utils/emitEvent.js";
import { ALERT, REFETCH_CHATS } from "../constants.js";

export const newGroupCreation = asyncHandler(async (req, res) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return new ApiError(400, "Group chat must have at least 3 members");
  }

  const allMembers = [...members, req.user];

  await Chat.create({
    name: name,
    members: allMembers,
    creator: req.user,
    groupChat: true,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json(new ApiResponse(200, {}, "Group Created"));
});

export const getMyChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "fullname avatar"
  );

  if (!chats) {
    new ApiError(400, "Error while fetching the chats");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, chats, "Chats fetched successfully"));
});

export const getMyGroups = asyncHandler(async (req, res) => {
  const groups = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "fullname avatar");

  if (!groups) {
    new ApiError(400, "Error while fetching the groups");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, groups, "Groups fetched successfully"));
});

export const addMembers = asyncHandler(async (req, res) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1) {
    new ApiError(404, "Please provide members");
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    new ApiError(404, "Chat not found");
  }

  if (!chat.groupChat) {
    new ApiError(400, "This is not a group chat");
  }
  //only creator can add an members
  if (chat.creator.toString() !== req.user.toString()) {
    new ApiError(403, "You are not allowed to add members");
  }

  const allNewMembersPromise = members.map((i) => User.findById(i, "fullname"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);



  chat.members.push(...uniqueMembers);

  if (chat.members.length > 50) {
    new ApiError(403, "Group members limit reached");
  }

  await chat.save();

  const allusersName = allNewMembers.map((i) => i.name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allusersName} has been added in the group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Members added successfully"));
});
