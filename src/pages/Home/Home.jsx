import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Posts, postsStubProps } from "../../components";

export class Home extends PureComponent {
  render() {
    // FIXME: initialise Posts with real, non-stub props
    return <Posts {...postsStubProps.posts} />;
  }
}

Home.propTypes = {};
