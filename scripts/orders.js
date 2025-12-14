import loadProducts from "../data/products.js";
import {orders} from "../data/orders_data.js";
import formatCurrency from "./utils/money.js";
import {cart, saveCart} from "../data/cart.js";
import {timeString} from "../scripts/checkout_sub/orderSummary.js";
import {orderTimeFormat} from "../data/orders_data.js";

const ordersGrid = document.querySelector('.js_orders_grid');
const cartQuantity = document.querySelector('.js_cart_quantity');

async function renderOrdersGrid (){
  const products = await loadProducts();

  let totalQuantity = 0;
  
  if (cart.length) {
    cart.forEach(v => {
      const cartItem = v;
      totalQuantity += cartItem.productQuantity;
    })
  }
  cartQuantity.innerHTML = totalQuantity;

  ordersGrid.innerHTML = '';
  
  orders.forEach(v => {
    const order = v;
    

    const orderContainerHTML = `
    <div class="order-container">
          
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${order.orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.orderTotalCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.orderId}</div>
        </div>
      </div>

      <div class="order-details-grid js_order_details_grid"
      data-details-grid-id="${order.orderId}">

      </div>
    </div>
    `

    ordersGrid.innerHTML += orderContainerHTML;

    const orderDetailsGrids = document.querySelectorAll('.js_order_details_grid');

    order.orderItems.forEach(v => {
      const item = v;

      const matchingProduct = products.find(v => v.id === item.productId);

      const itemHTML = `
      <div class="product-image-container">
        <img src=${matchingProduct.image? matchingProduct.image: ''}>
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${item.deliveryDate}
        </div>
        <div class="product-quantity">
          Quantity: ${item.productQuantity}
        </div>
        <button class="buy-again-button button-primary js_buy_again_button"
        data-product-id="${matchingProduct.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?o=${order.orderId}&p=${matchingProduct.id}">
          <button class="track-package-button button-secondary js_track_package_button">
            Track package
          </button>
        </a>
      </div>
      `;


      orderDetailsGrids.forEach(v => {
        const grid = v;

        if (grid.dataset.detailsGridId === order.orderId){
          grid.innerHTML += itemHTML;
        };
      });
    });
  });
  
  
  document.querySelectorAll('.js_buy_again_button').forEach(v => {
    const buyAgainButton = v;
    buyAgainButton.addEventListener('click', () => {
      
        
      const matchingProduct = products.find(product => product.id === buyAgainButton.dataset.productId);
      const matchingCartItem = cart.find(cartItem => cartItem.productId === matchingProduct.id);

      if (matchingCartItem){
        matchingCartItem.productQuantity ++;
      } else {
          cart.push({
          productId: matchingProduct.id,
          productQuantity: 1,
          deliveryOptionId: 1,
          deliveryDate: timeString(dayjs().add(7, 'day')),
          orderDeliveryDate: orderTimeFormat(dayjs().add(7, 'day')) 
        });
      };
      renderOrdersGrid();
      saveCart();
    });
  });

};

renderOrdersGrid();