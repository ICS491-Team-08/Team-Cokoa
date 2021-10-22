import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Container, Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../api/event/Event';
import EventItem from '../components/EventItem';
import { Link } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListEvent extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container className="align-center-mode">
          <br />
          <Header as="h1" style={{ color: "rgb(44, 62, 80)" }} textAlign="center">My Events</Header>
          <br />
          <br />
          {this.props.events.length === 0 && (<div className="align-center-mode">
            <h3>
              <p style={{ color: "rgb(44, 62, 80)" }}>
                Add your event now!
              </p>
            </h3>
            <Link to="/add">
              <Button size="large" style={{ color: "rgb(44, 62, 80)" }} to="/add">Add Event</Button>
            </Link>
            <br/>
            <br/>
          </div>)}
          <Card.Group>
            {this.props.events.map((event) => <EventItem key={event._id} event={event} Events={Events} />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListEvent.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Events.userPublicationName);
  return {
    events: Events.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListEvent);
