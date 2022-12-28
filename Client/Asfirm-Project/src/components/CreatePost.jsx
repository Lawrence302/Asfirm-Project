import React from 'react';
import CreateProject from './CreateProject';
import NavBar from './NavBar';

function CreatePost(props) {
  return (
    <div>
      <NavBar />
      <CreateProject sub={props.sub} />
    </div>
  );
}

export default CreatePost;
