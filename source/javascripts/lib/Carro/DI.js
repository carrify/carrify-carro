Carro.DI = (function() {
  var dependencies = {
    "locator": Carro.Locator.ArrayLocator
  };

  return {
    get: function(dependency) {
      return dependencies[dependency];
    }
  };
})();