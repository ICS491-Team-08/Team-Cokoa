import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

Meteor.methods({
  makeAdmin(targetUserId) {
    if (this.userId && Roles.userIsInRole(this.userId, "superAdmin")) {
      Meteor.users.update(targetUserId, {
        $set: {
          isAdmin: true,
        },
      });
      Roles.createRole("admin", { unlessExists: true });
      Roles.addUsersToRoles(targetUserId, "admin");
      return "Successfully made the user an admin";
    } else {
      throw new Meteor.Error(
        "role-not-found",
        "You don't have the proper role"
      );
    }
  },
  removeAdmin(targetUserId) {
    if (this.userId && Roles.userIsInRole(this.userId, "superAdmin")) {
      Meteor.users.update(targetUserId, {
        $set: {
          isAdmin: false,
        },
      });
      Roles.createRole("admin", { unlessExists: true });
      Roles.addUsersToRoles(targetUserId, "admin");
      Roles.setUserRoles(targetUserId, []);
      return "Successfully removed the user from admins";
    } else {
      throw new Meteor.Error(
        "role-not-found",
        "You don't have the proper role"
      );
    }
  },
});
