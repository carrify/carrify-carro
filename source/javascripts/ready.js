$(function() {
  setInterval(function() {
  var locator = Carro.DI.get("locator");
  var recommender = Carro.DI.get("recommender");

  var coords = Carro.DI.get("locator").getLocation();
  var clientId, userId = 1; // Hardcoded for now

  recommender.getRecommendations(clientId, userId, coords[0], coords[1], function (recommendations) {
    Carro.Renderer.printHomeAds(recommendations);
  });
}, 3000);
});
