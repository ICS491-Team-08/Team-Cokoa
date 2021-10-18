import React from 'react';
import { Image, Card, Feed, Button, Icon, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class EventItem extends React.Component {

  removeItem(docID) {
    // eslint-disable-next-line no-console
    console.log(`item to delete is: ${docID}`);
    this.props.Events.collection.remove(docID);
  }

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
                <Link to={`/edit/${this.props.event._id}`}>Edit <Icon name='edit'/></Link>
                <Button floated="right" size="mini" icon onClick={() => this.removeItem(this.props.event._id)}><Icon name='trash'/></Button>
            </Feed>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  Events: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(EventItem);
