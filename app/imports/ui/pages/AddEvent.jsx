import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  DateField,
  SelectField,
  SubmitField,
  TextField,
  LongTextField,
  HiddenField
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Event';
import UploadImg from '../components/UploadImg';

/** Create a schema to specify the structure of the data to appear in the form. */
/*
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
  image: {
    type: String,
    optional: true,
  },
});
*/
const bridge = new SimpleSchema2Bridge(Events.schema);

/** Renders the Page for adding a document. */
class AddEvent extends React.Component {

  constructor(props){
    super(props);
    this.imgType = React.createRef('');
  }

  eventUpdate() {
    const type = this.imgType.current;
    console.log(this.imgType);
  }

  /** On submit, insert the data. */

  submit(data) {
    const { title, location, image, cost, description, eventDate, _id } = data;
    Events.collection.update(_id, { $set: { title, location, image, cost, description, eventDate } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Event updated successfully', 'success')));
    }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  /*
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Event</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='title'/>

                  <DateField
                      name='eventDate'
                      label='Date'
                      max={new Date(2100, 1, 1)}
                      min={new Date(2000, 1, 1)}
                  />
                  <TextField name='location'/>

                <LongTextField name='description'/>
                <SelectField name='cost'/>

                <Header as="h5" >Image</Header>
                <UploadImg  id={this.props.documentId} imgType={this.imgType} />

                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
*/
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Event</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='title'/>
                <DateField
                    name="eventDate"
                    label="Date"
                    max={new Date(2100, 1, 1)}
                    min={new Date(2000, 1, 1)}
                />
                <TextField name='location'/>
                <TextField name='image'/>
                <TextField name='description'/>
                <SelectField name='cost'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddEvent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  documentId: PropTypes.string,
  location: PropTypes.object,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe(Events.userPublicationName);
  return {
    documentId,
    doc: Events.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(AddEvent);
