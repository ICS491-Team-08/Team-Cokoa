import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Comments, CommentSchema } from '/imports/api/comment/Comment';
import { Segment, Rating, Checkbox } from 'semantic-ui-react';
import { AutoForm, TextField, SubmitField, HiddenField, ErrorsField, SelectField} from 'uniforms-semantic';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@reach/accordion";
import "@reach/accordion/styles.css";
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';


const formSchema = new SimpleSchema({
  comment: String,
  covid: String,
  rating: Number,
  eventId: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const covidOptions = [
  {
    label: 'I am fully vaccinated',
    value: 'I am fully vaccinated',
  },
  {
    label: 'I got a COVID-19 test and test negative',
    value: 'I got a COVID-19 test and test negative',
  },
  {
    label: 'I did not get vaccinated nor get a test',
    value: 'I did not get vaccinated nor get a test',
  },
];


/** Renders the Page for adding a document. */
class AddComment extends React.Component {

    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    submit(data, formRef) {
      const { comment, covid, rating, eventId, createdAt } = data;
      const owner = Meteor.user().username;
      Comments.collection.insert({ comment, covid, rating, eventId, createdAt, owner, approved: false },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Item added successfully', 'success');
              formRef.reset();
            }
          });
    }

    handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating });
    state = {};
    handleChange1 = (e, { value }) => this.setState({ vaccine : value });

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
      let fRef = null;
      console.log("DEBUG/ this.state.vaccine = " + this.state.covid);
      return (
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <Accordion collapsible>
                  <AccordionItem>
                  <AccordionButton style={{ padding: "5px 15px", borderRadius: 5,}}> Check-In </AccordionButton>
                  <AccordionPanel>
                  <br/>
                  <div className="field">
                  <label>How is your overall mood today?</label>
                  </div>
                  <div>
                  <Rating maxRating={5} onRate={this.handleRate}/>
                  <br></br>
                  <br></br>
                  </div>
                  <SelectField label ='COVID-19 Status' name='covid' options={covidOptions} placeholder='Choose one of options'/>
                  <TextField label="Leave a comment about this event" name='comment'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='eventId' value={this.props.eventId}/>
                  <HiddenField name='createdAt' value={new Date()}/>
                  <HiddenField name='rating' value={this.state.rating}/>
                  </AccordionPanel>
                  </AccordionItem>
                  </Accordion>
                  </Segment>
                  </AutoForm>
      );
    }
}

AddComment.propTypes = {
    owner: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
};

export default AddComment;
