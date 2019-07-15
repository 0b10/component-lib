import React from "react";
import { shallow, mount } from "enzyme";
import { DefaultLayout } from "../../DefaultLayout";
import {
  NavBar,
  navBarStubPropsFactory,
  SideMenuButton,
  sideMenuButtonStubPropsFactory
} from "../../../../components";

describe("Unit Tests: layout/DefaultLayout", () => {
  it("should render", () => {
    const wrapper = shallow(<TestDefaultLayout />);
    expect(wrapper.length).toBe(1);
  });

  it("should render NavBar", () => {
    const wrapper = mount(<TestDefaultLayout />);
    expect(wrapper.find(NavBar).length).toBe(1);
  });

  it("should render SideMenuButton", () => {
    const wrapper = mount(<TestDefaultLayout />);
    expect(wrapper.find(SideMenuButton).length).toBe(1);
  });

  it("should render children", () => {
    const ChildComponent = () => <div>test</div>;

    const wrapper = mount(
      <TestDefaultLayout>
        <ChildComponent />
      </TestDefaultLayout>
    );
    expect(wrapper.find(ChildComponent).length).toBe(1);
  });
});

// ! width="xl" is required so that there are no hidden elements
const TestDefaultLayout = props => {
  return (
    <DefaultLayout
      sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
      navBarProps={{ ...navBarStubPropsFactory() }}
    >
      {props.children}
    </DefaultLayout>
  );
};
