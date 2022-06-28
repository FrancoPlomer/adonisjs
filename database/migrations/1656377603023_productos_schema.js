"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductosSchema extends Schema {
  up() {
    this.create("productos", (table) => {
      table.increments("id");
      table.string("name", 80).unique();
      table.string("description", 150);
      table.integer("price");
      table.integer("stock");
      table.timestamps();
    });
  }

  down() {
    this.drop("productos");
  }
}

module.exports = ProductosSchema;
