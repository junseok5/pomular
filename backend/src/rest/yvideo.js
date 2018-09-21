module.exports = function (app) {
  const Yvideo = require('../db/models/yvideo');

  // Youtube video 데이터 등록
  app.post('/yvideos', (req, res) => {
    const yvideo = new Yvideo({
      category: req.body.category,
      channelName: req.body.channelName,
      youtubeId: req.body.youtubeId,
      title: req.body.title,
      overayTime: req.body.overayTime
    });

    yvideo.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('ERROR');
        return
      }
      res.status(200).send('SUCCESS');
    })
  });

  // 유튜브데이터 전체 조회
  app.get('/yvideos/:length', (req, res) => {
    Yvideo.lookup(req.params.length, (err, results) => {
      if (err) {
        res.status(500).send('ERROR')
        console.error(err)
        return
      } else if (results.length === 0) {
        res.status(200).send('DATA_END');
      } else {
        res.status(200).send(results)
      }
    });
  });

  // 유튜브 데이터 카테고리별 조회
  app.get('/yvideos/:category/:length', (req, res) => {
    const payload = {
      category: req.params.category,
      length: Number(req.params.length)
    }
    Yvideo.findVideos(payload, (err, results) => {
      if (err) {
        res.status(500).send('ERROR')
        console.error(err)
        return
      } else if (results.length === 0) {
        res.status(200).send('DATA_END')
      } else {
        res.status(200).send(results);
      }
    });
  });
}
