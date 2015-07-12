import React          from "react";
import ColorSetter    from "ColorSetter";
import ImageCanvas    from "ImageCanvas";

import "./styles.css";

export default React.createClass({
  getInitialState() {
    return {
      foreground : "#01cf84",
      background : "#052e64",
    };
  },

  setFg(val) {
    this.setState({ foreground: val });
  },

  setBg(val) {
    this.setState({ background: val });
  },

  render() {
    return  <div className="App">
              <div className="App_preview">
                <ImageCanvas
                  image="http://placekitten.com/650/950"
                  width={800} height={800}
                  fg={this.state.foreground}
                  bg={this.state.background} />
              </div>
              <div className="App_controls">
                <ColorSetter color={this.state.foreground} handleChange={this.setFg} label="Lights" />
                <ColorSetter color={this.state.background} handleChange={this.setBg} label="Shadows" />
              </div>
            </div>
  }
});
