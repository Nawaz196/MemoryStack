import React from "react";
import { InputAdornment, IconButton, Grid, TextField } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function InputAuth({
  name,
  handleChange,
  handleShowPassword,
  label,
  type,
  autoFocus,
}) {
  return (
    <Grid item xs={12} sm={12}>
      <TextField
        name={name}
        onChange={handleChange}
        label={label}
        variant="outlined"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}

export default InputAuth;
