import React, { PureComponent } from "react";
import { Posts, postsStubPropsFactory } from "../../components";

export class Home extends PureComponent {
  render() {
    // FIXME: initialise Posts with real, non-stub props
    return <Posts {...postsStubPropsFactory()} />;
  }
}
