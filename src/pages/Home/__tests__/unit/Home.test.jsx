import React from "react";
import { Home } from "../../Home";
import { mount } from "enzyme";

describe("Unit Tests: Home (page)", () => {
  it("should render", () => {
    const wrapper = mount(<HomeFactory />);
    expect(wrapper.length).toBe(1);
  });
});

const HomeFactory = () => <Home />;
