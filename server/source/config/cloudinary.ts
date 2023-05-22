import Multer, { memoryStorage } from 'multer';
import cloudinary from 'cloudinary';

const upload = Multer({ storage: memoryStorage() });
cloudinary.v2.config({
  cloud_name: 'dzxtsvqmz',
  api_key: '777258223618777',
  api_secret: 'b1HGyY96eAA7y1zpWjVrltGbIxk',
});

async function handleUpload(file: any) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}

export { handleUpload };
