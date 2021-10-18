import React from 'react';
import { Image, Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class EventItem extends React.Component {
  render() {
    return (
        <Card>
          <Image src={this.props.event.image}/>
          <Card.Content>
            <Card.Header>{this.props.event.title}</Card.Header>
            <Card.Meta>{this.props.event.cost}</Card.Meta>
            <Card.Description><strong>Date: {this.props.event.eventDate.toDateString()}</strong></Card.Description>
            <Card.Description> Location: {this.props.event.location}</Card.Description>
            <Card.Description> Description: {this.props.event.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              <Link to={`/edit/${this.props.event._id}`}>Edit</Link>
            </Feed>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(EventItem);
