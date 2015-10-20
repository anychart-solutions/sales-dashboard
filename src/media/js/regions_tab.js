var selectedPoint;

function drawRegionsMapChart(container_id){
    var $chartContainer = $('#' + container_id);

    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var map = createMapOfFrance(
        'bottom',
        'center',
        [{less: 350000},
        {from: 350000, to: 400000},
        {from: 400000, to: 450000},
        {from: 450000, to: 500000},
        {from: 500000, to: 550000},
        {greater: 550000}],
        ['#ffd54f', '#FDC543', '#F9B033', '#F7A028', '#F28110', '#ef6c00']
    );
    map.container(container_id);
    map.draw();
    return map
}

function getDataIndexById(x, data){
    for (var i=0; i<data.length; i++) {
        if (data[i].id == x) {
            var index = i;
            break;
        }
    }
    return index
}

function setRegionsChartData(map, data, region_id){
    map.getSeries(0).data(data.regions_data);

    regionsChart.getSeries(0).unselect();
    map.listen(anychart.enums.EventType.POINTS_SELECT, function(e) {
        selectedPoint = e.currentPoint;
        if (selectedPoint) {
          drillDownRegion(selectedPoint);
        }
      });
    fillMenuList(data.regions_data);

    if (!region_id) var index = 1;
    else index = getDataIndexById(region_id, data.regions_data);

    map.getSeries(0).select(index);
    $('.region-name').html(data.regions_data[index].x);
    regionTotalShareChart.data([data.regions_data[index].total_share, 100]);
    regionTotalShareChart.label().text(data.regions_data[index].total_share + '%');
    regionMarketShareChart.data([data.regions_data[index].market_share, 100]);
    regionMarketShareChart.label().text(data.regions_data[index].market_share + '%');
    setGeneralRevenueData(regionRevenueChart, data.regions_data[index].revenue);
}

function drawRegionRevenueChart(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createRevenueChart();
    chart.interactivity().selectionMode("none");
    chart.container(container_id);
    chart.draw();
    return chart;
}

function drawRegionTotalShareChart(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createSolidChart();
    chart.container(container_id);
    chart.draw();
    return chart;
}

function drawRegionMarketShareChart(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createSolidChart();
    chart.container(container_id);
    chart.draw();
    return chart;
}

function drillDownRegion(x){
    var point_data = regionsData['regions_data'][x.index];
    $('.region-name').html(point_data.x);
    regionTotalShareChart.data([point_data.total_share, 100]);
    regionTotalShareChart.label().text(point_data.total_share + '%');
    regionMarketShareChart.data([point_data.market_share, 100]);
    regionMarketShareChart.label().text(point_data.market_share + '%');
    setGeneralRevenueData(regionRevenueChart, point_data.revenue);
}

function selectPoint(x){
    regionsChart.getSeries(0).unselect();
    for ( var i=0; i<regionsData['regions_data'].length; i++){
        if (regionsData['regions_data'][i].x == x) {
            regionsChart.getSeries(0).select(i);
            var point_data = regionsData['regions_data'][i];
        }
    }
    $('.region-name').html(point_data.x);
    regionTotalShareChart.data([point_data.total_share, 100]);
    regionTotalShareChart.label().text(point_data.total_share + '%');
    regionMarketShareChart.data([point_data.market_share, 100]);
    regionMarketShareChart.label().text(point_data.market_share + '%');
    setGeneralRevenueData(regionRevenueChart, point_data.revenue);
}

function fillMenuList(data){
    if ($('#region-name-menu-list').html() == ''){
        for (var i=0; i<data.length; i++){
            var li_item = $('<li> <a onclick="selectPoint(\'' + data[i].x + '\');">' + data[i].x + '</a></li>');
            $('#region-name-menu-list').append(li_item);
        }
        $('.region-name').html(data[0].x)
    }

}