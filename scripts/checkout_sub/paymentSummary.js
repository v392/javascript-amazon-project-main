import loadProducts from '../../data/products.js';
import {cart, saveCart} from '../../data/cart.js';
import formatCurrency from '../utils/money.js';
import {Order, orders, saveOrders} from '../../data/orders_data.js';
import renderOrderSummary from './orderSummary.js';
import {orderTimeFormat} from '../../data/orders_data.js';
import { trackingTimeFormat } from '../tracking.js';

const paymentSummaryDiv = document.querySelector('.js_payment_summary');
const returnLinkWithItemsCount = document.querySelector('.js_return_to_home_items_link');

const tax = 10/100;

export const now = dayjs();

export default async function renderPaymentSummary () {
  const products = await loadProducts();
  let items = 0;
  let itemsCents = 0;
  let shippingFeeCents = 0;

  cart.forEach(v => {
    const cartItem = v;

    items += cartItem.productQuantity;

    let matchingProduct;
    products.forEach(v => {
      const product = v;

      if (product.id === cartItem.productId){
        matchingProduct = product;
      };
    });

    itemsCents += (matchingProduct.priceCents * cartItem.productQuantity);
    
    if (cartItem.deliveryOptionId === 2){
      shippingFeeCents += 499;
    } else if (cartItem.deliveryOptionId === 3){
      shippingFeeCents += 999;
    };

  });

  const totalBeforeTaxCents = itemsCents + shippingFeeCents;
  const taxCents = totalBeforeTaxCents * tax;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${items}):</div>
    <div class="payment-summary-money">$${formatCurrency(itemsCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(shippingFeeCents)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
  </div>

  <button class="place-order-button button-primary js_place_order_button">
    Place your order
  </button>
`
  returnLinkWithItemsCount.innerHTML = `${items} items`

  paymentSummaryDiv.innerHTML = paymentSummaryHTML;



  const placeOrderButton = document.querySelector('.js_place_order_button');
  placeOrderButton.addEventListener('click', () => {

    try {
      if (cart.length !== 0){
        const orderItems = cart.map(v => {
          return {
            productId: v.productId,
            productQuantity: v.productQuantity,
            deliveryDate: v.orderDeliveryDate? v.orderDeliveryDate: orderTimeFormat(dayjs().add(7, 'day')),
            trackingDeliveryDate: v.trackingDeliveryDate? v.trackingDeliveryDate: trackingTimeFormat(dayjs().add(7, 'day'))
          };
        });


      orders.unshift(
        new Order (totalCents, orderItems)
      );

      cart.splice(0, cart.length);
      saveCart();
      saveOrders();
      renderOrderSummary();
      renderPaymentSummary();

      location.href='orders.html';
      } else {
        throw new Error('No items in cart');
      };
    } catch (err){
      console.log(err);
    }
  
    
});
};
