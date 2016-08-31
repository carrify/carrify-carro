Carro.DI = (function() {
  var dependencies = {
    "locator": Carro.Locator.ArrayLocator,
    //"recommender": Carro.Recommender.ArrayRecommender,
    "recommender": Carro.Recommender.ApiRecommender,
    "renderer": Carro.Renderer.Renderer,
    "cache": Carro.Renderer.Cache
  };

  return {
    get: function(dependency) {
      return dependencies[dependency];
    }
  };
})();
