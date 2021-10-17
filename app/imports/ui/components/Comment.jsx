import React from 'react';
import { Feed, Rating, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {
    render() {
        return (
            <Feed.Event>
                <Feed.Content>
                  <Feed.User>{this.props.comment.owner}</Feed.User>
                  <Feed.Date content={this.props.comment.createdAt.toLocaleDateString('en-US')} />
                  <Feed.Summary>
                    {this.props.comment.comment}
                    <br></br>
                    <Rating defaultRating={this.props.comment.rating} maxRating={5} disabled />
                    <Button>Approve</Button>
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
