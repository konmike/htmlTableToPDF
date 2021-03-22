"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quantity = require("./quantity.js");

var _quantity2 = _interopRequireDefault(_quantity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var genInput = function () {
  function genInput(self, val) {
    _classCallCheck(this, genInput);

    function Input() {
      this.input = document.createElement("input");
      this.input.value = 0;
      this.input.type = "number";
      this.input.name = "gI[]";
      this.input.pattern = "[0-9]+";
      this.input.classList.add("input");

      this.input.addEventListener("change", function () {
        var inputs = document.querySelectorAll(".generated .input");
        var rest = 0;
        inputs.forEach(function (input) {
          return rest += Number(input.value);
        });
        // console.log(rest);

        var pS = Number(document.querySelector("input[name=pocetStudentu]").value);
        // console.log(pS);
        // console.log(pS - rest);
        document.getElementById("rest").innerText = "Zbývá rozřadit " + (pS - rest) + " prací.";
      });

      return this.input;
    }

    function Label(text, className) {
      this.label = document.createElement("label");
      this.label.innerHTML = text;
      this.label.classList.add(className);
      return this.label;
    }

    function Button(classNames) {
      var _this = this;

      this.button = document.createElement("button");
      this.button.type = "button";
      classNames.forEach(function (className) {
        _this.button.classList.add(className);
      });
      return this.button;
    }

    function generateBlock() {
      this.wrapper = document.createElement("div");
      this.wrapper.classList.add("number");
      self.appendChild(this.wrapper);
      this.wrapper.appendChild(new Label("Počet prací", "label"));
      this.wrapper.appendChild(new Button(["btn", "sub"]));
      this.wrapper.appendChild(new Input());
      this.wrapper.appendChild(new Button(["btn", "add"]));
      return this.wrapper;
    }

    // this.label = new Label("Počet prací", "label");
    // this.subtract = new Button(["btn", "sub"]);
    // this.add = new Button(["btn", "add"]);
    // this.subtract.addEventListener("click", () => q.change_quantity(-1));
    // this.add.addEventListener("click", () => this.change_quantity(1));

    // this.wrapper = new Wrapper("number");

    if (this.getChilds() < val) {
      var s = val - this.getChilds();
      for (var i = 0; i < s; i++) {
        // this.addChild();
        this.wrapper = new generateBlock();
        new _quantity2.default(this.wrapper);
        // this.wrapper = new generateBlock();
        // new QuantityInput(this.wrapper);
        // console.log(this.getChilds());
      }
    } else if (this.getChilds() > val) {
      var _s = this.getChilds() - val;
      console.log(_s);
      for (var _i = 0; _i < _s; _i++) {
        this.removeChild();
        // console.log(this.getChilds());
      }
    }
  }

  /**
   * Return number of child element of generated wrapper
   * @return  {int}
   * */


  _createClass(genInput, [{
    key: "getChilds",
    value: function getChilds() {
      return document.getElementById("generated").childElementCount;
    }
  }, {
    key: "addChild",
    value: function addChild() {
      this.wrapper = new generateBlock();
      new _quantity2.default(this.wrapper);
    }
  }, {
    key: "removeChild",
    value: function removeChild() {
      var g = document.getElementById("generated");
      g.removeChild(g.lastElementChild);
    }
  }]);

  return genInput;
}();

exports.default = genInput;