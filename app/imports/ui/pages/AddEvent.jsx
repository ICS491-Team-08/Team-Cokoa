import React, { createRef } from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import {
  AutoForm,
  ErrorsField,
  DateField,
  SelectField,
  SubmitField,
  TextField,
} from "uniforms-semantic";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";
import { Events } from "../../api/event/Event";
import UploadImg from "../components/UploadImg";
import { extractFileType, uploadImg, createImg } from "../../api/uploadImg";

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  title: String,
  location: String,
  owner: {
    type: String,
    optional: true,
  },
  cost: {
    type: String,
    allowedValues: ["$", "$$", "$$$"],
    defaultValue: "$",
  },
  description: String,
  eventDate: Date,
  endDate:Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = createRef();
  }

  /** On submit, insert the data. */
  async submit(data, formRef) {
    const image = this.imgRef.current
      ? extractFileType(this.imgRef.current)
      : "";
    const { title, location, cost, description, eventDate, endDate } = data;
    const owner = Meteor.user().username;

    await Events.collection.insert(
      { title, location, image, cost, description, eventDate, endDate, owner },
      (error, id) => {
        if (error) {
          swal("Error", error.message, "error");
        } else {
          if (this.imgRef.current) {
            const file = createImg(this.imgRef.current, id);
            uploadImg(file);
          }
          swal("Success", "Item added successfully", "success");
          formRef.reset();
        }
      }
    );
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <section className="add-event-page">
      <Grid container centered>
        <Grid.Column>
          <br />
          <Header as="h1" style={{ color: "rgb(44, 62, 80)" }} textAlign="center">
            Add Event
          </Header>
          <br />
          <AutoForm
            ref={(ref) => {
              fRef = ref;
            }}
            id="event-card-list"
            schema={bridge}
            onSubmit={(data) => this.submit(data, fRef)}
          >
            <Segment>
              <TextField name="title" />
                <DateField
                  name="eventDate"
                  label="Start Date"
                  max={new Date(2100, 1, 1)}
                  min={new Date(2000, 1, 1)}
                />
                <DateField
                    name="endDate"
                    label="End Date"
                   max={new Date(2100, 1, 1)}
                    min={new Date(2000, 1, 1)}
                />
                <TextField name="location" />
                <SelectField name="cost" />
              <TextField name="description" />
              <UploadImg imgRef={this.imgRef} />
              <SubmitField value="Submit" />
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
        </section>
    );
  }
}

export default AddEvent;
