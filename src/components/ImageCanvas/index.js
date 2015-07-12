import React     from "react";
import {duotone} from "utils/filter";

import styles    from "./styles.css";

export default React.createClass({

  getInitialState() {
      return { image: {} };
  },

  scale(iWidth, iHeight) {
    const cWidth  = this.props.width;
    const cHeight = this.props.height;
    const orientation = (iWidth > iHeight) ? "landscape" : "portrait";

    if ((orientation === "landscape") && (cWidth > iWidth)) {
      return { width: iWidth, height: iHeight };
    }

    if (orientation === "landscape") {
      return { width: cWidth, height: iHeight * (cHeight / iWidth) };
    }

    if ((orientation === "portrait") && (cHeight > iHeight)) {
      return { width: iWidth, height: iHeight };
    }

    return { width: iWidth * (cWidth / iHeight), height: cHeight };
  },

  prepImage(imageUri) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      var scaledImage = this.scale(img.width, img.height);
      scaledImage.resource = img;
      scaledImage.x = 0;
      scaledImage.y = 0;
      this.setState({image: scaledImage});
    }
    img.src = imageUri;
  },

  filterImage(image, context) {
    let { fg, bg } = this.props;
    let imageData = context.getImageData(0, 0, image.width, image.height);

    duotone(imageData, fg, bg);
    context.putImageData(imageData, 0, 0);
  },

  clearCanvas (context) {
    context.save();
    context.translate(0, 0);
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.restore();
  },


  componentDidMount () {
    var canvas = React.findDOMNode(this);
    var context = canvas.getContext("2d");
    this.prepImage(this.props.image);
    this.clearCanvas(context);
  },

  componentDidUpdate () {
    let context = React.findDOMNode(this).getContext("2d");
    let { image } = this.state;
    let { width, height } = this.props;

    context.clearRect(0, 0, width, height);

    this.clearCanvas(context);
    this.prepImage(this.props.image);
    this.addImageToCanvas(context, image);
    this.filterImage(image, context);
  },

  addImageToCanvas (context, image) {
    if (!image.resource) return;
    context.save();
    context.globalCompositeOperation = "destination-over";
    context.drawImage(image.resource, image.x, image.y, image.width, image.height);
    context.restore();
  },

  render () {
    return (
      <canvas className="ImageCanvas" width={this.props.width} height={this.props.height}></canvas>
    );
  }
});
