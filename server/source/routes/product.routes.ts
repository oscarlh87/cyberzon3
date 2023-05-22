import { Router } from 'express';
import {
  getProduct,
  getDataProduct,
  getProductByID,
  createProduct,
  updatePartialProduct,
  updateProduct,
  deleteProduct,
  getProductByBrand,
  getProductSearch,
  updateProductImages,
  getAllProduct,
} from '../controllers/product.controller';
import Multer, { memoryStorage } from 'multer';
import cloudinary from 'cloudinary';

const router: Router = Router();
const upload = Multer({ storage: memoryStorage() });
cloudinary.v2.config({
  cloud_name: 'dzxtsvqmz',
  api_key: '777258223618777',
  api_secret: 'b1HGyY96eAA7y1zpWjVrltGbIxk',
});

router.get('/', getProduct);
router.get('/all', getAllProduct);
router.get('/brand/:brand', getProductByBrand);
router.get('/search', getProductSearch);
router.get('/fn', getDataProduct);
router.get('/:id', getProductByID);
router.post('/', upload.array('image'), createProduct);
router.put('/uploadImages/:id', upload.array('image'), updateProductImages);
router.put('/:id', updateProduct);
router.patch('/:id', updatePartialProduct);
router.delete('/:id', deleteProduct);

export default router;
