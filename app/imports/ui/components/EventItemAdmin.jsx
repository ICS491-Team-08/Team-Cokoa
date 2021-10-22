import React from 'react';
import { Table, Image, Feed, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Comment from '/imports/ui/components/Comment';
import fetchImg from "../../api/fetchImg";

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class EventItemAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "/images/meteor-logo.png",
    };
  }

  componentDidMount() {
    if (this.props.event.image) {
      fetchImg(this.props.event._id + this.props.event.image).then((res) =>
        this.setState({ image: res })
      );
    }else if(this.props.event.defaultImage){
      this.setState({image: this.props.event.defaultImage});
    }
  }

  removeItem(docID) {
    // eslint-disable-next-line no-console
    swal({
      title: 'Delete Event',
      text: 'Do you really want to delete this event?\n It will be deleted from My Event.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            this.props.Events.collection.remove(docID);
            console.log("Checking on something" +this.props.Events.collection);
            swal('Delete successful', {
              icon: 'success',
            });
          } else {
            swal('Delete cancelled');
          }
        });
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell> <Image size='tiny' src={this.state.image}/> </Table.Cell>
          <Table.Cell>{this.props.event.title}</Table.Cell>
          <Table.Cell>{this.props.event.endDate ? this.props.event.eventDate.toString("MMM dS, yyyy") + " ~ " + this.props.event.endDate.toString("MMM dS, yyyy") : this.props.event.eventDate.toString("MMMM dS, yyyy")}</Table.Cell>
          <Table.Cell>{this.props.event.location}</Table.Cell>
          <Table.Cell>{this.props.event.cost}</Table.Cell>
          <Table.Cell>{this.props.event.description}</Table.Cell>
          <Table.Cell>{this.props.event.owner}</Table.Cell>
          <Table.Cell>
            <Feed className="comment-feed">
              {this.props.comments.map((comment, index) => <Comment key={index} comment={comment} isAdminPage={true}/>)}
            </Feed>
          </Table.Cell>
          <Table.Cell>
          <Button
            size="mini"
            icon
            onClick={() => this.removeItem(this.props.event._id)}
          >
            <Icon name="trash" color="red" />
          </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
EventItemAdmin.propTypes = {
  event: PropTypes.object.isRequired,
  Events: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

export default EventItemAdmin;
