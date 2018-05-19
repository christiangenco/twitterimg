const puppeteer = require("puppeteer");

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto("https://twitter.com/edent/status/661570680253755392");
  // await page.setContent("<b>hello world</b>");
  //   await page.setContent(
  //     `<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">THAT&#39;S A <a href="https://twitter.com/hashtag/MICROCONF?src=hash&amp;ref_src=twsrc%5Etfw">#MICROCONF</a> RECAP<br><br>Final word count: 31,316<br>Final finger state: sore<br>Time to my nap: as fast as I can power walk to my hotel room<br>Things you should do: sign up for the microconf recap at <a href="https://t.co/hztxHwqXEd">https://t.co/hztxHwqXEd</a> <a href="https://t.co/jwbG8GY0Wk">pic.twitter.com/jwbG8GY0Wk</a></p>&mdash; Christian Genco (@cgenco) <a href="https://twitter.com/cgenco/status/992198610304417792?ref_src=twsrc%5Etfw">May 4, 2018</a></blockquote>
  // <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
  //     { waitUntil: "networkidle2" }
  //   );

  await page.setContent(
    `<html>

    <head>
      <script id="widget" src="https://platform.twitter.com/widgets.js"></script>
      <script type="text/javascript">
        window.a = "test";
        document.a = "test2";
        const a = "poop"
      </script>
    </head>

    <body>
      <div id="root"></div>

      <script>
        window.twttr.widgets.createTweet(
          "992198610304417792",
          document.getElementById("root")
        );
      </script>
    </body>

    </html>`,
    { waitUntil: "networkidle" }
  );

  await sleep(5000);

  // const res = await page.evaluate(() => {
  //   // return JSON.stringify(document.a);
  //   // return JSON.stringify(document.getElementById("widget").src);
  //   // return twttr;
  //   // return window;
  //   // return window.twttr;
  //   // window.twttr.widgets.createTweet(
  //   //   "992198610304417792",
  //   //   document.getElementById("root")
  //   // );
  // });

  // console.log(res);

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log(dimensions);

  await page.setViewport({ width: 800, height: 884, deviceScaleFactor: 2 });
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();

// screenshot:
// clip <Object> An object which specifies clipping region of the page. Should have the following fields:
// x <number> x-coordinate of top-left corner of clip area
// y <number> y-coordinate of top-left corner of clip area
// width <number> width of clipping area
// height <number> height of clipping area

// // import React from "react";
//
// const Tweet = require("react-twitter-widgets").Tweet;
// const repng = require("repng");
//
// const options = {
//   props: {
//     tweetId: "982326554414985216"
//   }
// };
//
// const result = repng(Tweet, options);
//
// result.then(streams => {
//   console.log("rendered component");
//   console.log(streams);
// });
