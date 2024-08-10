const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE;

console.log(DB, 'HERE');


mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB CONNECTION SUCCESSFUL');
  });

//SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
