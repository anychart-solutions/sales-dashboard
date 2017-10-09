var drawGeneralRevenueChart = function(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createRevenueChart();
    chart.interactivity().selectionMode("none");
    chart.container(container_id);
    chart.draw();
    return chart;
};

var general_data_set = anychart.data.set();
var general_data_set_map1 = general_data_set.mapAs({'value': 1, 'x': 0});
var general_data_set_map2 = general_data_set.mapAs({'value': 2, 'x': 0});
var setGeneralRevenueData = function(chart, data){
    general_data_set.data(data);
    chart.getSeries(0).data(general_data_set_map1);
    tooltipContentForChart(chart.getSeries(0), 'revenue-sold', data);

    chart.getSeries(1).data(general_data_set_map2);
    tooltipContentForChart(chart.getSeries(1), 'revenue-sold', data);
};

var drawGeneralKeyMetricTable = function(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');

    var stage = anychart.graphics.create(container_id);
    var table = createTable();
    table.contents([
        ['Last 12 months', null, 'Metric', 'Variance from plan', 'Current']
    ]);
    table.getCol(1).width(20);
    table.getCol(3).hAlign('center');
    table.getCol(4).hAlign('right');
    table.getCol(2).width(70);
    table.getCol(4).width(80);
    table.container(stage).draw();
    return table
};

var setGeneralKeyMetricData = function(table, data){
    table.contents([
        [
            'Last 12 months',
            null,
            'Metric',
            'Variance from plan',
            'Current'
        ],
        [
            createSparkLine(data['revenue']['last']),
            null,
            'Revenue',
            createBulletChart(-50, 50, data['revenue']['value'], data['revenue']['target'], data['revenue']['invert']),
            '$' + data['revenue']['value']
        ],
        [
            createSparkLine(data['profit']['last']),
            null,
            'Profit',
            createBulletChart(-50, 50, data['profit']['value'], data['profit']['target'], data['profit']['invert']),
            '$' + data['profit']['value']
        ],
        [
            createSparkLine(data['expenses']['last']),
            null,
            'Expenses',
            createBulletChart(-50, 50, data['expenses']['value'], data['expenses']['target'], data['expenses']['invert']),
            '$' + data['expenses']['value']
        ],
        [
            createSparkLine(data['order_size']['last']),
            null,
            'Average <br/>order size',
            createBulletChart(-50, 50, data['order_size']['value'], data['order_size']['target'], data['order_size']['invert']),
            data['order_size']['value'] + ' bottles'
        ],
        [
            createSparkLine(data['customers']['last']),
            null,
            'New <br/>customers',
            createBulletChart(-50, 50, data['customers']['value'], data['customers']['target'], data['customers']['invert']),
            data['customers']['value']
        ],
        [
            createSparkLine(data['market_share']['last']),
            null,
            'Market<br/>share',
            createBulletChart(-50, 50, data['market_share']['value'], data['market_share']['target'], data['market_share']['invert']),
            data['market_share']['value'] + '%'
        ],
        [
            null,
            null,
            null,
            createBulletScale(50, -50, 50, '%'),
            null
        ]
    ]);
    table.getRow(7).vAlign('top');
    table.getRow(7).height(20);
};

var draw5TopChart = function(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    return acgraph.create(container_id);
};

var changeDataFor5Top = function(stage, data, type, name, old_chart){
    if (old_chart) {
        old_chart.dispose();
    }

    var label_src = './src/media/i/bar.jpg';
    var new_type = 'bar';
    if (type == 'bar'){
        label_src = './src/media/i/pie.jpg';
        new_type = 'pie';
        var bar_data = data.slice(0, data.length - 1);
        var chart = anychart.bar();
        chart.interactivity().selectionMode("none");
        chart.yAxis().enabled(false);
        chart.xAxis().title().enabled(false);
        chart.xAxis().labels()
            .enabled(true)
            .width(100)
            .textOverflow('...')
            .hAlign('right')
            .padding(0,5,0,0)
            .fontSize(11);
        chart.padding(10, 15, 0, 0);
        var series = chart.bar(bar_data);
        series.pointWidth('50%');
        series.listen('pointClick', function(e) {
            if (e.iterator.get('x') != 'Other' && e.iterator.getIndex() >= 0){
                if (name == 'topProducts') {
                    changeTab('products', e.iterator.getIndex())
                } else if (name == 'topSales'){
                    changeTab('sales-team', e.iterator.getIndex());
                } else if (name == 'topRegions'){
                    changeTab('regions', data[e.iterator.getIndex()][2]);
                }
            }
        });
        tooltipContentForChart(series, 'with_percent');
    } else {
        chart = anychart.pie(data);
        chart.stroke('3 #fff');
        chart.radius('30%');
        chart.padding(0);
        chart.explode(0);
        chart.hovered().stroke(null);
        chart.labels().fontSize(11).position('outside');
        chart.labels().format(function(){return this.x});
        chart.listen('pointClick', function(e) {
            if (e.iterator.get('x') != 'Other' && e.iterator.getIndex() >= 0){
                if (name == 'topProducts') {
                    changeTab('products', e.iterator.getIndex())
                } else if (name == 'topSales'){
                    changeTab('sales-team', e.iterator.getIndex());
                } else if (name == 'topRegions'){
                    changeTab('regions', data[e.iterator.getIndex()][2]);
                }
            }
        });
        tooltipContentForChart(chart, 'with_percent');
    }
    var label = chart.label();
    label.enabled(true)
        .position('right-top').anchor('right-top')
        .offsetY(5)
        .width(25).height(25).text('')
        .background({enabled: true, fill: {src: label_src}, stroke: null});

    label.listen('click', function () {
        if (name == 'topProducts')
            top5productsChart = changeDataFor5Top(stage, data, new_type, 'topProducts', chart);
        else if (name == 'topSales')
            top5salesChart  = changeDataFor5Top(stage, data, new_type, 'topSales', chart);
        else if (name == 'topRegions')
            top5regionsChart  = changeDataFor5Top(stage, data, new_type, 'topRegions', chart);
    });
    chart.title(null);
    chart.container(stage);
    chart.legend().enabled(false);
    chart.background(null);
    chart.draw();
    return chart;
};