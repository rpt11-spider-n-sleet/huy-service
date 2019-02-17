const Description = require('./index.js').Description;
const Comment = require('./index.js').Comment;
const User = require('./index.js').User;
const moongoose = require('mongoose');

const saveDescription = async function(videoId, description, categories, cb) {
    const instOfDescription = new Description({
        _id: new moongoose.Types.ObjectId(),
        video_id: videoId,
        description: description,
        categories: categories,
    });
    await instOfDescription.save().then((data)=>{
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

const saveUser = async function(userName, userThumbnail, cb) {
    const instOfUser = new User({
        _id: new moongoose.Types.ObjectId(),
        username: userName,
        user_thumbnail: userThumbnail
    });
    await instOfUser.save().then((data)=>{
        cb(data);
    }).catch((err)=>{
        console.log(err);
    })
}

async function saveComment(videoId, userName, comment, date, cb) {
    const instOfComment = new Comment({
        _id: new moongoose.Types.ObjectId(),
        video_id : videoId,
        user_id: await User.findOne({
            username: userName
        })._id,
        comment: comment,
        date: date
    });
    await instOfComment.save().then((data)=>{
        cb(data);
    }).catch(err => console.log(err))
}

module.exports = {
    saveDescription,
    saveUser,
    saveComment
}

