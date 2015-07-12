import React          from "react";
import { isValidHex } from "utils/colors";
import ColorPicker    from "react-color-picker";

import "react-color-picker/index.css";
import "./styles.css";

export default React.createClass({
  getInitialState() {
    return {
      color      : this.props.color,
      validColor : this.props.color
    };
  },

  update(color) {
    this.setState({ validColor: color });
    this.props.handleChange(color);
  },

  change(e) {
    const color = e.target.value;
    this.setState({ color: color });
    if ( isValidHex(color) ) {
      this.update(color);
    }
  },

  onDrag(color) {
    this.setState({color: color});
    this.update(color);
  },

  render() {
    const {validColor} = this.state;

    return  <div className="ColorSetter" style={{background: this.state.validColor}}>
              <input value={this.state.color} onChange={this.change} />
              <ColorPicker value={this.state.validColor} onDrag={this.onDrag} />
            </div>
  }
});
