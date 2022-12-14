const puppeteer = require('puppeteer');

const { getRenderCode } = require('./helpers');

const RENDER_TIMEOUT_MS = process.env.GOOGLE_CHARTS_RENDER_TIMEOUT_MS || 5000;

async function renderGoogleChart(contentRaw, optsRaw) {
  let content = contentRaw;
  if (typeof contentRaw === 'function') {
    content = `const drawChart = (${contentRaw.toString()});`;
  }

  let opts = Object.assign(
    {
      packages: ['corechart'],
      mapsApiKey: '',
      width: '100%',
      height: '100%'
    },
    optsRaw || {},
  );

  const browser = await puppeteer.launch(opts.puppeteerOptions);

  const page = await browser.newPage();
  page.setDefaultTimeout(RENDER_TIMEOUT_MS);

  page.on('pageerror', function(err) {
    throw new Error('Error: ' + err.toString());
  });

  const renderCode = getRenderCode(content, opts);
  await page.setContent(renderCode);

  const imageBase64 = await page.evaluate(() => {
    if (!window.chart || typeof window.chart.getImageURI === 'undefined') {
      return null;
    }
    return window.chart.getImageURI();
  });

  let buf;
  if (imageBase64) {
    // Exported the chart via Google Charts API.
    buf = Buffer.from(imageBase64.slice('data:image/png;base64,'.length), 'base64');
  } else {
    const elt = await page.$('#chart_div');
    // Chart doesn't support export, take a screenshot
    buf = await elt.screenshot();
  }

  await browser.close();

  return buf;
}

module.exports = {
  renderGoogleChart,
};
