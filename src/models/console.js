// Console shim
(function () {
  const f = function () {};
  if (!console) {
    console = {
      log: f,
      info: f,
      warn: f,
      debug: f,
      error: f,
    };
  }
})();
