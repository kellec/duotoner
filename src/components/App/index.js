import React          from "react";
import ImageCanvas    from "ImageCanvas";
import { isValidHex } from "utils/colors";

import "./styles.css";

export default React.createClass({
  getInitialState() {
    return {
      foreground : "#01cf84",
      background : "#052e64",

      validFg : "#01cf84",
      validBg : "#052e64",
    };
  },

  setFg(e) {
    const val = e.target.value;
    this.setState({ foreground: val });
    if ( isValidHex(val) ) {
      this.setState({validFg: val});
    }
  },

  setBg(e) {
    const val = e.target.value;
    this.setState({ background: val });
    if ( isValidHex(val) ) {
      this.setState({validBg: val});
    }
  },

  render() {
    return  <div className="App">
              <div className="App_preview">
                <ImageCanvas
                  image="http://placekitten.com/650/950"
                  width={800} height={800}
                  fg={this.state.validFg}
                  bg={this.state.validBg} />
              </div>
              <div className="App_controls">
                <input type="text" value={this.state.foreground} onChange={this.setFg} />
                <input type="text" value={this.state.background} onChange={this.setBg} />
              </div>
            </div>
  }
});
