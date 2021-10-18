import React from "react";
import { Feed, Rating, Button, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import { Comments } from "../../api/comment/Comment";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.approved = this.approved.bind(this);
  }
  approved() {
    Comments.collection.update(
      this.props.comment._id,
      { $set: { ...this.props.comment, approved: true } },
      (error) =>
        error
          ? swal("Error", error.message, "error")
          : swal("Success", "Item updated successfully", "success")
    );
  }
  render() {
    console.log(this.props.comment);
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.User>{this.props.comment.owner}</Feed.User>
          <Feed.Date
            content={this.props.comment.createdAt.toLocaleDateString("en-US")}
          />
          <Feed.Summary>
            {this.props.comment.comment}
            <br></br>
            <Rating
              defaultRating={this.props.comment.rating}
              maxRating={5}
              disabled
            />
            {this.props.isAdminPage && !this.props.comment.approved && (
              <Button onClick={this.approved}>Approve</Button>
            )}
            {this.props.comment.approved && <Label>Approved</Label>}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Comment);
