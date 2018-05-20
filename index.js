const generateImage = require("./generateImage");
const fs = require("fs");
// const { send } = require("micro");

module.exports = async (req, res) => {
  const match = req.url.match(/(\d+)\.png/);
  const tweetId = match && match[1];
  if (tweetId) {
    const outputFilename = `/tmp/${tweetId}.png`;

    if (!fs.existsSync(outputFilename))
      await generateImage({ tweetId, outputFilename });

    // TODO: use a stream or a buffer or something?
    const file = fs.readFileSync(outputFilename);
    res.end(file);
    // const stream = fs.createReadStream(outputFilename);
    // console.log(file.length);
    // send(res, 400, file.length);
    // res.end(stream);

    // send(res, 400, fs.createReadStream(outputFilename));
    // send(res, 400, fs.readFileSync(outputFilename, "utf8"));

    // res.sendFile(outputFilename.replace("/tmp", ""), { root: "/tmp" });
    // await send(ctx, outputFilename.replace("/tmp", ""), { root: "/tmp" });
  } else {
    res.end("Try /992198610304417792.png");
  }
};
