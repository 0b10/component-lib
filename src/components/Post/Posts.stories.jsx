import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Posts, Post } from "./Posts";
import { ThemeProvider, themes } from "../ThemeProvider";

// >>> POST COMPONENT >>>
storiesOf("Post", module)
  .add("'Favorite' activated", () => (
    <ThemeProvider theme={themes.light}>
      <Post
        eventNames={{
          failedRemoveFavorite: "failedRemoveFavorite",
          failedAddFavorite: "failedAddFavorite",
          failedRemoveReadLater: "failedRemoveReadLater",
          failedAddReadLater: "failedAddReadLater"
        }}
        favorite
        handleReadLater={action("handleReadLater")}
        handleFavorite={action("handleFavorite")}
        handlePostClick={action("handlePostClick")}
        handleTagClick={action("handleTagClick")}
        content={content}
        postsStore={postsStore}
      />
    </ThemeProvider>
  ))
  .add("'Read later' activated", () => (
    <ThemeProvider theme={themes.light}>
      <Post
        eventNames={{
          failedRemoveFavorite: "failedRemoveFavorite",
          failedAddFavorite: "failedAddFavorite",
          failedRemoveReadLater: "failedRemoveReadLater",
          failedAddReadLater: "failedAddReadLater"
        }}
        readLater
        handleReadLater={action("handleReadLater")}
        handleFavorite={action("handleFavorite")}
        handlePostClick={action("handlePostClick")}
        handleTagClick={action("handleTagClick")}
        content={content}
        postsStore={postsStore}
      />
    </ThemeProvider>
  ));

// >>> POSTS COMPONENT >>>
const postContainerComponent = "Posts";

storiesOf(postContainerComponent, module)
  .add("Light theme", () => (
    <ThemeProvider theme="light">
      <Posts
        handleFavorite={action("handleFavorite")}
        handleReadLater={action("handleReadLater")}
        handlePostClick={action("handlePostClick")}
        handleTagClick={action("handleTagClick")}
        getPosts={getPosts}
        eventNames={{
          postsUpdated: "postsUpdated",
          failedRemoveFavorite: "failedRemoveFavorite",
          failedAddFavorite: "failedAddFavorite",
          failedRemoveReadLater: "failedRemoveReadLater",
          failedAddReadLater: "failedAddReadLater"
        }}
        postsStore={postsStore}
      />
    </ThemeProvider>
  ))
  .add("Dark theme", () => (
    <ThemeProvider theme="dark">
      <Posts
        handleFavorite={action("handleFavorite")}
        handleReadLater={action("handleReadLater")}
        handlePostClick={action("handlePostClick")}
        handleTagClick={action("handleTagClick")}
        getPosts={getPosts}
        eventNames={{
          postsUpdated: "postsUpdated",
          failedRemoveFavorite: "failedRemoveFavorite",
          failedAddFavorite: "failedAddFavorite",
          failedRemoveReadLater: "failedRemoveReadLater",
          failedAddReadLater: "failedAddReadLater"
        }}
        postsStore={postsStore}
      />
    </ThemeProvider>
  ));

storiesOf(postContainerComponent, module).add("Default theme", () => (
  <ThemeProvider>
    <Posts
      handleFavorite={action("handleFavorite")}
      handleReadLater={action("handleReadLater")}
      handlePostClick={action("handlePostClick")}
      handleTagClick={action("handleTagClick")}
      getPosts={getPosts}
      eventNames={{
        postsUpdated: "postsUpdated",
        failedRemoveFavorite: "failedRemoveFavorite",
        failedAddFavorite: "failedAddFavorite",
        failedRemoveReadLater: "failedRemoveReadLater",
        failedAddReadLater: "failedAddReadLater"
      }}
      postsStore={postsStore}
    />
  </ThemeProvider>
));

// >>> HELPERS >>>
// ~~~ Store ~~~
const postsStore = {
  on: eventName =>
    console.info(`postsStore event listener:${eventName} registered`)
};

// ~~~ Content ~~~
// +++ for Post +++
const content = {
  imgUrl:
    "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  title: "a title",
  body:
    "je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.",
  postID: "123456789",
  postUrl: "ctuyweyut",
  createdAt: Date.now(),
  modifiedAt: Date.now(),
  tags: ["tag", "loooooooong tag", "a"]
};

// +++ for Posts +++
const getPosts = () => [
  {
    imgUrl:
      "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "a longer than usual title to demonstrate how it looks",
    body:
      "je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.",
    postID: "1",
    postUrl: "usbevqtr",
    favorite: true,
    readLater: true,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    tags: ["tag", "tag", "tag", "tag", "tag", "loooooooong tag", "a"]
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "sesquipedalian",
    body:
      'Navzdory všeobecnému přesvědčení Lorem Ipsum není náhodný text. Jeho původ má kořeny v klasické latinské literatuře z roku 45 před Kristem, což znamená, že je více jak 2000 let staré. Richard McClintock, profesor latiny na univerzitě Hampden-Sydney stát Virginia který se zabýval téměř neznámými latinskými slovy, odhalil prapůvod slova consectetur z pasáže Lorem Ipsum. Nejstarším dílem, v němž se pasáže Lorem Ipsum používají, je Cicerova kniha z roku 45 před Kristem s názvem "De Finibus Bonurum et Malorum" (O koncích dobra a zla), konkrétně jde pak o kapitoly 1.10.32 a 1.10.33. Tato kniha byla nejvíce známá v době renesance, jelikož pojednávala o etice. Úvodní řádky Lorem Ipsum, "Lorem ipsum dolor sit amet...", pocházejí z kapitoly 1.10.32 z uvedené knihy.\nKlasické pasáže Lorem Ipsum z 16. století jsou reprodukovány níže. Kapitoly 1.10.32 a 1.10.33 z "De Finibus Bonorum et Malorum" od Cicera najdete v původní podobě doplněné o anglický překlad z roku 1914 od H. Rackhama.',
    postID: "2",
    postUrl: "yiuwemsdh",
    favorite: false,
    readLater: false,
    createdAt: 0,
    modifiedAt: Date.now(),
    tags: ["tag", "loooooooong tag", "a"]
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "a title",
    body:
      "je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.",
    postID: "3",
    postUrl: "76ehkqjwhe",
    favorite: true,
    readLater: false,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    tags: ["tag"]
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "a title",
    body:
      "je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.",
    postID: "4",
    postUrl: "dhqwue187",
    favorite: false,
    readLater: true,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    tags: [
      "tag",
      "tag",
      "tag",
      "tag",
      "tag",
      "loooooooong tag",
      "a",
      "tag",
      "tag",
      "tag",
      "tag",
      "tag",
      "loooooooong tag",
      "a",
      "tag",
      "tag",
      "tag",
      "tag",
      "tag",
      "loooooooong tag",
      "a"
    ]
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "a title",
    body:
      "je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu. Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny. Nejvíce popularizováno bylo Lorem Ipsum v šedesátých letech 20. století, kdy byly vydávány speciální vzorníky s jeho pasážemi a později pak díky počítačovým DTP programům jako Aldus PageMaker.",
    postID: "5",
    postUrl: "kviewuiryu",
    favorite: false,
    readLater: false,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    tags: ["tag", "tag", "tag", "tag", "tag", "loooooooong tag", "a"]
  }
];
