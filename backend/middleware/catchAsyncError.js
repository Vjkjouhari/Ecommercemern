module.exports = theFunc => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};

// we making this function so that we can not right try catch in block of code
// so we define here and exported the module 

// in this promise will resolve the req, res, next if it fails then it will move to catch part.