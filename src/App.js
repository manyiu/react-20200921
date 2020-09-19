import React, { Component } from "react";
import Dots from "./components/dots";
import Loading from "./components/loading";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      update: true,
      data: [],
      error: false,
    };
  }

  async componentDidMount() {
    const { data: { data = [] } = {} } = await axios.get(
      `${process.env.REACT_APP_API_URL}/`
    );

    this.setState({ data });
  }

  shouldComponentUpdate() {
    if (!this.state.update) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate() {
    clearInterval(this.setIntervalID);
    this.setIntervalID = setInterval(() => this.fetchSingle(this.state), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setIntervalID);
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  async fetchSingle(state) {
    const { data: { data = 0 } = {} } = await axios.get(
      `${process.env.REACT_APP_API_URL}/single`
    );

    this.setState({ data: [...state.data.slice(1), data] });
  }

  handleOnClick = () => {
    this.setState({ update: !this.state.update });
  };

  render() {
    if (this.state.error || this.state.data.length === 0) {
      return <Loading />;
    }

    return <Dots data={this.state.data} onClick={this.handleOnClick} />;
  }
}

export default App;
