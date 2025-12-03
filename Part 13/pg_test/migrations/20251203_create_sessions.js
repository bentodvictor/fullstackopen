export async function up({ context: queryInterface }) {
  await queryInterface.createTable("sessions", {
    id: { type: "INTEGER", autoIncrement: true, primaryKey: true },
    user_id: {
      type: "INTEGER",
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    token: {
      type: "TEXT",
      allowNull: false,
      unique: true,
    },
    created_at: { type: "TIMESTAMP", allowNull: false },
    updated_at: { type: "TIMESTAMP", allowNull: false },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("sessions");
}
