"use strict";
const Producto = use("App/Models/Producto");

class ProductoController {
  async index({ request, response }) {
    return await Producto.all();
  }

  async create({ request, response }) {}

  async store({ request, response }) {
    const input = request.all();
    await Producto.create(input);

    return response.json({
      res: true,
      message: "Registro insertado correctamente",
    });
  }

  async show({ params, request, response }) {
    return await Producto.findOrFail(params.id);
  }

  async update({ params, request, response }) {
    const input = request.all();
    await Producto.query().where("id", params.id).update(input);
    return response.json({
      res: true,
      message: "Registro modificado correctamente",
    });
  }

  async destroy({ params, request, response }) {
    const product = await Producto.findOrFail(params.id);
    await product.delete();

    return response.json({
      res: true,
      message: "Registrado eliminado correctamente",
    });
  }
}

module.exports = ProductoController;
