
var tooltipContentForRevenueChart = function(series){
    setupBigTooltip(series);
    series.tooltip().contentFormatter(function(){
        var current = parseInt(this.value).formatMoney(0, '.', ',') + '$';
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

function revenueChart(data, container_id) {
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = anychart.column();
    chart.palette(palette);
    chart.container(container_id);
    var data_set = anychart.data.set(data);
    var s1 = anychart.scales.linear();
    var s2 = anychart.scales.linear();

    chart.title(null);
    chart.yAxis().orientation('left').title(null);
    chart.xAxis().title(null);
    chart.yAxis().scale(s1);
    chart.yAxis(1).scale(s2).orientation('right');

    chart.yAxis().labels().textFormatter(function(){
        return '$' + Math.abs(parseInt(this.value)).formatMoney(0, '.', ',');
    });
    chart.yAxis(1).labels().padding(0,0,0,5).fontSize(11);
    chart.xAxis().labels().padding(5,0,0,0).fontSize(11);

    var series = chart.column(data_set.mapAs({value: [1], x: [0]}));
    series.yScale(s1);
    series.name('Revenue, $');
    tooltipContentForRevenueChart(series);

    var series2 = chart.line(data_set.mapAs({value: [2], x: [0]}));
    series2.yScale(s2);
    series2.name('Units sold');
    tooltipContentForRevenueChart(series2);

    chart.legend().enabled(true).tooltip(false).align('center');
    chart.padding(10, 0, 0, 0);
    chart.draw();
}


var tooltipContentForBestFive = function(series){
    setupBigTooltip(series);
    series.tooltip().contentFormatter(function(){
        var current = parseInt(this.value).formatMoney(0, '.', ',');
        var percent = (this['value'] * 100 / this.getStat('sum')).toFixed(1);
        var span_for_names = '<span style="color:' + darkAccentColor + '; font-size: 13px">$<strong>';
        var span_for_title = '<span style="color:' + colorAxisFont + '; font-size: 14px">';
        var result = span_for_title + this.x + '</span><br/>';
        result = result + span_for_names + current + ' </strong> (' + percent + '%)</span>';
        return result;
    });
};

function drawBar(data, container_id) {
    var stage = anychart.graphics.create(container_id);
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var pie_data = data;
    data = data.slice(0, data.length - 1);
    var chart = anychart.bar();
    chart.palette(palette);
    chart.yAxis().enabled(false);
    chart.container(stage);
    chart.padding(0, 12, 0, 0);
    var series = chart.bar(data);
    series.pointWidth('60%');
    tooltipContentForBestFive(series);
    var pieLabel = chart.label();
    pieLabel
        .position('rightTop')
        .anchor('rightTop')
        .width(25)
        .height(25)
        .text('')
        .background({enabled: true, fill: {src: './src/media/i/pie.jpg'}, stroke: null})
        .enabled(true);

    pieLabel.listen('click', function () {
        drawPie(pie_data, container_id);
    });

    chart.title(null);
    chart.xAxis().title().enabled(false);
    chart.xAxis().labels().padding(0,5,0,0).fontSize(11);
    chart.yAxis().title().enabled(false);
    chart.draw();
}

function drawPie(data, container_id) {
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = anychart.pie(data);
    chart.container(container_id);
    chart.palette(palette);
    chart.title(null);
    chart.stroke('3 #fff');
    chart.hoverStroke(null);
    chart.labels().fontSize(11).position('o');
    chart.connectorLength(10);
    chart.radius('45%');
    chart.innerRadius('20%');
    chart.padding(0);
    chart.margin(0);
    chart.legend().enabled(false);
    tooltipContentForBestFive(chart);
    var barLabel = chart.label();
    barLabel
        .position('rightTop')
        .anchor('rightTop')
        .width(25)
        .height(25)
        .text('')
        .background({enabled: true, fill: {src: './src/media/i/bar.jpg'}, stroke: null})
        .enabled(true);

    barLabel.listen('click', function () {
        drawBar(data, container_id);
    });

    chart.background(null);
    chart.draw();
}

var createBulletChart = function (actual, target, invert) {
    var value = -(100 - Math.round(actual * 100 / target));
    if (invert) value = 100 - Math.round(actual * 100 / target);

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
    bullet.scale().minimum(-50);
    bullet.scale().maximum(50);
    bullet.layout('horizontal');
    return bullet;
};

var createSparkLine = function (data) {
    var sparkLine = anychart.sparkline(data);
    sparkLine.type('area');
    sparkLine.padding(0);
    sparkLine.margin(5, 0, 5, 0);
    sparkLine.background(null);
    sparkLine.xScale('linear');
    sparkLine.xScale().minimumGap(0).maximumGap(0);
    sparkLine.xScale().ticks().interval(1);
    var color = palette.colorAt(0);
    sparkLine.fill(color + ' ' + 0.4);
    sparkLine.stroke('1 ' + color + ' ' + 0.6);
    return sparkLine;
};

function createBulletScale(){
    var axis = anychart.axes.linear();
    axis.title(null);
    var scale = anychart.scales.linear();
    scale.minimum(-50).maximum(50).ticks().interval(50);
    axis.scale(scale);
    axis.orientation('bottom');
    axis.stroke(colorAxisLines);
    axis.ticks().stroke(colorMinorAxisLines).length(4);
    axis.labels().useHtml(true).padding(0,3,0,10).fontColor(colorAxisFont)
        .textFormatter(function () {
        return this.value + '%'
    });
    axis.minorTicks(null);
    return axis
}

function keyMetrics(keys_data) {
    var $chartContainer = $('#key-metric-chart');
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');

    var stage = anychart.graphics.create('key-metric-chart');
    var table = anychart.ui.table();
    table.cellBorder(null);
    table.contents([
        [
            'Last 12 months',
            null,
            'Metric',
            'Variance from plan',
            'Current'
        ],
        [
            createSparkLine(keys_data['revenue']['last']),
            null,
            'Revenue',
            createBulletChart(keys_data['revenue']['value'], keys_data['revenue']['target'], keys_data['revenue']['invert']),
            '$' + keys_data['revenue']['value']
        ],
        [
            createSparkLine(keys_data['profit']['last']),
            null,
            'Profit',
            createBulletChart(keys_data['profit']['value'], keys_data['profit']['target'], keys_data['profit']['invert']),
            '$' + keys_data['profit']['value']
        ],
        [
            createSparkLine(keys_data['expenses']['last']),
            null,
            'Expenses',
            createBulletChart(keys_data['expenses']['value'], keys_data['expenses']['target'], keys_data['expenses']['invert']),
            '$' + keys_data['expenses']['value']
        ],
        [
            createSparkLine(keys_data['order_size']['last']),
            null,
            'Average <br/>order size',
            createBulletChart(keys_data['order_size']['value'], keys_data['order_size']['target'], keys_data['order_size']['invert']),
            keys_data['order_size']['value'] + ' bottles'
        ],
        [
            createSparkLine(keys_data['customers']['last']),
            null,
            'New <br/>customers',
            createBulletChart(keys_data['customers']['value'], keys_data['customers']['target'], keys_data['customers']['invert']),
            keys_data['customers']['value']
        ],
        [
            createSparkLine(keys_data['market_share']['last']),
            null,
            'Market<br/>share',
            createBulletChart(keys_data['market_share']['value'], keys_data['market_share']['target'], keys_data['market_share']['invert']),
            keys_data['market_share']['value'] + '%'
        ],
        [
            null,
            null,
            null,
            createBulletScale(),
            null
        ]
    ]);
    table.fontFamily("'Verdana', Helvetica, Arial, sans-serif")
        .fontSize(11)
        .useHtml(true)
        .fontColor(darkAccentColor)
        .vAlign('middle');
    table.getRow(0).cellBorder().bottom('1px #dedede');
    table.getRow(0).vAlign('bottom');
    table.getRow(7).vAlign('top');
    table.getRow(7).height(20);

    table.getRow(0).height(35);
    table.getCol(1).width(20);
    table.getCol(3).hAlign('center');
    table.getCol(4).hAlign('center');
    table.getCol(2).width(70);
    table.getCol(4).width(80);
    table.container(stage).draw();
}

