export async function up({ context: queryInterface }) {
  await queryInterface.createTable("users", {
    id: { type: "INTEGER", autoIncrement: true, primaryKey: true },
    username: { type: "VARCHAR(255)", allowNull: false, unique: true },
    name: { type: "VARCHAR(255)", allowNull: false },
    admin: { type: "BOOLEAN", defaultValue: false },
    disabled: { type: "BOOLEAN", defaultValue: false },
    created_at: { type: "TIMESTAMP", allowNull: false },
    updated_at: { type: "TIMESTAMP", allowNull: false },
  });

  await queryInterface.createTable("blogs", {
    id: { type: "INTEGER", autoIncrement: true, primaryKey: true },
    author: { type: "TEXT" },
    url: { type: "TEXT", allowNull: false },
    title: { type: "TEXT", allowNull: false },
    likes: { type: "INTEGER", defaultValue: 0 },
    user_id: {
      type: "INTEGER",
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    created_at: { type: "TIMESTAMP", allowNull: false },
    updated_at: { type: "TIMESTAMP", allowNull: false },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("blogs");
  await queryInterface.dropTable("users");
}
