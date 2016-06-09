var jsonDATA =
[
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/25/",
      "pH_level": 480,
      "temperature": 27.8,
      "time_collected": "2016-06-02T17:38:02.730750Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/24/",
      "pH_level": 500,
      "temperature": 28.4,
      "time_collected": "2016-06-02T17:38:01.677574Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/23/",
      "pH_level": 450,
      "temperature": 24.6,
      "time_collected": "2016-06-02T17:38:00.611537Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/22/",
      "pH_level": 410,
      "temperature": 25,
      "time_collected": "2016-06-02T17:37:59.555683Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/21/",
      "pH_level": 370,
      "temperature": 26.2,
      "time_collected": "2016-06-02T17:37:58.502260Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/20/",
      "pH_level": 340,
      "temperature": 25.8,
      "time_collected": "2016-06-02T17:37:57.434746Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/19/",
      "pH_level": 280,
      "temperature": 26.0,
      "time_collected": "2016-06-02T17:37:56.372216Z"
  },

  {
      "url": "http://bonapetite.herokuapp.com/api/mister/18/",
      "pH_level": 250,
      "temperature": 26.4,
      "time_collected": "2016-06-02T17:37:55.317967Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/17/",
      "pH_level": 230,
      "temperature": 26.8,
      "time_collected": "2016-06-02T17:37:54.264775Z"
  },
  {
      "url": "http://bonapetite.herokuapp.com/api/mister/16/",
      "pH_level": 220,
      "temperature": 27.2,
      "time_collected": "2016-06-02T17:37:53.185778Z"
  }
];

var data = jsonDATA.slice();
console.log(data);

//----------------------------shared graph variables---------------------//

  //set variables for data ranges and axes
  var format = d3.time.format.iso;
  var date_format = d3.time.format("%I:%M:%S");
  var toolTipDate = d3.time.format("%a %b, %I:%M:%S");
  var tempFn = function(d){ return d.temperature };
  var dateFn = function(d){ return format.parse(d.time_collected)};
  var ecFn = function(d){ return d.pH_level };

  //set variables for graph size and margins
  var width = 800;
  var height = 400;
  var margins = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 50
  };

//-----------------------------axis variables------------------------//

  //set scale for x axis
  var x = d3.time.scale()
    .range([margins.left, width - margins.right])
    .domain(d3.extent(data, dateFn));

  //set scale for temp graph y axis
  var y = d3.scale.linear()
    .range([height - margins.top, margins.bottom])
    .domain([15, 35]);

  //set scale for ec graph y axis
  var ecY = d3.scale.linear()
    .range([height - margins.top, margins.bottom])
    .domain([0, 1500]);

  //set x-axis scale
  xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(date_format);

  //set y-axis scale for temp graph
  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  //set y-axis scale for ec graph
  ecYAxis = d3.svg.axis()
    .scale(ecY)
    .orient("left");

//---------------------------temperature graph---------------------------//
  //create an svg graph!
  var svg = d3.select('#temp-graph').append("svg:svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom);

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
    .text("Time (Seconds)");

  //append y axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Temperatue (Celcius)");

  //max temperature range line
  svg.append("svg:line")
    .attr("x1", 50)
    .attr("x2", width-20)
    .attr("y1", 105)
    .attr("y2", 105)
    .style("stroke", "lightgray")
    .attr("opacity", 0.1);

  //max temp range area
  var maxRectangle = svg.append("rect")
    .attr("x", 50)
    .attr("y", 19)
    .attr("width", width-70)
    .attr("height", 85)
    .attr("fill", "pink")
    .attr("opacity", 0.2);

  //min temperature range line
  svg.append("svg:line")
    .attr("x1", 50)
    .attr("x2", width-20)
    .attr("y1", 272)
    .attr("y2", 272)
    .style("stroke", "rgb(189, 189, 189)")
    .attr("opacity", 0.1);

  //min temp range area
  var minRectangle = svg.append("rect")
    .attr("x", 50)
    .attr("y", 272)
    .attr("width", width-70)
    .attr("height", 86)
    .attr("fill", "lightblue")
    .attr("opacity", 0.2);

  // create variable for temp data line
  var line = d3.svg.line()
     .x(function(d){ return x(dateFn(d))})
     .y(function(d){ return y(tempFn(d))})
     .interpolate("linear");

  //append temp data line
  svg.append("svg:path")
    .attr("d", line(data))
    .style("stroke", "limegreen");

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
        tempTooltip.html("<div id='temp-tooltip'><span>" + d.temperature + " Degrees Cecius</span><br><span>Taken " + d.time_collected + "</span></div>")
    })
    .on("mouseout", function(d){
      tempTooltip.transition()
      .duration(200)
      .style("opacity", 0)
      .style("display", "none")
    });

  //create empty/invisible div to for as to have DOM attachment for tooltip
  var tempTooltip = d3.select("body")
    .append("div")
    .attr("class", "tempTooltip")
    .style("opacity", 0)
    .style("display", "none");



//-----------------------------ec graph---------------------------------------//
  //create the graph
  var ecg = d3.select("#ec-graph").append("svg:svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom);

  //append x-axis
  ecg.append("svg:g")
    .attr("transform", "translate(0," + (height - margins.bottom) + ")")
    .call(xAxis);

  //append x axis label
  ecg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+(width/2)+","+(height)+")")
    .text("Time (Seconds)");

  //append y-axis
  ecg.append("svg:g")
    .attr("transform", "translate(" + (margins.left) + ",-20)")
    .call(ecYAxis);

  //append y axis label
  ecg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Electrical Conductivilty (µS/cm)");







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
