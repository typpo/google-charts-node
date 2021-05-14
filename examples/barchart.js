const fs = require('fs');

const GoogleChartsNode = require('../index');

(async () => {
  const image = await GoogleChartsNode.render(myChart, {
    width: 400,
    height: 300,
  });

  fs.writeFileSync('/tmp/google-chart.png', image);
})();

function myChart() {
  var data = google.visualization.arrayToDataTable([
    ['City', '2010 Population'],
    ['New York City, NY', 8175000],
    ['Los Angeles, CA', 3792000],
    ['Chicago, IL', 2695000],
    ['Houston, TX', 2099000],
    ['Philadelphia, PA', 1526000],
  ]);

  var options = {
    title: 'Population of Largest U.S. Cities',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Total Population',
      minValue: 0,
    },
    vAxis: {
      title: 'City',
    },
  };

  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}
