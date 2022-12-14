import { Context, helpers } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
import { Product } from "../types/product.ts";

const DB_PRODUCTS: Product[] = [];

export const getAllProducts = async (ctx: Context) => {
  try {
    logger.debug(
      `status: ${ctx.response.status} method: getAllProducts handler`,
    );
    ctx.response.status = 200;
    ctx.response.body = await { data: DB_PRODUCTS };
  } catch (error) {
    ctx.response.status = 500;
    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { msg: error };
  }
};

export const getProductById = async (ctx: Context) => {
  try {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const product = await DB_PRODUCTS.find((prod) => prod.prod_id == id);
    if (!product) {
      ctx.response.body = await { msg: `Producto con id ${id} no encontrado.` };
    }
    ctx.response.body = await { data: product };
  } catch (error) {
    ctx.response.status = 500;
    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { msg: error };
  }
};

export const createProduct = async (ctx: Context) => {
  try {
    let id = 1;
    const { name, description, price } = await ctx.request.body().value;
    if (DB_PRODUCTS.length > 0) {
      id = Number(DB_PRODUCTS[DB_PRODUCTS.length - 1].prod_id) + 1;
    }
    const product: Product = {
      prod_id: id,
      name,
      description,
      price,
    };
    DB_PRODUCTS.push(product);
    ctx.response.body = await { data: product };
    ctx.response.status = 201;
    logger.debug(
      `status: ${ctx.response.status} method: createProduct handler`,
    );
  } catch (error) {
    ctx.response.status = 500;
    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { msg: error };
  }
};

export const updateProductById = async (ctx: Context) => {
  try {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const productIndex = await DB_PRODUCTS.findIndex((product) =>
      product.prod_id == id
    );
    if (!productIndex) {
      ctx.response.body = { msg: `Usuario con id ${id} no encontrado.` };
    }
    const { name, description, price } = await ctx.request.body().value;
    DB_PRODUCTS.splice(productIndex, 1, {
      prod_id: id,
      name,
      description,
      price,
    });
    ctx.response.status = 202;
    logger.debug(
      `status: ${ctx.response.status} method: updateProductById handler`,
    );
    ctx.response.body = { data: { prod_id: id, name, description, price } };
  } catch (error) {
    ctx.response.status = 500;
    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { msg: error };
  }
};

export const deleteProductById = async (ctx: Context) => {
  try {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const productIndex = await DB_PRODUCTS.findIndex((product) =>
      product.prod_id == id
    );

    if (!productIndex) {
      ctx.response.body = { msg: `Producto con id ${id} no encontrado.` };
    }
    DB_PRODUCTS.splice(productIndex, 1);
    ctx.response.status = 200;
    logger.debug(
      `status: ${ctx.response.status} method: deleteProductById handler`,
    );
    ctx.response.body = { msg: `Producto con id ${id} eliminado` };
  } catch (error) {
    ctx.response.status = 500;
    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { msg: error };
  }
};
