const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const PostModel = require("../models/post.model");
const cloudinary = require("cloudinary").v2;
const postRouter = express.Router();

cloudinary.config({
    cloud_name: 'dtbkacycl',
    api_key: '862145395919799',
    api_secret: 'wNt_AWbvTWJFN09GDlDVKvWmHZo'
});

postRouter.post("/create", auth, async (req, res) => {
    req.body.user_id = req.body.user.userID
    req.body.user_name = req.body.user.username
    const file = req.files.media;
    try {
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            if (result) {
                const newPost = new PostModel({ ...req.body, media: result.url });
                await newPost.save()
                res.status(201).json({ "data": newPost });
            }
        })
    } catch (error) {
        res.status(500).send({ "error": error });
    }
});

postRouter.get("/", auth, async (req, res) => {
    let { category, title } = req.query;
    category = category ? { category } : {}

    let query = {};

        if (title) {
            query.title = { $regex: new RegExp(title, 'i') }; 
        }
    try {
        const data = await PostModel.find(query)
            .populate("user_id")
            .exec();
        res.status(200).send({ "data": data })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "error": error })
    }
})

module.exports = postRouter