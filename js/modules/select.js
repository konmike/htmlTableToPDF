import "/node_modules/select2/dist/js/select2.min.js";
import "/node_modules/select2/dist/js/i18n/cs.js";

export default class Select {
  constructor(self) {
    this.input = document.createElement("select");
    this.input.name = "names[]";
    this.input.classList.add("js-example-basic-multiple");
    this.input.multiple = "multiple";

    this.lastNames = this.getNames();

    // console.log(lastNames);
    this.lastNames.forEach((name) => {
      this.option = document.createElement("option");
      this.option.value = name;
      this.option.innerHTML = name;

      this.input.appendChild(this.option);
    });

    self.appendChild(this.input);
    let s = document.querySelectorAll(".select .js-example-basic-multiple")[0];
    $(".js-example-basic-multiple").select2({
      placeholder: "Začněte psát jména/vyberte ze seznamu...",
      width: "100%",
      language: "cs",
    });
    $("textarea").focus();
  }

  getNames() {
    let tableNames = document.querySelectorAll(".file tbody td:first-child");
    let lastNames = [];
    if (tableNames.length > 0) {
      tableNames.forEach(function (name) {
        lastNames.push(
          name.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        );
        lastNames.sort();
      });
      // console.log(lN);
    } else console.log("Zadne jmena tam nejsou, kde jsou? Nejsou...");
    return lastNames;
  }
}
