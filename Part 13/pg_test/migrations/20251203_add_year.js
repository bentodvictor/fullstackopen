export async function up({ context: queryInterface }) {
  await queryInterface.addColumn("blogs", "year", {
    type: "INTEGER",
    allowNull: true,
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
    },
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn("blogs", "year");
}
