// export const getProduct = async (request: Request, response: Response, next: NextFunction) => {
//   try {
//     const query = String(request.query.query);

//     let productQuery = {};

//     if (query) {
//       productQuery = {
//         $or: [
//           { name: { $regex: query, $options: 'i' } },
//           { description: { $regex: query, $options: 'i' } },
//         ],
//       };
//     }

//     let products;
//     if (query) {
//       products = await Product.find(productQuery)
//         .populate('memory', 'name')
//         .populate('category', 'name')
//         .populate('graphic', 'name')
//         .populate('keyboard', 'name')
//         .populate('processor', 'name')
//         .populate('brand', 'name')
//         .populate('screen', 'name')
//         .populate('software', 'name')
//         .populate('storage', 'name');
//     } else {
//       products = await Product.find()
//         .populate('memory', 'name')
//         .populate('category', 'name')
//         .populate('graphic', 'name')
//         .populate('keyboard', 'name')
//         .populate('processor', 'name')
//         .populate('brand', 'name')
//         .populate('screen', 'name')
//         .populate('software', 'name')
//         .populate('storage', 'name');
//     }

//     if (!products.length) {
//       throw new NotFoundError(`No products found`);
//     }

//     const newProducts = products.map((product) => {
//       return {
//         id: product._id,
//         name: product.name,
//         code: product.code,
//         model: product.model,
//         description: product.description,
//         price: product.price,
//         image: product.image,
//         stock: product.stock,
//         category: product.category.name,
//         graphic: product.graphic.name,
//         keyboard: product.keyboard.name,
//         memory: product.memory.name,
//         processor: product.processor.name,
//         brand: product.brand.name,
//         screen: product.screen.name,
//         software: product.software.name,
//         storage: product.storage.name,
//         status: product.status,
//         score: product.score,
//       };
//     });

//     response.status(200).json(newProducts);
//   } catch (error: any) {
//     next(error);
//   }
// };