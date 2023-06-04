const Music = require("../models/music");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const getAllMusic = async (req, res, next) => {
  let musics;
  try {
    musics = await Music.find();
  } catch (err) {
    console.log(err);
  }
  if (!musics) {
    return res.status(404).json({ message: "no music found" });
  }
  return res.status(200).json({ musics });
};

const getMusic = async (req, res, next) => {
  const id = req.params.id;

  let music;

  try {
    music = await Music.findById(req.params.id).exec();
  } catch (err) {
    console.log(err);
  }
  if (!music) {
    return res.status(404).json({ message: "no music found" });
  }
  return res.status(200).json({ music });
};

const addMusic = async (req, res, next) => {
  const { title, artist, album, duration, genre } = req.body;
  const { path } = req.file;
  const result = await cloudinary.uploader.upload(path);
  let music;
  try {
    music = new Music({
      title,
      artist,
      album,
      duration,
      genre,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
    music = await music.save();
    fs.unlinkSync(path);
  } catch (err) {
    console.log(err);
  }
  if (!music) {
    return res.status(500).json({ message: "music can not be added" });
  }
  return res.status(201).json({ message: "music info sucessfully added" });
};

const updateMusic = async (req, res, next) => {
  const id = req.params.id;

  let music = await Music.findById(req.params.id).exec();

  await cloudinary.uploader.destroy(music.cloudinary_id);

  let result;

  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path);
  }

  try {
    music = await Music.findByIdAndUpdate(id, {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      duration: req.body.duration,
      genre: req.body.genre,
      image: result?.secure_url || music.image,
      cloudinary_id: result?.public_id || music.cloudinary_id,
    });
    music = await music.save();
    if(req.file) {
        fs.unlinkSync(req.file.path);
    }
  } catch (err) {
    console.log(err);
  }
  if (!music) {
    return res.status(404).json({ message: "unable to update by this id" });
  }
  return res.status(200).json({ message: "music info successfully updated" });
};

const deleteMusic = async (req, res, next) => {
  const id = req.params.id;

  let music = await Music.findById(req.params.id).exec();

  await cloudinary.uploader.destroy(music.cloudinary_id);

  try {
    music = await Music.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!music) {
    return res.status(404).json({ message: "unable to delete by this id" });
  }
  return res.status(200).json({ message: "music info successfully deleted" });
};

exports.getAllMusic = getAllMusic;
exports.getMusic = getMusic;
exports.addMusic = addMusic;
exports.updateMusic = updateMusic;
exports.deleteMusic = deleteMusic;
