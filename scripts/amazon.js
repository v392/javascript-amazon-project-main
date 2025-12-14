import {cart, saveCart} from '../data/cart.js';
import loadProducts from '../data/products.js';
import formatCurrency from './utils/money.js';
import {timeString} from './checkout_sub/orderSummary.js';
import handleSearchBar from './amazon_sub/search_bar.js';

const productsGrid = document.querySelector('.js_products_grid');
const cartQuantity = document.querySelector('.js_cart_quantity');

let totalQuantity = 0;
if (cart.length !== 0){
  cart.forEach(cartItem => {
    totalQuantity += cartItem.productQuantity;
  })
}

async function renderProductsGrid () {
  const products = await loadProducts();

  products.forEach((v, i) => {
    const product = v;
    const {id, image, name, rating, priceCents, keywords} = product;

    const productHTML = `
          <div class="product-container js_product_container"
          data-product-id="${product.id}">
            <div class="product-image-container">
              <img class="product-image"
                src="${image}">
            </div>

            <div class="product-name limit-text-to-2-lines js_product_name"
            data-product-id="${product.id}">
              ${name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="../images/ratings/rating-${rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${rating.count}
              </div>
            </div>

            <div class="product-price">
              $${formatCurrency(priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class="js_quantity_selector"
              data-product-id="${product.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js_add_to_cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`

    productsGrid.innerHTML += productHTML;
  })

  const addToCartButtons = document.querySelectorAll('.js_add_to_cart');
  addToCartButtons.forEach((v) => {
    const button = v;
    const id = button.dataset.productId;
    let matchingItem;

    button.addEventListener('click', () => {

      cart.forEach((v) => {  
        const cartItem = v;
        if (cartItem.productId === id){
          matchingItem = cartItem;
        }
      });

      const productIdToMatch = matchingItem? matchingItem.productId: id;
      const matchingQuantitySelector = Array.from(document.querySelectorAll('.js_quantity_selector')).find(selector => selector.dataset.productId === productIdToMatch);
      console.log(matchingQuantitySelector.value);

      if (!matchingItem){
        cart.push({
          productId: id,
          productQuantity: 1 * Number(matchingQuantitySelector.value),
          deliveryOptionId: 1,
          deliveryDate: timeString(dayjs().add(7, 'day'))
        })
      }else {
        matchingItem.productQuantity += Number(matchingQuantitySelector.value);
      }


      totalQuantity += Number(matchingQuantitySelector.value);

      cartQuantity.innerHTML = totalQuantity;
      
      saveCart();
      
    });
  });
};

renderProductsGrid();
handleSearchBar();