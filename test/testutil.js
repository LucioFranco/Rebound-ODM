exports.shouldThrowError = function (func) {
  var didThrow = false;

  try {
    func();
  }catch (err) {
    didThrow = true;
  }

  if (!didThrow) throw new Error('did not throw');
}

exports.delay = function (time) {
  return function (result) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(result);
      }, time);
    });
  };
};
