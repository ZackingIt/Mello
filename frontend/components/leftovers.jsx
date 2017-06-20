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



.landing-container{
  display: flex;
  /*flex-direction: column;*/
  /*min-height: 100vh;
  min-width: 100%;*/
  font-family: sans-serif;
  /*border: 2px solid indigo;*/
}

.landing-icon{
  width: 150px;
  height: 50px;
  border: 1px dotted black;
  padding: 1px;
}
.landing-header{
  /*height: 10vh;*/
  display: flex;
  padding: 10px;
  /*flex-direction: row;*/
  /*align-items: center*/
  justify-content: space-between;
  background-color: #0079BF

}

/*.landing-header-spacer{
  width: 87%;
  border: 1px solid pink;
}*/

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
  /*vertical-align: center;*/
  padding: 5px;
  border-radius: 15px;
  background: gray;

}


.landing-body-text{
  border: 1px solid black;

}
