import loadProducts from "../../data/products.js";
import {cart, saveCart, loadCart} from "../../data/cart.js";
import formatCurrency from "../utils/money.js";
import renderPaymentSummary from "./paymentSummary.js";
import {orderTimeFormat} from "../../data/orders_data.js";
import {trackingTimeFormat} from "../tracking.js";

const now = dayjs();


export function timeString (time) {
  return time.format('dddd, MMMM D');
};


const orderSummary = document.querySelector('.order-summary')

export default async function renderOrderSummary () {
  const products = await loadProducts();

  orderSummary.innerHTML = '';
  let deliveryOption = 0;
  let deleteLink = 0;
  let containerId = 0;

  cart.forEach(v => {
    const cartItem = v;
    let matchingProduct;

    products.forEach(v => {
      const product = v;
      if (product.id === cartItem.productId){
        matchingProduct = product;
      };
    });

    const cartItemHTML = `
      <div class="cart-item-container js_cart_item_container"
      data-container-id="${containerId}">
        <div class="delivery-date js_delivery_date"
        data-product-id="${matchingProduct.id}">
          Delivery date: ${cartItem.deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.productQuantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js_delete_link"
              data-delete-link-id="${deleteLink}"
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOptionId===1? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${deliveryOption}"
                data-option="1"
                data-product-id="${cartItem.productId}">
              <div>
                <div class="delivery-option-date">
                  ${timeString(now.add(7, 'day'))}
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOptionId===2? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${deliveryOption}"
                data-option="2"
                data-product-id="${cartItem.productId}">
              <div>
                <div class="delivery-option-date">
                  ${timeString(now.add(3, 'day'))}
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOptionId===3? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${deliveryOption}"
                data-option="3"
                data-product-id="${cartItem.productId}">
              <div>
                <div class="delivery-option-date">
                  ${timeString(now.add(1, 'day'))}
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
      deliveryOption ++;
      deleteLink ++;
      containerId ++;
      orderSummary.innerHTML += cartItemHTML;

  });
  
  document.querySelectorAll('.delivery-option-input').forEach(v => {
    const deliveryOptionInput = v;
    const itemId = deliveryOptionInput.dataset.productId;
    const itemDeliveryOptionId = deliveryOptionInput.dataset.option;

    const deliveryDate = document.querySelector('.js_delivery_date');
    const deliveryDateProductId = deliveryDate.dataset.productId;
    let matchingDeliveryDateProductId;

    if (itemId === deliveryDateProductId) {
      matchingDeliveryDateProductId = itemId;
    };

    let matchingItem;
    cart.forEach (v => {
        const cartItem = v;

        if (cartItem.productId === itemId){
          matchingItem = cartItem;
        };
    })

    deliveryOptionInput.addEventListener('click', () => {     
        matchingItem.deliveryOptionId = Number(itemDeliveryOptionId);

        if (matchingItem.deliveryOptionId === 1) {
          matchingItem.deliveryDate = timeString(now.add(7, 'day'));
          matchingItem.orderDeliveryDate = orderTimeFormat(now.add(7, 'day'));
          matchingItem.trackingDeliveryDate = trackingTimeFormat(now.add (7, 'day'));
        } else if (matchingItem.deliveryOptionId === 2) {
          matchingItem.deliveryDate = timeString(now.add(3, 'day'));
          matchingItem.orderDeliveryDate = orderTimeFormat(now.add(3, 'day'));
          matchingItem.trackingDeliveryDate = trackingTimeFormat(now.add(3, day));
        } else if (matchingItem.deliveryOptionId) {
          matchingItem.deliveryDate = timeString(now.add(1, 'day'));
          matchingItem.orderDeliveryDate = orderTimeFormat(now.add(1, 'day'));
          matchingItem.trackingDeliveryDate = trackingTimeFormat(now.add(1, 'day'));
        };

        saveCart();
        renderOrderSummary();
        renderPaymentSummary();
    });

    
  })

  document.querySelectorAll ('.js_delete_link').forEach(v => {
    const deleteLink = v;

    let matchingItem;
    let matchingIndex = 0;

    cart.forEach((v,i) => {
      const cartItem = v;
      const cartIndex = i;
      if (cartItem.productId === deleteLink.dataset.productId){
        matchingItem = cartItem;
        matchingIndex = cartIndex;
      };
    });

    let matchingContainer;
    document.querySelectorAll('.js_cart_item_container').forEach(v => {
        const container = v;

        if (container.dataset.containerId === deleteLink.dataset.deleteLinkId){
          matchingContainer = container;
        };
    });

    deleteLink.addEventListener('click', () => {
      cart.splice(matchingIndex, 1);
      matchingContainer.remove();
      saveCart();
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
};