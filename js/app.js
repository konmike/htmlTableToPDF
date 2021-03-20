import QuantityInput from "./modules/quantity.js";
import Select from "./modules/select.js";
import Upload from "./modules/upload.js";
import cssEdit from "./modules/styleEdit.js";
import genInput from "./modules/genInput.js";
import "/node_modules/viewerjs/dist/viewer.js";

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
  let upIn = document.querySelectorAll(".upload .input")[0];

  if (!supportDrag) {
    document.querySelectorAll(".has-drag")[0].classList.remove("has-drag");
  }

  input.addEventListener(
    "change",
    function (e) {
      document.getElementById("js-file-name").innerHTML = this.files[0].name;
      upIn.classList.remove("file-input--active");
    },
    false
  );

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
  let input = document.getElementById("js-file-input");
  input.addEventListener("change", function () {
    // let numbers = document.querySelectorAll(".upload + .number");
    Upload.getContent(input.files);

    let current = document.querySelector(".upload");
    let nextSibling = current.nextElementSibling;

    while (nextSibling) {
      if (
        nextSibling.classList.contains("btn") ||
        (!nextSibling.classList.contains("generated") &&
          !nextSibling.classList.contains("help--generated") &&
          !nextSibling.classList.contains("select") &&
          !nextSibling.classList.contains("help--jmena-studentu") &&
          !nextSibling.nextElementSibling.classList.contains("help--generated"))
      ) {
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

document
  .getElementById("include-all-students")
  .addEventListener("change", function () {
    let selectWrapper = document.getElementById("students-name");
    let selectHelp = document.querySelector(".help--jmena-studentu");
    if (this.checked === false) {
      cssEdit.changeStyle([selectWrapper, selectHelp], "display", "flex");
      // selectWrapper.style.display = "block";
      // selectHelp.style.display = "flex";
      new Select(document.querySelectorAll(".select")[0]);
    } else {
      let select = document.getElementsByClassName(
        "js-example-basic-multiple"
      )[0];
      let span = document.getElementsByClassName("select2")[0];
      // console.log(select);
      selectWrapper.removeChild(select);
      selectWrapper.removeChild(span);
      // selectWrapper.style.display = "none";
      // selectHelp.style.display = "none";
      cssEdit.changeStyle([selectWrapper, selectHelp], "display", "none");
    }
  });

document.querySelectorAll(".radio")[0].addEventListener("change", function () {
  let rN = document.querySelectorAll(".radio + .number")[0];
  let helpGen = document.querySelector(".help--generated");
  let value = document.querySelectorAll(".radio + .number .input")[0].value;
  let genIn = document.getElementById("generated");

  if (document.querySelectorAll(".radio .input")[2].checked) {
    let pS = Number(document.querySelector("input[name=pocetStudentu]").value);
    document.getElementById("rest").innerText =
      "Zbývá rozřadit " + pS + " prací.";
    cssEdit.changeStyle([rN, genIn, helpGen], "display", "flex");
    new genInput(genIn, value);
  } else {
    cssEdit.changeStyle([rN, genIn, helpGen], "display", "none");
  }
});

document
  .querySelectorAll(".number .input")[2]
  .addEventListener("change", function () {
    let value = document.querySelectorAll(".radio + .number .input")[0].value;
    // console.log("Hello " + value);
    let genIn = document.getElementById("generated");
    new genInput(genIn, value);
  });

const gallery = new Viewer(document.getElementById("images"));

let labelsPrevent = document.querySelectorAll(".checkbox .label");
labelsPrevent.forEach(function (lab) {
  lab.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

let positive = document.querySelectorAll(".label .positive");
let negative = document.querySelectorAll(".label .negative");

positive.forEach(function (el) {
  el.addEventListener("click", function () {
    // console.log(el.closest(".label").previousElementSibling.checked);

    el.closest(".label").previousElementSibling.checked = true;
    let evt = new Event("change");
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

    let evt = new Event("change");
    el.closest(".label").previousElementSibling.dispatchEvent(evt);

    el.previousElementSibling.classList.remove("active");
    el.classList.add("active");
    // console.log(el.closest(".label").previousElementSibling.checked);
  });
});
