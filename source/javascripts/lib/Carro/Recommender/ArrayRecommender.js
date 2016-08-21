Carro.Recommender = Carro.Recommender || {};

/**
 * Finds recommended offers based on the current location.
 */
Carro.Recommender.ArrayRecommender = (function() {

  var recommendations = [
    [], // We may not receive any recommendations,
    [{  // Single recommendation
      rank: 1,
      point: {
        radio: 2,
        name: "Test",
        longitude: 45.925,
        location_id: 4,
        latitude: 42.9904,
        id: 1,
        data: "Hola bebes"
      }
    }],
    [{
      rank: 0.98,
      point: {
        radio: 2,
        name: "Test",
        longitude: 45.925,
        location_id: 4,
        latitude: 42.9904,
        id: 1,
        data: "Hola bebes"
      }
    },
    {
      rank: 1,
      point: {
      radio: 2,
      name: "Test",
      longitude: 45.925,
      location_id: 4,
      latitude: 42.9904,
      id: 1,
      data: "Hola bebes"
      }
    }]  // Multiple recommendations
  ];
  var current = -1;

  return {
    getRecommendations: function(organizationId, clientId, latitude, longitude) {
      current = (current + 1 < recommendations.length) ? current + 1 : 0;
      return recommendations[current];
    },
  };
})();