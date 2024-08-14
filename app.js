const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

console.log(process.env.NODE_ENV, 'ENVIROMNENT');

app.use(express.json());

app.use((request, response, next) => {
  console.log('Hello  from the middleware,');
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
