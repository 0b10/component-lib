import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Post } from "../components";

const componentName = "Post";

const content = {
  imgUrl:
    "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  title: "a title",
  body:
    "je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.",
  postID: "123456789",
  postUrl: "#"
};

storiesOf(componentName, module).add("A typical state", () => (
  <Post
    handleFavorite={action("handleFavorite")}
    handleReadLater={action("handleReadLater")}
    content={content}
  />
));

storiesOf(componentName, module).add("'Favorite' activated", () => (
  <Post
    favorited
    handleReadLater={action("handleReadLater")}
    handleFavorite={action("handleFavorite")}
    content={content}
  />
));

storiesOf(componentName, module).add("'Read later' activated", () => (
  <Post
    readLater
    handleReadLater={action("handleReadLater")}
    handleFavorite={action("handleFavorite")}
    content={content}
  />
));
