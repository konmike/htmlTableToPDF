"use strict";

var _quantity = require("./modules/quantity.js");

var _quantity2 = _interopRequireDefault(_quantity);

var _select = require("./modules/select.js");

var _select2 = _interopRequireDefault(_select);

var _upload = require("./modules/upload.js");

var _upload2 = _interopRequireDefault(_upload);

var _styleEdit = require("./modules/styleEdit.js");

var _styleEdit2 = _interopRequireDefault(_styleEdit);

var _genInput = require("./modules/genInput.js");

var _genInput2 = _interopRequireDefault(_genInput);

require("../../node_modules/viewerjs/dist/viewer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var quantities = document.querySelectorAll(".number");

  if (quantities instanceof Node) quantities = [quantities];
  if (quantities instanceof NodeList) quantities = [].slice.call(quantities);
  if (quantities instanceof Array) {
    quantities.forEach(function (div) {
      return div.quantity = new _quantity2.default(div);
    });
  }

  window.supportDrag = function () {
    var div = document.createElement("div");
    return ("draggable" in div || "ondragstart" in div && "ondrop" in div) && "FormData" in window && "FileReader" in window;
  }();

  var input = document.getElementById("js-file-input");
  var upIn = document.querySelectorAll(".upload .input")[0];

  if (!supportDrag) {
    document.querySelectorAll(".has-drag")[0].classList.remove("has-drag");
  }

  input.addEventListener("change", function (e) {
    document.getElementById("js-file-name").innerHTML = this.files[0].name;
    upIn.classList.remove("file-input--active");
  }, false);

  if (supportDrag) {
    input.addEventListener("dragenter", function (e) {
      upIn.classList.add("file-input--active");
    });

    input.addEventListener("dragleave", function (e) {
      upIn.classList.remove("file-input--active");
    });
  }
})();

try {
  var input = document.getElementById("js-file-input");
  input.addEventListener("change", function () {
    // let numbers = document.querySelectorAll(".upload + .number");
    _upload2.default.getContent(input.files);

    var current = document.querySelector(".upload");
    var nextSibling = current.nextElementSibling;

    while (nextSibling) {
      if (nextSibling.classList.contains("btn") || !nextSibling.classList.contains("generated") && !nextSibling.classList.contains("help--generated") && !nextSibling.classList.contains("select") && !nextSibling.classList.contains("help--jmena-studentu") && !nextSibling.nextElementSibling.classList.contains("help--generated")) {
        nextSibling.style.display = "flex";
      }
      nextSibling = nextSibling.nextElementSibling;
    }
    document.getElementById("images").style.display = "none";
    document.querySelector(".help--upload").style.display = "none";

    document.getElementById("task").checked = true;
    document.getElementById("include-all-students").checked = true;
  });
} catch (e) {
  alert(e);
}

document.getElementById("include-all-students").addEventListener("change", function () {
  var selectWrapper = document.getElementById("students-name");
  var selectHelp = document.querySelector(".help--jmena-studentu");
  if (this.checked === false) {
    _styleEdit2.default.changeStyle([selectWrapper, selectHelp], "display", "flex");
    // selectWrapper.style.display = "block";
    // selectHelp.style.display = "flex";
    new _select2.default(document.querySelectorAll(".select")[0]);
  } else {
    var select = document.getElementsByClassName("js-example-basic-multiple")[0];
    var span = document.getElementsByClassName("select2")[0];
    // console.log(select);
    selectWrapper.removeChild(select);
    selectWrapper.removeChild(span);
    // selectWrapper.style.display = "none";
    // selectHelp.style.display = "none";
    _styleEdit2.default.changeStyle([selectWrapper, selectHelp], "display", "none");
  }
});

document.querySelectorAll(".radio")[0].addEventListener("change", function () {
  var rN = document.querySelectorAll(".radio + .number")[0];
  var helpGen = document.querySelector(".help--generated");
  var value = document.querySelectorAll(".radio + .number .input")[0].value;
  var genIn = document.getElementById("generated");

  if (document.querySelectorAll(".radio .input")[2].checked) {
    var pS = Number(document.querySelector("input[name=pocetStudentu]").value);
    document.getElementById("rest").innerText = "Zbývá rozřadit " + pS + " prací.";
    _styleEdit2.default.changeStyle([rN, genIn, helpGen], "display", "flex");
    new _genInput2.default(genIn, value);
  } else {
    _styleEdit2.default.changeStyle([rN, genIn, helpGen], "display", "none");
  }
});

document.querySelectorAll(".number .input")[2].addEventListener("change", function () {
  var value = document.querySelectorAll(".radio + .number .input")[0].value;
  // console.log("Hello " + value);
  var genIn = document.getElementById("generated");
  new _genInput2.default(genIn, value);
});

var gallery = new Viewer(document.getElementById("images"));

var labelsPrevent = document.querySelectorAll(".checkbox .label");
labelsPrevent.forEach(function (lab) {
  lab.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

var positive = document.querySelectorAll(".label .positive");
var negative = document.querySelectorAll(".label .negative");

positive.forEach(function (el) {
  el.addEventListener("click", function () {
    // console.log(el.closest(".label").previousElementSibling.checked);

    el.closest(".label").previousElementSibling.checked = true;
    var evt = new Event("change");
    el.closest(".label").previousElementSibling.dispatchEvent(evt);

    el.nextElementSibling.classList.remove("active");
    el.classList.add("active");
    // console.log(el.closest(".label").previousElementSibling.checked);
  });
});

negative.forEach(function (el) {
  el.addEventListener("click", function () {
    // console.log(el.closest(".label").previousElementSibling.checked);

    el.closest(".label").previousElementSibling.checked = false;

    var evt = new Event("change");
    el.closest(".label").previousElementSibling.dispatchEvent(evt);

    el.previousElementSibling.classList.remove("active");
    el.classList.add("active");
    // console.log(el.closest(".label").previousElementSibling.checked);
  });
});