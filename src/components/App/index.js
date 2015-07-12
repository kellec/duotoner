import React          from "react";
import ColorSetter    from "ColorSetter";
import ImageCanvas    from "ImageCanvas";

import "./styles.css";

export default React.createClass({
  getInitialState() {
    return {
      foreground : "#01cf84",
      background : "#052e64",
      image      : "http://placekitten.com/650/950"
    };
  },

  setFg(val) {
    this.setState({ foreground: val });
  },

  setBg(val) {
    this.setState({ background: val });
  },

  handleFileChange(dataURI) {
    console.log("new file", dataURI);
    this.setState({
      image: dataURI
    });
  },

  setImg(e) {
    const file      = e.target.files[0];
    const imageType = /image.*/;
    let reader      = new FileReader();

    if (!file) return;

    if (file.type.match(imageType)) {
      reader.onload = function(img) {
        this.handleFileChange(img.target.result);
      }.bind(this);
      reader.readAsDataURL(file);
    }

  },

  render() {
    return  <div className="App">
              <div className="App_preview">
                <ImageCanvas
                  image={this.state.image}
                  width={800} height={800}
                  fg={this.state.foreground}
                  bg={this.state.background} />
                <input type="file" onChange={this.setImg} />
              </div>
              <div className="App_controls">
                <ColorSetter color={this.state.foreground} handleChange={this.setFg} label="Lights" />
                <ColorSetter color={this.state.background} handleChange={this.setBg} label="Shadows" />
              </div>
            </div>
  }
});
