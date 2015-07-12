function parseHex(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
}

function isValidHex(hex) {
  if (!hex) return false;
  return !!parseHex(hex);
}


function hexToRgb(hex) {
  if (!hex) return false;

  let  result = parseHex(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : false;
}

export default { isValidHex, hexToRgb };
