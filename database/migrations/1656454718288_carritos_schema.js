"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CarritosSchema extends Schema {
  up() {
    this.create("carritos", (table) => {
      table.increments("id");
      table.string("userName", 80).unique();
      table.json("products");
      table.timestamps();
    });
  }

  down() {
    this.drop("carritos");
  }
}

module.exports = CarritosSchema;
