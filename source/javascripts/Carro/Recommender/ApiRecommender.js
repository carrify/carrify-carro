Carro.Recommender = Carro.Recommender || {};

Carro.Recommender.ApiRecommender = (function() {
  return {
    getRecommendations: function(organizationId, clientId, latitude, longitude, callback) {
      $.ajax({
        url: this._buildUrl(organizationId, clientId),
        type: "get",
        data: {coord_x: latitude, coord_y: longitude},
        success: function (data) { callback(data.recommendations); }
      });
    },
    _buildUrl: function(organizationId, clientId) {
      return Carro.baseUrl + "/recommendations/"+ organizationId +"/"+ clientId;
    }
  };
})();