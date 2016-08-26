Carro.Recommender = Carro.Recommender || {};

Carro.Recommender.ApiRecommender = (function() {
  return {

    getRecommendations: function(organizationId, clientId, latitude, longitude, callback) {
      var key = "recommendations:"+organizationId+":"+clientId+":"+latitude+":"+longitude+":"+Carro.securityToken;
      var cached = localStorage.getItem(key);
      if (cached !== null) {
        return callback(cached);
      }
      $.ajax({
        url: Carro.baseUrl + "/recommendations/"+ organizationId,
        type: "get",
        data: {client_id: clientId, latitude: latitude, longitude: longitude, token: Carro.securityToken},
        success: function (data) {
          localStorage.setItem(key, data);
          callback(data.recommendations);
        }
      });
    }
  };

})();