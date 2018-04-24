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
    var temperatures = [
        { temp: 32, onDate: '2011-04-14T16:00:49Z' },
        { temp: 38, onDate: '2011-04-15T16:00:49Z' },
        { temp: 47, onDate: '2011-04-16T16:00:49Z' },
        { temp: 59, onDate: '2011-04-17T16:00:49Z' },
        { temp: 70, onDate: '2011-04-18T16:00:49Z' },
        { temp: 80, onDate: '2011-04-19T16:00:49Z' },
        { temp: 84, onDate: '2011-04-11T16:00:49Z' },
        { temp: 83, onDate: '2011-04-12T16:00:49Z' },
        { temp: 76, onDate: '2011-04-13T16:00:49Z' },
        { temp: 64, onDate: '2011-04-10T16:00:49Z' },
        { temp: 49, onDate: '2011-04-20T16:00:49Z' },
        { temp: 99, onDate: '2011-04-21T16:00:49Z' }
    ];

    var months = temperatures.map(function (t) {
        return new Date(t.onDate);
    });

    var margin = {
        top: 5,
        right: 5,
        bottom: 50,
        left: 50
    };

    var fullWidth = 700;
    var fullHeight = 200;

    var width  = fullWidth - margin.left - margin.right;
    var height = fullHeight - margin.bottom - margin.top;

    var svg = d3.select('.chart')
                .append('svg')
                .attr('width', fullWidth)
                .attr('height', fullHeight)
                .append('g')
                .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');

    // Vertical bars
    // var monthScale = d3.scaleBand()
    var monthScale = d3.scaleTime()
                       .domain(months)
                       .range([0, width]);
                    //    .paddingInner(0.1);

    var tempScale = d3.scaleLinear()
                      .domain([0, d3.max(temperatures, function(d) {
                          return d.temp;
                      })])
                      .range([height, 0])
                      .nice();

    // var bandWidth = monthScale.bandwidth();
    var barHolder = svg.append('g')
                       .classed('bar-holder', true);

    var bars = barHolder.selectAll('rect.bar')
             .data(temperatures)
             .enter()
             .append('rect')
             .classed('bar', true)
             .attr('x', function(d, i) {
                 return monthScale(new Date(d.onDate));
             })
             .attr('width', width)
             .attr('y', function(d) {
                 return tempScale(d.temp);
             })
             .attr('height', function(d) {
                 return height - tempScale(d.temp);
             });
    // Vertical bars end

    // scales
    var xAxis = d3.axisBottom(monthScale)
                  .scale(monthScale);
                //   .ticks(d3.timeMonths);
                //   .tickSizeOuter(1);
    var yAxis = d3.axisLeft(tempScale)
                  .tickSizeOuter(1);

    svg.append('g')
       .classed('x axis', true)
       .attr('transform', 'translate(0,' + height + ')')
       .call(xAxis);

    var yAxisElement = svg.append('g')
                          .classed('y axis', true)
                          .call(yAxis);
    yAxisElement.append('text')
                .attr('transform', 'rotate(-90) translate(-' + height / 2 + ', 0)')
                .style('text-ancher', 'middle')
                .attr('dy', '-2.5em')
                .text('Farenheit');
}
