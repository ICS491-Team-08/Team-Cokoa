import React from "react";
import { Meteor } from "meteor/meteor";
import { Container, Table, Header, Loader, Button } from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Events } from "../../api/event/Event";
import { Comments } from "/imports/api/comment/Comment";
import EventItemAdmin from "../components/EventItemAdmin";
import swal from "sweetalert";

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListEventAdmin extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">
          List Events (Admin)
        </Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Cost</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>Comments</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.events.map((event) => (
              <EventItemAdmin
                key={event._id}
                event={event}
                Events={Events}
                comments={this.props.comments.filter(
                  (comment) => comment.eventId === event._id
                )}
              />
            ))}
          </Table.Body>
        </Table>
        <Header as="h2" textAlign="center">
          List Users (Admin)
        </Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              {Roles.userIsInRole(Meteor.userId(), "superAdmin") && (
                <Table.HeaderCell>Is Admin</Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.userinfo.map(
              (listuser) =>
                Meteor.userId() != listuser._id && (
                  <Table.Row key={listuser._id}>
                    <Table.Cell>{listuser.username}</Table.Cell>
                    {Roles.userIsInRole(Meteor.userId(), "superAdmin") && (
                      <Table.Cell>
                        {listuser.isAdmin ? (
                          <Button
                            onClick={() =>
                              Meteor.call(
                                "removeAdmin",
                                listuser._id,
                                (error, result) =>
                                  error
                                    ? swal(
                                        "Error",
                                        "Are you sure you have admin role?",
                                        "error"
                                      )
                                    : swal("Success", result, "success")
                              )
                            }
                          >
                            Yes
                          </Button>
                        ) : (
                          <Button
                            onClick={() =>
                              Meteor.call(
                                "makeAdmin",
                                listuser._id,
                                (error, result) =>
                                  error
                                    ? swal(
                                        "Error",
                                        "Are you sure you have admin role?",
                                        "error"
                                      )
                                    : swal("Success", result, "success")
                              )
                            }
                          >
                            No
                          </Button>
                        )}
                      </Table.Cell>
                    )}
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListEventAdmin.propTypes = {
  userinfo: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Events.adminPublicationName);
  const subscription2 = Meteor.subscribe(Comments.adminPublicationName);
  const subs = Meteor.subscribe("AllUsers");
  // const subscription3 = Meteor.subscribe('UserInfo');
  // console.log(Meteor.users.find().fetch());
  return {
    userinfo: Meteor.users.find().fetch(),
    events: Events.collection.find({}).fetch(),
    comments: Comments.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subs.ready(),
  };
})(ListEventAdmin);
