const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || 'dxxwojaqv',
  api_key: process.env.API_KEY || '611291973937328',
  api_secret: process.env.API_SECRET || 'ZBPj7AjIGWuu5ITNl_b74ILgyNs',
});

const singleImage = async path => {
  try {
    const result = await new Promise(resolve => {
      cloudinary.uploader.upload(
        path,
        { resource_type: 'auto', a_ignore: true, upload_preset: 'wt9fgid0' },
        function(error, result) {
          const { eager, url, width, height, public_id } = result;

          resolve([{ 
            public_id: public_id, 
            original_image: { url, width, height }, 
            src: eager[0].url, 
            height: eager[0].height, 
            width: eager[0].width,
            thumbnail: eager[1].url,
            thumbnailWidth: eager[1].width,
            thumbnailHeight: eager[1].height
          }]);
        }
        // image => {
        //   resolve([{ secure_url: image.secure_url, public_id: image.public_id }]);
        // },
      );
    });
    return result;
  } catch (e) {
    throw Error('Error upload image');
  }
};

module.exports = { singleImage };
