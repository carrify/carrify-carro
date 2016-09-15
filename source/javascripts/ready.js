$(function() {
  var locator = Carro.DI.get("locator");
  var recommender = Carro.DI.get("recommender");
  var renderer = Carro.DI.get("renderer");
  var cache = Carro.DI.get("cache");

  var coords = Carro.DI.get("locator").getLocation();

  function getInfo(clientId) {
    recommender.getRecommendations(clientId, coords[0], coords[1], function (recommendations) {
      Carro.Renderer.Cache.store('home', recommendations);
    });
  }

  Carro.Renderer.Cache.loadClientId(function(id) {
    var clientId = id;

    setInterval(function() {
      getInfo(clientId);
    }, 3000);

    getInfo(clientId);
  });
});
