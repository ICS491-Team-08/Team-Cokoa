import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Comments, CommentSchema } from '/imports/api/comment/Comment';
import { Segment, Rating } from 'semantic-ui-react';
import { AutoForm, TextField, SubmitField, HiddenField, ErrorsField, SelectField, } from 'uniforms-semantic';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';


const formSchema = new SimpleSchema({
  comment: String,
  rating: Number,
  eventId: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);


/** Renders the Page for adding a document. */
class AddComment extends React.Component {

    /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
    submit(data, formRef) {
      const { comment, rating, eventId, createdAt } = data;
      const owner = Meteor.user().username;
      Comments.collection.insert({ comment, rating, eventId, createdAt, owner },
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

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
      let fRef = null;
      return (
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <TextField label="Join this event" name='comment'/>
                  <div>
                    <Rating maxRating={5} onRate={this.handleRate}/>
                    <br></br>
                    <br></br>
                  </div>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='eventId' value={this.props.eventId}/>
                  <HiddenField name='createdAt' value={new Date()}/>
                  <HiddenField name='rating' value={this.state.rating}/>
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
