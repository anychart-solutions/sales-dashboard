var generalData, generatedGeneralData;
var generatedProductsData, productsData;
var generatedRegionsData, regionsData;
var generatedSalesTeamData, salesTeamData;

var generalRevenueChart, generalKeyMetricTable;
var top5productsStage, top5salesStage, top5regionsStage;
var top5productsChart, top5salesChart, top5regionsChart;
var categoryChart, categoryMapChart, categoryProductTable;
var teamMainChart, teamPersonalRevenueChart, teamPersonalShareChart, teamPersonalWinRatioChart;
var regionsChart, regionRevenueChart, regionTotalShareChart, regionMarketShareChart;

function changeTab(tab_name) {
    $('.mdl-navigation a').removeClass('active');
    $('.mdl-navigation a.' + tab_name).addClass('active');
    $('.tab-pane').removeClass('active');
    $('#' + tab_name).addClass('active');
}

function updateData(filter){
    generalData = generatedGeneralData[filter];
    productsData = generatedProductsData[filter];
    regionsData = generatedRegionsData[filter];
    salesTeamData = generatedSalesTeamData[filter];
}


function changeData(filter) {
    updateData(filter);

    setGeneralRevenueData(generalRevenueChart, generalData['revenue_chart']);
    setGeneralKeyMetricData(generalKeyMetricTable, generalData['key_metrics']);
    top5productsChart = changeDataFor5Top(top5productsStage, generalData['five_best']['products'], 'pie', top5productsChart);
    top5salesChart = changeDataFor5Top(top5salesStage, generalData['five_best']['sales_men'], 'pie', top5salesChart);
    top5regionsChart = changeDataFor5Top(top5regionsStage, generalData['five_best']['regions'], 'pie', top5regionsChart);
    changeCategoryData(categoryChart, productsData['categories_data']);
    setMainTeamChartData(teamMainChart, salesTeamData);
    setRegionsChartData(regionsChart, regionsData);
}

function drawAllCharts(filter){
    updateData(filter);

    generalRevenueChart = drawGeneralRevenueChart('general-revenue-chart');
    setGeneralRevenueData(generalRevenueChart, generalData['revenue_chart']);

    generalKeyMetricTable = drawGeneralKeyMetricTable('general-key-metric-chart');
    setGeneralKeyMetricData(generalKeyMetricTable, generalData['key_metrics']);

    top5productsStage = draw5TopChart('top-5-products');
    top5productsChart = changeDataFor5Top(top5productsStage, generalData['five_best']['products'], 'pie', null);

    top5salesStage = draw5TopChart('top-5-sales');
    top5salesChart = changeDataFor5Top(top5salesStage, generalData['five_best']['sales_men'], 'pie', null);

    top5regionsStage = draw5TopChart('top-5-regions');
    top5regionsChart = changeDataFor5Top(top5regionsStage, generalData['five_best']['regions'], 'pie', null);

    categoryChart = drawCategoryChart('category-chart');
    categoryMapChart = drawCategoryMapChart('category-map-chart');
    categoryProductTable = drawCategoryProductTable('category-products-chart');

    acgraph.events.listen(categoryProductTable.container().getStage(), 'stageResize', function() {console.log('stageResize, WTF?')});
    changeCategoryData(categoryChart, productsData['categories_data']);

    teamMainChart = drawTeamMainChart('sales-team-chart');
    teamPersonalRevenueChart = drawTeamPersonalRevenueChart('sales-for-person');
    teamPersonalShareChart = drawTeamPersonalShareChart('total_share_for_person');
    teamPersonalWinRatioChart = drawTeamPersonalWinRatioChart('win_ratio_for_person');
    setMainTeamChartData(teamMainChart, salesTeamData);

    regionsChart = drawRegionsMapChart('regions-chart');
    regionRevenueChart = drawRegionRevenueChart('sales-in-region-chart');
    regionTotalShareChart = drawRegionTotalShareChart('total_share');
    regionMarketShareChart = drawRegionMarketShareChart('market_share');
    setRegionsChartData(regionsChart, regionsData);
}

$(function () {
    generatedGeneralData = generateGeneralDataForAll();
    generatedProductsData = generateProductsDataForAll();
    generatedSalesTeamData = generateTeamDataForAll();
    generatedRegionsData = generateRegionsDataForAll();
    drawAllCharts('YTD');
    changeTab($('.tab-pane.active').attr('id'))
});

function getDataByX(data, x){
    for ( var i=0; i<data.length; i++){
        if (data[i][0] == x) return data[i];
        if (data[i].id == x) return data[i];
        if (data[i].name == x) return data[i]
    }
    return null
}

function getTooltipContent(params){
    var span_for_names = '<span style="color:' + darkAccentColor + '; font-size: 12px">';
    var strong_for_value = '<span style="color:' + fontColor + '; font-size: 12px"> ';
    var result = '';
    for (var i=0; i<params.length; i++){
        result = result + span_for_names + params[i].text + '</span>' + strong_for_value + params[i].value + '</span>';
        if (i < params.length - 1) result = result + '<br/>'
    }
    return result;
}


function tooltipContentForChart(series, format, data){
    setupBigTooltip(series);
    series.tooltip().title().fontColor(fontColor);
    series.tooltip().separator().margin(0,0,5,0);
    series.tooltip().content().lineHeight('5px');
    series.tooltip().titleFormatter(function(){
        if (format == 'simple_map') {
            return this.name;
        } else {
            return this.x
        }
    });
    series.tooltip().contentFormatter(function(){
        if (format == 'revenue-sold'){
            var values = getDataByX(data, this.x);
            var params = [
                {'text': 'Units sold:', value: parseInt(values[2]) },
                {'text': 'Revenue:', value: '$' + parseInt(values[1]).formatMoney(0, '.', ',')}
            ];
        }else if (format == 'with_percent'){
            var percent = (this.value * 100 / this.getStat('sum')).toFixed(1);
            params = [
                {'text': percent + '%', value: '$' + parseInt(this.value).formatMoney(0, '.', ',')}
            ];
        }else if (format == 'with_average'){
            params = [
                {'text': 'Revenue:', value: '$' + parseInt(this.value).formatMoney(0, '.', ',')}
            ];
            if (this.value <= data) {
                params.push({'text': 'Less than Average by:', value: '<span style="color: #dd2c00; font-weight: 100"> -$' + (data - this.value).formatMoney(0, '.', ',') + '</span>'});
            } else if (this.value > data) {
                params.push({'text': 'More than Average by:', value: '<span style="color: #1976d2; font-weight: 100"> +$' + (this.value - data).formatMoney(0, '.', ',') + '</span>'});
            }
        }else if (format == 'simple_map'){
            params = [
                {'text': 'Revenue:', value: '$' + parseInt(this.value).formatMoney(0, '.', ',')}
            ];
        }
        return getTooltipContent(params);
    });
}

var createRevenueChart = function () {
    var chart = anychart.column();
    var s1 = anychart.scales.linear();
    var s2 = anychart.scales.linear();
    chart.yAxis().scale(s1);
    chart.yAxis().scale().minimum(0);
    chart.yAxis(1).scale(s2);
    chart.yAxis(1).scale().minimum(0);

    var series = chart.column();
    series.yScale(s1);
    series.name('Revenue, $');

    var series2 = chart.line();
    series2.yScale(s2);
    series2.name('Units sold');

    chart.title(null);
    chart.yAxis().orientation('left').title(null);
    chart.yAxis(1).orientation('right').title(null);
    chart.xAxis().title(null);

    chart.yAxis().labels().fontSize(11).textFormatter(function () {
        return '$' + Math.abs(parseInt(this.value)).formatMoney(0, '.', ',');
    });
    chart.yAxis(1).labels().padding(0, 0, 0, 5).fontSize(11);
    chart.xAxis().labels().padding(5, 0, 0, 0).fontSize(11);

    chart.legend().enabled(true).tooltip(false).align('center');
    chart.padding(10, 0, 0, 0);
    return chart
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

var createBulletChart = function (min, max, actual, target, invert) {
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
    bullet.margin(0);
    bullet.rangePalette(bullet_range_palette);
    bullet.scale().minimum(min);
    bullet.scale().maximum(max);
    bullet.layout('horizontal');
    return bullet;
};

function createBulletScale(max, min, interval, value_str){
    var axis = anychart.axes.linear();
    axis.title(null);
    var scale = anychart.scales.linear();
    scale.minimum(min).maximum(max).ticks().interval(interval);
    axis.scale(scale);
    axis.orientation('bottom');
    axis.stroke(colorAxisLines);
    axis.ticks().stroke(colorMinorAxisLines).length(4);
    axis.labels().useHtml(true).padding(0,3,0,10).fontColor(colorAxisFont).fontSize(10)
        .textFormatter(function () {
            if (value_str == 'x') return this.value/100 + value_str;
            else return this.value + value_str;
    });
    axis.minorTicks(null);
    return axis
}

function createSolidChart(){
    var gauge = anychart.circularGauge();
    gauge.background(null);
    gauge.fill(null);
    gauge.stroke(null);
    var axis = gauge.axis().radius(100).width(1).fill(null);
    axis.scale()
        .minimum(0)
        .maximum(100)
        .ticks({interval: 1})
        .minorTicks({interval: 1});
    axis.labels().enabled(false);
    axis.ticks().enabled(false);
    axis.minorTicks().enabled(false);

    var stroke = '1 #e5e4e4';
    gauge.bar(0).dataIndex(0).radius(80).width(50).fill(palette.colorAt(0)).stroke(null).zIndex(5);
    gauge.bar(1).dataIndex(1).radius(80).width(50).fill('#F5F4F4').stroke(stroke).zIndex(4);
    gauge.label()
        .text('')
        .hAlign('center')
        .anchor('center')
        .padding(5, 10)
        .zIndex(1);
    return gauge
}

function createMapOfFrance(colorRangeOrientation, colorRangeAlign, colorRangesSegments, colorRangesSegmentsColors){
    var map = anychart.map();
    map.geoData(Highcharts.maps["countries/fr/fr-all"]);
    map.background(null);
    map.legend(null);
    map.title(null);

    var cr = map.colorRange().enabled(true);
    cr.orientation(colorRangeOrientation);
    cr.colorLineSize(10);
    cr.marker().size(5);
    cr.align(colorRangeAlign);
    cr.stroke(null);
    cr.ticks().enabled(true).stroke('2 #fff');
    cr.ticks().position('center').length(10);
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
    s1.geoIdField('hc-key');
    s1.labels(null);
    tooltipContentForChart(s1, 'simple_map');
    var ocs = anychart.scales.ordinalColor(colorRangesSegments);
    ocs.colors(colorRangesSegmentsColors);
    s1.colorScale(ocs);
    s1.hoverFill('#CCCFD2');
    s1.selectFill(darkAccentColor);
    map.padding(0).margin(0);
    return map
}

function getAverage(data, index){
    var sum = 0;
    for (var i=0; i<data.length; i++){
        sum += data[i][index];
    }
    return Math.round(sum/data.length)
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};



var getLegend = function (item_names, chart) {
    var legendTable = anychart.ui.table(2, 3);
    var legendItem = function (i) {
        var legend = anychart.ui.legend();
        legend.fontSize('10px');
        legend.fontFamily("'Verdana', Helvetica, Arial, sans-serif");
        legend.itemsLayout('horizontal');
        legend.fontColor(darkAccentColor);
        legend.align('left');
        legend.padding(0);
        legend.tooltip(false);
        legend.margin(0);
        legend.itemsSpacing(8);
        legend.iconTextSpacing(3);
        legend.title().enabled(false);
        legend.titleSeparator().enabled(false);
        legend.paginator().enabled(false);
        legend.background().enabled(false);
        legend.items([
            {
                'index': i,
                'text': item_names[i][0],
                'iconType': 'square',
                'iconStroke': 'none',
                'iconFill': palette.colorAt(i)
            }
        ]);
        legend.listen('mouseOver', function () {
            chart.hover(i);
        });
        legend.listen('mouseOut', function () {
            chart.unhover();
        });
        return legend
    };
    legendTable.cellBorder(null);
    legendTable.contents([
        [legendItem(0), legendItem(1), legendItem(2)],
        [legendItem(3), legendItem(4), legendItem(5)]
    ]);
    return legendTable
};