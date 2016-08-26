Carro.Renderer = (function() {
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
        renderTemplate('detail');
      },
      '[data-link-close]': function() {
        var templateFrom = this.getAttribute('data-template-from');
        renderTemplate(templateFrom);
      }
    },
    'helpers': {
      'getCategoryProperty': function(category, property) {
        category = set.categories[category] || {};
        var value = category[property] || "";

        return new Handlebars.SafeString(value);
      }
    },
    'categories': {
      'fruit': {
        icon: 'sb-bistro-apple',
        description: 'Fruta y verdura'
      },
      'dairies': {
        icon: 'sb-bistro-cone-icecream',
        description: 'Lácteos'
      },
      'bread': {
        icon: 'sb-bistro-pizza',
        description: 'Panadería'
      },
      'meat': {
        icon: 'sb-bistro-steak',
        description: 'Carnicería'
      },
      'fish': {
        icon: 'sb-bistro-fish',
        description: 'Pescadería'
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

  (function init() {
    registerHelpers();
    compileTemplates();
    home();
  })();

  return {
    'home': home
  };
})();
