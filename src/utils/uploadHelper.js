const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFromStream = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let upload_stream = cloudinary.uploader.upload_stream(
        {
          tags: "food",
          folder: "foodhutz",
          allowedFormats: ["jpg", "png", "jpeg", "svg", "pdf"],
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
            throw new ApolloError("Oops! failed to upload document");
          }
        }
      );
      const { createReadStream } = await req.document;
      const stream = createReadStream();
      stream.pipe(upload_stream);
    } catch (error) {
      console.log(
        `[ERROR - uploadFromStream]: failed for request ${error.message}`
      );
      reject(error);
    }
  });
};

module.exports = uploadFromStream;
