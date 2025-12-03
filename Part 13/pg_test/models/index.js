import { Blog } from "./Blog.js";
import { Note } from "./Note.js";
import { User } from "./User.js";

// User → Note (1:N)
User.hasMany(Note);
Note.belongsTo(User);

// User → Blog (1:N)
User.hasMany(Blog);
Blog.belongsTo(User);

User.sync();
Blog.sync({ alter: true });
Note.sync({ alter: true });

// Because the relation is defined in the models, the following lines are not requried
// Note.belongsTo(User).sync({ alter: true });
// User.hasMany(Note).sync({ alter: true });

export { Blog, Note, User };
