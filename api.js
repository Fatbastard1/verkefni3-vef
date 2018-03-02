const express = require('express');

const {
  create,
  readAll,
  readOne,
  update,
  del,
} = require('./notes');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/* todo útfæra api */
// const {rows} = "";

router.get('/', async (req, res) => {
  const rows = await readAll();
  // res.render('index', { rows });
  res.json(rows);
  // console.log(rows);
});

router.post('/', async (req, res) => {
  const rows = await readAll();
  // console.log(req.body);
  const { title = '', text = '', datetime = '' } = req.body;

  if (title.length === 0 || text.length === 0) {
    return res.status(400).json({
      field: 'title',
      error: 'Title must be a non-empty string', // laga betur
    });
  }


  const nextId = await rows.map(i => i.id).reduce((a, b) => (a > b ? a : b + 1, 1));

  const item = {
    id: nextId, title, text, datetime,
  };
  create(item);

  return res.status(201).json(item);
});


router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const note = await readOne(id);
  if (note === undefined || note === null) {
    return res.status(400).json({
      error: 'not found',
    });
  }
  return res.status(201).json(note);
});


router.put('/:id', async (req, res) => {
  const { title = '' } = req.body;
  const { text = '' } = req.body;
  const { datetime = '' } = req.body;
  const id = parseInt(req.params.id, 10);

  if (title.length === 0 || text.length === 0 || datetime.length === 0) {
    return res.status(400).json({
      field: 'title',
      error: 'Title must be a non-empty string', // laga betur
    });
  }

  const item = { title, text, datetime };
  const note = await update(id, item);
  return res.status(200).json(note);
});


router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (readOne(id)) {
    const ans = await del(id);
    return res.status(200).send(ans);
  }
  return res.send('note does not exist');
});

module.exports = router;
