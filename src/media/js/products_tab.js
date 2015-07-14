var tooltipContentForRevenueChart = function(series){
    setupBigTooltip(series);
    series.tooltip().contentFormatter(function(){
        var current = '$' + parseInt(this.value).formatMoney(0, '.', ',') ;
        var span_for_names = '<span style="color:' + darkAccentColor + '; font-size: 13px">';
        var span_for_title = '<span style="color:' + colorAxisFont + '; font-size: 14px">';
        var result = span_for_title + this.x + ' (' + current + ')</span><br/><br/>';
        var to_target = 248000 - this.value;
        to_target = to_target.formatMoney(0, '.', ',') + '$';
        var profit = this.value - 100000;
        profit = profit.formatMoney(0, '.', ',') + '$';
        result = result + span_for_names + 'To target: </span>' + to_target + '<br/>';
        result = result + span_for_names + 'Profit: </span>' + profit + '<br/>';
        return result;
    });
};

var selectedX = null;
var globalData, revenueDataSet;

function categoryChart(data, container_id) {
    globalData = data;
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = anychart.column();
    chart.palette(palette);
    chart.container(container_id);
    var data_set = revenueDataSet = anychart.data.set(globalData);
    chart.title(null);
    chart.yAxis().orientation('left').title(null);
    chart.xAxis().title(null).labels(null);
    chart.yAxis().labels().textFormatter(function(){
        return '$' + Math.abs(parseInt(this.value)).formatMoney(0, '.', ',');
    });

    var series = chart.column(data_set.mapAs({value: [1], x: [0]}));
    series.name('Revenue, $');
    series.listen('pointClick', function (e) {
        drillDown(e.iterator.get('x'));
    });
    tooltipContentForRevenueChart(series);
    chart.legend().enabled(false);
    chart.padding(20, 0, 0, 0);
    chart.draw();
    drillDown(globalData[0].x)
}

function getGlobalDataByX(x){
    for (var i=0; i<globalData.length; i++) {
        if (globalData[i].x == x) {
          var selectedData = globalData[i]
        }
    }
    return selectedData
}

function drillDown(x){
    if (selectedX) {
        var selectedData = getGlobalDataByX(selectedX);
        selectedData['marker'] = {enabled: false};
    }
    selectedX = x;
    selectedData = getGlobalDataByX(selectedX);
    selectedData['marker'] = {enabled: true, type: 'star5', fill: palette.colorAt(3), size: 10, hoverSize: 10};
    $('.category-name').html(selectedX);
    revenueDataSet.data(globalData);
    drawTable(selectedData['data']);
    drawMap(selectedData['mapData']);
    $('.product-name').html('');
}

var createBulletChartPrice = function (actual, target) {
    var value = -(100 - Math.round(actual * 100 / target));

    var bullet = anychart.bullet([
        {
            value: value,
            type: 'bar', gap: 0.6, fill: palette.colorAt(0), stroke: null
        },
        {
            value: 0, 'type': 'line', 'gap': 0.2, fill: palette.colorAt(4),
            stroke: {thickness: 1.1, color: '#212121'}
        }
    ]);
    bullet.background(null);
    bullet.axis(null);
    bullet.title().enabled(false);
    bullet.padding(0, -1);
    bullet.rangePalette(bullet_range_palette);
    bullet.scale().minimum(-300);
    bullet.scale().maximum(300);
    bullet.layout('horizontal');
    return bullet;
};

function createBulletChartPriceScale(){
    var axis = anychart.axes.linear();
    axis.title(null);
    var scale = anychart.scales.linear();
    scale.minimum(-300).maximum(300).ticks().interval(100);
    axis.scale(scale);
    axis.orientation('bottom');
    axis.stroke(colorAxisLines);
    axis.ticks().stroke(colorMinorAxisLines).length(4);
    axis.labels().useHtml(true).padding(0,3,0,10).fontColor(colorAxisFont).fontSize(10)
        .textFormatter(function () {
        return this.value/100 + 'x'
    });
    axis.minorTicks(null);
    return axis

}
var activeRow = null;
var hoverRow = null;

function drawTable(data){
    var $chartContainer = $('#products-chart');
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var stage = anychart.graphics.create('products-chart');

    var rect = anychart.graphics.rect(0, 35,
        parseInt($chartContainer.width()),
        parseInt($chartContainer.attr('data-height')) - 50).parent(stage);
    rect.fill('#fff .0000000001').stroke(null).zIndex(200);

    var table = anychart.ui.table();
    table.cellBorder(null);
    var content = [
        ['Product', 'Revenue trend', 'Revenue', 'Variance from<br/>average price', 'Price']
    ];
    for (var i=0; i<data.length; i++){
        content.push(
            [
                data[i].x,
                createSparkLine(data[i].last),
                '$' + parseInt(data[i].revenue).formatMoney(0, '.', ','),
                createBulletChartPrice(data[i].price, data[i].average_price),
                '$' + parseInt(data[i].price).formatMoney(0, '.', ',')]
        )
    }
    content.push(
        [null, null, null, createBulletChartPriceScale(), null]
    );
    table.contents(content);

    anychart.graphics.events.listen(stage, anychart.graphics.vector.Stage.EventType.STAGE_RESIZE, function(e){
        rect.setBounds(stage.getBounds());
    });

    anychart.graphics.events.listen(rect, anychart.graphics.events.EventType.CLICK, function(e){
        var h = (parseInt($chartContainer.attr('data-height')) - 50) / data.length;
        var row = Math.round(e.offsetY/h)-1;
        if (activeRow){
            table.getRow(activeRow).cellFill(null);
        }
        activeRow = row;
        table.getRow(activeRow).cellFill("#F7A028 0.2");
        drawMap(data[activeRow-1].mapData);
        $('.product-name').html(data[activeRow-1].x);
    });

    anychart.graphics.events.listen(rect, anychart.graphics.events.EventType.MOUSEMOVE, function(e){
        var h = (parseInt($chartContainer.attr('data-height')) - 50) / data.length;
        var row = Math.round(e.offsetY/h)-1;
        if (hoverRow && hoverRow != activeRow){
            table.getRow(hoverRow).cellFill(null);
        }
        hoverRow = row;
        if (hoverRow != activeRow && hoverRow != 0) table.getRow(hoverRow).cellFill("#F7A028 0.1");
    });

    anychart.graphics.events.listen(rect, anychart.graphics.events.EventType.MOUSEOUT, function(e){
        if (hoverRow && hoverRow != activeRow){
            table.getRow(hoverRow).cellFill(null);
        }
    });


    table.fontFamily("'Verdana', Helvetica, Arial, sans-serif")
        .fontSize(11)
        .useHtml(true)
        .fontColor(darkAccentColor)
        .vAlign('middle');

    table.fontFamily("'Verdana', Helvetica, Arial, sans-serif")
        .fontSize(11)
        .useHtml(true)
        .fontColor(darkAccentColor)
        .vAlign('middle');
    table.getRow(0).cellBorder().bottom('1px #dedede');
    table.getRow(0).vAlign('bottom');
    table.getRow(0).height(35);

    table.getRow(data.length + 1).vAlign('top');
    table.getRow(data.length + 1).height(15);

    table.getCol(2).hAlign('center');
    table.getCol(3).hAlign('center');
    table.getCol(4).hAlign('center');
    table.getCol(2).width(80);
    table.getCol(4).width(60);

    table.container(stage).draw();
}

function drawMap(data){
    var $chartContainer = $('#category-map-chart');
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var map = anychart.map();
    map.geoData(Highcharts.maps["countries/fr/fr-all"]);
    console.log(data);
    map.background(null);
    map.legend(null);
    map.title(null);

    var cr = map.colorRange();
    cr.orientation('right');
    cr.colorLineSize(15);
    cr.align('top');
    cr.stroke(null);
    cr.ticks().stroke('2 #fff');
    cr.ticks().position('center').length(15);
    cr.labels().fontSize(11).padding(0,0,0,5).textFormatter(function(){
        var range = this.colorRange;
        var name;
        if (isFinite(range.start + range.end)) {
          name = range.start + ' - ' + range.end;
        } else if (isFinite(range.start)) {
          name = 'more ' + range.start;
        } else {
          name = 'less ' + range.end;
        }
        return name
    });


    var s1 = map.choropleth(data);
    s1.geoIdField('hc-key');
    s1.stroke('#000 .3');
    s1.labels(null);
    //s1.selectFill('#5588ff');
    var ocs = anychart.scales.ordinalColor([{less: 350000}, {from: 350000, to: 400000}, {from: 400000, to: 450000}, {from: 450000, to: 500000}, {from: 500000, to: 550000}, {greater: 550000}]);
    ocs.colors(['#ffd54f', '#FDC543', '#F9B033', '#F7A028', '#F28110', '#ef6c00']);



    s1.colorScale(ocs);

    map.padding(0).margin(0);
    map.container('category-map-chart');
    map.draw();

}