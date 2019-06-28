import React from "react";
import { shallow, mount, render } from "enzyme";
import { Card, CardActionArea } from "@material-ui/core";
import renderer from "react-test-renderer";

import {
  ActionButton,
  StyledBodyText,
  FilledFavoriteIcon,
  FilledReadLaterIcon,
  HollowFavoriteIcon,
  HollowReadLaterIcon,
  Post,
  Posts,
  PostDate,
  StyledTagContainer,
  StyledH2,
  StyledTag,
  StyledCardActions
} from "./Posts";
import { ThemeProvider } from "../ThemeProvider";
import { EventEmitter } from "events";

describe("Posts module...", () => {
  let mockContent = null;
  let mockPostsStore = null;
  let mockEventNames = null;
  let nullEventHandlers = null;

  beforeEach(async () => {
    mockContent = await {
      imgUrl: "fake-img-url",
      title: "fake-title",
      body: "fake-body",
      favorite: false,
      readLater: true,
      postID: "0",
      postUrl: "fake-post-url",
      createdAt: 123,
      modifiedAt: 456,
      tags: ["fake-tag-1", "fake-tag-2", "fake-tag-3"]
    };
    mockPostsStore = new MockPostsStore();
    mockEventNames = {
      failedRemoveFavorite: "fakeFailedRemoveFavorite",
      failedAddFavorite: "fakeFailedAddFavorite",
      failedRemoveReadLater: "fakeFailedRemoveReadLater",
      failedAddReadLater: "fakeFailedAddReadLater",
      postsUpdated: "fakePostsUpdated"
    };
    nullEventHandlers = {
      handleFavorite: () => null,
      handleReadLater: () => null,
      handlePostClick: () => null,
      handleTagClick: () => null
    };
    Promise.resolve();
  });

  // >>> RENDER >>>
  describe("Rendering for...", () => {
    // ~~~ Post ~~~
    describe("Post...", () => {
      // +++ render post component +++
      it("Should render it's component", () =>
        confirmPostRender(mockContent, false, mockEventNames, mockPostsStore));

      // +++ post body text +++
      it("Should render body component (StyledBodyText)", () =>
        confirmPostRender(
          mockContent,
          StyledBodyText,
          mockEventNames,
          mockPostsStore
        ));
      it("Should display body text (StyledBodyText)", () =>
        confirmPostText(
          mockContent,
          StyledBodyText,
          mockContent.body,
          undefined,
          undefined,
          mockEventNames,
          mockPostsStore
        ));

      // +++ post header +++
      it("Should render header component (StyledH2)", () =>
        confirmPostRender(
          mockContent,
          StyledH2,
          mockEventNames,
          mockPostsStore
        ));
      it("Should display header text (StyledH2)", () =>
        confirmPostText(
          mockContent,
          "h2",
          mockContent.title,
          true,
          mount,
          mockEventNames,
          mockPostsStore
        ));
    });

    // ~~~ Tags ~~~
    describe("StyledTagContainer...", () => {
      it("Should display all tags", () => {
        const wrapper = mount(
          <StyledTagContainer>
            {mockContent.tags.map((text, index) => (
              <StyledTag
                key={index}
                clickable
                onClick={() => null}
                variant="outlined"
                size="small"
                label={text}
              />
            ))}
          </StyledTagContainer>
        ).find(StyledTag);
        return expect(wrapper.length).toBe(mockContent.tags.length);
      });
    });

    // ~~~ Date ~~~
    describe("Date...", () => {
      const testCases = [
        {
          createdAt: 1,
          modifiedAt: 2,
          expected: { modified: true, date: 2 },
          description:
            "the modified date (with a text modifier) when it is newer"
        },
        {
          createdAt: 2,
          modifiedAt: 1,
          expected: { modified: false, date: 2 },
          description: "the creation date, when it is newer"
        },
        {
          createdAt: 2,
          modifiedAt: 2,
          expected: { modified: false, date: 2 },
          description: "the creation date, when both are identical"
        }
      ];

      testCases.forEach(({ createdAt, modifiedAt, expected, description }) => {
        it(`Should determine the correct date - ${description}`, () => {
          const wrapper = shallow(
            <PostDate dates={{ createdAt, modifiedAt }} />
          ).instance();

          const result = wrapper.getDateString();
          const { modified, date } = expected;
          const dateString = new Date(date).toDateString();
          let expectedResult = null;
          modified
            ? (expectedResult = `Modified: ${dateString}`)
            : (expectedResult = dateString);

          return expect(result).toBe(expectedResult);
        });
      });

      testCases.forEach(({ createdAt, modifiedAt, expected, description }) => {
        it(`Should display the correct date text - ${description}`, () => {
          const wrapper = mount(
            <PostDate dates={{ createdAt, modifiedAt }} />
          ).find("span");

          const { modified, date } = expected;
          const dateString = new Date(date).toDateString();
          let expectedResult = null;
          modified
            ? (expectedResult = `Modified: ${dateString}`)
            : (expectedResult = dateString);

          return expect(wrapper.text()).toBe(expectedResult);
        });
      });
    });

    // ~~~ Posts ~~~
    describe("Posts...", () => {
      // +++ check all posts are rendered +++
      it(`Should render all posts from getPosts()`, () => {
        const expectedNumOfPosts = mockGetPosts().length;
        const wrapper = shallow(
          <Posts
            handleFavorite={() => null}
            handleReadLater={() => null}
            handlePostClick={() => null}
            handleTagClick={() => null}
            getPosts={mockGetPosts}
            eventNames={mockEventNames}
            postsStore={mockPostsStore}
          />
        ).find(Post);
        expect(wrapper.length).toBe(expectedNumOfPosts);
      });

      // +++ check each post renders all expected components +++
      [
        {
          component: StyledH2,
          componentName: "StyledH2",
          children: false
        },
        {
          component: StyledBodyText,
          componentName: "StyledBodyText",
          children: false
        },
        {
          component: StyledCardActions,
          componentName: "ActionButton",
          children: ActionButton
        }
        // FIXME: These components do not mount/render because of <Hidden>. Find a fix.
        // {
        //   component: PostDate,
        //   componentName: "PostDate",
        //   children: false
        // },
        // {
        //   component: StyledCardMedia,
        //   componentName: "StyledCardMedia",
        //   children: false
        // },
        // {
        //   component: StyledTagContainer,
        //   componentName: "StyledTagContainer",
        //   children: StyledTag
        // }
      ].forEach(({ component, componentName, children }) => {
        it(`Should render the ${componentName} component for each Post`, () => {
          const wrappers = mount(
            <ThemeProvider>
              <Posts
                handleFavorite={() => null}
                handleReadLater={() => null}
                handlePostClick={() => null}
                handleTagClick={() => null}
                getPosts={mockGetPosts}
                eventNames={mockEventNames}
                postsStore={mockPostsStore}
              />
            </ThemeProvider>
          ).find(component);

          // > 0 means the component was found. Hidden components are not found - so fail them.
          expect(wrappers.length).toBeGreaterThan(0); // length of 0 avoids forEach, and passes by default.

          wrappers.forEach(wrapper => {
            if (children) {
              // For nested components that have multiples for each post - like ActionButton
              wrapper
                .find(children)
                .forEach(child => expect(child.length).toBeGreaterThan(0));
            } else {
              expect(wrapper.length).toBeGreaterThan(0);
            }
          });
        });
      });
    });
  });

  // >>> EVENT HANDLERS >>>
  describe("Event handlers for...", () => {
    // ~~~ Action Button ~~~
    describe("ActionButton...", () => {
      // +++ test it triggers +++
      it("Should trigger..", () => {
        const mockHandler = jest.fn();
        const wrapper = mount(
          <ThemeProvider>
            <ActionButton
              eventNames={{
                failedAdd: "fakeFailedAdd",
                failedRemove: "fakeFailedRemove"
              }}
              active={false}
              actionHandler={mockHandler}
              ariaLabel="Aria Label"
              icons={{
                active: FilledFavoriteIcon,
                inactive: HollowFavoriteIcon
              }}
              postID="1"
              postsStore={mockPostsStore}
            />
          </ThemeProvider>
        );
        wrapper.find("button").simulate("click");
        return expect(mockHandler.mock.calls.length).toBe(1);
      });

      // +++ test received args +++
      [
        { active: false, position: 0, value: "add" },
        { active: true, position: 0, value: "remove" },
        { active: false, position: 1, value: "1" },
        { active: true, position: 1, value: "1" }
      ].forEach(({ active, position, value }) => {
        it(`Should receive "${value}" as the first arg, when active is ${active}`, () =>
          confirmActionButtonCallback(active, { position, value }));
      });

      [true, false].forEach(active => {
        // +++ test initial state +++
        it("Should initialise state.active to props.active", () =>
          confirmActionButtonInitialState(active));

        // +++ test state change onClick +++
        it("Should change state when clicked", () =>
          confirmActionButtonStateChange(active));
      });
    });

    // ~~~ Post ~~~
    describe("Post...", () => {
      // ! No need to test the parameters for handlers because each component has unit tests that cover this.
      // ! Just test that the callback is called.
      // +++ handleFavorite, handleReadLater, and handlePostClick +++
      [
        {
          handlerKey: "handleReadLater",
          parent: ActionButton,
          child: { ariaLabel: "Read Later" },
          targetName: "Read Later"
        },
        {
          handlerKey: "handleFavorite",
          parent: ActionButton,
          child: { ariaLabel: "Favorite" },
          targetName: "Favorite"
        },
        {
          handlerKey: "handlePostClick",
          parent: Card,
          child: CardActionArea,
          targetName: "the post contaner"
        }
        // FIXME: Add a StyledTag test here, check that it integrates with Post
      ].forEach(({ handlerKey, parent, child, targetName }) => {
        it(`Should call ${handlerKey} when ${targetName} is clicked`, () => {
          confirmPostEventHandler(
            mockContent,
            handlerKey,
            parent,
            child,
            mockEventNames,
            mockPostsStore
          );
        });
      });

      // +++ handlePostClick +++
      it(`Should call handlePostClick with the correct args`, () => {
        const handlerSpy = jest.fn();
        const wrapper = mount(
          <ThemeProvider>
            <Post
              eventNames={mockEventNames}
              handleReadLater={() => null}
              handleFavorite={() => null}
              handlePostClick={handlerSpy}
              handleTagClick={() => null}
              content={mockContent}
              postsStore={mockPostsStore}
            />
          </ThemeProvider>
        ).find(CardActionArea);
        wrapper.simulate("click");
        return expect(handlerSpy.mock.calls[0][0]).toBe(mockContent.postUrl);
      });
    });

    // ~~~ StyledTag ~~~
    describe("StyledTag...", () => {
      // ! No point in testing the tag callback parameters , as the callback will defined within the test markup
      // ! This is completely redundant, and the test will be pointless.

      // +++ handleTagClick +++
      it(`Should call handleTagClick when a tag is clicked`, () => {
        // FIXME: Must do integration testing for this, and test that props passes the correct handler through
        // !  I am not rendered due to being wrapped in <Hidden /> @ xs breakpoint.
        // ! For some reason the wrapper doesn't render me.
        const handlerSpy = jest.fn();
        const wrapper = mount(
          <StyledTag
            clickable
            onClick={handlerSpy}
            variant="outlined"
            size="small"
            label="A Label"
          />
        );
        wrapper.simulate("click");
        return expect(handlerSpy.mock.calls.length).toBe(1);
      });
    });

    // ~~~ Posts ~~~
    describe("Posts...", () => {
      // +++ check handlers are called +++
      [
        {
          handlerName: "handleFavorite",
          parent: ActionButton,
          child: { ariaLabel: "Favorite" },
          type: "favorite button"
        },
        {
          handlerName: "handleReadLater",
          parent: ActionButton,
          child: { ariaLabel: "Read Later" },
          type: "read later button"
        },
        {
          handlerName: "handlePostClick",
          parent: CardActionArea,
          child: false,
          type: "post"
        }
        // FIXME: Test that the tag eventHandler is called when clicked
        // ! StyledTageContainer is <Hidden only="xs"> so isn't rendered
        // {
        //   handlerName: "handleTagClick",
        //   parent: StyledTagContainer,
        //   child: StyledTag,
        //   type: "a tag"
        // }
      ].forEach(({ handlerName, parent, child, type, at = 0 }) => {
        it(`Should call ${handlerName} when the ${type} is clicked`, () => {
          const handlers = {
            handleReadLater: () => null,
            handleFavorite: () => null,
            handlePostClick: () => null,
            handleTagClick: () => null
          };
          handlers[handlerName] = jest.fn();

          let wrapper = mount(
            <ThemeProvider>
              <Posts
                {...handlers}
                getPosts={mockGetPosts}
                eventNames={{
                  postsUpdated: "postsUpdated",
                  failedRemoveFavorite: "failedRemoveFavorite",
                  failedAddFavorite: "failedAddFavorite",
                  failedRemoveReadLater: "failedRemoveReadLater",
                  failedAddReadLater: "failedAddReadLater"
                }}
                postsStore={mockPostsStore}
              />
            </ThemeProvider>
          ).find(parent);

          if (child) wrapper = wrapper.find(child);
          if (wrapper.length > 1) wrapper = wrapper.at(at);

          wrapper.simulate("click");
          return expect(handlers[handlerName].mock.calls.length).toBe(1);
        });
      });
    });
  });

  // >>> EVENT LISTENERS >>>
  describe("Event listeners...", () => {
    describe("Posts...", () => {
      ["postsUpdated"].forEach(eventKey => {
        it("Should register a callback for the postUpdated event", () => {
          const mockPostsStore = new MockPostsStore();
          const expectedEventName = "testEventName";

          const defaultEventNames = {
            postsUpdated: "default-1",
            failedRemoveFavorite: "default-2",
            failedAddFavorite: "default-3",
            failedRemoveReadLater: "default-4",
            failedAddReadLater: "default-5"
          };

          defaultEventNames[eventKey] = expectedEventName;

          mount(
            <ThemeProvider>
              <Posts
                handleFavorite={() => null}
                handleReadLater={() => null}
                handlePostClick={() => null}
                handleTagClick={() => null}
                getPosts={() => []}
                eventNames={defaultEventNames}
                postsStore={mockPostsStore}
              />
            </ThemeProvider>
          );
          expect(mockPostsStore.listener.event).toBe(expectedEventName);
          expect(typeof mockPostsStore.listener.callback).toBe("function");
        });
      });
    });
  });

  // >>> SNAPSHOTS >>>
  describe("Snapshots for...", () => {
    describe("Posts...", () => {
      it("Should match previous snapshot", () => {
        const tree = renderer
          .create(
            <ThemeProvider>
              <Posts
                {...nullEventHandlers}
                getPosts={mockGetPosts}
                eventNames={mockEventNames}
                postsStore={mockPostsStore}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    describe("Post...", () => {
      it("Should match previous snapshot", () => {
        const tree = renderer
          .create(
            <ThemeProvider>
              <Post
                {...nullEventHandlers}
                content={mockContent}
                eventNames={mockEventNames}
                postsStore={mockPostsStore}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    describe("PostDate...", () => {
      it("Should match previous snapshot when displaying 'modified'", () => {
        const tree = renderer
          .create(
            <ThemeProvider>
              <PostDate
                dates={{
                  createdAt: 0,
                  modifiedAt: 1
                }}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it("Should match previous snapshot when displaying a normal date", () => {
        const tree = renderer
          .create(
            <ThemeProvider>
              <PostDate
                dates={{
                  createdAt: 1,
                  modifiedAt: 0
                }}
              />
            </ThemeProvider>
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
    describe("ActionButton...", () => {
      [
        {
          active: true,
          activeIcon: FilledReadLaterIcon,
          inactiveIcon: HollowReadLaterIcon,
          variant: "Read Later"
        },
        {
          active: false,
          activeIcon: FilledReadLaterIcon,
          inactiveIcon: HollowReadLaterIcon,
          variant: "Read Later"
        },
        {
          active: true,
          activeIcon: FilledFavoriteIcon,
          inactiveIcon: HollowFavoriteIcon,
          variant: "Favorite"
        },
        {
          active: false,
          activeIcon: FilledFavoriteIcon,
          inactiveIcon: HollowFavoriteIcon,
          variant: "Favorite"
        }
      ].forEach(({ active, activeIcon, inactiveIcon, variant }) => {
        it(`Should match previous snapshot for the ${variant} variant when ${
          active ? "active" : "inactive"
        }`, () =>
          confirmSnapshot(active, activeIcon, inactiveIcon, mockPostsStore));
      });
    });
  });
});

// >>> HELPERS >>>
// ~~~ ActionButton ~~~
// +++ snapshots +++
const confirmSnapshot = (active, activeIcon, inactiveIcon, postsStore) => {
  const tree = renderer
    .create(
      <ThemeProvider>
        <ActionButton
          active={active}
          actionHandler={() => null}
          ariaLabel="Read Later"
          eventNames={{
            failedRemove: "fakeFailedRemove",
            failedAdd: "fakeFailedAdd"
          }}
          icons={{
            active: activeIcon,
            inactive: inactiveIcon
          }}
          postID="1"
          postsStore={postsStore}
        />
        />
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
};

// +++ ActonButton clicked +++
const confirmActionButtonStateChange = active => {
  const mockHandler = jest.fn();
  const wrapper = mount(
    <ActionButton
      eventNames={{ failedAdd: "failedAdd", failedRemove: "failedRemove" }}
      active={active}
      actionHandler={mockHandler}
      ariaLabel="Aria Label"
      icons={{
        active: FilledFavoriteIcon,
        inactive: HollowFavoriteIcon
      }}
      postID="1"
      postsStore={new MockPostsStore()}
    />
  );

  wrapper.find("button").simulate("click"); // Change state

  return expect(wrapper.state("active")).toBe(!active);
};

// +++ ActonButton Init +++
const confirmActionButtonInitialState = active => {
  const mockHandler = jest.fn();
  const wrapper = shallow(
    <ActionButton
      active={active}
      actionHandler={mockHandler}
      ariaLabel="Aria Label"
      eventNames={{
        failedAdd: "failedAdd",
        failedRemove: "failedRemove"
      }}
      icons={{
        active: FilledFavoriteIcon,
        inactive: HollowFavoriteIcon
      }}
      postID="1"
      postsStore={new MockPostsStore()}
    />
  );

  return expect(wrapper.state("active")).toBe(active);
};

// +++ ActionButton handlers +++
const confirmActionButtonCallback = (active, expectedArgs) => {
  const mockHandler = jest.fn();
  const wrapper = mount(
    <ThemeProvider>
      <ActionButton
        eventNames={{
          failedAdd: "failedAdd",
          failedRemove: "failedRemove"
        }}
        active={active}
        actionHandler={mockHandler}
        ariaLabel="Aria Label"
        icons={{
          active: FilledFavoriteIcon,
          inactive: HollowFavoriteIcon
        }}
        postID="1"
        postsStore={new MockPostsStore()}
      />
    </ThemeProvider>
  );

  wrapper.find("button").simulate("click");
  const { value, position } = expectedArgs;

  return expect(mockHandler.mock.calls[0][position]).toBe(value);
};

// ~~~ Post ~~~
// +++ test handlers ++++
const confirmPostEventHandler = (
  content,
  handlerKey,
  parent,
  child,
  eventNames,
  postsStore
) => {
  const handlers = {
    handleReadLater: () => null,
    handleFavorite: () => null,
    handlePostClick: () => null,
    handleTagClick: () => null
  };

  handlers[handlerKey] = jest.fn();

  let wrapper = mount(
    <ThemeProvider>
      <Post
        eventNames={eventNames}
        {...handlers}
        content={content}
        postsStore={postsStore}
      />
    </ThemeProvider>
  )
    .find(parent)
    .find(child);

  wrapper.simulate("click");
  return expect(handlers[handlerKey].mock.calls.length).toBe(1);
};

// +++ test render ~~~
const confirmPostRender = (content, component, eventNames, postsStore) => {
  const wrapper = shallow(
    <Post
      eventNames={eventNames}
      handleReadLater={() => null}
      handleFavorite={() => null}
      handlePostClick={() => null}
      handleTagClick={() => null}
      content={content}
      postsStore={postsStore}
    />
  );
  return component
    ? expect(wrapper.find(component)).toHaveLength(1)
    : expect(wrapper).toHaveLength(1);
};

// +++ test text content +++
const confirmPostText = (
  content,
  target,
  comparison,
  themeProvider = false,
  wrapperFunc = shallow,
  eventNames,
  postsStore
) => {
  const wrapper = wrapperFunc(
    themeProvider ? (
      <ThemeProvider>
        <Post
          eventNames={eventNames}
          handleReadLater={() => null}
          handleFavorite={() => null}
          handlePostClick={() => null}
          handleTagClick={() => null}
          content={content}
          postsStore={postsStore}
        />
      </ThemeProvider>
    ) : (
      <Post
        eventNames={eventNames}
        handleReadLater={() => null}
        handleFavorite={() => null}
        handlePostClick={() => null}
        handleTagClick={() => null}
        content={content}
        postsStore={postsStore}
      />
    )
  );
  return expect(wrapper.find(target).text()).toBe(comparison);
};

// ~~~ Posts ~~~
// +++ mock getPosts +++
const mockGetPosts = () => [
  {
    imgUrl: "fake-img-url-1",
    title: "fake-title-1",
    body: "fake-body-1",
    favorite: false,
    readLater: true,
    postID: "1",
    postUrl: "fake-post-url-1",
    createdAt: 123,
    modifiedAt: 456,
    tags: ["fake-tag-1-1", "fake-tag-1-2", "fake-tag-1-3"]
  },
  {
    imgUrl: "fake-img-url-2",
    title: "fake-title-2",
    body: "fake-body-2",
    favorite: false,
    readLater: true,
    postID: "2",
    postUrl: "fake-post-url-2",
    createdAt: 123,
    modifiedAt: 456,
    tags: ["fake-tag-2-1", "fake-tag-2-2", "fake-tag-2-3"]
  },
  {
    imgUrl: "fake-img-url-3",
    title: "fake-title-3",
    body: "fake-body-3",
    favorite: false,
    readLater: true,
    postID: "3",
    postUrl: "fake-post-url-3",
    createdAt: 123,
    modifiedAt: 456,
    tags: ["fake-tag-3-1", "fake-tag-3-2", "fake-tag-3-3"]
  }
];

// +++ mock store +++
class MockPostsStore extends EventEmitter {
  constructor() {
    super();
    this.listener = {};
    this.on = this.on.bind(this);
    this.emitEvent = this.emitEvent.bind(this);
  }

  on(event, callback) {
    this.listener.event = event;
    this.listener.callback = callback;
  }

  emitEvent(eventName) {
    this.emit(eventName);
  }
}
