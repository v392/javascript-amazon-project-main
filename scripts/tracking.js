import loadProducts from "../data/products.js";
import {orders} from "../data/orders_data.js";
import {cart} from "../data/cart.js";

export function trackingTimeFormat (time){
  return time.format('dddd, MMMM DD')
};

const orderTracking = document.querySelector('.js_order_tracking');
const cartQuantity = document.querySelector('.js_cart_quantity');

const params = new URLSearchParams(location.search);

const pageOrderId = params.get('o');
const pageProductId = params.get('p');






async function renderOrderTracking (){
  const products = await loadProducts();
  const matchingOrder = orders.find(order => order.orderId === pageOrderId);

  let matchingOrderItem;
  if (matchingOrder){
    matchingOrderItem = matchingOrder.orderItems.find(orderItem => orderItem.productId === pageProductId);
  };

  let matchingProduct;
  if (matchingOrderItem){
    matchingProduct = products.find(product => product.id === matchingOrderItem.productId);
  };
  

  let orderTrackingHTML;
  if (matchingProduct){
    orderTrackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${matchingOrderItem.trackingDeliveryDate}
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingOrderItem.productQuantity}
      </div>

      <img class="product-image" src=${matchingProduct.image}>

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    `
  }
  

  let totalCartQuantity = 0;
  cart.forEach(cartItem => {
    totalCartQuantity += cartItem.productQuantity;
  });

  if (totalCartQuantity){
    cartQuantity.innerHTML = totalCartQuantity;
  } else {
    cartQuantity.innerHTML = 0;
  }
  
  if (orderTrackingHTML){
    orderTracking.innerHTML = orderTrackingHTML;
  };
};

document.addEventListener('DOMContentLoaded', () => {
  renderOrderTracking();
});