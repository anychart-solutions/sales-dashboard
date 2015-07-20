
var selectedX = null;
var revenueDataSet, globalData;
var $chartTableContainer, rect;
var activeRow = null;
var hoverRow = null;

var drawCategoryChart = function(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = anychart.bar();
    chart.container(container_id);

    chart.title(null);
    chart.padding(5, 0, 0, 0);
    chart.legend().enabled(false);
    chart.xAxis().labels().fontSize(11);
    chart.yAxis().enabled(false);
    var series = chart.bar();
    series.clip(false);

    series.listen('pointClick', function (e) {
        drillDown(e.iterator.get('x'));
    });
    chart.lineMarker(0)
        .stroke({color: colorAxisFont, opacity: 1, thickness: '2 #cecece'})
        .layout('vertical')
        .scale(chart.yScale());

    chart.textMarker(0)
        .textSettings({fontSize: 10})
        .scale(chart.yScale())
        .fontColor(colorAxisFont)
        .align('bottom')
        .anchor('leftBottom')
        .offsetX(5)
        .offsetY(0)
        .text('Average');

    chart.draw();
    return chart;
};

var changeCategoryData = function(chart, data){
    globalData = data;
    revenueDataSet = anychart.data.set(data);

    chart.getSeries(0).data(revenueDataSet.mapAs({value: [1], x: [0]}));
    chart.lineMarker(0).value(getAverage(data, 'value'));
    chart.textMarker(0).value(getAverage(data, 'value'));
    tooltipContentForChart(chart.getSeries(0), 'with_average', getAverage(data, 'value'));
    drillDown(data[0].x)
};

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
        if (selectedData) selectedData['marker'] = {enabled: false};
    }
    selectedX = x;
    selectedData = getGlobalDataByX(selectedX);
    selectedData['marker'] = {enabled: true, type: 'star5', fill: palette.colorAt(3), size: 10, hoverSize: 10};
    $('.category-name').html(selectedX);

    revenueDataSet.data(globalData);
    $('.product-name').html('');

    setCategoryMapData(categoryMapChart, selectedData['mapData']);
    setCategoryProductData(categoryProductTable, selectedData['data']);
}

var drawCategoryProductTable = function(container_id){
    $chartTableContainer = $('#' + container_id);
    $chartTableContainer.css('height', parseInt($chartTableContainer.attr('data-height'))).html('');
    var stage = anychart.graphics.create(container_id);
    rect = anychart.graphics.rect(0, 35,
        parseInt($chartTableContainer.width()),
        parseInt($chartTableContainer.attr('data-height')) - 50).parent(stage);
    rect.fill('#fff .0000000001').stroke(null).zIndex(200);

    var table = anychart.ui.table();
    table.cellBorder(null);
    table.contents([['Product', 'Revenue trend', 'Revenue', 'Variance from<br/>average price', 'Price']]);

    anychart.graphics.events.listen(stage, anychart.graphics.vector.Stage.EventType.STAGE_RESIZE, function(e){
        rect.setBounds(stage.getBounds());
    });

    table.fontFamily("'Verdana', Helvetica, Arial, sans-serif")
        .fontSize(11)
        .useHtml(true)
        .fontColor(darkAccentColor)
        .vAlign('middle');
    table.getRow(0).cellBorder().bottom('1px #dedede');
    table.getRow(0).vAlign('bottom');
    table.getRow(0).height(35);
    table.getCol(2).hAlign('center');
    table.getCol(3).hAlign('center');
    table.getCol(4).hAlign('center');
    table.getCol(2).width(80);
    table.getCol(4).width(60);
    table.container(stage).draw();
    return table;
};

var drawCategoryMapChart = function(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var map = anychart.map();
    map.geoData(Highcharts.maps["countries/fr/fr-all"]);
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
          name = range.start.formatMoney(0, '.', ',')  + ' - ' + range.end.formatMoney(0, '.', ',');
        } else if (isFinite(range.start)) {
          name = 'more ' + range.start.formatMoney(0, '.', ',');
        } else {
          name = 'less ' + range.end.formatMoney(0, '.', ',');
        }
        return name
    });
    var s1 = map.choropleth();
    window.s1 = s1;
    s1.geoIdField('hc-key');
    s1.stroke('#000 .3');
    s1.labels(null);
    tooltipContentForChart(s1, 'simple_map');
    var ocs = anychart.scales.ordinalColor([{less: 350000}, {from: 350000, to: 400000}, {from: 400000, to: 450000}, {from: 450000, to: 500000}, {from: 500000, to: 550000}, {greater: 550000}]);
    ocs.colors(['#ffd54f', '#FDC543', '#F9B033', '#F7A028', '#F28110', '#ef6c00']);
    s1.colorScale(ocs);

    map.padding(0).margin(0);
    map.container(container_id);
    map.draw();
    return map
};

var setCategoryMapData = function(map, data){
    //todo: map.getSeries(0).data(data);
    window.s1.data(data);
};

var setCategoryProductData = function(table, data){
    var content = [
        ['Product', 'Revenue trend', 'Revenue', 'Variance from<br/>average price', 'Price']
    ];
    for (var i=0; i<data.length; i++){
        content.push(
            [
                data[i].x,
                createSparkLine(data[i].last),
                '$' + parseInt(data[i].revenue).formatMoney(0, '.', ','),
                createBulletChart(-300, 300, data[i].price, data[i].average_price, false),
                '$' + parseInt(data[i].price).formatMoney(0, '.', ',')]
        )
    }
    content.push(
        [null, null, null, createBulletScale(300, -300, 100, 'x'), null]
    );
    table.contents(content);

    if (activeRow) {
        table.getRow(activeRow).cellFill(null);
        activeRow = null;
    }

    anychart.graphics.events.listen(rect, anychart.graphics.events.EventType.CLICK, function(e){
        var h = (parseInt($chartTableContainer.attr('data-height')) - 50) / data.length;
        var row = Math.round(e.offsetY/h)-1;
        if (activeRow){
            table.getRow(activeRow).cellFill(null);
        }
        activeRow = row;
        table.getRow(activeRow).cellFill("#F7A028 0.3");
        setCategoryMapData(categoryMapChart, data[activeRow-1].mapData);
        $('.product-name').html(data[activeRow-1].x);
    });

    anychart.graphics.events.listen(rect, anychart.graphics.events.EventType.MOUSEMOVE, function(e){
        var h = (parseInt($chartTableContainer.attr('data-height')) - 50) / data.length;
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

    table.getCol(0).hAlign('left');
    table.getRow(data.length + 1).vAlign('top');
    table.getRow(data.length + 1).height(15);
};