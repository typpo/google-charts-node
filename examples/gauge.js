const fs = require('fs');

const GoogleChartsNode = require('../index');

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Memory', 80],
  ]);

  var options = {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
  };

  const chart = new google.visualization.Gauge(container);
  chart.draw(data, options);
}

(async () => {
  const image = await GoogleChartsNode.render(drawChart, {
    packages: ['gauge'],
    width: 960,
    height: 300,
  });

  fs.writeFileSync('/tmp/google-chart.png', image);
})();
