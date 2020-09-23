const toCapitalize = (str) => str.replace(/^./, str.charAt(0).toUpperCase());
String.prototype.toCapitalize = function () {
  return toCapitalize(this);
};
