import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../api/event/Event';
import EventItem from '../components/EventItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListEvent extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (



        <Container>
          <Header as="h2" textAlign="center">My Events</Header>
          <Card.Group>
            {this.props.events.map((event) => <EventItem key={event._id} event={event} />)}
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
