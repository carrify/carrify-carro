Carro.DI = (function() {
  var dependencies = {
    "locator": Carro.Locator.ArrayLocator,
    //"recommender": Carro.Recommender.ArrayRecommender,
    "recommender": Carro.Recommender.ApiRecommender
  };

  return {
    get: function(dependency) {
      return dependencies[dependency];
    }
  };
})();