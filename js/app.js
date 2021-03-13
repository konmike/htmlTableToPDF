import QuantityInput from "./modules/quantity.js";
import Select from "./modules/select.js";
import Upload from "./modules/upload.js";

import "/node_modules/select2/dist/js/select2.min.js";

(function () {
  let quantities = document.querySelectorAll(".number");

  if (quantities instanceof Node) quantities = [quantities];
  if (quantities instanceof NodeList) quantities = [].slice.call(quantities);
  if (quantities instanceof Array) {
    quantities.forEach((div) => (div.quantity = new QuantityInput(div)));
  }

  window.supportDrag = (function () {
    let div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();

  let input = document.getElementById("js-file-input");

  if (!supportDrag) {
    document.querySelectorAll(".has-drag")[0].classList.remove("has-drag");
  }

  input.addEventListener(
    "change",
    function (e) {
      document.getElementById("js-file-name").innerHTML = this.files[0].name;
      document
        .querySelectorAll(".upload .input")[0]
        .classList.remove("file-input--active");
    },
    false
  );

  if (supportDrag) {
    input.addEventListener("dragenter", function (e) {
      document
        .querySelectorAll(".upload .input")[0]
        .classList.add("file-input--active");
    });

    input.addEventListener("dragleave", function (e) {
      document
        .querySelectorAll(".upload .input")[0]
        .classList.remove("file-input--active");
    });
  }
})();

try {
  let input = document.getElementById("js-file-input");
  input.addEventListener("change", function () {
    Upload.getContent(input.files);
  });
} catch (e) {
  alert(e);
}

document.getElementById("zahrnout-vse").addEventListener("change", function () {
  let selectWrapper = document.getElementById("students-name");
  if (this.checked === false) {
    selectWrapper.style.display = "block";
    new Select(document.querySelectorAll(".select")[0]);
  } else {
    let select = document.getElementsByClassName(
      "js-example-basic-multiple"
    )[0];
    let span = document.getElementsByClassName("select2")[0];
    // console.log(select);
    selectWrapper.removeChild(select);
    selectWrapper.removeChild(span);
    selectWrapper.style.display = "none";
  }
});

document.querySelectorAll(".radio")[0].addEventListener("change", function () {
  if (document.querySelectorAll(".radio .input")[2].checked) {
    document.querySelectorAll(".radio + .number")[0].style.display = "flex";
  } else {
    document.querySelectorAll(".radio + .number")[0].style.display = "none";
  }
});
