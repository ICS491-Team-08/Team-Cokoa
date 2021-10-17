import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */

/** Defines the mongo collection to hold the data */
const UserInfo = new Mongo.Collection('UserInfo');

/** Defines the signup schema */
const UserInfoSchema = new SimpleSchema({
  user: String,
}, { tracker: Tracker });

/** attaching the schema to the collection */
UserInfo.attachSchema(UserInfoSchema);

/** Making the collection and schema available for use in other files. */
export { UserInfo, UserInfoSchema };
