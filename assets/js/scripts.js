var jsonDATA =
[
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/25/",
      "pH_level": 11.0,
      "temperature": 27.8,
      "time_collected": "2016-06-02T17:38:02.730750Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/24/",
      "pH_level": 11.0,
      "temperature": 28.4,
      "time_collected": "2016-06-02T17:38:01.677574Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/23/",
      "pH_level": 11.0,
      "temperature": 24.6,
      "time_collected": "2016-06-02T17:38:00.611537Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/22/",
      "pH_level": 11.0,
      "temperature": 25,
      "time_collected": "2016-06-02T17:37:59.555683Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/21/",
      "pH_level": 11.0,
      "temperature": 26.2,
      "time_collected": "2016-06-02T17:37:58.502260Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/20/",
      "pH_level": 11.0,
      "temperature": 25.8,
      "time_collected": "2016-06-02T17:37:57.434746Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/19/",
      "pH_level": 11.0,
      "temperature": 26.0,
      "time_collected": "2016-06-02T17:37:56.372216Z"
  },

  {
      "url": "http://bonapetite.herokuapp.com/api/mister/18/",
      "pH_level": 11.0,
      "temperature": 26.4,
      "time_collected": "2016-06-02T17:37:55.317967Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/17/",
      "pH_level": 11.0,
      "temperature": 26.8,
      "time_collected": "2016-06-02T17:37:54.264775Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/16/",
      "pH_level": 11.0,
      "temperature": 27.2,
      "time_collected": "2016-06-02T17:37:53.185778Z"
  }
];

var data = jsonDATA.slice();
console.log(data)

  //set variables for data ranges and axes
  var format = d3.time.format.iso
  var  date_format = d3.time.format("%I:%M:%S")
  var tempFn = function(d){ return d.temperature };
  var dateFn = function(d){ return format.parse(d.time_collected)}



  console.log(data[1].time_collected);
  //set variables for graph size and margins
  var width = 1000;
  var height = 300;
  var margins = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 50
  }

  //set scale for x axis
  var x = d3.time.scale()
    .range([margins.left, width - margins.right])
    .domain(d3.extent(data, dateFn))


  //set scale for y axis
  var y = d3.scale.linear()
    .range([height - margins.top, margins.bottom])
    .domain([15, 35]);

  //create an svg graph!
  var svg = d3.select('#temp-graph').append("svg:svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)

  //set x-axis scale
  xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(date_format);

  //set y-axis scale
  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  //append x-axis
  svg.append("svg:g")
    .attr("transform", "translate(0," + (height - margins.bottom) + ")")
    .call(xAxis);

  //append y-axis
  svg.append("svg:g")
    .attr("transform", "translate(" + (margins.left) + ",-20)")
    .call(yAxis);

  //append x axis label
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+(width/2)+","+(height)+")")
    .text("Time (Seconds)")

  //append y axis label
  svg.append("text")
  .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
    .text("Temperatue (Celcius)")

  //max temperature range line
  svg.append("svg:line")
    .attr("x1", 50)
    .attr("x2", width-20)
    .attr("y1", 80)
    .attr("y2", 80)
    .style("stroke", "lightgray")
    .attr("opacity", 0.1);

  //max temp range area
  var maxRectangle = svg.append("rect")
    .attr("x", 50)
    .attr("y", 19)
    .attr("width", 930)
    .attr("height", 60)
    .attr("fill", "pink")
    .attr("opacity", 0.1);

  //min temperature range line
  svg.append("svg:line")
    .attr("x1", 50)
    .attr("x2", width-20)
    .attr("y1", 200)
    .attr("y2", 200)
    .style("stroke", "rgb(189, 189, 189)")
    .attr("opacity", 0.1);

  //min temp range area
  var minRectangle = svg.append("rect")
    .attr("x", 50)
    .attr("y", 200)
    .attr("width", 930)
    .attr("height", 60)
    .attr("fill", "lightblue")
    .attr("opacity", 0.1);

  // create variable for temp data line
  var line = d3.svg.line()
     .x(function(d){ return x(dateFn(d))})
     .y(function(d){ return y(tempFn(d))})
     .interpolate("linear")

  //append temp data line
  svg.append("svg:path")
    .attr("d", line(data))
    .style("stroke", "limegreen")

  //append temp data as circles
  svg.selectAll("circle").data(data).enter()
    .append("svg:circle")
    .attr("r", 4)
    .attr("cx", function(d){ return x(dateFn(d))})
    .attr("cy", function(d){ return y(tempFn(d))})
    .style("stroke", "limegreen")
    .style("fill", "white")
    .on("mouseover", function(d){//add tooltips to display temp/time data on hover over each data point
        tempTooltip.transition()
        .duration(200)
        .style("opacity", 1)
        .style("display", "block")
        tempTooltip.html("<div id='temp-tooltip'><span>" + d.temperature + " Degrees Cecius</span><br><span>Taken at " + d.time_collected + "</span></div>")
    })
    .on("mouseout", function(d){
      tempTooltip.transition()
      .duration(200)
      .style("opacity", 0)
      .style("display", "none")
    });


  //create empty/invisible div to for as to have DOM attachment for tooltipe
  var tempTooltip = d3.select("body")
    .append("div")
    .attr("class", "tempTooltip")
    .style("opacity", 0)
    .style("display", "none")
    .style("position", "absolute")










// //grab the json data
// var data = d3.json("http://bonapetite.herokuapp.com/api/mister/", function(error, json) {
//   //error callback
//   if (error) return console.warn(error);
//   //set svg data as json payload
//   var data = json.results;
//   console.log(data)
//
//
// });
