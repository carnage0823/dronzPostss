import React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

function PostHeader(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", pb: 1.5, gap: 1 }}>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            m: "-2px",
            borderRadius: "50%",
          },
        }}
      >
        <Avatar
          src={props.imgUrl}
          sx={{
            width: "6vh",
            height: "6vh",
          }}
        />
      </Box>
      <Typography component="span" fontWeight="lg">
        {props.name}
      </Typography>
      <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: "auto" }}>
        <MoreHoriz />
      </IconButton>
    </Box>
  );
}

export default PostHeader;
