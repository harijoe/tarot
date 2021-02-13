import React from "react";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: ({ checked }) => (checked ? { color: "green" } : { color: "red" }),
});

const BooleanField = ({ checked, ...props }) => {
  const classes = useStyles({ checked });
  const Icon = checked ? CheckRoundedIcon : ClearRoundedIcon;
  return <Icon className={classes.root} {...props} />;
};

export default BooleanField;
