"use strict";

var count = 0;

var Button = function Button(_ref) {
  var click = _ref.click;
  return dom("button", {
    click: click
  }, "+1");
};

var App = function App() {
  console.log('render');
  return dom('frag', null, dom(Button, {
    click: function click(e) {
      return count++;
    }
  }), "current count:", ' ', count.toString());
};

var render = happyFramework(document.getElementById('root'), App);
