import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Post from "./Post/Post";
import useStyles from "./Styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  const classes = useStyles();
  console.log(posts);

  return (
    <div className={classes.mainContainer}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
      {/* Doubt : above here we used normal round brackets instead of curly brackets. Dont know the reason.
      after the arrow function we used.Why we need to use that ??
      what about the curly brackets whats the issue?? */}
    </div>
  );
};

export default Posts;
