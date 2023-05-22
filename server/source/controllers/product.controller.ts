import { Request, Response, NextFunction } from 'express';

import Brand from '../models/brand.model';
import Category from '../models/category.model';
import Graphic from '../models/graphic.model';
import Keyboard from '../models/keyboard.model';
import Memory from '../models/memory.model';
import Processor from '../models/processor.model';
import Product from '../models/product.model';
import Screen from '../models/screen.model';
import Software from '../models/software.model';
import Storage from '../models/storage.model';

import { handleUpload } from '../config/cloudinary';
import { ModelType } from '../types';
import { BadRequestError, NotFoundError } from '../helpers/customErrors';
import { IImage } from '../interfaces/models.interface';
import { Types } from 'mongoose';

const models: ModelType = {
  brand: Brand,
  category: Category,
  graphic: Graphic,
  keyboard: Keyboard,
  memory: Memory,
  processor: Processor,
  product: Product,
  screen: Screen,
  software: Software,
  storage: Storage,
};
/** GET */
export const getProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    console.log('name', name);
    const query = name
      ? { name: { $regex: name, $options: 'i' }, status: { $in: ['true', true] } }
      : { status: { $in: ['true', true] } };

    const products = await Product.find(query)
      .populate('memory', 'name')
      .populate('category', 'name')
      .populate('graphic', 'name')
      .populate('keyboard', 'name')
      .populate('processor', 'name')
      .populate('brand', 'name')
      .populate('screen', 'name')
      .populate('software', 'name')
      .populate('storage', 'name');

    if (!products.length) {
      return response.status(400).json(`No products found`);
    }

    const newProducts = products.map((product: any) => {
      return {
        id: product._id,
        name: product.name,
        code: product.code,
        model: product.model,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        category: product.category.name,
        graphic: product.graphic.name,
        keyboard: product.keyboard.name,
        memory: product.memory.name,
        processor: product.processor.name,
        brand: product.brand.name,
        screen: product.screen.name,
        software: product.software.name,
        storage: product.storage.name,
        status: product.status,
        score: product.score,
      };
    });

    response.status(200).json(newProducts);
  } catch (error: any) {
    next(error);
  }
};

/** GET */
export const getAllProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const name = request.query.name;
    const query = name ? { name: { $regex: name, $options: 'i' } } : {};

    const products = await Product.find(query)
      .populate('memory', 'name')
      .populate('category', 'name')
      .populate('graphic', 'name')
      .populate('keyboard', 'name')
      .populate('processor', 'name')
      .populate('brand', 'name')
      .populate('screen', 'name')
      .populate('software', 'name')
      .populate('storage', 'name');

    if (!products.length) {
      throw new NotFoundError(`No products found`);
    }

    const newProducts = products.map((product: any) => {
      return {
        id: product._id,
        name: product.name,
        code: product.code,
        model: product.model,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        category: product.category.name,
        graphic: product.graphic.name,
        keyboard: product.keyboard.name,
        memory: product.memory.name,
        processor: product.processor.name,
        brand: product.brand.name,
        screen: product.screen.name,
        software: product.software.name,
        storage: product.storage.name,
        status: product.status,
        score: product.score,
      };
    });

    response.status(200).json(newProducts);
  } catch (error: any) {
    next(error);
  }
};

/** GET SEARCHBARS */
export const getProductSearch = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const query = String(request.query.query);

    let productQuery = {};

    if (query) {
      productQuery = {
        $or: [{ name: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }],
      };
    }

    let products;

    if (!query) {
      products = await Product.find()
        .populate('memory', 'name')
        .populate('category', 'name')
        .populate('graphic', 'name')
        .populate('keyboard', 'name')
        .populate('processor', 'name')
        .populate('brand', 'name')
        .populate('screen', 'name')
        .populate('software', 'name')
        .populate('storage', 'name');
    } else {
      products = await Product.find(productQuery)
        .populate('memory', 'name')
        .populate('category', 'name')
        .populate('graphic', 'name')
        .populate('keyboard', 'name')
        .populate('processor', 'name')
        .populate('brand', 'name')
        .populate('screen', 'name')
        .populate('software', 'name')
        .populate('storage', 'name');
    }

    if (!products) {
      throw new NotFoundError(`No products found`);
    }

    const newProducts = products.map((product: any) => {
      return {
        id: product._id,
        name: product.name,
        code: product.code,
        model: product.model,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        category: product.category.name,
        graphic: product.graphic.name,
        keyboard: product.keyboard.name,
        memory: product.memory.name,
        processor: product.processor.name,
        brand: product.brand.name,
        screen: product.screen.name,
        software: product.software.name,
        storage: product.storage.name,
        status: product.status,
        score: product.score,
      };
    });

    response.status(200).json(newProducts);
  } catch (error: any) {
    next(error);
  }
};
/** GET  BY BRAND*/
export const getProductByBrand = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const brandName = request.params.brand;

    const brand = await Brand.findOne({ name: brandName });
    if (!brand) {
      throw new NotFoundError(`Brand '${brandName}' not found`);
    }

    const query = { brand: brand._id };

    const products = await Product.find(query)
      .populate('memory', 'name')
      .populate('category', 'name')
      .populate('graphic', 'name')
      .populate('keyboard', 'name')
      .populate('processor', 'name')
      .populate('brand', 'name')
      .populate('screen', 'name')
      .populate('software', 'name')
      .populate('storage', 'name');

    if (!products.length) {
      throw new NotFoundError(`No products found for brand '${brandName}'`);
    }

    const newProducts = products.map((product) => {
      return {
        _id: product._id,
        name: product.name,
        code: product.code,
        model: product.model,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        category: product.category.name,
        graphic: product.graphic.name,
        keyboard: product.keyboard.name,
        memory: product.memory.name,
        processor: product.processor.name,
        brand: product.brand.name,
        screen: product.screen.name,
        software: product.software.name,
        storage: product.storage.name,
        status: product.status,
        score: product.score,
      };
    });

    response.status(200).json(newProducts);
  } catch (error: any) {
    next(error);
  }
};

/** GET data */
export const getDataProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    /** Find */
    const findOption: any = request.query.find === 'all' ? '' : request.query.find;
    const findQuery = { name: { $regex: findOption, $options: 'i' } };

    /** Filter */
    let filterQuery: { [key: string]: any } = {};
    try {
      const filterOptions: any = request.query.filter;
      if (filterOptions !== 'none') {
        filterQuery = JSON.parse(filterOptions);
        // Convert properties with references to their corresponding ID
        for (const [key, value] of Object.entries(filterQuery)) {
          // eslint-disable-next-line no-prototype-builtins
          if (models.hasOwnProperty(key) && typeof value === 'object') {
            const modelRef = await models[key].findOne(value);
            const modelRefId = modelRef?._id;
            filterQuery[key] = modelRefId;
          }
        }
      }
    } catch (error) {
      throw new BadRequestError('Invalid filter query. Must be a valid JSON object');
    }

    /** Sort */
    const sortString: any = request.query.sort;
    let sortQuery = {};
    try {
      if (sortString !== 'default') {
        sortQuery = JSON.parse(sortString);
      }
    } catch (error) {
      throw new BadRequestError('Invalid sort query. Must be a valid JSON object');
    }

    const products = await Product.find(Object.assign({}, findQuery, filterQuery))
      .populate('brand', 'name')
      .populate('category', 'name')
      .populate('graphic', 'name')
      .populate('keyboard', 'name')
      .populate('memory', 'name')
      .populate('processor', 'name')
      .populate('screen', 'name')
      .populate('software', 'name')
      .populate('storage', 'name')
      .sort(sortQuery);

    if (!products.length) {
      throw new NotFoundError('No matching products found');
    }

    const product = products.map((product) => {
      return {
        _id: product._id,
        name: product.name,
        code: product.code,
        model: product.model,
        description: product.description,
        price: product.price,
        image: product.image,
        stock: product.stock,
        category: product.category.name,
        graphic: product.graphic.name,
        keyboard: product.keyboard.name,
        memory: product.memory.name,
        processor: product.processor.name,
        brand: product.brand.name,
        screen: product.screen.name,
        software: product.software.name,
        storage: product.storage.name,
      };
    });

    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/** GET */
export const getProductByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id)
      .populate('memory', 'name')
      .populate('category', 'name')
      .populate('graphic', 'name')
      .populate('keyboard', 'name')
      .populate('processor', 'name')
      .populate('brand', 'name')
      .populate('screen', 'name')
      .populate('software', 'name')
      .populate('storage', 'name');

    if (!product) {
      throw new NotFoundError(`Product not found`);
    }

    const _product = {
      id: product._id,
      name: product.name,
      code: product.code,
      model: product.model,
      description: product.description,
      price: product.price,
      image: product.image,
      stock: product.stock,
      category: product.category.name,
      graphic: product.graphic.name,
      keyboard: product.keyboard.name,
      memory: product.memory.name,
      processor: product.processor.name,
      brand: product.brand.name,
      screen: product.screen.name,
      software: product.software.name,
      storage: product.storage.name,
    };

    res.status(200).json(_product);
  } catch (error: any) {
    next(error);
  }
};

/** POST */
export const createProduct = async (request: Request, response: Response, next: NextFunction) => {
  const {
    name,
    code,
    model,
    description,
    price,
    memory,
    stock,
    category,
    graphic,
    keyboard,
    processor,
    brand,
    screen,
    software,
    storage,
  } = request.body;

  /* Check if price is a valid number with two decimal places */
  // const priceRegex = /^\d+(\.\d{1,2})?$/;
  // if (!priceRegex.test(price)) {
  //   throw new BadRequestError(`Price must be a valid number with two decimal places`);
  // }

  /* Check if stock is a positive integer */
  /*   const stockRegex = /^[1-9]\d*$/;
  if (!stockRegex.test(stock)) {
    throw new BadRequestError(`Stock must be a positive integer`);
  } */
  try {
    /* Check if all reference ids are valid */
    const brandField = await Brand.findOne({ name: brand });
    if (!brandField) {
      return response.status(201).json({ message: `Brand ${brand} does not exist` });
    }

    const categoryField = await Category.findOne({ name: category });
    if (!categoryField) {
      return response.status(201).json({ message: `Category ${category} does not exist` });
    }

    const graphicField = await Graphic.findOne({ name: graphic });
    if (!graphicField) {
      return response.status(201).json({ message: `Graphic ${graphic} does not exist` });
    }

    const keyboardField = await Keyboard.findOne({ name: keyboard });
    if (!keyboardField) {
      return response.status(201).json({ message: `Keyboard ${keyboard} does not exist` });
    }

    const memoryField = await Memory.findOne({ name: memory });
    if (!memoryField) {
      return response.status(201).json({ message: `Memory ${memory} does not exist` });
    }

    const processorField = await Processor.findOne({ name: processor });
    if (!processorField) {
      return response.status(201).json({ message: `Processor ${processor} does not exist` });
    }

    const screenField = await Screen.findOne({ name: screen });
    if (!screenField) {
      return response.status(201).json({ message: `Screen ${screen} does not exist` });
    }

    const softwareField = await Software.findOne({ name: software });
    if (!softwareField) {
      return response.status(201).json({ message: `Software ${software} does not exist` });
    }

    const storageField = await Storage.findOne({ name: storage });
    if (!storageField) {
      return response.status(201).json({ message: `Storage ${storage} does not exist` });
    }

    const files = request.files;
    const images = [];
    // Subir las imagen a Cloudinary usando la función handleUpload
    if (files) {
      for (const file of files as Express.Multer.File[]) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
        const imageData = await handleUpload(dataURI);
        const { url, secure_url, public_id } = imageData;
        images.push({
          url: url,
          secure_url: secure_url,
          public_id: public_id,
        });
      }
    }

    const product = new Product({
      name,
      code,
      model,
      description,
      price,
      image: images,
      memory: memoryField._id,
      //stock,
      category: categoryField._id,
      graphic: graphicField._id,
      keyboard: keyboardField._id,
      processor: processorField._id,
      brand: brandField._id,
      screen: screenField._id,
      software: softwareField._id,
      storage: storageField._id,
    });

    await product.save();
    response.status(201).json(product);
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateProductImages = async (request: Request, response: Response) => {
  try {
    const productId = request.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }

    const files = request.files;
    const images: Types.DocumentArray<IImage> = new Types.DocumentArray<IImage>([]);

    if (files) {
      // Upload images to cloudinary
      for (const file of files as Express.Multer.File[]) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = 'data:' + file.mimetype + ';base64,' + b64;
        const imageData = await handleUpload(dataURI);
        const { url, secure_url, public_id } = imageData;
        images.push({
          url: url,
          secure_url: secure_url,
          public_id: public_id,
        });
      }
      product.image = images;
      /* Save the updated product */
      await product.save();

      return response.status(200).json({ message: 'Product saved successfully.' });
    } else {
      return response.status(200).json({ message: 'Images not provided.' });
    }
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
};

/** PATCH */
export const updatePartialProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const productId = request.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }

    const {
      name,
      code,
      model,
      description,
      price,
      image,
      stock,
      category,
      graphic,
      keyboard,
      memory,
      processor,
      brand,
      screen,
      software,
      storage,
      /*active, // Aggregate */
    } = request.body;

    /* Update the product fields */
    product.name = name || product.name;
    product.code = code || product.code;
    product.model = model || product.model;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.stock = stock || product.stock;
    /* product.active = active || product.active; // Aggregate */

    /* Update the fields of references */
    if (category) {
      const categoryObj = await Category.findOne({ name: category });
      if (categoryObj) {
        product.category = categoryObj._id;
      } else {
        throw new NotFoundError('Category not found');
      }
    }

    if (graphic) {
      const graphicObj = await Graphic.findOne({ name: graphic });
      if (graphicObj) {
        product.graphic = graphicObj._id;
      } else {
        throw new NotFoundError('Graphic not found');
      }
    }

    if (keyboard) {
      const keyboardObj = await Keyboard.findOne({ name: keyboard });
      if (keyboardObj) {
        product.keyboard = keyboardObj._id;
      } else {
        throw new NotFoundError('Keyboard not found');
      }
    }

    if (memory) {
      const memoryObj = await Memory.findOne({ name: memory });
      if (memoryObj) {
        product.memory = memoryObj._id;
      } else {
        throw new NotFoundError('Memory not found');
      }
    }

    if (processor) {
      const processorObj = await Processor.findOne({ name: processor });
      if (processorObj) {
        product.processor = processorObj._id;
      } else {
        throw new NotFoundError('Processor not found');
      }
    }

    if (brand) {
      const brandObj = await Brand.findOne({ name: brand });
      if (brandObj) {
        product.brand = brandObj._id;
      } else {
        throw new NotFoundError('Brand not found');
      }
    }

    if (screen) {
      const screenObj = await Screen.findOne({ name: screen });
      if (screenObj) {
        product.screen = screenObj._id;
      } else {
        throw new NotFoundError('Screen not found');
      }
    }

    if (software) {
      const softwareObj = await Software.findOne({ name: software });
      if (softwareObj) {
        product.software = softwareObj._id;
      } else {
        throw new NotFoundError('Software not found');
      }
    }

    if (storage) {
      const storageObj = await Storage.findOne({ name: storage });
      if (storageObj) {
        product.storage = storageObj._id;
      } else {
        throw new NotFoundError('Storage not found');
      }
    }

    /* Save the updated product */
    await product.save();

    response.status(200).json({ message: 'Product saved successfully.' });
  } catch (error: any) {
    next(error);
  }
};

/** PUT */
export const updateProduct = async (request: Request, response: Response) => {
  try {
    const productId = request.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }

    const {
      name,
      code,
      model,
      description,
      price,
      image,
      stock,
      category,
      graphic,
      keyboard,
      memory,
      processor,
      brand,
      screen,
      software,
      storage,
      status,
      score,
    } = request.body;

    /* Update the product fields */
    product.name = name || product.name;
    product.code = code || product.code;
    product.model = model || product.model;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.stock = stock || product.stock;
    if (status !== undefined) product.status = status;
    product.score = score || product.score;

    /* Update the fields of references */
    if (category) {
      const categoryObj = await Category.findOne({ name: category });
      if (categoryObj) {
        product.category = categoryObj._id;
      } else {
        return response.status(404).json({ error: 'Category not found' });
      }
    }
    if (graphic) {
      const graphicObj = await Graphic.findOne({ name: graphic });
      if (graphicObj) {
        product.graphic = graphicObj._id;
      } else {
        return response.status(404).json({ error: 'Graphic not found' });
      }
    }
    if (keyboard) {
      const keyboardObj = await Keyboard.findOne({ name: keyboard });
      if (keyboardObj) {
        product.keyboard = keyboardObj._id;
      } else {
        return response.status(404).json({ error: 'Keyboard not found' });
      }
    }
    if (memory) {
      const memoryObj = await Memory.findOne({ name: memory });
      if (memoryObj) {
        product.memory = memoryObj._id;
      } else {
        return response.status(404).json({ error: 'Memory not found' });
      }
    }
    if (processor) {
      const processorObj = await Processor.findOne({ name: processor });
      if (processorObj) {
        product.processor = processorObj._id;
      } else {
        return response.status(404).json({ error: 'Processor not found' });
      }
    }
    if (brand) {
      const brandObj = await Brand.findOne({ name: brand });
      if (brandObj) {
        product.brand = brandObj._id;
      } else {
        return response.status(404).json({ error: 'Brand not found' });
      }
    }
    if (screen) {
      const screenObj = await Screen.findOne({ name: screen });
      if (screenObj) {
        product.screen = screenObj._id;
      } else {
        return response.status(404).json({ error: 'Screen not found' });
      }
    }
    if (software) {
      const softwareObj = await Software.findOne({ name: software });
      if (softwareObj) {
        product.software = softwareObj._id;
      } else {
        return response.status(404).json({ error: 'Software not found' });
      }
    }
    if (storage) {
      const storageObj = await Storage.findOne({ name: storage });
      if (storageObj) {
        product.storage = storageObj._id;
      } else {
        return response.status(404).json({ error: 'Storage not found' });
      }
    }

    /* Save the updated product */
    await product.save();

    response.status(200).json({ message: 'Product saved successfully.', data: product });
  } catch (error: any) {
    console.log(error.message);
    response.status(400).json({ error: error.message });
  }
};

/** DELETE */
export const deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;

    const product = await Product.findById(id);

    if (!product) {
      throw new NotFoundError(`Product not found`);
    }

    await Product.findByIdAndDelete(request.params.id);

    response.status(200).json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    next(error);
  }
};
