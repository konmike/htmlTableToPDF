"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuantityInput = function () {
  function QuantityInput(self) {
    var _this = this;

    _classCallCheck(this, QuantityInput);

    this.input = self.querySelectorAll(".input")[0];

    this.substract = self.querySelectorAll(".sub")[0];

    this.add = self.querySelectorAll(".add")[0];

    this.substract.addEventListener("click", function (e) {
      _this.change_quantity(-1);
      e.preventDefault();
      var evt = new Event("change");
      _this.input.dispatchEvent(evt);
    });
    this.add.addEventListener("click", function (e) {
      _this.change_quantity(1);
      e.preventDefault();
      var evt = new Event("change");
      _this.input.dispatchEvent(evt);
    });
  }

  _createClass(QuantityInput, [{
    key: "change_quantity",
    value: function change_quantity(change) {
      var quantity = Number(this.input.value);
      if (isNaN(quantity)) quantity = 1;
      quantity += change;
      if (quantity === -1) quantity = 0;
      //quantity = Math.max(quantity, 1);
      this.input.value = quantity;
    }
  }]);

  return QuantityInput;
}();

exports.default = QuantityInput;