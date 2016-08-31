$(function() {
  function getInfo() {
    var locator = Carro.DI.get("locator");
    var recommender = Carro.DI.get("recommender");
    var renderer = Carro.DI.get("renderer");
    var cache = Carro.DI.get("cache");

    var coords = Carro.DI.get("locator").getLocation();
    var clientId, userId = 1; // Hardcoded for now

    recommender.getRecommendations(clientId, userId, coords[0], coords[1], function (recommendations) {
      Carro.Renderer.Cache.store('home', recommendations);
    });
  }

  setInterval(getInfo, 3000);
  getInfo();
});
