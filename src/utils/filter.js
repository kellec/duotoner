import { hexToRgb } from "utils/colors";

// Thank you kind Ben http://stackoverflow.com/questions/11736009/weighted-average-colour-mixing
function interpolate(val, rgb1, rgb2) {
  var rgb = [0,0,0];
  var i;
  for (i = 0; i < 3; i++) {
    rgb[i] = rgb1[i] * (1.0 - val) + rgb2[i] * val;
  }
  return rgb;
}

function duotone(image, bg, fg) {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);

  for (let i = 0; i < image.data.length; i += 4) {
    let red       = image.data[i];
    let green     = image.data[i+1];
    let blue      = image.data[i+2];
    let luminance = ((red * 299) + (green * 587) + (blue * 114)) / 1000; // Gives a value from 0 - 255
    let newRGB    = interpolate((luminance/255), fgRgb, bgRgb);

    image.data[i]   = newRGB[0];
    image.data[i+1] = newRGB[1];
    image.data[i+2] = newRGB[2];
  }

  return image;
}

function contrast(image, modifier) {
  return image;
}

export default {duotone, contrast};
