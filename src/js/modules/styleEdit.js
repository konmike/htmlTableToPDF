var changeStyle = function (elements, prop, val) {
  elements.forEach((el) => {
    el.style[prop] = val;
  });
};

export default {
  changeStyle,
};
