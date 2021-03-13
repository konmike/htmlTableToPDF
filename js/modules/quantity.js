export default class QuantityInput {
  constructor(self) {
    this.input = self.querySelectorAll(".input")[0];

    this.subtract = self.querySelectorAll(".sub")[0];

    this.add = self.querySelectorAll(".add")[0];

    this.subtract.addEventListener("click", (e) => {
      this.change_quantity(-1);
      e.preventDefault();
    });
    this.add.addEventListener("click", (e) => {
      this.change_quantity(1);
      e.preventDefault();
    });
  }

  change_quantity(change) {
    let quantity = Number(this.input.value);
    if (isNaN(quantity)) quantity = 1;
    quantity += change;
    if (quantity === -1) quantity = 0;
    //quantity = Math.max(quantity, 1);
    this.input.value = quantity;
  }
}
