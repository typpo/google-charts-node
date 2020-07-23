function getRenderCode(content, opts) {
  const packages = opts.packages.map(package => {
    return `'${package}',`;
  });
  return `
  <div id="chart_div" style="width: ${opts.width}; height: ${opts.height};"></div>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
    const container = document.getElementById('chart_div');
    google.charts.load('current', {
      packages:[${packages}],
      mapsApiKey: '${opts.mapsApiKey}',
    });
    google.charts.setOnLoadCallback(getDrawChart());

    function getDrawChart() {
      const drawChartFn = function(window, document) {
        ${content}
        if (typeof drawChart === 'function') {
          drawChart();
        }
        if (typeof chart !== 'undefined') {
          return chart;
        }
      }
      return function() {
        window.chart = drawChartFn({}, {
          getElementById: () => { return container; },
        });
      }
    }
  </script>
  `;
}

module.exports = {
  getRenderCode,
};
