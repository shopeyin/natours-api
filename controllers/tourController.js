const Tour = require('./../models/tourModel');

// exports.checkID = (request, response, next, val) => {
//   if (val > tours.length) {
//     return response
//       .status(400)
//       .json({ status: 'failed', message: 'Invalid Id' });
//   }

//   next();
// };

// exports.checkBody = (request, response, next) => {
//   if (!request.body.name || !request.body.price) {
//     return response
//       .status(400)
//       .json({ status: 'failed', message: 'Name or price missing' });
//   }

//   next();
// };

exports.getAllTours = async (request, response) => {
  try {
    const queryObj = {...request.query}
    const excludedFields = ['page', "sort", "limit", "fields"]
    excludedFields.forEach(el => delete queryObj[el])
    
    let queryStr = JSON.stringify(queryObj)

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    // console.log(JSON.parse(queryStr))

    const query =  Tour.find(JSON.parse(queryStr));


    const tours = await query
    response.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (request, response) => {
  try {
    const tour = await Tour.findById(request.params.id);

    response.status(200).json({ status: 'success', data: { tour } });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (request, response) => {
  try {
    const newTour = await Tour.create(request.body);

    response.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateTour = async (request, response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });

    response.status(200).json({ status: 'update successful', data: { tour } });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (request, response) => {
  try {
    await Tour.findByIdAndDelete(request.params.id);
    response.status(204).json({ status: 'deleted successfully', data: null });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  
};
