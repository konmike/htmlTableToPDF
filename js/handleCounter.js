/**
 * handle counter
 */
(function () {
  "use strict";

  var gICounter = 0;
  function changeInputs($newValue, $inputs) {
    if ($newValue === 0 || $newValue === 1) {
      $("#generated-input input").remove();
      gICounter = 0;
      // console.log("Here we are2");
    } else if ($newValue >= gICounter && ($newValue != 0 || $newValue != 1)) {
      for (let i = $inputs; i < $newValue; i++) {
        $("#generated-input").append(
          '<input type="number" min="0" placeholder="Počet studentů" name="gI[]">'
        );
        gICounter++;
      }
    } else {
      // console.log("Here we are 4");
      for (let i = $inputs; i > $newValue; i--) {
        $("#generated-input input").last().remove();
        gICounter--;
      }
    }
    //console.log($('input[name="gI[]"]').val());
  }

  $("input[name=pocetSouboru]").on("input", function () {
    let inputs = $("#generated-input input").length;
    let newValue = $(this).val();
    changeInputs(newValue, inputs);
  });
  $("#counter3 .sub").click(function () {
    let inputs = $("#generated-input input").length;
    let newValue = $("input[name=pocetSouboru]").val();
    newValue--;
    // console.log(newValue);
    changeInputs(newValue, inputs);
  });
  $("#counter3 .add").click(function () {
    let inputs = $("#generated-input input").length;
    let newValue = $("input[name=pocetSouboru]").val();
    newValue++;
    // console.log(newValue);
    changeInputs(newValue, inputs);
  });
})(jQuery);
