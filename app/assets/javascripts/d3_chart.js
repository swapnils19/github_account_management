function initDatePickers() {
    var icons = {
        date: 'fa fa-calendar',
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down',
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
    };

    $(function () {
        $('#fromDate').datetimepicker({
            format: 'DD/MM/YYYY',
            icons: icons
        });
    });

    $(function () {
        $('#toDate').datetimepicker({
            format: 'DD/MM/YYYY',
            icons: icons
        });
    });

    // $('.form-group #datetimepicker1').on("dp.change", function (e) {
    //     alert('hey');
    //     // $('#dpEnd').data("DateTimePicker").setMinDate(e.date);
    // });
}

function submitDates() {
debugger
    console.log($('#fromDate').data('DateTimePicker').date());
}

// function initChart(){
//     var margin = { top: 20, right: 20, bottom: 70, left: 40 },
//         width = 600 - margin.left - margin.right,
//         height = 300 - margin.top - margin.bottom;

//     // Parse the date / time
//     var parseDate = d3.isoParse

//     var x = d3.scaleBand().rangeRound([0, width], .05).padding(0.1);

//     var y = d3.scaleLinear().range([height, 0]);

//     var xAxis = d3.axisBottom()
//         .scale(x)
//         .tickFormat(d3.timeFormat("%Y-%m-%d"));

//     var yAxis = d3.axisLeft()
//         .scale(y)
//         .ticks(10);

//     var svg = d3.select(".chart").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
    
//     d3.csv("/bar-data.csv", function (error, data) {
//         data.forEach(function (d) {
//             d.date = parseDate(d.date);
//             d.value = +d.value;
//         });

//         x.domain(data.map(function (d) { return d.date; }));
//         y.domain([0, d3.max(data, function (d) { return d.value; })]);

//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(xAxis)
//             .selectAll("text")
//             .style("text-anchor", "end")
//             .attr("dx", "-.8em")
//             .attr("dy", "-.55em")
//             .attr("transform", "rotate(-90)");

//         svg.append("g")
//             .attr("class", "y axis")
//             .call(yAxis)
//             .append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .text("Value");

//         svg.selectAll("bar")
//             .data(data)
//             .enter().append("rect")
//             .style("fill", "steelblue")
//             .attr("x", function (d) { return x(d.date); })
//             .attr("width", x.bandwidth())
//             .attr("y", function (d) { return y(d.value); })
//             .attr("height", function (d) { return height - y(d.value); });

//     });
//     console.log($('.chart').children());
// }
function initChart() {
    var parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");

    var temperatures = [{
        temp: 80,
        onDate: '2016-01-01T16:00:49Z'
    },
    {
        temp: 38,
        onDate: '2016-02-01T16:00:49Z'
    },
    {
        temp: 47,
        onDate: '2016-05-01T16:00:49Z'
    },
    {
        temp: 59,
        onDate: '2017-01-01T16:00:49Z'
    },
    ];

    temperatures.forEach(function (d) {
        d.onDate = parseDate(d.onDate);
        console.log(d.onDate)
        return d;
    })

    var margin = { top: 25, right: 35, bottom: 25, left: 35, padd: 15 };

    var fullWidth = 600;
    var fullHeight = 250;

    var width = fullWidth - margin.left - margin.right;
    var height = fullHeight - margin.bottom - margin.top;

    var svg = d3.select('.chart').append('svg')
        .attr('width', fullWidth)
        .attr('height', fullHeight)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var minDate = d3.min(temperatures, function (d) {
        return d.onDate.getTime();
    }),
        maxDate = d3.max(temperatures, function (d) {
            return d.onDate.getTime();
        }),
        padding = (maxDate - minDate) * .1;

    var x = d3.scaleTime()
        .rangeRound([0, width])
        .domain([minDate - padding, maxDate + padding]);

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(temperatures, function (d) {
            return d.temp;
        })]);

    var xAxis = d3.axisBottom(x)
        .tickSizeOuter(1)
        .tickFormat(d3.timeFormat("%b")),
        yAxis = d3.axisLeft(y)
            .tickSizeOuter(1);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 3)
        .attr("dy", "-0.71em")
        .attr("fill", "#000")
        .text("Farenheit");

    var bars = svg.selectAll('.bar')
        .data(temperatures)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr('width', (width - margin.padd) / (temperatures.length * temperatures.length))
        .attr('height', function (d) {
            return height - y(d.temp);
        })
        .attr('x', function (d) {
            return x(d.onDate) - margin.padd
        })
        .attr('y', function (d) {
            return y(d.temp);
        })
}
