<div className="landing-container">
  <div className="landing-header">
    <div className="landing-header-section">
      <img className="landing-icon" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg" />
      <div className="landing-header-spacer" />
        <div className="landing-header-left">
          <Link className="landing-sign-up-bar" to='/signup'>Sign Up</Link>
          <Link className="landing-login-bar" to='/login'>Log In</Link>
        </div>
      </div>
    </div>
  </div>
</div>


<img className="board-menu-dropdown-icon" src="https://trello.com/favicon.ico"/>  "https://cdn.worldvectorlogo.com/logos/trello.svg"

.landing-container{
  display: flex;
  font-family: sans-serif;
}

.landing-icon{
  width: 150px;
  height: 50px;
  border: 1px dotted black;
  padding: 1px;
}
.landing-header{
  display: flex;
  padding: 10px;
  justify-content: space-between;
  background-color: #0079BF

}

.landing-sign-up-bar{
  border: 1px solid green;
  align-self: flex-end;
  /*vertical-align: center;*/
  padding: 5px;
  border-radius: 15px;
  background: gray;
}

.landing-login-bar{
  border: 1px solid green;
  align-self: flex-end;
  padding: 5px;
  border-radius: 15px;
  background: gray;

}


.landing-body-text{
  border: 1px solid black;

}
