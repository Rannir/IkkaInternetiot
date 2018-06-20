'use strict';
const d3 = require("d3");
const http = require("http");

angular.module('ikka').controller('managementController', function($scope, managementService, productsService, consts, $http) {
    
    init();

    function init() {

        productsService.getProductsGroupedByBrand(consts.productsApi + '/groupByBrand').then(result => {
            drawGraph1(result);
        });

        productsService.getProductsGroupedByBrand(consts.productsApi + '/groupByCategory').then(result => {
            drawGraph2(result);
        });
        
        productsService.getProducts(consts.productsApi).then(products => {
            $scope.products = products;
        });


        managementService.getFinanceData(consts.webserviceAPI).then(result => {
            $scope.usd_ils = result;
            $scope.$apply();
        });

        managementService.getMostShownCategory(consts.mostShownCategoryApi).then(result => {
            $scope.mostshowncat = result;
        });
    }

    $scope.postTweet = function (tweet) {
        managementService.postTweet(consts.tweeterApi + '/tweet', tweet).then(result => {
            console.log("tweeted");
        });
    }

    $scope.deleteRow = function(product) {
        // Do not delete if row exists only in client
        if(product._id != 0) {
            productsService.deleteProduct(consts.productsApi + '/deleteProduct', product._id).then(result => {
                $scope.products.splice($scope.products.indexOf(product), 1);
                $scope.$apply();
            });    
        }
    }

    $scope.saveRow = function(product) {
        productsService.insertProduct( consts.productsApi + '/postProduct', product).then(result => {
            console.log("result: " + JSON.stringify(result));
            $scope.products.splice($scope.products.indexOf(product), 1);
            $scope.products.push(result);
            $scope.$apply();
        });
    }

    $scope.addNewRow = function () {
        $scope.products.push({
            _id: 0,
            name: "",
            price: 0, 
            description: "",
            category: "",
            brand: ""
        });
    }

    function drawGraph1(data) {
        var margin = {
            top: 10,
            right: 30,
            bottom: 200,
            left: 90
        },
    
        width = 450 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
        //An ordinal scale, to support the bars, we choose 
        var x = d3.scale.ordinal()
          .rangeRoundBands([width, 0], 0.1);
    
        var y = d3.scale.linear()
          .range([0, height]);
    
        //Create an axis
        var xAxis = d3.svg.axis()
          .scale(x)
            //this is where the labels will be located
          .orient("bottom");
    
        var yAxis = d3.svg.axis()
           .scale(y)
           .orient("left")
            //Ticks are the divisions on the scale. 
           .tickFormat(d3.format("d"))
            //Here we want to see only whole numbers on the axis
           .tickSubdivide(0);
    
    
        var svg = d3.select("svg#barChart1")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        //The x domain is a map of all the Products names
        x.domain(data.map(function (d) {
            return d._id;
        }));
    
        //The y domain is a range from the maximal (Count) value in the array until 0
        y.domain([d3.max(data, function (d) {
            return d.count;
    
        }), 0]);
    
        svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
            //In some cases the labels will overlap
          .selectAll("text")
          .attr("transform", "rotate(90)")
          .attr("x", 0)
          .attr("y", -6)
          .attr("dx", ".6em")
          .style("text-anchor", "start");
    
        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);
    
        svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
    
          .attr("x", function (d) {
              //the x function, transforms the value, based on the scale
              return x(d._id);
          })
            //The rangeBand() function returns the width of the bars
          .attr("width", x.rangeBand())
          .attr("y", function (d) {
              //the y function does the same
              return y(d.count);
    
          })
          .attr("height", function (d) {
              return height - y(d.count);
          });
    }

    function drawGraph2(data) {
        //sort bars based on value
        data = data.sort(function (a, b) {
            return d3.ascending(a.count, b.count);
        })

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 50,
            bottom: 15,
            left: 250
        };

        var width  = 630 - margin.left - margin.right,
            height = 230 - margin.top - margin.bottom;
        
        var svg = d3.select("svg#barChart2")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d.count;
            })]);
            
        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d._id;
            }));
            
        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d._id);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.count);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d._id) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.count) + 3;
            })
            .text(function (d) {
                return d.count;
            });
    }
});


