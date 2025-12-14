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

export let orders = loadOrders()? loadOrders(): [];

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
