import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Header id="signout-page" as="h2" textAlign="center">
        <br />
        <p className="signout-page-2" style={{ color: "rgb(44, 62, 80)" }}>You have been logged out.</p>
        <div>
          <img className="signout-image" src="images/mask4.png"/></div>
        <br/>
        <Link to="/">
          <Button size="big" style={{ color: "rgb(44, 62, 80)" }} to="/">Return to Home</Button>
        </Link>
      </Header>
    );
  }
}
