Carro.Recommender = Carro.Recommender || {};

Carro.Recommender.ApiRecommender = (function() {
  return {
    getRecommendations: function(clientId, latitude, longitude, callback) {
      $.ajax({
        url: Carro.baseUrl + "/client/recommend",
        type: "get",
        data: {
          client_id: clientId,
          latitude: latitude,
          longitude: longitude,
          token: Carro.securityToken
        },
        success: function (data) {
          callback(data.recommendations);
        }
      });
    },
    getAdsByTag: function(clientId, tag, callback) {
      $.ajax({
        url: Carro.baseUrl + "/tags/" + tag,
        type: "get",
        data: {
          client_id: clientId,
          latitude: 21.74493,
          longitude: 87.85105,
          token: Carro.securityToken
        },
        success: function (data) {
          callback(data.recommendations);
        }
      });
    }
  };
})();
