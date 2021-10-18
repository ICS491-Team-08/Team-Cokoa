import React from "react";
import { Button, Grid, Header, Image, Input, Segment } from "semantic-ui-react";
import { Fade } from "react-slideshow-image";
import { Link } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Contacts } from '../../api/contact/Contact';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

const formSchema = new SimpleSchema({
  name: String,
  email: String,
  phone: Number,
  message: String,
  owner: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <LandingCall />
        <br/>
        <br/>
        <ContactUs />
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

class ContactUs extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, email, phone, message } = data;
    const owner = Meteor.user().username;
    Contacts.collection.insert({ name, email, phone, message, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  render() {
    let fRef = null;
    return (
        <section className="landing-section-2">
          <Grid columns={1}>
            <Grid.Column>
              <Grid verticalAlign="middle" textAlign="center" columns={1}>
                <div>
                  <h1>CONTACT ME</h1>
                  <form ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                  <div>
                  <div className="floating-label-form-group">
                    <label htmlFor="name">Name </label>
                    <input name="name" required placeholer="Name">
                    </input>
                  </div>
                  </div>
                  <div>
                    <div className="floating-label-form-group">
                      <label htmlFor="email">Email Address </label>
                      <input name="email" required placeholer="Email Address">
                      </input>
                    </div>
                  </div>
                  <div>
                    <div className="floating-label-form-group">
                      <label htmlFor="phone">Phone Number </label>
                      <input name="phone" placeholer="Phone Number">
                      </input>
                    </div>
                  </div>
                  <div>
                    <div className="floating-label-form-group">
                      <label htmlFor="message">Message </label>
                      <input name="message" placeholer="Message">
                      </input>
                    </div>
                  </div>
                  <br/>
                  <div>
                    <button value='Submit' className="btn">Send</button>
                  </div>
                  </form>
                </div>
              </Grid>
            </Grid.Column>
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
