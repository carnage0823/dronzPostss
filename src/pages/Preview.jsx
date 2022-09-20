import React, { useEffect, useState } from "react";
import PostHeader from "../components/PostHeader";
import WriteComment from "../components/WriteComment";
import Posts from "../data2";
import CardMedia from "@mui/material/CardMedia";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import ReplyIcon from "@mui/icons-material/Reply";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import ReactHlsPlayer from "react-hls-player";

const user = 9;

function Preview({ selectedId }) {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  const [commentData, setCommentData] = useState(Posts);
  const [isLikeBoxRefresh, setIsLikeBoxRefresh] = useState(false);

  const likebuttonhandle = (id) => {
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
  return (
    <div>
      {windowSize.innerWidth > 800 && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "50%",
              position: "fixed",
              marginTop: "50px",
            }}
          >
            <div style={{ marginLeft: "50px", marginRight: "100px" }}>
              <PostHeader
                imgUrl={Posts[selectedId].profilePhotoUrl}
                name={Posts[selectedId].username}
              />
              <div>
                {(() => {
                  if (Posts[selectedId].medias[0] == null) {
                    return <div>{Posts[selectedId].textContent}</div>;
                  } else if (
                    Posts[selectedId].medias[0].mediaType === "PHOTO"
                  ) {
                    return (
                      <div>
                        <AspectRatio objectFit="contain">
                          <CardMedia
                            component="img"
                            height="100%"
                            width="100%"
                            src={Posts[selectedId].medias[0].mediaUrl}
                            controls
                            alt="Paella dish"
                            // onClick={(e) => {
                            //   priviewPage(id);
                            // }}
                          />
                        </AspectRatio>
                      </div>
                    );
                  } else if (
                    Posts[selectedId].medias[0].mediaType === "VIDEO"
                  ) {
                    return (
                      <div>
                        <AspectRatio objectFit="contain">
                          <ReactHlsPlayer
                            src={Posts[selectedId].medias[0].mediaUrl}
                            autoPlay={false}
                            controls={true}
                            width="60%"
                            height="auto"
                          />
                        </AspectRatio>
                      </div>
                    );
                  } else {
                    return console.log(Posts[selectedId].medias[0].mediaType);
                  }
                })()}
              </div>
              <Box
                sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}
              >
                <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <FavoriteBorder
                      onClick={(e) => {
                        likebuttonhandle(Posts[selectedId].postId);
                      }}
                      sx={Posts[selectedId].likes.map((i) => {
                        if (i === user) {
                          return { color: "red" };
                        }
                        return null;
                      })}
                    />
                  </IconButton>
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
                  sx={{
                    width: 0,
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
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
                {Posts[selectedId].likes.length}
              </Link>
              <Typography variant="caption" fontSize="sm">
                {(() => {
                  if (Posts[selectedId].medias[0] == null) {
                    return "";
                  } else {
                    return <div>{Posts[selectedId].textContent}</div>;
                  }
                })()}
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
                {Posts[selectedId].timestamp}
              </Link>
            </div>
          </div>

          <div style={{ width: "50%", marginLeft: "auto" }}>
            <div
              style={{
                backgroundColor: "white",
                width: "38%",
                height: "10%",
                position: "fixed",
                zIndex: "999",
                bottom: 0,
              }}
            >
              <div style={{ marginTop: "10px" }}>
                <WriteComment imgUrl={Posts[selectedId].profilePhotoUrl} />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                width: "38%",
                height: "10%",
                position: "fixed",
                zIndex: "999",
              }}
            >
              <h1>COMMENTS</h1>
            </div>
            <CardContent sx={{ marginTop: "100px", marginBottom: "50px" }}>
              {Posts[selectedId].comments.map((coms, id) => {
                return (
                  <div style={{ marginBottom: "20px" }}>
                    <Box component="span" key={id} id={id}>
                      <Box
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
                            {Posts[selectedId].timestamp}
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
                      </Box>
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
                                Posts[selectedId].postId,
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
                    </Box>
                  </div>
                );
              })}
            </CardContent>
          </div>
        </div>
      )}
      {windowSize.innerWidth <= 800 && (
        <div>
          <div
            style={{
              fontSize: "2vh",
            }}
          >
            <div
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              <PostHeader
                imgUrl={Posts[selectedId].profilePhotoUrl}
                name={Posts[selectedId].username}
              />

              {(() => {
                if (Posts[selectedId].medias[0] == null) {
                  return <div>{Posts[selectedId].textContent}</div>;
                } else if (Posts[selectedId].medias[0].mediaType === "PHOTO") {
                  return (
                    <div>
                      <AspectRatio objectFit="contain">
                        <CardMedia
                          component="img"
                          height="100%"
                          width="100%"
                          src={Posts[selectedId].medias[0].mediaUrl}
                          controls
                          alt="Paella dish"
                          // onClick={(e) => {
                          //   priviewPage(id);
                          // }}
                        />
                      </AspectRatio>
                    </div>
                  );
                } else if (Posts[selectedId].medias[0].mediaType === "VIDEO") {
                  return (
                    <div>
                      <AspectRatio objectFit="contain">
                        <ReactHlsPlayer
                          src={Posts[selectedId].medias[0].mediaUrl}
                          autoPlay={false}
                          controls={true}
                          width="60%"
                          height="auto"
                        />
                      </AspectRatio>
                    </div>
                  );
                } else {
                  return console.log(Posts[selectedId].medias[0].mediaType);
                }
              })()}

              <Box
                sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}
              >
                <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <FavoriteBorder
                      onClick={(e) => {
                        likebuttonhandle(Posts[selectedId].postId);
                      }}
                      sx={Posts[selectedId].likes.map((i) => {
                        if (i === user) {
                          return { color: "red" };
                        }
                        return null;
                      })}
                    />
                  </IconButton>
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
                  sx={{
                    width: 0,
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
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
                {Posts[selectedId].likes.length}
              </Link>
              <Typography variant="caption" fontSize="sm">
                {(() => {
                  if (Posts[selectedId].medias[0] == null) {
                    return "";
                  } else {
                    return <div>{Posts[selectedId].textContent}</div>;
                  }
                })()}
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
                {Posts[selectedId].timestamp}
              </Link>
            </div>
          </div>

          <div>
            <CardContent sx={{ marginBottom: "50px" }}>
              <div
                style={{
                  backgroundColor: "white",
                  width: "95%",
                  height: "10%",
                  position: "fixed",
                  zIndex: "999",
                  bottom: 0,
                }}
              >
                <div style={{ marginTop: "10px" }}>
                  <WriteComment imgUrl={Posts[selectedId].profilePhotoUrl} />
                </div>
              </div>

              {Posts[selectedId].comments.map((coms, id) => {
                return (
                  <Box
                    component="span"
                    key={id}
                    id={id}
                    sx={{ marginTop: "10px", marginLeft: "50px" }}
                  >
                    <Box
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
                          {Posts[selectedId].timestamp}
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
                    </Box>
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
                              Posts[selectedId].postId,
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
                  </Box>
                );
              })}
            </CardContent>
          </div>
        </div>
      )}
    </div>
  );
}
export default Preview;
