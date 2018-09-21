const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YvideoSchema = new Schema({
  category: { type: String, required: true },
  channelName: { type: String },
  youtubeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  overayTime: { type: String, required: true },
  lookup: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

YvideoSchema.static('getCount', function (callback) {
  return this.countDocuments().exec(callback)
});

YvideoSchema.static('lookup', function (length, callback) {
  return this.find().sort({date: -1}).skip(Number(length)).limit(20).exec(callback);
});

YvideoSchema.static('findVideos', function (payload, callback) {
  return this.find({'category': payload.category}, callback).sort({date: -1}).skip(payload.length).limit(20);
});

module.exports = mongoose.model('yvideos', YvideoSchema);
