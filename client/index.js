$(document).ready(function () {
  let data = {
    count: 10,
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    datasets: [
      {
        label: 'Statistic message of numberic send from Kafka',
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
      },
    ],
  };

  const updateData = function (newVal) {
    let labels = data['labels'];
    let dataArr = data['datasets'][0]['data'];
    labels.shift();
    data.count++;
    labels.push(data.count.toString());
    let newData = Math.floor(newVal);
    dataArr.push(newData);
    dataArr.shift();
  };

  let ctx = document.getElementById('myChart').getContext('2d');
  window.myLine = new Chart(ctx, { type: 'line', data: data });

  function webSocketInvoke() {
    if ('WebSocket' in window) {
      console.log('WebSocket is supported by your Browser!');
      let ws = new WebSocket('ws://localhost:8080/', 'echo-protocol');

      ws.onopen = function () {
        console.log('Connection created');
      };

      ws.onmessage = function (evt) {
        console.log(evt);
        let received_msg = evt.data;
        updateData(evt.data);
        window.myLine.update();
        console.log(received_msg);
      };

      ws.onclose = function () {
        console.log('Connection closed');
      };
    } else {
      alert('WebSocket NOT supported by your Browser!');
    }
  }
  webSocketInvoke();
});
