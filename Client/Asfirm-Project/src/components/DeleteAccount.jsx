import React from 'react';

function DeleteAccount() {
  return (
    <div>
      <h1>Delete Account</h1>
      <form>
        <input type="email" placeholder="email" /> <br />
        <input type="password" placeholder="password" /> <br />
        <input type="password" placeholder="confirm Password" /> <br />
      </form>
      <div></div>
    </div>
  );
}

export default DeleteAccount;
