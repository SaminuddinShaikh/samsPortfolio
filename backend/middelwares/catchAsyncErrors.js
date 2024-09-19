// to promt the overlooked errors

const catchAsyncErrors = (theFunction) => (req, res, next) => {
  return Promise.resolve(theFunction(req, res, next)).catch(next);
};

module.exports = catchAsyncErrors;
