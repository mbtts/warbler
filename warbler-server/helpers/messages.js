var db = require("../models");

const createMessage = async function(req, res, next) {
  const newMessage = {
    text: req.body.text,
    userId: req.params.id
  };

  try {
    let message = await db.Message.create(newMessage);

    const author = await db.User.findById(req.params.id);
    author.messages.push(message.id);
    await author.save();

    message = await db.Message.findById(message._id).populate("userId", {
      username: true,
      profileImageUrl: true
    });

    return res.status(200).json(message);
  } catch (error) {
    next();
  }
};

const getMessages = async function(req, res, next) {
  try {
    const messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("userId", { username: true, profileImageUrl: true });
    return res.json(messages);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getMessages
};
