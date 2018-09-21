const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubtitleSchema = new Schema({
  youtubeId: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  t_subtitle: { type: Array, required: true },
  date: { type: Date, default: Date.now }
});

SubtitleSchema.static('lookup', function (payload, callback) {
  return this.findOne({
    youtubeId: payload.youtubeId,
    language: payload.language
  }, callback)
})

module.exports = mongoose.model('subtitles', SubtitleSchema);
