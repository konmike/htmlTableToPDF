"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getContent = function getContent(upFile) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var content = event.target.result;

    // console.log(content);

    $(".file").append(content);
    // console.log($('table tr').length - 1);
    // console.log( ($('table th').length - 8)/2 );

    $("input[name=pocetStudentu]").val($("table tr").length - 1);
    $("input[name=pocetUloh]").val(($("table th").length - 8) / 2);
    $(".file style").remove();
  };
  reader.readAsText(upFile[0]);
};

exports.default = {
  getContent: getContent
};