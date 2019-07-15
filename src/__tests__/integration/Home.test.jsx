import React from "react";
// 3rd party
import { cleanup, fireEvent, render } from "@testing-library/react";
// Local
import { DefaultLayout } from "../../layouts";
import { Home } from "../../pages";
import { navBarStubPropsFactory } from "../../components";
import { postsStubPropsFactory } from "../../components";
import { sideMenuButtonStubPropsFactory } from "../../components";
import { ThemeProvider } from "../../components";

describe("Integration Tests: App", () => {
  afterEach(cleanup);

  describe("Home", () => {
    // +++ clickabe posts +++
    it("should have clickable posts", () => {
      const { handlerSpy, postsProps, HomeTest } = homeFactory();
      const { getByText } = render(<HomeTest />);
      postsProps.getPosts().forEach(({ title }) => {
        fireEvent.click(getByText(new RegExp(`^${title}$`)));
        expect(handlerSpy.mock.calls.length).toBe(1);
        handlerSpy.mockReset();
      });
    });
  });
});

const homeFactory = () => {
  const handlerSpy = jest.fn();
  const postsProps = postsStubPropsFactory(
    undefined,
    undefined,
    undefined,
    undefined,
    handlerSpy
  );
  return {
    handlerSpy,
    postsProps,
    HomeTest: () => (
      <ThemeProvider>
        <DefaultLayout
          navBarProps={navBarStubPropsFactory()}
          sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
        >
          <Home postsProps={postsProps} />
        </DefaultLayout>
      </ThemeProvider>
    )
  };
};
