import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Hidden,
  IconButton,
  Typography
} from "@material-ui/core";
import {
  Favorite as FilledFavoriteIcon,
  FavoriteBorder as HollowFavoriteIcon,
  TurnedIn as FilledReadLaterIcon,
  TurnedInNot as HollowReadLaterIcon
} from "@material-ui/icons";
import { styled, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "typeface-roboto";

// TODO: Add event subscriptions for the inner components
// TODO: write snapshot tests

// >>> COMPONENTS >>>
// ~~~ Container ~~~
export class Posts extends PureComponent {
  componentWillMount() {
    const { postsStore, eventNames } = this.props;
    postsStore.on(eventNames.postsUpdated, this.forceUpdate);
  }

  render() {
    const {
      eventNames,
      handleFavorite,
      handleReadLater,
      handlePostClick,
      handleTagClick,
      getPosts,
      postsStore
    } = this.props;
    // ! getPosts: It might be a good idea to index (dictionary) content by postID, but sorted - easier to lookup

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {getPosts().map((post, index) => (
          <Post
            content={post}
            eventNames={eventNames}
            handleFavorite={handleFavorite}
            handlePostClick={handlePostClick}
            handleReadLater={handleReadLater}
            handleTagClick={handleTagClick}
            key={index}
            postsStore={postsStore}
          />
        ))}
      </Grid>
    );
  }
}

// ~~~ Content Item ~~~
export class Post extends PureComponent {
  render() {
    const {
      content,
      eventNames,
      handleFavorite,
      handlePostClick,
      handleReadLater,
      handleTagClick,
      postsStore
    } = this.props;

    const {
      body,
      createdAt,
      favorite,
      imgUrl,
      modifiedAt,
      postID,
      postUrl,
      readLater,
      tags,
      title
    } = content;

    // TODO: make long words wrap - h2, and body text
    return (
      <Grid item xs={12} md={6} lg={4} xl={3} m={2}>
        <ResponsivePostBox>
          <Card>
            <CardActionArea onClick={() => handlePostClick(postUrl)}>
              <Hidden only="xs">
                <StyledCardMedia image={imgUrl} />
              </Hidden>
              <CardContent>
                <Hidden only="xs">
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                  >
                    <Grid item>
                      <PostDate dates={{ modifiedAt, createdAt }} />
                    </Grid>
                  </Grid>
                </Hidden>
                <StyledH2>{title}</StyledH2>
                <StyledBodyText>{body}</StyledBodyText>
              </CardContent>
            </CardActionArea>
            <Hidden only="xs">
              <StyledTagContainer>
                {tags.map((text, index) => (
                  <StyledTag
                    key={index}
                    clickable
                    onClick={() => handleTagClick(text)}
                    variant="outlined"
                    size="small"
                    label={text}
                  />
                ))}
              </StyledTagContainer>
            </Hidden>
            <StyledCardActions>
              <ActionButton
                active={this.props.readLater || readLater}
                actionHandler={handleReadLater}
                ariaLabel="Read Later"
                eventNames={{
                  failedRemove: eventNames.failedRemoveReadLater,
                  failedAdd: eventNames.failedAddReadLater
                }}
                icons={{
                  active: FilledReadLaterIcon,
                  inactive: HollowReadLaterIcon
                }}
                postID={postID}
                postsStore={postsStore}
              />
              <ActionButton
                active={this.props.favorite || favorite}
                actionHandler={handleFavorite}
                ariaLabel="Favorite"
                eventNames={{
                  failedRemove: eventNames.failedRemoveFavorite,
                  failedAdd: eventNames.failedAddFavorite
                }}
                icons={{
                  active: FilledFavoriteIcon,
                  inactive: HollowFavoriteIcon
                }}
                postID={postID}
                postsStore={postsStore}
              />
            </StyledCardActions>
          </Card>
        </ResponsivePostBox>
      </Grid>
    );
  }
}

// ~~~ Action Buttons ~~~
export class ActionButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { active: this.props.active };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { postsStore, eventNames, postID: postID_ } = this.props;
    postsStore.on(
      eventNames.failedRemove,
      postID => postID === postID_ && this.setState({ active: true }) // Reactivate icon if store state change failed.
    );
    postsStore.on(
      eventNames.failedAdd,
      postID => postID === postID_ && this.setState({ active: false }) // Reactivate icon if store state change failed.
    );
  }

  handleClick(action, postID) {
    const { actionHandler } = this.props;
    actionHandler(action, postID);
    this.setState({ active: !this.state.active });
  }

  render() {
    const { ariaLabel, postID, icons } = this.props;
    const { active: ActiveIcon, inactive: InactiveIcon } = icons;

    return this.state.active ? (
      <IconButton
        onClick={() => this.handleClick("remove", postID)}
        aria-label={ariaLabel}
      >
        <ActiveIcon />
      </IconButton>
    ) : (
      <IconButton
        onClick={() => this.handleClick("add", postID)}
        aria-label={ariaLabel}
      >
        <InactiveIcon />
      </IconButton>
    );
  }
}

// ~~~ Post Date ~~~
export class PostDate extends PureComponent {
  constructor(props) {
    super(props);
    this.getDateString = this.getDateString.bind(this);
  }

  getDateString() {
    const { createdAt, modifiedAt } = this.props.dates;

    const modified = modifiedAt > createdAt;
    const postDate = modified ? modifiedAt : createdAt;

    return modified
      ? `Modified: ${new Date(postDate).toDateString()}`
      : new Date(postDate).toDateString();
  }

  render() {
    return (
      <Typography variant="body2" component="span">
        {this.getDateString()}
      </Typography>
    );
  }
}

// >>> STYLES >>>
export const StyledBodyText = styled(Typography)({
  textAlign: "justify"
});

export const StyledCardActions = styled(CardActions)({
  display: "flex",
  paddingTop: "0px",
  justifyContent: "flex-end"
});

export const StyledCardMedia = styled(CardMedia)({
  height: "200px" // ! required to display the image
});

export const StyledH2 = props => (
  <Box my={2}>
    <Typography variant="h2">{props.children}</Typography>
  </Box>
);

export const StyledTag = styled(Chip)({
  marginRight: "7px",
  marginBottom: "11px",
  minWidth: "35px",
  fontWeight: 100 // FIXME: not ideal. Should be part of the theme
});

export const StyledTagContainer = styled(CardContent)({
  paddingTop: "5px",
  paddingBottom: "0px"
});

// ~~~ Responsive Components ~~~
export const ResponsivePostBox = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only("xs"));
  return matches ? (
    // ! Margins must be explicitly overridden between each state, otherwise they carry over
    <React.Fragment>
      <Box m={0} boxShadow={8}>
        {props.children}
      </Box>
      <Divider variant="middle" />
    </React.Fragment>
  ) : (
    <Box m={3} boxShadow={8}>
      {props.children}
    </Box>
  );
};

// >>> PROPTYPES >>
ActionButton.propTypes = {
  active: PropTypes.bool.isRequired,
  actionHandler: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  eventNames: PropTypes.shape({
    failedAdd: PropTypes.string.isRequired,
    failedRemove: PropTypes.string.isRequired
  }).isRequired,
  icons: PropTypes.shape({
    active: PropTypes.object.isRequired,
    inactive: PropTypes.object.isRequired
  }).isRequired,
  postID: PropTypes.string.isRequired, // BUG: no error is thrown when postID is undefined
  postsStore: PropTypes.object.isRequired
};

Post.propTypes = {
  content: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    postID: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    modifiedAt: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired,
  favorite: PropTypes.bool,
  eventNames: PropTypes.shape({
    failedAddFavorite: PropTypes.string.isRequired,
    failedAddReadLater: PropTypes.string.isRequired,
    failedRemoveFavorite: PropTypes.string.isRequired,
    failedRemoveReadLater: PropTypes.string.isRequired
  }).isRequired,
  readLater: PropTypes.bool,
  handlePostClick: PropTypes.func.isRequired,
  handleReadLater: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleTagClick: PropTypes.func.isRequired
};

Posts.propTypes = {
  eventNames: PropTypes.shape({
    failedAddFavorite: PropTypes.string.isRequired,
    failedAddReadLater: PropTypes.string.isRequired,
    failedRemoveFavorite: PropTypes.string.isRequired,
    failedRemoveReadLater: PropTypes.string.isRequired,
    postsUpdated: PropTypes.string.isRequired
  }).isRequired,
  getPosts: PropTypes.func.isRequired,
  handleReadLater: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handlePostClick: PropTypes.func.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  postsStore: PropTypes.object.isRequired
};

export {
  FilledFavoriteIcon,
  HollowFavoriteIcon,
  FilledReadLaterIcon,
  HollowReadLaterIcon
};
