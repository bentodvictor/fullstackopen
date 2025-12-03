export async function up({ context: queryInterface }) {
  await queryInterface.createTable("reading_lists", {
    id: { type: "INTEGER", autoIncrement: true, primaryKey: true },
    user_id: {
      type: "INTEGER",
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    blog_id: {
      type: "INTEGER",
      allowNull: false,
      references: { model: "blogs", key: "id" },
      onDelete: "CASCADE",
    },
    read: {
      type: "BOOLEAN",
      defaultValue: false,
    },
    created_at: { type: "TIMESTAMP", allowNull: false },
    updated_at: { type: "TIMESTAMP", allowNull: false },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("reading_lists");
}
