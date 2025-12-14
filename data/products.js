class Product {
  constructor (product) {
    this.id = product.id;
    this.image = product.image;
    this.name = product.name;
    this.rating = product.rating;
    this.priceCents = product.priceCents;
    this.keywords = product.keywords;
    this.type = '';
  };
};

class Clothing extends Product {
  constructor (product) {
    super(product);
    this.type = product.type;
  };
};

export default async function loadProducts () {
  try {
    const fetchProducts = await fetch('https://supersimplebackend.dev/products').then(response => response.json());
    fetchProducts.push({
      id: 'c63P-JBp3-bZ0A-b2Mf-vNvA',
      image: 'images/products/fleshlight.jpg',
      name: 'Fleshlight - Medium Dark Flesh',
      rating: {
        stars: 5,
        count: 67
      },
      priceCents: 8199,
      keywords: [
        'sextoy',
        'pleasure',
        'flesh'
      ]
    })
    const products = fetchProducts.map(v => v.type === 'clothing' ? new Clothing(v): new Product(v));

    return products;
  } catch (error) {
    console.log ('Unexpected Error');
  };
};
