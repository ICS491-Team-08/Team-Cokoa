import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../api/event/Event';
import AllEventItem from '../components/AllEventItem';
import { Comments } from '/imports/api/comment/Comment';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAllEvents extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (

        <Container>
          <br />
          <Header as="h1" style={{ color: "rgb(44, 62, 80)" }} textAlign="center">All Events</Header>
          <br />
          <br />
          <Card.Group>
            {this.props.events.map((event) => <AllEventItem key={event._id} event={event} comments={this.props.comments.filter(comment => (comment.eventId === event._id))}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListAllEvents.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Events.allPublicationName);
  const subscription2 = Meteor.subscribe(Comments.allPublicationName);

  return {
    events: Events.collection.find({}).fetch(),
    comments: Comments.collection.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ListAllEvents);
