module.exports = function (app) {
  const Translate = require('@google-cloud/translate')
  const g_config = require('../../path/to/g_config.json')
  const translate = new Translate(g_config)
  const Subtitle = require('../db/models/subtitle')
  const decode = require('unescape')

  // 자막 업로드
  app.post('/subtitles', (req, res) => {
    const youtubeId = req.body.youtubeId
    const language = req.body.language
    const en_subtitle = req.body.en_subtitle

    if (youtubeId === undefined || youtubeId === '') res.status(500).send('ERROR')
    if(language === undefined || language === '') res.status(500).send('ERROR')
    if (en_subtitle === undefined || en_subtitle.length === 0) res.status(500).send('ERROR')

    subtitle_converter(en_subtitle, language, (err, t_subtitle) => {
      if (err) {
        console.error(err)
        res.status(500).send('ERROR')
        return
      }
      const subtitle = new Subtitle({
        youtubeId, language, t_subtitle
      });

      subtitle.save((err2) => {
        if (err2) {
          console.error(err2)
          res.status(500).send('ERROR')
          return
        }
        res.status(200).send('SUCCESS')
      })
    })
  })

  // 자막 조회
  app.get('/subtitles/:youtubeId/:language', (req, res) => {
    const youtubeId = req.params.youtubeId
    const language = req.params.language
    const payload = {
      youtubeId, language
    }
    if (youtubeId === undefined || youtubeId === '') return
    Subtitle.lookup(payload, (err, results) => {
      if (err) {
        console.error(err)
        res.status(500).send('ERROR')
        return
      } else if (results == null) {
        res.status(200).send('NOT_DATA')
        return
      }
      res.status(200).send(results)
    })
  })

  // 구글 Translate api를 이용한 영어 자막 변환
  function subtitle_converter (en_subtitle, target, callback) {
    let target_subtitle = []
    let i = 0

    const translator = () => {
      if (i === en_subtitle.length) {
        console.log(target_subtitle)
        callback(false, target_subtitle)
        return
      }
      let text = decode(en_subtitle[i].content)
      translate
        .translate(text, target)
        .then(results => {
          const translation = results[0]
          console.log(`Text: ${text}`);
          console.log(`Translation: ${translation}`);
          let subtitle = {
            start: en_subtitle[i].start,
            end: en_subtitle[i].end,
            content: translation
          }
          target_subtitle.push(subtitle)
          i++
          translator()
        })
        .catch(err => {
          console.error('Error:', err)
          callback(err)
        })
    }

    translator(en_subtitle[i].content)
  }
}
