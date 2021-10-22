import React from 'react';
import { Table, Image, Feed } from 'semantic-ui-react';
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

  render() {
    return (
        <Table.Row>
          <Table.Cell> <Image size='tiny' src={this.state.image}/> </Table.Cell>
          <Table.Cell>{this.props.event.title}</Table.Cell>
          <Table.Cell>{this.props.event.endDate ? this.props.event.eventDate.toString("MMMM dS") + " ~ " + this.props.event.endDate.toString("dS, yyyy") : this.props.event.eventDate.toString("MMMM dS, yyyy")}</Table.Cell>
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
