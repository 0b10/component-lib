import React from "react";
// 3rd party
import { mount } from "enzyme";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "../../../../components";
// Local
import { Home } from "../../Home";
import { postsStubProps } from "../../../../components";

describe("Unit Tests: Home (page)", () => {
  it("should render something, anything", () => {
    const wrapper = mount(<HomeFactory />);
    expect(wrapper.length).toBe(1);
  });

  // Add more components here if Home is extended
  describe.each`
    component
    ${"Post"}
  `("$component", ({ component }) => {
    it(`should render`, () => {
      const wrapper = mount(<HomeFactory />).find(component);
      // console.log(wrapper.debug());
      expect(wrapper.length).toBe(numPosts());
    });
  });
});

const numPosts = () => postsStubProps.posts.getPosts().length;

// ! These tests don't need to pass props, as Pages are essentially "leaf" node in the dependency
// !  graph , and are initialised in the module
const HomeFactory = () => (
  <ThemeProvider>
    <CssBaseLine />
    <Home />
  </ThemeProvider>
);
