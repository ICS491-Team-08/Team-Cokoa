import React from 'react';
import { Image, Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import AddComment from '/imports/ui/components/AddComment';
import Comment from '/imports/ui/components/Comment';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AllEventItem extends React.Component {
  render() {
    return (
        <Card>
          <Image src={this.props.event.image}/>
          <Card.Content>
            <Card.Header>{this.props.event.title}</Card.Header>
            <Card.Meta>{this.props.event.cost}</Card.Meta>
            <Card.Description> Location: {this.props.event.location}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
          </Card.Content>
          <Card.Content extra>
            <AddComment owner={this.props.event.owner} eventId={this.props.event._id}/>
          </Card.Content>

          </Card>
    );
  }
}

/** Require a document to be passed to this component. */
AllEventItem.propTypes = {
  event: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AllEventItem);
