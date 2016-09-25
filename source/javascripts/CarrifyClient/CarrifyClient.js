var  CarrifyClient = {
  baseUrl: "//carrify.tech/api/v1",
  securityToken: "e2769d6f-61ec-4da6-8bd0-fae1116f5d04", // I know this should not be public but...
  locationId: 4,
  categories: {
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
