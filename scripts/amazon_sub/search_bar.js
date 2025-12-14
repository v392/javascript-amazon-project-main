import loadProducts from "../../data/products.js";

const search_bar = document.querySelector('.js_search_bar');
const productsGrid = document.querySelector('.js_products_grid');


export default async function handleSearchBar (){
  const products = await loadProducts();
  function normalize (str){
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  search_bar.addEventListener('keyup', eventInfo => {
    document.querySelectorAll('.js_product_container').forEach(v => {
      const container = v;
      const matchingProduct = products.find(product => product.id === container.dataset.productId);

      if (normalize(matchingProduct.name).includes(normalize(search_bar.value))){
        container.style.display = '';
      } else {
        container.style.display = 'none';
      }
    });
  });
};