var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    xLength = 12,
    yLength = 4,
    cellSize = 44,
    matrix = [];

if (viewPortWidth < xLength * cellSize) {
    cellSize = (viewPortWidth - cellSize) / xLength;
}

function resetMatrix() {
    for (var i = 0; i < xLength; i++) {
        matrix[i] = [];
    }
}

function randX() {
    return Math.floor(Math.random() * xLength);
}

function randY() {
    return Math.floor(Math.random() * yLength);
}

function addToMatrix(data) {

    var x = randX(),
        y = randY();

    var there = matrix[x][y];

    if (!there) {
        matrix[x][y] = data;
        return [x,y];
    } else {
        //try again..
        return addToMatrix(data);
    }

}

var getDisplayData = function(d) {
    return d;
};


var data = " MANDARIN      DRUMMOND   DOT           COM     ".split("");

var dataElements = d3
    .select("#logoContainer")
    .style('height', cellSize * 5 + 'px')
    .selectAll("div")
    .data(data)
    .text(getDisplayData);

dataElements.enter()
    .append("div")
    .text(getDisplayData);

dataElements.exit().remove();

function transitionElement(left, top) {
    d3.select(this)
        .transition()
        .duration(800)
        .ease('elastic')
        .style('left', left + 'px')
        .style('top', top + 'px');

}

function scrambleData() {

    resetMatrix();

    dataElements.each(function(d, i) {

        var coord = addToMatrix(d);
        var left = coord[0] * cellSize,
            top = coord[1] * cellSize;
        var bgColor = "#ADD8E6";
        if (d === " ") {
            bgColor = "#EFEFEF";
        }

        var margin = cellSize / 10,
            squareSize = cellSize - margin;

        d3.select(this)
            .style('font-size', squareSize / 20 + "em")
            .style('width', squareSize + 'px')
            .style('height', squareSize + 'px')
            .style('background-color', bgColor);

        transitionElement.call(this, left, top);
    });



}

function unscrambleData() {

    resetMatrix();
    dataElements.each(function(d, i) {

        var coord = [i % xLength, Math.floor(i / xLength)];
        var left = coord[0] * cellSize,
            top = coord[1] * cellSize;

        transitionElement.call(this, left, top);
    });

}

scrambleData();

var state = "scrambled";

d3.select('#logoContainer').on('click', function() {

    if (state === 'scrambled') {
        state = "unscrambled";
        unscrambleData();
    } else {
        state = "scrambled";
        scrambleData();
    }

});

setTimeout(function() {
    state = "unscrambled";
    unscrambleData();
}, 1000);