import {timeString} from "../scripts/checkout_sub/orderSummary.js";
import {orderTimeFormat} from "./orders_data.js";
import {trackingTimeFormat} from "../scripts/tracking.js";

export let cart = loadCart() || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    productQuantity: 1,
    deliveryOptionId: 1,
    deliveryDate: timeString(dayjs().add(7, 'day')),
    orderDeliveryDate: orderTimeFormat(dayjs().add(7, 'day')) ,
    trackingDeliveryDate: trackingTimeFormat(dayjs().add(7, 'day'))
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    productQuantity: 2,
    deliveryOptionId: 2,
    deliveryDate: timeString(dayjs().add(3, 'day')),
    orderDeliveryDate: orderTimeFormat(dayjs().add(3, 'day')),
    trackingDeliveryDate: trackingTimeFormat(dayjs().add(3, 'day'))
  }
];

export function saveCart () {
  localStorage.setItem('cart', JSON.stringify(cart));
};
export function loadCart () {
  if (JSON.parse(localStorage.getItem('cart'))){
    return JSON.parse(localStorage.getItem('cart'));
  };
};