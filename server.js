const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const app = express();

app.engine('html', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyParser.json());

db.defaults({ plans: [] }).write();

app.get('/plans', (req, res) => {
  let plans = db.get('plans').value();
  console.log(plans);
  res.render('plans', { plans: plans, bar: [1, 2] });
});

app.get('/plans/new', (req, res) => {
  res.render('planner.html', { plan: JSON.stringify({}) });
});

app.get('/plans/:planName', (req, res) => {
  let plan = db.get('plans').find({ id: req.params.planName }).value();
  if (plan == null)
    return res.sendStatus(404);
  return res.render('planner', { plan: JSON.stringify(plan) });
});

app.delete('/plans/:planName', (req, res) => {
  let plan = db.get('plans').find({ id: req.params.planName }).value();
  if (plan == null)
    return res.sendStatus(404);
  db.get('plans').remove({ id: req.params.planName }).write();
  return res.sendStatus(200);
});

app.post('/plans', (req, res) => {
  let planQuery = db.get('plans').find({ id: req.body.name });
  if (planQuery.value() != null) {
    planQuery.assign(req.body)
      .write();
  } else {
    plan = req.body;
    plan.id = plan.name;
    db.get('plans').push(plan).write();
  }
  return res.sendStatus(200);
});

app.listen(9000, () => {
  console.log('App started');
});


