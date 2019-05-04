function float2dollar(value) {
    return "A$" + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function randomizeRevenues() {
    return (Math.random() * 10000).toFixed(2);
}
function randomizeClients() {
    return Math.ceil(Math.random() * 500);
}

var labels = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
];
// var revenues = {
//     thisWeek: [
//         20000,
//         14000,
//         12000,
//         15000,
//         18000,
//         19000,
//         22000
//     ],
//     lastWeek: [
//         10000,
//         24000,
//         16000,
//         19000,
//         28000,
//         9000,
//         2000
//     ]
// };

// var clients = {
//     thisWeek: [
//         201,
//         140,
//         80,
//         150,
//         190,
//         170,
//         202
//     ],
//     lastWeek: [
//         251,
//         110,
//         50,
//         100,
//         220,
//         190,
//         282
//     ]
// };

var revenues = {
    thisWeek: [],
    lastWeek: []
}

var clients = {
    thisWeek: [],
    lastWeek: []
}

function randomizeData(){
    labels.forEach(function(label){
        revenues.thisWeek.push(randomizeRevenues());
        revenues.lastWeek.push(randomizeRevenues());
        clients.thisWeek.push(randomizeClients());
        clients.lastWeek.push(randomizeClients());
    });
}

var mix = document.getElementById('myChart').getContext('2d');
var config = {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                type: 'line',
                label: 'This week revenues',
                data: revenues.thisWeek,
                borderColor: 'rgba(77, 255, 77, 1)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                yAxisID: 'revenues'
            },
            {
                type: 'line',
                label: 'Last week revenues',
                data: revenues.lastWeek,
                borderColor: 'rgb(0, 128, 64, 1)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                yAxisID: 'revenues'
            },
            {
                label: 'This week clients',
                data: clients.thisWeek,
                borderColor: 'rgba(0, 0, 0, 0)',
                backgroundColor: 'rgba(255, 179, 179,1)',
                yAxisID: 'clients'
            },
            {
                label: 'Last week clients',
                data: clients.lastWeek,
                borderColor: 'rgba(0, 0, 0, 0)',
                backgroundColor: 'rgba(255, 140, 26,1)',
                yAxisID: 'clients'
            }
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'This week vs. last week revenues and clients'
        },
        tooltips: {
            mode: 'index',
            intersect: true,
        },
        hover: {
            mode: 'nearest',
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Day'
                    },
                    gridLines: {
                        display: false
                    }
                }
            ],
            yAxes: [
                {
                    id: 'revenues',
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return float2dollar(value);
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Revenues'
                    },
                    gridLines: {
                        display: true
                    }
                },
                {
                    id: 'clients',
                    ticks: {
                        beginAtZero: true,
                    },
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: 'Clients'
                    },
                    gridLines: {
                        display: false
                    }
                }
            ],
        }
    }
}
var myChart;

$(document).ready(
    function () {
        randomizeData();
        myChart = new Chart(mix, config);
        clear();
    }
);

$('#updateBtn').click(
    function () {
        randomizeData();
        if(!myChart) {
            myChart = new Chart(mix, config);
        } else {
            config.data.datasets[0].data = revenues.thisWeek;
            config.data.datasets[1].data = revenues.lastWeek;
            config.data.datasets[2].data = clients.thisWeek;
            config.data.datasets[3].data = clients.lastWeek;
            myChart.destroy();
            myChart = new Chart(mix, config);
        }
        clear();
    }
);

function clear() {
    revenues.thisWeek = [];
    revenues.lastWeek = [];
    clients.thisWeek = [];
    clients.lastWeek = [];
}