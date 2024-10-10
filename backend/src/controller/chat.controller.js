import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { Request } from "../models/request.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { emitEvent } from "../utils/emitEvent.js";
import { ALERT, NEW_REQUEST, REFETCH_CHATS } from "../constants.js";

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

export const removeMembers = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;

  const { chat, userThatWillBeRemoved } = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "fullname"),
  ]);

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

  if (chat.members.length <= 3) {
    return new ApiError(400, "Group must have at least 3 members");
  }

  chat.members = chat.membrs.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved?.fullname} has been removed from the group`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Members removed successfully"));
});

export const leaveGroup = asyncHandler(async (req, res) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);

  if (!chat) {
    return new ApiError(404, "Chat not found");
  }

  if (!chat.groupChat) {
    new ApiError(400, "This is not a group chat");
  }
  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );

  if (chat.creator.toString() === req.user.toString()) {
    const newCreator = remainingMembers[0];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;
  const [user] = await Promise.all([
    User.findById(req.user, "fullname"),
    chat.save(),
  ]);

  emitEvent(
    req,
    alert,
    chat.members,
    `User ${user.fullname} has left the group`
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Members removed successfully"));
});

export const getChatDetails = asyncHandler(async (req, res) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "fullname avatar")
      .lean(); //it will make this variable as is classic javascript variable, not directly belongs to the database, no data will save into database - not effect the database

    if (!chat) {
      return new ApiError(404, "Chat not found");
    }

    chat.members = chat.members.map(({ _id, fullname, avatar }) => {
      _id, fullname, avatar;
    });

    return res.status(200).json(new ApiResponse(200, chat, "Success"));
  } else {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return new ApiError(404, "Chat not found");
    }
    return res.status(200).json(new ApiResponse(200, chat, "Success"));
  }
});

export const renameGroup = asyncHandler(async (req, res) => {
  const chatId = req.params.id;
  const { name } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return new ApiError(404, "Chat not found");
  }
  if (!chat.groupChat) {
    return new ApiError(400, "This is not a group chat");
  }

  //admin rights
  if (!chat.creator.toString() !== req.user.toString()) {
    return new ApiError(401, "You are not allowed to rename the group");
  }
  await chat.save();

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Group renamed successfully"));
});

export const deleteChat = asyncHandler(async (req, res) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return new ApiError(404, "Chat not found");
  }

  if (chat.groupChat && chat.creator.toString() !== req.user.toString()) {
    return new ApiError(403, "You are not allowed to delete the group");
  }

  if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
    return new ApiError(403, "You are not allowed to delete the chat");
  }
  chat.deleteOne();
  Message.deleteMany({ chat: chatId });
  //here we have to delete all messages

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Chat deleted successfully"));
});

export const getMessages = asyncHandler(async (req, res) => {
  const chatId = req.params.id;
  const { page = 1 } = req.query;

  const limit = 20;
  const skip = (page - 1) * limit;

  const [messages, totalMessageCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "fullname avatar")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessageCount / limit) || 0;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { messages: messages.reverse(), totalPages },
        "Fetch Chats successfully"
      )
    );
});

export const searchUser = asyncHandler(async (req, res) => {
  const { name = "" } = req.query;
  //finding all my chats
  const myChats = await Chat.find({ groupChat: false, members: req.user });
  //all users from my chats means friends or people I have chatted with
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  //extracting all users from my chats means friends or people I have chatted with
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    fullname: { $regex: name, $options: "i" },
  });

  //finding all users except me and my friends
  const users = allUsersExceptMeAndFriends.map(({ _id, fullname, avatar }) => {
    _id, fullname, avatar;
  });
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Fetch Chats successfully"));
});

export const sendFriendRequest = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const request = Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) {
    return new ApiError(400, "Request already sent");
  }

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json(new ApiResponse(200, {}, "Friend request sent"));
});

export const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "fullname")
    .populate("receiver", "fullname");

  if (!request) {
    return new ApiError(404, "Request not found");
  }

  if (request.receiver._id.toString() !== req.user.toString()) {
    return new ApiError("401", "You are not authorized to accept this request");
  }

  if (!accept) {
    await request.deleteOne();
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Friend Request Rejected"));
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { senderId: request.sender._id },
        "Friend Request Accepted"
      )
    );
});

export const getAllNotifications = asyncHandler(async (req, res) => {
  const request = await Request.find({ receiver: req.user }).populate(
    "sender",
    "fullname avatar"
  );

  const allRequest = request.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.fullname,
      avatar: avatar,
    },
  }));

  return res.status(200).json(new ApiResponse(200, allRequest, "Success"));
});

export const getAllMyFriends = asyncHandler(async (req, res) => {
  const chatId = req.query.chatId;

  const chats = Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "fullname avatar");

  const friends = (await chats).map((members) => {
    const otherUser = getOtherMembers(members, req.user);
    return {
      _id: otherUser._id,
      name: otherUser.fullname,
      avatar: otherUser.avatar,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);
    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    return res
      .status(200)
      .json(new ApiResponse(200, { friends: availableFriends }, "Success"));
  } else {
    return res.status(200).json(new ApiResponse(200, friends, "Success"));
  }
});
