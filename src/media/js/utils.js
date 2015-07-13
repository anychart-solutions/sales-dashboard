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

var generalData, productsData, generatedData;



function changeTab(tab_name){
    $('.mdl-navigation a').removeClass('active');
    $('.mdl-navigation a.' + tab_name).addClass('active');
    $('.tab-pane').removeClass('active');
    $('#' + tab_name).addClass('active');

    if (tab_name == 'general'){
        keyMetrics(generalData['key_metrics']);
        revenueChart(generalData['revenue_chart'], 'revenue-chart');
        drawBar(generalData['five_best']['sales_men'], 'top-5-sales');
        drawBar(generalData['five_best']['regions'], 'top-5-regions');
        drawBar(generalData['five_best']['products'], 'top-5-products');
    }
    else if (tab_name == 'products'){
        revenueChart(productsData['category_chart'], 'category-chart');
        revenueChart(productsData['category_chart'], 'products-chart');
        revenueChart(productsData['category_chart'], 'category-map-chart');
    }
}



function changeData(filter){
    console.log(filter);
    generalData = generatedData[filter];
    changeTab($('.tab-pane.active').attr('id'));
}


$(function(){
    generatedData = generateDataForAll();
    generalData = generatedData['YTD'];

    productsData = {
        category_chart: makeCategoriesChartData('categories_region')
    };
    changeTab($('.tab-pane.active').attr('id'))
});

var generateDataForAll = function(){
    return {
        'all': {
            revenue_chart: makeRevenueChartData('all'),
            five_best: generateFiveBest(),
            key_metrics: {
                revenue: {
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
                    'last': generateData(1500, 12000, 12, false, false)
                },
                profit: {
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
                    'last': generateData(1500, 12000, 12, false, false)
                },
                expenses: {
                    'invert': true,
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
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
        },
        'YTD': {
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
        },
        'QTD': {
            revenue_chart: makeRevenueChartData('QTD'),
            five_best: generateFiveBest(),
            key_metrics: {
                revenue: {
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
                    'last': generateData(1500, 12000, 12, false, false)
                },
                profit: {
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
                    'last': generateData(1500, 12000, 12, false, false)
                },
                expenses: {
                    'invert': true,
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
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
        },
        'MTD': {
            revenue_chart: makeRevenueChartData('MTD'),
            five_best: generateFiveBest(),
            key_metrics: {
                revenue: {
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
                    'last': generateData(1500, 12000, 12, false, false)
                },
                profit: {
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
                    'last': generateData(1500, 12000, 12, false, false)
                },
                expenses: {
                    'invert': true,
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
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
        },
        'WTD': {
            revenue_chart: makeRevenueChartData('WTD'),
            five_best: generateFiveBest(),
            key_metrics: {
                revenue: {
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
                    'last': generateData(1500, 12000, 12, false, false)
                },
                profit: {
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
                    'last': generateData(1500, 12000, 12, false, false)
                },
                expenses: {
                    'invert': true,
                    'value': generateNumber(100000, 150000),
                    'target': generateNumber(100000, 160000),
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
        }

    }
};