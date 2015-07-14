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


function changeTab(tab_name){
    $('.mdl-navigation a').removeClass('active');
    $('.mdl-navigation a.' + tab_name).addClass('active');
    $('.tab-pane').removeClass('active');
    $('#' + tab_name).addClass('active');

    if (tab_name == 'general'){
        keyMetrics(generalData['key_metrics']);
        revenueChart(generalData['revenue_chart'], 'revenue-chart');
        drawPie(generalData['five_best']['sales_men'], 'top-5-sales');
        drawPie(generalData['five_best']['regions'], 'top-5-regions');
        drawPie(generalData['five_best']['products'], 'top-5-products');
    }
    else if (tab_name == 'products'){
        categoryChart(productsData['categories_data'], 'category-chart');
        //productInCategoryChart(productsData['category_products'], 'products-chart');
        //mapPopularityChart(productsData['popularity_data'], 'category-map-chart');
    }
}



function changeData(filter){
    generalData = generatedGeneralData[filter];
    productsData = generatedProductsData[filter];
    changeTab($('.tab-pane.active').attr('id'));
}


$(function(){
    generatedGeneralData = generateGeneralDataForAll();
    generalData = generatedGeneralData['YTD'];
    generatedProductsData = generateProductsDataForAll();
    productsData = generatedProductsData['YTD'];
    changeTab($('.tab-pane.active').attr('id'))
});
