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

var generalData, generatedGeneralData;
var generatedProductsData, productsData;
var generatedRegionsData, regionsData;
var generatedSalesTeamData, salesTeamData;


function changeTab(tab_name) {
    $('.mdl-navigation a').removeClass('active');
    $('.mdl-navigation a.' + tab_name).addClass('active');
    $('.tab-pane').removeClass('active');
    $('#' + tab_name).addClass('active');

    if (tab_name == 'general') {
        keyMetrics(generalData['key_metrics']);
        revenueChart(generalData['revenue_chart'], 'revenue-chart');
        drawPie(generalData['five_best']['sales_men'], 'top-5-sales');
        drawPie(generalData['five_best']['regions'], 'top-5-regions');
        drawPie(generalData['five_best']['products'], 'top-5-products');
    }
    else if (tab_name == 'products') {
        categoryChart(productsData['categories_data'], 'category-chart');
    }
    else if (tab_name == 'regions') {
        regionsChart(regionsData['regions_data'], 'regions-chart');
    }
    else if (tab_name == 'sales-team') {
        salesTeamChart(salesTeamData['team_data'], salesTeamData['average_order'], 'sales-team-chart');
    }
}


function changeData(filter) {
    generalData = generatedGeneralData[filter];
    productsData = generatedProductsData[filter];
    regionsData = generatedRegionsData[filter];
    salesTeamData = generatedSalesTeamData[filter];
    changeTab($('.tab-pane.active').attr('id'));
}


$(function () {
    generatedGeneralData = generateGeneralDataForAll();
    generalData = generatedGeneralData['YTD'];
    generatedProductsData = generateProductsDataForAll();
    productsData = generatedProductsData['YTD'];
    generatedRegionsData = generateRegionsDataForAll();
    regionsData = generatedRegionsData['YTD'];
    generatedSalesTeamData = generateTeamDataForAll();
    salesTeamData = generatedSalesTeamData['YTD'];
    changeTab($('.tab-pane.active').attr('id'))
});


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