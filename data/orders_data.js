import generateKey from "../scripts/utils/key_generator.js";
import {now} from "../scripts/checkout_sub/paymentSummary.js";

export function orderTimeFormat (time){
  return time.format('MMMM DD');
}

export class Order {
  orderId = generateKey(20, 5);
  orderTime = orderTimeFormat(now);
  orderTotalCents;
  orderItems;
  constructor (totalCents, items){
    this.orderTotalCents = totalCents;
    this.orderItems = items;
  };
}

export let orders = loadOrders()? loadOrders(): [
  {
    orderId: 'mOWF-Q8kd-N5wv-Zvbm-YIT4',
    orderTime: 'August 12',
    orderTotalCents: 3506,
    orderItems: [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        productQuantity: 1,
        deliveryDate: 'August 15',
        trackingDeliveryDate: 'Monday, August 15'
      },
      {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        productQuantity: 2,
        deliveryDate: 'August 19',
        trackingDeliveryDate: 'Friday, August 19'
      }
    ]
  },

  {
    orderId: 'Ol3W-yp8W-wtx7-l26D-eOcK',
    orderTime: 'June 10',
    orderTotalCents: 4190,
    orderItems: [
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        productQuantity: 2,
        deliveryDate: 'June 17',
        trackingDeliveryDate: 'Friday, June 17'
      }
    ]
  }
];

export function saveOrders (){
  localStorage.setItem('orders', JSON.stringify(orders));
}

function loadOrders (){
  if (JSON.parse(localStorage.getItem('orders'))){
    return JSON.parse(localStorage.getItem('orders'))
  } else {
    return null;
  }
};