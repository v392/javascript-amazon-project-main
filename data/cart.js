import {timeString} from "../scripts/checkout_sub/orderSummary.js";
import {orderTimeFormat} from "./orders_data.js";
import {trackingTimeFormat} from "../scripts/tracking.js";

export let cart = loadCart() || [];

export function saveCart () {
  localStorage.setItem('cart', JSON.stringify(cart));
};
export function loadCart () {
  if (JSON.parse(localStorage.getItem('cart'))){
    return JSON.parse(localStorage.getItem('cart'));
  };

};
