import React from 'react';
import { Table, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Comment from '/imports/ui/components/Comment';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class EventItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell> <Image size='tiny' src={this.props.event.image}/> </Table.Cell>
          <Table.Cell>{this.props.event.title}</Table.Cell>
          <Table.Cell>{this.props.event.eventDate?.toDateString()}</Table.Cell>
          <Table.Cell>{this.props.event.location}</Table.Cell>
          <Table.Cell>{this.props.event.cost}</Table.Cell>
          <Table.Cell>{this.props.event.description}</Table.Cell>
          <Table.Cell>{this.props.event.owner}</Table.Cell>
          <Table.Cell>
            <Feed>
              {this.props.comments.map((comment, index) => <Comment key={index} comment={comment} isAdminPage={true}/>)}
            </Feed>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
EventItemAdmin.propTypes = {
  event: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

export default EventItemAdmin;
