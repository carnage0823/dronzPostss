import { React, useEffect, useState } from "react";
import PostHeader from "../components/PostHeader";
import WriteComment from "../components/WriteComment";
import CardMedia from "@mui/material/CardMedia";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ReactHlsPlayer from "react-hls-player";
import Videojs from "../components/video";
import { ImageGrid } from "react-fb-image-video-grid";
import VisibilitySensor from "react-visibility-sensor";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  color: !expand ? "black" : "rgb(28, 188, 199)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

let expandedIndex = [];
const user = 9;

export default function DronzUpPost({ setSelectedId, setDATA }) {
  let navigate = useNavigate();
  const [commentData, setCommentData] = useState([]);
  const [isCommentBoxRefresh, setIsCommentBoxRefresh] = useState(false);
  const [isLikeBoxRefresh, setIsLikeBoxRefresh] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const commentbuttonhandle = (id) => {
    commentData.map((items) => {
      if (items.id === id) {
        items.active_comment = !items.active_comment;
        items.expand = !items.expand;
      }
      return null;
    });
    setCommentData(commentData);
    setIsCommentBoxRefresh(!isCommentBoxRefresh);
  };

  const likebuttonhandle = (id, e) => {
    commentData.map((items) => {
      if (items["postId"] === id) {
        if (items["likes"].includes(user)) {
          let index = items["likes"].indexOf(user);
          items["likes"].splice(index, 1);
        } else {
          items["likes"].push(user);
        }
      }
      return null;
    });
    setCommentData(commentData);
    setIsLikeBoxRefresh(!isLikeBoxRefresh);
  };
  const commentLikebuttonhandle = (pid, cid) => {
    commentData.map((items) => {
      if (items["postId"] === pid) {
        items.comments.map((stuff) => {
          if (stuff.commentId === cid) {
            if (stuff["likes"].includes(user)) {
              let index = stuff["likes"].indexOf(user);
              stuff["likes"].splice(index, 1);
            } else {
              stuff["likes"].push(user);
            }
          }
          return null;
        });
      }
      return null;
    });

    setCommentData(commentData);
    setIsLikeBoxRefresh(!isLikeBoxRefresh);
  };

  const handleExpandClick = (id) => {
    if (expandedIndex.includes(id)) {
      setExpanded(true);
      expandedIndex = [];
    } else {
      expandedIndex = [];
      setExpanded(false);
      expandedIndex = [id];
      setExpanded(true);
    }
  };
  const priviewPage = (id) => {
    navigate("../preview");
    setSelectedId(id);
    setDATA(commentData);
    console.log(id);
    console.log(commentData);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    fetch("https://coursebuddy.org/ws-dronzup/post?userId=2&isFirstPage=true", {
      method: "GET",
      headers: {
        deviceType: "ios",
        buildVersion: "800",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setCommentData(data.posts);
      });
  }, []);

  return (
    <div className="postBody">
      {commentData.map((items, id) => (
        <Card
          key={id}
          id={id}
          variant="outlined"
          sx={{
            minWidth: 330,
            "--Card-radius": (theme) => theme.vars.radius.xs,
          }}
        >
          <PostHeader imgUrl={items.profilePhotoUrl} name={items.username} />

          {items.medias.length > 0 && (
            <ImageGrid showModal={false}>
              {items.medias.map((i) => {
                if (i.mediaType === "PHOTO") {
                  return (
                    <AspectRatio objectFit="contain">
                      <CardMedia
                        onClick={(e) => {
                          priviewPage(id);
                        }}
                        component="img"
                        height="100%"
                        width="100%"
                        src={i.mediaUrl}
                        controls
                        alt="Paella dish"
                      />
                    </AspectRatio>
                  );
                } else {
                  return (
                    <VisibilitySensor>
                      {({ isVisible }) => {
                        const videoJsOptions = {
                          muted: true,
                          autoplay: isVisible ? true : false,
                          playbackRates: [0.5, 1, 1.25, 1.5, 2],
                          width: 720,
                          height: 300,
                          controls: true,
                          sources: [
                            {
                              src: i.mediaUrl,
                              type: "application/x-mpegURL",
                            },
                          ],
                        };
                        return (
                          <AspectRatio objectFit="contain">
                            <div>
                              <Videojs {...videoJsOptions} />
                            </div>
                          </AspectRatio>
                        );
                      }}
                    </VisibilitySensor>
                  );
                }
              })}
            </ImageGrid>
          )}
          <div>
            {(() => {
              if (items.medias.length === 0) {
                return <div>{items.textContent}</div>;
              }
            })()}
          </div>

          <Box sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}>
            <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <FavoriteBorder
                  onClick={(e) => {
                    likebuttonhandle(items.postId);
                  }}
                  sx={items.likes.map((i) => {
                    if (i === user) {
                      return { color: "red" };
                    }
                    return null;
                  })}
                />
              </IconButton>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expandedIndex.includes(id)}
                  onClick={() => {
                    handleExpandClick(id);
                  }}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ModeCommentOutlined
                    onClick={(e) => {
                      commentbuttonhandle(items.id);
                    }}
                  />
                </ExpandMore>
              </CardActions>
              <IconButton variant="plain" color="neutral" size="sm">
                <ShareSharpIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mx: "auto",
              }}
            >
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    borderRadius: "50%",
                    width: `max(${6 - index}px, 3px)`,
                    height: `max(${6 - index}px, 3px)`,
                    bgcolor:
                      index === 0 ? "primary.solidBg" : "background.level3",
                  }}
                />
              ))}
            </Box>
            <Box
              sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}
            >
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
              ></IconButton>
            </Box>
          </Box>
          <Link
            component="button"
            underline="none"
            fontSize="sm"
            fontWeight="lg"
            textColor="text.primary"
          >
            {items.likes.length}
          </Link>
          <Typography variant="caption" fontSize="sm">
            {items.medias[0] == null ? "" : items.textContent}
          </Typography>
          <Link
            component="button"
            underline="none"
            fontSize="sm"
            // startDecorator="…"
            sx={{ color: "text.tertiary" }}
          >
            {/* more */}
          </Link>
          <Link
            component="button"
            underline="none"
            fontSize="10px"
            sx={{ color: "text.tertiary", my: 0.5 }}
          >
            {items.timestamp}
          </Link>
          <div>
            <Collapse
              in={expandedIndex.includes(id)}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {items.comments.slice(0, 3).map((coms, id) => {
                  return (
                    <Typography
                      component="span"
                      key={id}
                      id={id}
                      sx={{ marginTop: "10px" }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Avatar size="sm" src={coms.profilePhotoUrl} />
                        <Typography
                          component={"span"}
                          variant={"body2"}
                          sx={{
                            backgroundColor: "rgb(28, 188, 199)",
                            width: "60%",
                            marginTop: "0",
                            marginLeft: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <span style={{ fontSize: "12px" }}>{coms.name}</span>
                          <span style={{ float: "right", fontSize: "12px" }}>
                            {items.timestamp}
                          </span>
                          <br />
                          <div
                            style={{
                              marginTop: "10px",
                              marginBottom: "10px",
                              color: "white",
                              fontSize: "2vh",
                            }}
                          >
                            <div>
                              {(() => {
                                if (coms.media !== null) {
                                  if (coms.media.mediaType === "VIDEO") {
                                    return (
                                      <div>
                                        <AspectRatio>
                                          <ReactHlsPlayer
                                            src={coms.media.mediaUrl}
                                            autoPlay={false}
                                            controls={true}
                                            width="60%"
                                            height="auto"
                                          />
                                        </AspectRatio>
                                      </div>
                                    );
                                  } else if (coms.media.mediaType === "PHOTO") {
                                    return (
                                      <div>
                                        <AspectRatio objectFit="contain">
                                          <CardMedia
                                            component="img"
                                            height="100%"
                                            width="100%"
                                            src={coms.media.mediaUrl}
                                            controls
                                            alt="Paella dish"
                                          />
                                        </AspectRatio>
                                      </div>
                                    );
                                  }
                                }
                              })()}
                            </div>
                            {coms.text}
                          </div>
                          <span style={{ fontSize: "12px" }}>
                            {coms.likes.length}
                          </span>
                        </Typography>
                      </Typography>
                      <Typography>
                        <IconButton
                          sx={{ marginLeft: "40px" }}
                          variant="plain"
                          color="neutral"
                          size="sm"
                        >
                          <FavoriteBorder
                            onClick={(e, i) => {
                              commentLikebuttonhandle(
                                items.postId,
                                coms.commentId
                              );
                            }}
                            sx={coms.likes.map((i) => {
                              if (i === user) {
                                return { color: "red" };
                              }
                              return null;
                            })}
                          />
                        </IconButton>
                        <IconButton
                          sx={{}}
                          variant="plain"
                          color="neutral"
                          size="sm"
                        >
                          <ReplyIcon
                            // onClick={(e) => {
                            //   likebuttonhandle(items.id);
                            // }}
                            sx={
                              // items.like_post
                              //   ? { color: "red" }
                              //   :
                              { color: "black" }
                            }
                          />
                        </IconButton>
                      </Typography>
                    </Typography>
                  );
                })}
              </CardContent>
              <Typography variant="button" style={{ marginLeft: "50px" }}>
                <Button
                  variant="text"
                  onClick={(e) => {
                    priviewPage(id);
                  }}
                >
                  ...More
                </Button>
              </Typography>
            </Collapse>
          </div>
          <WriteComment imgUrl={items.profilePhotoUrl} />
        </Card>
      ))}
    </div>
  );
}
