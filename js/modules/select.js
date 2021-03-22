"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("../../node_modules/select2/dist/js/select2.min.js");

require("../../node_modules/select2/dist/js/i18n/cs.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Select = function () {
  function Select(self) {
    var _this = this;

    _classCallCheck(this, Select);

    this.input = document.createElement("select");
    this.input.name = "names[]";
    this.input.classList.add("js-example-basic-multiple");
    this.input.multiple = "multiple";

    this.lastNames = this.getNames();

    // console.log(lastNames);
    this.lastNames.forEach(function (name) {
      _this.option = document.createElement("option");
      _this.option.value = name;
      _this.option.innerHTML = name;

      _this.input.appendChild(_this.option);
    });

    self.appendChild(this.input);
    var s = document.querySelectorAll(".select .js-example-basic-multiple")[0];
    $(".js-example-basic-multiple").select2({
      placeholder: "Začněte psát jména/vyberte ze seznamu...",
      width: "100%",
      language: "cs"
    });
    $("textarea").focus();
  }

  _createClass(Select, [{
    key: "getNames",
    value: function getNames() {
      var tableNames = document.querySelectorAll(".file tbody td:first-child");
      var lastNames = [];
      if (tableNames.length > 0) {
        tableNames.forEach(function (name) {
          lastNames.push(name.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
          lastNames.sort();
        });
        // console.log(lN);
      } else console.log("Zadne jmena tam nejsou, kde jsou? Nejsou...");
      return lastNames;
    }
  }]);

  return Select;
}();

exports.default = Select;