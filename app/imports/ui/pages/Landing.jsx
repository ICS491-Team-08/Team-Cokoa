import React from "react";
import { Button, Container, Grid, Header, Image } from "semantic-ui-react";
import { Fade } from "react-slideshow-image";
import { Link } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css';

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
        caption: "COVID EVENTS",
        caption2: "From various event information to participation, try participating with your family and friends.",
        caption3: "Simply participate a event.",
      },
      {
        url: "images/meteor-logo.png",
        caption: "Upload Vaccination Card",
        caption2: "Upload your vaccinated card to check the vaccination status of people attending the event and enjoy the event safely.",
        caption3: "We use vaccination record verification to protect our users.",
      },
      {
        url: "images/meteor-logo.png",
        caption: "Add Event",
        caption2: "Upload your own events for something you want.",
        caption3: "Build valuable experiences by adding your own events.",
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
                    <h1 style={{ color: "#FFFFFF" }}>{fadeImage.caption}</h1>
                    <h2 style={{ color: "#FFFFFF" }}>{fadeImage.caption2}</h2>
                    <h2 style={{ color: "#FFFFFF" }}>{fadeImage.caption3}</h2>
                  </div>
                ))}
              </Fade>
            </div>
        </Grid.Column>
        <Grid.Column>
          <Grid verticalAlign="middle" textAlign="center" columns={1} id="landing-page">
            <Grid.Column>
              <Header style={{ color: "rgb(44, 62, 80)" }} as="h1">
                Add your event and get pre-checked!
              </Header>
              <h3>
                <p style={{ color: "rgb(44, 62, 80)" }}>
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
                  <Header as="h2">Yong</Header>
                  <button className="ui circular facebook icon button"
                          onClick={() => window.open('https://yongkim93.github.io/', '_blank')}>
                    <i className="github icon"></i>
                  </button>
                  <button className="ui circular linkedin icon button"
                          onClick={() => window.open('https://www.linkedin.com/in/yongnam-kim-630752146/', '_blank')}>
                    <i className="linkedin icon"></i>
                  </button>
                  <button className="ui circular google plus icon button"
                          onClick={() => window.open('mailto:yong4@hawaii.edu', '_blank')}>
                    <i className="envelope outline icon"></i>
                  </button>
                </Grid.Column>

                <Grid.Column>
                  <h2>Kai</h2>
                  <button className="ui circular facebook icon button"
                          onClick={() => window.open('https://hwangwooj.github.io/', '_blank')}>
                    <i className="github icon"></i>
                  </button>
                  <button className="ui circular linkedin icon button"
                          onClick={() => window.open('https://', '_blank')}>
                    <i className="linkedin icon"></i>
                  </button>
                  <button className="ui circular google plus icon button"
                          onClick={() => window.open('mailto:hwangwoo@hawaii.edu', '_blank')}>
                    <i className="envelope outline icon"></i>
                  </button>
                </Grid.Column>

                <Grid.Column>
                  <h2>Yeji</h2>
                  <button className="ui circular facebook icon button"
                          onClick={() => window.open('https://yejihan92.github.io/', '_blank')}>
                    <i className="github icon"></i>
                  </button>
                                   <button className="ui circular linkedin icon button"
                          onClick={() => window.open('https://www.linkedin.com/in/yeji-han-063b231b5/', '_blank')}>
                    <i className="linkedin icon"></i>
                  </button>
                  <button className="ui circular google plus icon button"
                          onClick={() => window.open('mailto:hany7@hawaii.edu', '_blank')}>
                    <i className="envelope outline icon"></i>
                  </button>
                </Grid.Column>

                <Grid.Column>
                  <h2>Cheolhoon</h2>
                  <button className="ui circular facebook icon button"
                          onClick={() => window.open('https://cheolhoon.github.io/', '_blank')}>
                    <i className="github icon"></i>
                  </button>
                  <button className="ui circular linkedin icon button"
                          onClick={() => window.open('https://www.linkedin.com/in/cheolhoon/', '_blank')}>
                    <i className="linkedin icon"></i>
                  </button>
                  <button className="ui circular google plus icon button"
                          onClick={() => window.open('mailto:choi4879@hawaii.edu', '_blank')}>
                    <i className="envelope outline icon"></i>
                  </button>
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
