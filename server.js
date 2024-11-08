const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const usersRouter = require('./routes/users');
const showsRouter = require('./routes/shows');

app.use('/users', usersRouter);
app.use('/shows', showsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});