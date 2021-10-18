import React from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import { Fade } from "react-slideshow-image";
import { Link } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <LandingCall />
      </div>
    );
  }
}

class LandingCall extends React.Component {
  render() {
    const fadeImages = [
      {
        url: "images/meteor-logo.png",
        caption: "First Slide",
      },
      {
        url: "images/meteor-logo.png",
        caption: "Second Slide",
      },
      {
        url: "images/meteor-logo.png",
        caption: "Third Slide",
      },
    ];
    return (
      <Grid columns={2}>
        <Grid.Column>
            <div className="slide-container">
              <Fade>
                {fadeImages.map((fadeImage, index) => (
                  <div className="each-fade" key={index}>
                    <div className="image-container">
                      <img src={fadeImage.url} />
                    </div>
                    <h2>{fadeImage.caption}</h2>
                  </div>
                ))}
              </Fade>
            </div>
        </Grid.Column>
        <Grid.Column>
          <Grid
            className="landing-page"
            verticalAlign="middle"
            textAlign="center"
            columns={1}
            id="landing"
          >
            <Grid.Column>
              <Image
                size="large"
                verticalAlign="middle"
                circular
                src="/images/meteor-logo.png"
              />
            </Grid.Column>
            <Grid.Column>
              <Header style={{ color: "#FFFFFF" }} as="h1">
                Add your event and get pre-checked!
              </Header>
              <h3>
                <p style={{ color: "#FFFFFF" }}>
                  Now get to work and modify this app!
                </p>
              </h3>
              <Link to="/signup">
                <Button to="/signup">Sign Up</Button>
              </Link>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

class ImageCall extends React.Component {
  render() {
    const switchImg = {
      duration: 1500,
      transitionDuration: 50,
    };

    const imageFormat = { width: "200px" };

    return (
      <div className="landing-image-calls">
        <Grid container stackable centered columns={1}>
          <Grid.Column textAlign="center">
            <Header inverted as="h2" textAlign="center">
              CURRENT COVID EVENTS
            </Header>
          </Grid.Column>
        </Grid>
        <Fade {...switchImg}>
          <div className="switch-image">
            <img
              className="ui rounded centered image"
              src="images/meteor-logo.png"
              style={imageFormat}
              alt="event1"
            />
          </div>
          <div className="switch-image">
            <img
              className="ui rounded centered image"
              src="images/meteor-logo.png"
              style={imageFormat}
              alt="event1"
            />
          </div>
          <div className="switch-image">
            <img
              className="ui rounded centered image"
              src="images/meteor-logo.png"
              style={imageFormat}
              alt="event1"
            />
          </div>
        </Fade>
      </div>
    );
  }
}

export default Landing;
