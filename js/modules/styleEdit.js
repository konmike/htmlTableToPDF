"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var changeStyle = function changeStyle(elements, prop, val) {
  elements.forEach(function (el) {
    el.style[prop] = val;
  });
};

exports.default = {
  changeStyle: changeStyle
};