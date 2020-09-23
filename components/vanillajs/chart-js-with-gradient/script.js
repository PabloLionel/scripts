const parameters = {
  date: ['16-5-2020', '16-5-2020', '16-5-2020', '16-5-2020'],
  glucosa: [12, 33, 55, 21],
  temperatura: [33, 44, 12, 21],
};

const drawParameter = (idSelector, parameter) => {
  // <canvas id="draw_parameter" width="800" height="400"></canvas>

  const ctx = document.getElementById(idSelector).getContext('2d');

  /*** Gradient ***/
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(250,174,50,1)');
  gradient.addColorStop(1, 'rgba(250,174,50,0)');
  /***************/

  return new Chart(ctx).Line(
    {
      labels: parameters.date.map((d) =>
        d
          .split(/-/g)
          .map((num) => num.slice(-2))
          .join('/')
      ),
      datasets: [
        {
          fillColor: gradient, // Put the gradient here as a fill color
          strokeColor: '#ff6c23',
          pointColor: '#fff',
          pointStrokeColor: '#ff6c23',
          pointHighlightFill: '#fff',
          pointHighlightStroke: '#ff6c23',
          data: parameters[parameter],
        },
      ],
    },
    {
      responsive: true,
      datasetStrokeWidth: 3,
      pointDotStrokeWidth: 4,
      tooltipFillColor: 'rgba(0,0,0,0.8)',
      tooltipFontStyle: 'bold',
      // tooltipTemplate:
      //   "<%if (label){%><%=label + ' hod' %>: <%}%><%= value + '°C' %>",
      scaleLabel: "<%= Number(value).toFixed(0).replace('.', ',') + '°C'%>",
    }
  );
};

drawParameter('draw_parameter', 'temperatura');
