import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { DefaultLayout, stubs } from "../../layouts";

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <DefaultLayout {...stubs.defaultLayout.defaultLayoutProps}>
        <div>stub</div>
      </DefaultLayout>
    );
  }
}

Home.propTypes = {};
