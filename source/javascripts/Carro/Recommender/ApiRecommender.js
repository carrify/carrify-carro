Carro.Recommender = Carro.Recommender || {};

Carro.Recommender.ApiRecommender = (function() {
  return {
    getRecommendations: function(organizationId, clientId, latitude, longitude, callback) {
      $.ajax({
        url: Carro.baseUrl + "/recommendations/"+ organizationId,
        type: "get",
        data: {client_id: clientId, latitude: latitude, longitude: longitude, token: Carro.securityToken},
        success: function (data) { callback(data.recommendations); }
      });
    }
  };

})();