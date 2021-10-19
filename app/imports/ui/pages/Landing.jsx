import React from "react";
import { Button, Container, Grid, GridRow, Header, Icon, Image, Input, Menu, Segment } from "semantic-ui-react";
import { Fade } from "react-slideshow-image";
import { Link } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css';
import swal from 'sweetalert';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <LandingCall />
        <br/>
        <br/>
        <AboutUs />
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
        <section className="landing-section-1">
      <Grid columns={1}>
        <Grid.Column>
            <div className="slide-container">
              <Fade>
                {fadeImages.map((fadeImage, index) => (
                  <div className="each-fade" key={index}>
                    <div className="image-container">
                      <Image
                          size="large"
                          verticalAlign="middle"
                          circular
                          src={fadeImage.url} />
                    </div>
                    <h2>{fadeImage.caption}</h2>
                  </div>
                ))}
              </Fade>
            </div>
        </Grid.Column>
        <Grid.Column>
          <Grid verticalAlign="middle" textAlign="center" columns={1} id="landing-page">
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
        </section>
    );
  }
}

class AboutUs extends React.Component {
  render() {
    let fRef = null;
    return (
        <section className="landing-section-2">
          <Grid columns={1}>
            <Grid.Column>
              <Grid verticalAlign="middle" textAlign="center" columns={1}>
                <div>
                  <h1>ABOUT US</h1>
                </div>
              </Grid>
            </Grid.Column>
            <Container className="about-us-member" textAlign="center">
            <Grid columns={4} padded>
              <Grid.Row>
                <Grid.Column>
                  <h2>Yong</h2>
                  <div className="ui borderless menu">
                    <a className="item"><Icon name="github" size='large'/></a>
                    <a className="item"><Icon name="linkedin" size='large'/></a>
                    <a className="item"><Icon name="google plus" size='large'/></a>
                    <a className="item"><Icon name="twitter" size='large'/></a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <h2>Kai</h2>
                  <div className="ui borderless menu">
                    <a className="item"><Icon name="github" size='large'/></a>
                    <a className="item"><Icon name="linkedin" size='large'/></a>
                    <a className="item"><Icon name="google plus" size='large'/></a>
                    <a className="item"><Icon name="twitter" size='large'/></a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <h2>Yeji</h2>
                  <div className="ui borderless menu">
                    <a className="item"><Icon name="github" size='large'/></a>
                    <a className="item"><Icon name="linkedin" size='large'/></a>
                    <a className="item"><Icon name="google plus" size='large'/></a>
                    <a className="item"><Icon name="twitter" size='large'/></a>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <h2>Hoon</h2>
                  <div className="ui borderless menu">
                    <a className="item"><Icon name="github" size='large'/></a>
                    <a className="item"><Icon name="linkedin" size='large'/></a>
                    <a className="item"><Icon name="google plus" size='large'/></a>
                    <a className="item"><Icon name="twitter" size='large'/></a>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            </Container>
          </Grid>
        </section>
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
        <section id="2">
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
        </section>
    );
  }
}

export default Landing;
