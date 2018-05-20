const Koa = require("koa");
const send = require("koa-send");

const generateImage = require("./generateImage");

const app = new Koa();

app.use(async ctx => {
  const { tweetId } = ctx.query;
  // const { host, pathname } = Url.parse(url);

  if (tweetId) {
    const outputFilename = `/tmp/${tweetId}.png`;

    await generateImage({ tweetId, outputFilename });
    await send(ctx, path, { root: "/tmp" });
  } else {
    ctx.body = "missing tweetId query";
  }

  // if (fs.existsSync(dest)) {
  //   await send(ctx, path, { root: rootDir });
  // } else {
  //   const res = await axios({ url, responseType: "stream" });
  //   res.data.pipe(fs.createWriteStream(dest));
  //   await new Promise((resolve, reject) => res.data.on("end", () => resolve()));
  //
  //   await send(ctx, path, { root: rootDir });
  // }
});

const tweetId = "992198610304417792";

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`http://localhost:${PORT}/`);
