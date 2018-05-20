const Koa = require("koa");
const send = require("koa-send");
const Url = require("url");
const fs = require("fs");

const generateImage = require("./generateImage");

const app = new Koa();

app.use(async ctx => {
  const match = ctx.request.url.match(/(\d+)\.png/);
  const tweetId = match && match[1];

  if (tweetId) {
    const outputFilename = `/tmp/${tweetId}.png`;
    if (!fs.existsSync(outputFilename))
      await generateImage({ tweetId, outputFilename });
    await send(ctx, outputFilename.replace("/tmp", ""), { root: "/tmp" });
  } else {
    ctx.body = "Try /992198610304417792.png";
  }
});

module.exports = app;

// const PORT = process.env.PORT || 3000;
// app.listen(PORT);
// console.log(`http://localhost:${PORT}/`);
