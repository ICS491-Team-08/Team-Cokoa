import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Events } from '../../api/event/Event';
import { Comments } from '../../api/comment/Comment';
import { UserInfo } from '../../api/userinfo/UserInfo';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Events.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Events.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Events.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Events.collection.find();
  }
  return this.ready();
});

Meteor.publish(Events.allPublicationName, function () {
  if (this.userId) {
    return Events.collection.find();
  }
  return this.ready();
});

Meteor.publish(Comments.allPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find();
  }
  return this.ready();
});

Meteor.publish(Comments.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Comments.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish('UserInfo', function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return UserInfo.find();
  }
  return this.ready();
});

Meteor.publish('AllUsers', function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find();
  }
  return this.ready();
});