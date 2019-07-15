import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// Local
import { Posts, postsStubPropsFactory } from "../../components";

export class Home extends PureComponent {
  render() {
    const { props } = this;
    // FIXME: initialise Posts with real, non-stub props
    // Override default props with postsProps - for testing
    return <Posts {...postsStubPropsFactory()} {...props.postsProps} />;
  }
}

Home.propTypes = {
  postsProps: PropTypes.object
};
