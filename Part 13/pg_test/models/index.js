import { Blog } from "./Blog.js";
import { Note } from "./Note.js";
import { User } from "./User.js";
import { Team } from "./Team.js";
import { Membership } from "./Membership.js";
import { UserNotes } from "./UserNotes.js";
import { ReadingList } from "./ReadingList.js";

// User → Note (1:N)
User.hasMany(Note);
Note.belongsTo(User);

// User → Blog (1:N)
User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Note, { through: UserNotes, as: "marked_notes" });
Note.belongsToMany(User, { through: UserNotes, as: "users_marked" });

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "users_saved" });

// To expose join table inside Blog → readinglists
Blog.hasMany(ReadingList);
ReadingList.belongsTo(Blog);

User.hasMany(ReadingList);
ReadingList.belongsTo(User);

User.hasMany(Session);
Session.belongsTo(User);

// User.sync();
// Blog.sync();
// Note.sync();

// Because the relation is defined in the models, the following lines are not requried
// Note.belongsTo(User).sync({ alter: true });
// User.hasMany(Note).sync({ alter: true });

export { Blog, Note, User, Team, Membership, ReadingList };
