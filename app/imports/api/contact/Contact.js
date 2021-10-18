import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class ContactsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ContactsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: {
        type: String,
        optional: true,
      },
      email: {
        type: String,
        optional: true,
      },
      phone: {
        type: Number,
        optional: true,
      },
      message: {
        type: String,
        optional: true,
      },
      owner: {
        type: String,
        optional: true,
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.allPublicationName = `${this.name}.publication.temp`;
  }
}

export const Contacts = new ContactsCollection();
