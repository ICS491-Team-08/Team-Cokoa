import React from "react";
import { Button, Container, Grid, Header, Image } from "semantic-ui-react";
import { Fade } from "react-slideshow-image";
import { Link } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css';
// import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';


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
        caption: "Add Your Events/Meeteings!",
        caption2: "Share information about events/meetings that you want to host.",
        caption3: "See who wants to join your events/meetings and see if they are approved by the admin. ",
      },
      {
        url: "images/meteor-logo.png",
        caption: "Check-In Events/Meetings Around You!",
        caption2: "Let the host know that you want to join.",
        caption3: "Upload your COVID-19 vaccination card or test result and be a safe member.",
      },
      {
        url: "images/meteor-logo.png",
        caption: "Manage Users and Events/Meetings!",
        caption2: "Approve safe users who successfully upload a proof of vaccination/test result.",
        caption3: "Authorize other users admin role to manage more efficiently.",
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
                    <br/>
                    <h1 style={{ color: "#FFFFFF", fontSize: "50px" }}>{fadeImage.caption}</h1>
                    <h2 style={{ color: "#FFFFFF" }}>{fadeImage.caption2}</h2>
                    <h2 style={{ color: "#FFFFFF" }}>{fadeImage.caption3}</h2>
                  </div>
                ))}
              </Fade>
            </div>
        </Grid.Column>
        <Grid.Column>
          <Grid verticalAlign="middle" textAlign="center" columns={1} id="landing-page">
            {Meteor.userId() === null &&<Grid.Column>
              <Header style={{ color: "rgb(44, 62, 80)" }} as="h1">
                Let's hang out!
              </Header>
              <h3>
                <p style={{ color: "rgb(44, 62, 80)" }}>
                  Sign up today & enjoy!
                </p>
              </h3>
              <Link to="/signup">
                <Button to="/signup">Sign Up</Button>
              </Link>
            </Grid.Column>}
          </Grid>
        </Grid.Column>
      </Grid>
        </section>
    );
  }
}

class AboutUs extends React.Component {
  render() {
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

export default Landing;
