import React from 'react'
import Avatar from "@mui/joy/Avatar";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import SendIcon from "@mui/icons-material/Send";


function WriteComment(props) {
  return (
    <CardOverflow
      sx={{
        p: "var(--Card-padding)",
        display: "flex",
      }}
    >
      <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
        <Avatar src={props.imgUrl} />
      </IconButton>
      <Input
        variant="plain"
        size="sm"
        placeholder="Add a comment…"
        sx={{
          flexGrow: 1,
          mr: 1,
          "--Input-focusedThickness": "0px",
        }}
      />
      <Link underline="none" role="button">
        <SendIcon />
      </Link>
    </CardOverflow>
  );
}

export default WriteComment