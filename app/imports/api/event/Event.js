import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";

/** Encapsulates state and variable values for this collection. */
class EventsCollection {
  constructor() {
    // The name of this collection.
    this.name = "EventsCollection";
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema(
      {
        title: String,
        location: String,
        image: { type: String, optional: true },
        defaultImage:{
          type: String,
          optional: true,
        },
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
        eventDate: {
          type: Date,
        },
        endDate:{
          type: Date,
          optional: true,
        }
      },
      { tracker: Tracker }
    );
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.allPublicationName = `${this.name}.publication.temp`;
  }
}

export const Events = new EventsCollection();
