const uploadService = require('../service/upload.service');

const singleImage = async (req, res) => {
  const path = Object.values(req.files)[0].path;
      try {
        const result = await uploadService.singleImage(path);
            return res.status(200).send(result);
          } catch (e) {
            return res.sendStatus(400);
          } 
}

module.exports =  { singleImage };
