import QuantityInput from "./modules/quantity.js";

(function () {
  let quantities = document.querySelectorAll(".number");

  if (quantities instanceof Node) quantities = [quantities];
  if (quantities instanceof NodeList) quantities = [].slice.call(quantities);
  if (quantities instanceof Array) {
    quantities.forEach((div) => (div.quantity = new QuantityInput(div)));
  }
})();
