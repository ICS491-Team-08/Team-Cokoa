import React from "react";
import { Image, Card, Feed, Button, Icon, Menu } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import fetchImg from "../../api/fetchImg";
require('datejs');

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class EventItem extends React.Component {
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
      <Card>
        <Image src={this.state.image} />
        <Card.Content>
          <Card.Header>{this.props.event.title}</Card.Header>
          <Card.Meta>{this.props.event.cost}</Card.Meta>
          <Card.Description>
            <strong>Date: {this.props.event.endDate ? this.props.event.eventDate.toString("MMMM dS") + " ~ " + this.props.event.endDate.toString("dS, yyyy") : this.props.event.eventDate.toString("MMMM dS, yyyy")}</strong>
          </Card.Description>
          <Card.Description>
            {" "}
            Location: {this.props.event.location}
          </Card.Description>
          <Card.Description>
            {" "}
            Description: {this.props.event.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Feed>
            <Link to={`/edit/${this.props.event._id}`}>
              Edit <Icon name="edit" />
            </Link>
            <Button
              floated="right"
              size="mini"
              icon
              onClick={() => this.removeItem(this.props.event._id)}
            >
              <Icon name="trash" />
            </Button>
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
