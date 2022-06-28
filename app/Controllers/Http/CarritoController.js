"use strict";
const Carrito = use("App/Models/Carrito");
const Producto = use("App/Models/Producto");

class CarritoController {
  async index({ request, response }) {
    return await Carrito.all();
  }

  async create({ request, response }) {}

  async store({ request, response }) {
    const input = request.all();
    await Carrito.create(input);

    return response.json({
      res: true,
      message: "Registro insertado correctamente",
    });
  }

  async show({ params, request, response }) {
    return await Carrito.findOrFail(params.id);
  }

  async update({ params, request, response }) {
    const input = request.all();
    let product;
    let cart;
    let arrayProducts = [];
    if (input.add) {
      product = await Producto.findOrFail(input.add);
      cart = await Carrito.findOrFail(params.id);
      arrayProducts = cart.products
        ? JSON.parse(cart.products)
        : JSON.parse("[]");
      arrayProducts.push(product);
      cart.products = JSON.stringify(arrayProducts);
      await Carrito.query().where("id", params.id).update(cart);
    } else if (input.delete) {
      product = await Producto.findOrFail(input.delete);
      cart = await Carrito.findOrFail(params.id);
      arrayProducts = cart.products
        ? JSON.parse(cart.products)
        : JSON.parse("[]");
      arrayProducts.splice(arrayProducts.indexOf(product), 1);
      cart.products = arrayProducts;
      await Carrito.query().where("id", params.id).update(cart);
    } else {
      await Carrito.query().where("id", params.id).update(input);
    }
    return response.json({
      res: true,
      message: "Registro modificado correctamente",
    });
  }

  async destroy({ params, request, response }) {
    const product = await Carrito.findOrFail(params.id);
    await product.delete();

    return response.json({
      res: true,
      message: "Registrado eliminado correctamente",
    });
  }
}

module.exports = CarritoController;
