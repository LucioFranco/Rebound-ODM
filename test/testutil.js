exports.shouldThrowError = function (func) {
  var didThrow = false;

  try {
    func();
  }catch (err) {
    didThrow = true;
  }

  if (!didThrow) throw new Error('did not throw');
}
