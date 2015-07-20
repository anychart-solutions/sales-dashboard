var generalData, generatedGeneralData;
var generatedProductsData, productsData;
var generatedRegionsData, regionsData;
var generatedSalesTeamData, salesTeamData;

var generalRevenueChart, generalKeyMetricTable;
var top5productsStage, top5salesStage, top5regionsStage;
var top5productsChart, top5salesChart, top5regionsChart;
var categoryChart, categoryMapChart, categoryProductTable;

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

    //regionsChart(regionsData['regions_data'], 'regions-chart');
    //fillMenuList(regionsData['regions_data']);

    //salesTeamChart(salesTeamData['team_data'], salesTeamData['average_order'], 'sales-team-chart');

}

$(function () {
    generatedGeneralData = generateGeneralDataForAll();
    generatedProductsData = generateProductsDataForAll();
    generatedRegionsData = generateRegionsDataForAll();
    generatedSalesTeamData = generateTeamDataForAll();
    drawAllCharts('YTD');
    changeTab($('.tab-pane.active').attr('id'))
});

function getDataByX(data, x){
    for ( var i=0; i<data.length; i++){
        if (data[i][0] == x) return data[i]
    }
    return null
}

function getTooltipContent(title, params){
    var span_for_names = '<span style="color:' + darkAccentColor + '; font-size: 12px">';
    var span_for_title = '<span style="color:' + colorAxisFont + '; font-size: 14px">';
    var strong_for_value = '<strong style="color:' + darkAccentColor + '; font-size: 14px"> ';
    var result = span_for_title + title + '</span><br/><br/>';
    for (var i=0; i<params.length; i++){
        result = result + span_for_names + params[i].text + '</span>' + strong_for_value + params[i].value + '</strong>';
        if (i < params.length - 1) result = result + '<br/>'
    }
    return result;
}


function tooltipContentForChart(series, format, data){
    setupBigTooltip(series);
    series.tooltip().contentFormatter(function(){
        if (format == 'revenue-sold'){
            var values = getDataByX(data, this.x);
            var title = this.x;
            var params = [
                {'text': 'Units sold:', value: parseInt(values[2]) },
                {'text': 'Revenue:', value: '$' + parseInt(values[1]).formatMoney(0, '.', ',')}
            ];
        }else if (format == 'with_percent'){
            title = this.x;
            var percent = (this.value * 100 / this.getStat('sum')).toFixed(1);
            params = [
                {'text': percent + '%', value: '$' + parseInt(this.value).formatMoney(0, '.', ',')}
            ];
        }else if (format == 'with_average'){
            title = this.x;
            params = [
                {'text': 'Revenue:', value: '$' + parseInt(this.value).formatMoney(0, '.', ',')}
            ];
            if (this.value <= data) {
                params.push({'text': 'Less than Average by:', value: '<span style="color: #dd2c00; font-weight: 100"> -$' + (data - this.value).formatMoney(0, '.', ',') + '</span>'});
            } else if (this.value > data) {
                params.push({'text': 'More than Average by:', value: '<span style="color: #1976d2; font-weight: 100"> +$' + (this.value - data).formatMoney(0, '.', ',') + '</span>'});
            }
        }else if (format == 'simple_map'){
            title = this.name;
            params = [
                {'text': 'Revenue:', value: '$' + parseInt(this.value).formatMoney(0, '.', ',')}
            ];
        }
        return getTooltipContent(title, params);
    });
}


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