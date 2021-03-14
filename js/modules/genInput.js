import QuantityInput from "./quantity.js";

export default class genInput {
  constructor(self, val) {
    function Input() {
      this.input = document.createElement("input");
      this.input.value = 0;
      this.input.type = "number";
      this.input.name = "qI[]";
      this.input.pattern = "[0-9]+";
      this.input.classList.add("input");
      return this.input;
    }

    function Label(text, className) {
      this.label = document.createElement("label");
      this.label.innerHTML = text;
      this.label.classList.add(className);
      return this.label;
    }

    function Button(classNames) {
      this.button = document.createElement("button");
      this.button.type = "button";
      classNames.forEach((className) => {
        this.button.classList.add(className);
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
      let s = val - this.getChilds();
      for (let i = 0; i < s; i++) {
        // this.addChild();
        this.wrapper = new generateBlock();
        new QuantityInput(this.wrapper);
        // this.wrapper = new generateBlock();
        // new QuantityInput(this.wrapper);
        // console.log(this.getChilds());
      }
    } else if (this.getChilds() > val) {
      let s = this.getChilds() - val;
      console.log(s);
      for (let i = 0; i < s; i++) {
        this.removeChild();
        // console.log(this.getChilds());
      }
    }
  }

  /**
   * Return number of child element of generated wrapper
   * @return  {int}
   * */
  getChilds() {
    return document.getElementById("generated").childElementCount;
  }

  addChild() {
    this.wrapper = new generateBlock();
    new QuantityInput(this.wrapper);
  }

  removeChild() {
    let g = document.getElementById("generated");
    g.removeChild(g.lastElementChild);
  }

  //   change_quantity(change) {
  //     let quantity = Number(this.input.value);
  //     if (isNaN(quantity)) quantity = 1;
  //     quantity += change;
  //     quantity = Math.max(quantity, 1);
  //     this.input.value = quantity;
  //   }
}
