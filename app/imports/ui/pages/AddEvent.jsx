import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, DateField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/Event';
import UploadImg from '../components/UploadImg';

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
    allowedValues: ['$', '$$', '$$$'],
    defaultValue: '$',
  },
  description: String,
  eventDate: Date,
  image:  String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddEvent extends React.Component {
  /*
  constructor(props){
    super(props);
    this.imgType = React.createRef('');
  }
  */
  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, location, cost, description, eventDate, image } = data;
    const owner = Meteor.user().username;
    Events.collection.insert({ title, location, cost, description, eventDate, owner, image },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Event</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='title'/>
                <Form.Group widths={'equal'}>
                  <DateField
                      name='eventDate'
                      label='Date'
                      max={new Date(2100, 1, 1)}
                      min={new Date(2000, 1, 1)}
                  />
                  <TextField name='location'/>
                </Form.Group>
                <LongTextField name='description'/>
                <SelectField name='cost'/>
                <TextField name='image'/>

                <UploadImg  id={this.props.docId} imgType={this.imgType} />

                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddEvent;
