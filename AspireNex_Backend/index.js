
const express = require('express');
const request = require("request")
const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
const PORT = 5000;

// app.use(cors());
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5000', 
  'https://aspire-nex-web-scraping-ecommerce-websites.vercel.app/' // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.get("/", (req, res) => {
  res.send("hello");

})



app.post('/amazon/product/left', async (req, res) => {
  console.log('Received request to fetch product:', req.body);
  const { url } = req.body;
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Scrape the product data
      const productData = await page.evaluate(() => {

        const title = document.querySelector('#productTitle')?.innerText.trim();
        const imgSrc = document.querySelector('img#landingImage').getAttribute('src');
        const prices = document.querySelector('span.a-price-whole')
        let price = (prices)?.innerText.trim();
        price = price.replace(/\n/g, ' ');
        const rating = document.querySelector('.a-icon-alt')?.innerText.trim();
        const description = document.querySelector('#productDescription')?.innerText.trim();
        const Imgs = Array.from(document.querySelectorAll('#altImages .a-button-text img'))
          .map(
            el => el.getAttribute("src")
          );
        const features = [];
        document.querySelectorAll('#feature-bullets ul li').forEach((element) => {
          const feature = element.textContent.trim();
          features.push(feature);
        });

        const tableRows = document.querySelectorAll('#productDetails_techSpec_section_1 tbody tr');
        const technicalData = [];

        tableRows.forEach(row => {
          const key = row.querySelector('th')?.innerText.trim();
          const value = row.querySelector('td')?.innerText.trim();
          if (key && value) {
            technicalData.push({ key, value });
          }
        });
        return { title, imgSrc, price, description, Imgs, rating, features, technicalData };
      });

      console.log(productData);
      res.json(productData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch product data' });

    } finally {
      await browser.close();
    }
  })().catch(error => console.log(error));


})
app.post('/amazon/product/right', async (req, res) => {
  console.log('Received request to fetch product:', req.body);
  const { urlr } = req.body;
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(urlr, { waitUntil: 'networkidle2' });

      // Scrape the product data
      const productData = await page.evaluate(() => {

        const title = document.querySelector('#productTitle')?.innerText.trim();
        const imgSrc = document.querySelector('img#landingImage').getAttribute('src');
        const prices = document.querySelector('span.a-price-whole')
        let price = (prices)?.innerText.trim();
        price = price.replace(/\n/g, ' ');
        const rating = document.querySelector('.a-icon-alt')?.innerText.trim();
        const description = document.querySelector('#productDescription')?.innerText.trim();
        const Imgs = Array.from(document.querySelectorAll('#altImages .a-button-text img'))
          .map(
            el => el.getAttribute("src")
          );
        const features = [];
        document.querySelectorAll('#feature-bullets ul li').forEach((element) => {
          const feature = element.textContent.trim();
          features.push(feature);
        });

        const tableRows = document.querySelectorAll('#productDetails_techSpec_section_1 tbody tr');
        const technicalData = [];

        tableRows.forEach(row => {
          const key = row.querySelector('th')?.innerText.trim();
          const value = row.querySelector('td')?.innerText.trim();
          if (key && value) {
            technicalData.push({ key, value });
          }
        });
        return { title, imgSrc, price, description, Imgs, rating, features, technicalData };
      });

      console.log(productData);
      res.json(productData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch product data' });

    } finally {
      await browser.close();
    }
  })().catch(error => console.log(error));


})

app.post("/flipcart/product/left", async (req, res) => {
  // console.log('Received request to fetch product:', req.body);
  const { url } = req.body;

  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Scrape the product data
      const product = await page.evaluate(() => {
        const title = document.querySelector('.VU-ZEz')?.innerText.trim();
        const price = document.querySelector('.Nx9bqj')?.innerText.trim();
        const rating = document.querySelector('.ipqd2A')?.innerText.trim();

        const imgSrc = document.querySelector('._6lpKCl img')?.getAttribute("src");
        const description = document.querySelector('._4gvKMe p')?.innerText.trim();

        const Imgs = Array.from(document.querySelectorAll('.ZqtVYK img'))
          .map(el => el.getAttribute("src"));

        const tableRows = document.querySelectorAll('._0ZhAN9 tbody tr');
        const technicalData = [];

        tableRows.forEach(row => {
          const key = row.querySelector('td:nth-child(1)')?.innerText.trim();
          const value = row.querySelector('td:nth-child(2)')?.innerText.trim();
          if (key && value) {
            technicalData.push({ key, value });
          }
        });

        const features = [];
        document.querySelectorAll('#feature-bullets ul li').forEach((element) => {
          const feature = element.textContent.trim();
          features.push(feature);
        });

        return { title, imgSrc, price, description, Imgs, rating, features, technicalData };

      });
      // console.log(product)
      res.json(product);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to scrape product data' });
    } finally {
      await browser.close();
    }
  })();

})

app.post("/flipcart/product/right", async (req, res) => {
  // console.log('Received request to fetch product:', req.body);
  const { urlr } = req.body;

  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(urlr, { waitUntil: 'networkidle2' });

      // Scrape the product data
      const product = await page.evaluate(() => {
        const title = document.querySelector('.VU-ZEz')?.innerText.trim();
        const price = document.querySelector('.Nx9bqj')?.innerText.trim();
        const imgSrc = document.querySelector('._6lpKCl img')?.getAttribute("src");
        const description = document.querySelector('._4gvKMe p')?.innerText.trim();
        const rating = document.querySelector('.ipqd2A')?.innerText.trim();

        const Imgs = Array.from(document.querySelectorAll('.ZqtVYK img'))
          .map(el => el.getAttribute("src"));

        const tableRows = document.querySelectorAll('._0ZhAN9 tbody tr');
        const technicalData = [];

        tableRows.forEach(row => {
          const key = row.querySelector('td:nth-child(1)')?.innerText.trim();
          const value = row.querySelector('td:nth-child(2)')?.innerText.trim();
          if (key && value) {
            technicalData.push({ key, value });
          }
        });

        return { title, imgSrc, price, description, Imgs, rating, technicalData };

      });
      // console.log(product)
      res.json(product);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to scrape product data' });
    } finally {
      await browser.close();
    }
  })();

})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
