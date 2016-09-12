Carro.Renderer = Carro.Renderer || {};

Carro.Renderer.Cache = (function() {
  var set = {
    'client_id': null,
    'ref': {

    },
    'cache': {

    },
    'callbacks': {

    }
  };

  var Executer = function(callback, index) {
    function execute(data) {
      callback(index !== null ? data[index % data.length] : data);
    }

    return {
      'execute': execute
    };
  };

  function store(key, data) {
    set.cache[key] = data;

    if (set.callbacks[key]) {
      var callbacks = set.callbacks[key];
      var length = callbacks.length;

      for (var i = 0; i < length; i++) {
        var executer = callbacks[i];
        executer.execute(data);
      }

      delete set.callbacks[key];
    }
  }

  function get(key, index, callback) {
    var cache = set.cache;

    if (!cache || !cache[key]) {
      if (!set.callbacks[key]) {
        set.callbacks[key] = [];
      }

      set.callbacks[key].push(Executer(callback, index));

      return [];
    }

    return cache[key];
  }

  function getAll(key, callback) {
    return get(key, null, callback);
  }

  function getByIndex(key, index, callback) {
    var all = get(key, index, callback);

    return all[index % all.length];
  }

  function getAdsByTag(tag) {
    var clientId = set.client_id;

    Carro.Recommender.ApiRecommender.getAdsByTag(clientId, tag, function (ads) {
      store(tag, ads);
    });
  }

  function loadCategories(categories) {
    for (var category in categories) {
      getAdsByTag(category);
    }
  }

  function loadClientId(callback) {
    $.ajax({
      url: Carro.baseUrl + "/client/new_client_id",
      type: "post",
      data: {
        token: Carro.securityToken
      },
      success: function (data) {
        var id = data.id
        set.client_id = id;

        Carro.Renderer.Renderer.init();

        callback(id);
      }
    });
  }

  function getClientId() {
    return set.client_id;
  }

  return {
    'store': store,
    'getAll': getAll,
    'getByIndex': getByIndex,
    'loadCategories': loadCategories,
    'loadClientId': loadClientId,
    'getClientId': getClientId
  };
})();
