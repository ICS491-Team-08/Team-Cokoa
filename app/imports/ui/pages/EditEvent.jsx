import React, { createRef } from "react";
import { Grid, Loader, Header, Segment } from "semantic-ui-react";
import swal from "sweetalert";
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  DateField,
  SelectField,
  SubmitField,
  TextField,
} from "uniforms-semantic";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import { Events } from "../../api/event/Event";
import UploadImg from "../components/UploadImg";
import { extractFileType, uploadImg, createImg } from "../../api/uploadImg";

const bridge = new SimpleSchema2Bridge(Events.schema);

/** Renders the Page for editing a single document. */
class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = createRef();
  }

  /** On successful submit, insert the data. */
  submit(data) {
    console.log('HI');
    let { title, location, image, cost, description, eventDate, _id } = data;
    image = this.imgRef.current ? extractFileType(this.imgRef.current) : (image || "");
    Events.collection.update(
      _id,
      { $set: { title, location, image, cost, description, eventDate } },
      (error) => {
        if (error) {
          swal("Error", error.message, "error");
        } else {
          if (this.imgRef.current) {
            const file = createImg(this.imgRef.current, _id);
            uploadImg(file);
          }
          swal("Success", "Event updated successfully", "success");
        }
      }
    );
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Edit Event
          </Header>
          <AutoForm
            schema={bridge}
            onSubmit={(data) => this.submit(data)}
            model={this.props.doc}
          >
            <Segment>
              <TextField name="title" />
              <DateField
                name="eventDate"
                label="Date"
                max={new Date(2100, 1, 1)}
                min={new Date(2000, 1, 1)}
              />
              <TextField name="location" />
              <TextField name="description" />
              <SelectField name="cost" />
              <UploadImg imgRef={this.imgRef} />
              <SubmitField value="Submit" />
              <ErrorsField />
              <HiddenField name="owner" />
              <HiddenField name="image" />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditEvent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Events.userPublicationName);
  return {
    doc: Events.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditEvent);
