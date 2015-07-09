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

var generalData, productsData;



function changeTab(tab_name){
    $('.nav-tabs li').removeClass('active');
    $('.tab-pane').removeClass('active');
    $('#' + tab_name).addClass('active');
    $('a.' + tab_name).tab('show');
    $('a.' + tab_name).parent().addClass('active');

    if (tab_name == 'general'){
        //keyMetrics(generalData['key_metrics']);
        revenueChart(generalData['revenue_chart'], 'revenue-chart');
        //drawBar(generalData['five_best']['sales_men'], 'top-5-sales');
        //drawBar(generalData['five_best']['regions'], 'top-5-regions');
        //drawBar(generalData['five_best']['products'], 'top-5-products');
    }
    else if (tab_name == 'products'){
        //revenueChart(productsData['category_chart'], 'revenue-chart-by-category');
    }

}
function changeData(filter){
    console.log(filter);

}

$(function(){
    generalData = {
        revenue_chart: makeRevenueChartData('YTD'),
        five_best: generateFiveBest(),
        key_metrics: {
            revenue: {
                'value': generateNumber(300000, 600000),
                'target': generateNumber(400000, 700000),
                'last': generateData(1500, 12000, 12, false, false)
            },
            profit: {
                'value': generateNumber(300000, 600000),
                'target': generateNumber(400000, 650000),
                'last': generateData(1500, 12000, 12, false, false)
            },
            expenses: {
                'invert': true,
                'value': generateNumber(300000, 600000),
                'target': generateNumber(350000, 650000),
                'last': generateData(1500, 12000, 12, false, false)
            },
            order_size: {
                'value': generateNumber(50, 120),
                'target': generateNumber(50, 140),
                'last': generateData(50, 120, 12, false, false)
            },
            customers: {
                'value': generateNumber(1, 100),
                'target': generateNumber(50, 120),
                'last': generateData(1, 250, 12, false, false)
            },
            market_share: {
                'value': generateNumber(15, 25),
                'target': generateNumber(15, 30),
                'last': generateData(1, 40, 12, false, false)
            }
        }
    };

    productsData = {
        category_chart: makeCategoriesChartData('categories_region')
    };
    changeTab('products')
});