import React from "react";
// 3rd party
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import CssBaseLine from "@material-ui/core/CssBaseline";
// Local
import { Posts, Post } from "./Posts";
import { ThemeProvider, themes } from "../ThemeProvider";
import {
  postStubPropsFactory,
  postsStubPropsFactory
} from "./__helpers__/stubs";

// >>> POST COMPONENT >>>
storiesOf("Post", module)
  .add("'Favorite' activated", () => (
    <ThemeProvider theme={themes.light}>
      <CssBaseLine />
      <Post
        {...postStubPropsFactory()}
        handleReadLater={action("handleReadLater")}
        handleFavorite={action("handleFavorite")}
        handlePostClick={action("handlePostClick")}
        handleTagClick={action("handleTagClick")}
        favorite
      />
    </ThemeProvider>
  ))
  .add("'Read later' activated", () => (
    <ThemeProvider theme={themes.light}>
      <CssBaseLine />
      <Post
        {...postStubPropsFactory()}
        readLater
        handleReadLater={action("handleReadLater")}
        handleFavorite={action("handleFavorite")}
        handlePostClick={action("handlePostClick")}
        handleTagClick={action("handleTagClick")}
      />
    </ThemeProvider>
  ));

// >>> POSTS COMPONENT >>>
const postContainerComponent = "Posts";

storiesOf(postContainerComponent, module)
  .add("Light theme", () => (
    <ThemeProvider theme="light">
      <CssBaseLine />
      <Posts
        {...postsStubPropsFactory()}
        handleFavorite={action("handleFavorite")}
        handleReadLater={action("handleReadLater")}
        handlePostClick={action("handlePostClick")}
        handleTagClick={action("handleTagClick")}
      />
    </ThemeProvider>
  ))
  .add("Dark theme", () => (
    <ThemeProvider theme="dark">
      <CssBaseLine />
      <Posts
        {...postsStubPropsFactory()}
        handleFavorite={action("handleFavorite")}
        handleReadLater={action("handleReadLater")}
        handlePostClick={action("handlePostClick")}
        handleTagClick={action("handleTagClick")}
      />
    </ThemeProvider>
  ));

storiesOf(postContainerComponent, module).add("Default theme", () => (
  <ThemeProvider>
    <CssBaseLine />
    <Posts
      {...postsStubPropsFactory()}
      handleFavorite={action("handleFavorite")}
      handleReadLater={action("handleReadLater")}
      handlePostClick={action("handlePostClick")}
      handleTagClick={action("handleTagClick")}
    />
  </ThemeProvider>
));
