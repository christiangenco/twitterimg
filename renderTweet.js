const puppeteer = require("puppeteer");

const tweetId = "992198610304417792";
const outputFilename = `${tweetId}.png`;

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(
    `<html>

    <head>
      <style>
        *{margin: 0; padding: 0}
        #root {
          margin-top: -10px;
        }
    </style>
    </head>

    <body>
      <div id="root"></div>

      <script id="widget" src="https://platform.twitter.com/widgets.js"></script>
      <script>
        window.twttr.widgets.createTweet(
          "${tweetId}",
          document.getElementById("root")
        );
      </script>
    </body>

  </html>`,
    { waitUntil: "domcontentloaded" }
  );

  const { width, height } = await page.evaluate(async () => {
    const sleep = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    const root = document.querySelector("#root");

    while (root.clientHeight === 0) await sleep(100);
    while (document.readyState !== "complete") await sleep(100);
    await sleep(100);

    return {
      width: root.clientWidth,
      height: root.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  await page.setViewport({ width: 500, height, deviceScaleFactor: 2 });
  await page.screenshot({ path: outputFilename });

  await browser.close();
})();
