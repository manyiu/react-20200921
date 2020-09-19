import React, { Component } from "react";
import Dots from "./dots";
import initialData from "../data/initalLoading.json";

class Loading extends Component {
  constructor() {
    super();
    this.state = {
      data: initialData,
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.updateData(this.state), 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updateData = (state) => {
    const nextData = [
      ...state.data.slice(1),
      state.data[state.data.length - 1] + 1 <= 10
        ? state.data[state.data.length - 1] + 1
        : 0,
    ];

    this.setState({ data: nextData });
  };

  render() {
    return <Dots data={this.state.data} />;
  }
}

export default Loading;
