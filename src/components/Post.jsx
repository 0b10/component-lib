import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";
import FilledFavoriteIcon from "@material-ui/icons/Favorite";
import HollowFavoriteIcon from "@material-ui/icons/FavoriteBorder";
import FilledReadLaterIcon from "@material-ui/icons/TurnedIn";
import HollowReadLaterIcon from "@material-ui/icons/TurnedInNot";
import { styled } from "@material-ui/styles";
import "typeface-roboto";
import { style } from "@material-ui/system";

// >>> COMPONENT >>>
export class Post extends PureComponent {
  constructor(props) {
    super(props);
    this.isFavorited = this.isFavorited.bind(this);
    this.isReadLater = this.isReadLater.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  // ~~~ Helpers ~~~
  isFavorited() {
    const { favorited } = this.props;
    return typeof favorited === "boolean" ? favorited : null; // FIXME: check store here with this.postID, return bool
  }

  isReadLater() {
    const { readLater } = this.props;
    return typeof readLater === "boolean" ? readLater : null; // FIXME: check store here with this.postID, return bool
  }

  getContent() {
    const { content } = this.props;
    return content ? content : null; // FIXME: get content from store: { imgUrl, title, body, postID }
    // ! It might be a good idea to index (dictionary) content by postID, but sorted - easier to lookup
  }

  // ~~~ View ~~~
  render() {
    const { handleReadLater, handleFavorite } = this.props;
    const { title, body, imgUrl, postID, postUrl } = this.getContent();
    return (
      <Card>
        <a href={postUrl} style={{ textDecoration: "none", color: "inherit" }}>
          <StyledCardMedia image={imgUrl} />
          <CardContent>
            <StyledH2 component="h2">{title}</StyledH2>
            <StyledParagraph>{body}</StyledParagraph>
          </CardContent>
        </a>
        <StyledCardActionArea>
          {this.isReadLater() ? (
            <IconButton
              onClick={() => handleReadLater("remove", postID)}
              aria-label="Remove from read later"
            >
              <FilledReadLaterIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleReadLater("add", postID)}
              aria-label="Add to read later"
            >
              <HollowReadLaterIcon />
            </IconButton>
          )}
          {this.isFavorited() ? (
            <IconButton
              onClick={() => handleFavorite("remove", postID)}
              aria-label="Remove from favorites"
            >
              <FilledFavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleFavorite("add", postID)}
              aria-label="Add to favorites"
            >
              <HollowFavoriteIcon />
            </IconButton>
          )}
        </StyledCardActionArea>
      </Card>
    );
  }
}

// >>> STYLED COMPONENTS >>>
const StyledCardMedia = styled(CardMedia)({
  height: "200px"
});

const StyledH2 = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  textTransform: "capitalize"
});

const StyledParagraph = styled(Typography)({
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  textAlign: "justify"
});

const StyledCardActionArea = styled(CardActionArea)({
  display: "flex",
  justifyContent: "flex-end"
});

// >>> PROPTYPES >>
Post.propTypes = {
  content: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    postID: PropTypes.string.isRequired
  }).isRequired,
  favorited: PropTypes.bool,
  readLater: PropTypes.bool,
  handleReadLater: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired
};
