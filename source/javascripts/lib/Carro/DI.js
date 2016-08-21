Carro.DI = (function() {
  var dependencies = {
    "locator": Carro.Locator.ArrayLocator,
    "recommender": Carro.Recommender.ArrayRecommender
  };

  return {
    get: function(dependency) {
      return dependencies[dependency];
    }
  };
})();