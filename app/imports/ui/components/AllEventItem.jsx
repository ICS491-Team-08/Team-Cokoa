import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import AddComment from '/imports/ui/components/AddComment';
import Comment from '/imports/ui/components/Comment';
import fetchImg from "../../api/fetchImg";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AllEventItem extends React.Component {
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

  render() {
    return (
        <Card>
          <Image src={this.state.image}/>
          <Card.Content>
            <Card.Header>{this.props.event.title}</Card.Header>
            <Card.Meta>{this.props.event.cost}</Card.Meta>
            <Card.Description>
              <strong>Date: {this.props.event.endDate ? this.props.event.eventDate.toString("MMM dS, yyyy") + " ~ " + this.props.event.endDate.toString("MMM dS, yyyy") : this.props.event.eventDate.toString("MMMM dS, yyyy")}</strong>
            </Card.Description>
            <Card.Description> Location: {this.props.event.location}</Card.Description>
            <Card.Description> Description: {this.props.event.description}</Card.Description>
          </Card.Content>
          <Card.Content extra className="comment-feed-allevent">
            {this.props.comments.map((comment, index) => <Comment key={index} comment={comment} isAdminPage={false}/>)}
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
