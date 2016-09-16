Carro.Renderer = Carro.Renderer || {};

Carro.Renderer.Renderer = (function() {
  var set = {
    'ref': {
      'template_container': document.getElementById('template_container')
    },
    'compiledTemplates': {},
    'runtime': {},
    'handlers': {
      '[data-link-list]': function() {
        var category = this.getAttribute('data-link-list');
        renderTemplate('list', {
          category: category
        });
      },
      '[data-link-home]': function() {
        renderTemplate('home');
      },
      '[data-link-detail]': function() {
        var category = this.getAttribute('data-link-detail');
        var id = this.getAttribute('data-link-id');
        var advert = Carro.Renderer.Cache.getAd(id);

        renderTemplate('detail', {
          category: category,
          advert: advert,
          data: advert.data ? JSON.parse(advert.data) : {}
        });
      },
      '[data-link-close]': function() {
        var templateFrom = this.getAttribute('data-template-from');
        var category = this.getAttribute('data-category');
        renderTemplate(templateFrom, {
          category: category
        });
      }
    },
    'helpers': {
      'getCategoryProperty': function(category, property) {
        category = set.categories[category] || {};
        var value = category[property] || "";

        return new Handlebars.SafeString(value);
      },
      'getAd': function(category, index, theClass) {
        var id = guid();

        var ad = Carro.Renderer.Cache.getByIndex(category, index, function (advert) {
          var container = document.getElementById(id);

          var data = getAdInfo(advert, 'small', category, theClass);

          container.className = "";

          container.parentNode.setAttribute("data-link-id", advert.id);
          container.innerHTML = !advert ? "" : data;

          manageLinks(set.runtime.currentTemplate);
        });

        if (!ad) {
          return "<div id='" + id + "' class='advert-loading'></div>";
        }

        return getAdInfo(ad, 'small', category, theClass);
      }
    },
    'categories': {
      'fruit': {
        icon: 'sb-bistro-apple',
        description: 'Fruta y verdura',
        id: '55'
      },
      'dairies': {
        icon: 'sb-bistro-cone-icecream',
        description: 'Lácteos',
        id: '51'
      },
      'bread': {
        icon: 'sb-bistro-pizza',
        description: 'Panadería',
        id: '54'
      },
      'meat': {
        icon: 'sb-bistro-steak',
        description: 'Carnicería',
        id: '53'
      },
      'fish': {
        icon: 'sb-bistro-fish',
        description: 'Pescadería',
        id: '52'
      },
      'drinks': {
        icon: 'sb-bistro-drinks',
        description: 'Bebidas'
      },
      'coffee': {
        icon: 'sb-bistro-coffee',
        description: 'Té y café'
      },
      'appliance': {
        icon: 'sb-bistro-blender',
        description: 'Electrodomésticos'
      }
    }
  };

  function getAdInfo(advert, size, category, theClass) {
    advert = advert || {};
    var data = advert.data ? JSON.parse(advert.data) : {};
    data = data && data.content ? data.content[size] : "";
    category = category === 'home' ? '' : category;

    return '<a href="#" class="' + theClass + '" data-link-detail="' + category + '" data-link-id="' + advert.id + '">' + data + '</a>';
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return 'id' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function compileTemplates() {
    var templates = document.querySelectorAll('[type="text/x-handlebars-template"]');
    var templatesLength = templates.length;

    for (var i = 0; i < templatesLength; i++) {
      var template = templates[i];
      var id = template.id;
      var source = template.innerHTML;

      set.compiledTemplates[id] = Handlebars.compile(source);
    }
  }

  function renderTemplate(templateName, data) {
    data = data || {};
    data.set = set;

    var fullTemplateName = templateName + '_template';
    var compiledTemplate = set.compiledTemplates[fullTemplateName];

    set.ref.template_container.innerHTML = compiledTemplate(data);
    manageLinks(set.runtime.currentTemplate);
    set.runtime.currentTemplate = templateName;
  }

  function home(data) {
    renderTemplate('home', data);
  }

  function isHome() {
    return document.querySelector('[data-is-home]') !== null;
  }

  function manageLinks(previousTemplate) {
    previousTemplate = previousTemplate || "";

    for (var handler in set.handlers) {
      var handlerFunction = set.handlers[handler];
      assignHandlers(handler, handlerFunction, previousTemplate);
    }
  }

  function assignHandlers(selector, handler, previousTemplate) {
    var links = document.querySelectorAll(selector);
    var linksLength = links.length;

    for (var i = 0; i < linksLength; i++) {
      var link = links[i];
      link.setAttribute('data-template-from', previousTemplate);
      link.onclick = handler;
    }
  }

  function registerHelpers() {
    for (var helper in set.helpers) {
      var helperFunction = set.helpers[helper];
      Handlebars.registerHelper(helper, helperFunction);
    }
  }

  function init() {
    registerHelpers();
    compileTemplates();
    home();

    Carro.Renderer.Cache.loadCategories(set.categories);
  }

  return {
    'home': home,
    'categories': set.categories,
    'init': init
  };
})();
