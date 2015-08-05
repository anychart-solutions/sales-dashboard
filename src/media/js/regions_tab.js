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

function setRegionsChartData(map, data){
    map.getSeries(0).data(data);
    console.log(map, data);
    map.listen(anychart.enums.EventType.POINT_SELECT, function(e) {
        var selectedPoint = e.selectedPoint;
        if (selectedPoint) {
          drillDownRegion(selectedPoint);
        }
      });
    map.getSeries(0).select(1);
}

function drawRegionRevenueChart(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createRevenueChart();
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
}

function drawRegionMarketShareChart(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createSolidChart();
    chart.container(container_id);
    chart.draw();
}

function drillDownRegion(x){
    console.log(x);
    //var data;
    //for (var i=0; i<globalData.length; i++){
    //    if (globalData[i].id == x.id)
    //        data = globalData[i];
    //}
    ////s1.select(i);
    //revenueChart(data.revenue, 'sales-in-region-chart');
    //shareChart(data.total_share, 'total_share');
    //shareChart(data.market_share, 'market_share');
    //$('.region-name').html(x.properties.name);
}

//function fillMenuList(data){
//    for (var i=0; i<data.length; i++){
//        //var li_item = $('<li class="mdl-menu__item" onclick="drillDownRegion({id: \'' + data[i].id + '\', properties: {name: \'' + data[i].x + '\'}})">' + data[i].x + '</li>');
//        var li_item = $('<li class="mdl-menu__item" onclick="s1.select(' + i + ')">' + data[i].x + '</li>');
//        //li_item.attr('onclick', function(){return drillDownRegion(data[i])});
//        //console.log(data[i]);
//        $('#region-name-menu-list').append(li_item);
//    }
//}