import React from "react";
import {
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";

import { makeStyles, withStyles } from "@material-ui/core";

const style = makeStyles({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "240px",
    height: "100%",
    backgroundColor: "#D3D3D3",
    borderRight: "5px solid #ffff00",
  },
});

const Sidebar = ({ value, hangleChange, dataKey }) => {
  const classes = style();
  return (
    <FormControl component="fieldset" className={classes.sideMenu}>
      {/* <FormLabel>Vocabulary</FormLabel> */}
      <TextField
        id="filled-basic"
        label="Vocabulary"
        variant="filled"
        disabled
      />
      <RadioGroup
        aria-label="quiz"
        name="quiz"
        value={value}
        onChange={hangleChange}
      >
        {dataKey.map((key, index) => {
          return (
            <FormControlLabel
              key={index}
              value={key}
              control={<Radio />}
              label={key}
            />
          );
        })}

        {/* <FormControlLabel
              value="worst"
              control={<Radio />}
              label="The worst."
            /> */}
      </RadioGroup>
    </FormControl>
  );
};

export default Sidebar;
