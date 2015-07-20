var globalData, regionsDataSet, map, s1;



function regionsChart(data, container_id) {
    globalData = data;
    regionsDataSet = anychart.data.set(globalData);
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    map = anychart.map();
    map.geoData(Highcharts.maps["countries/fr/fr-all"]);
    map.background(null);
    map.legend(null);
    map.title(null);

    var cr = map.colorRange();
    cr.orientation('bottom');
    cr.colorLineSize(15);
    cr.align('center');
    cr.stroke(null);
    cr.ticks().stroke('2 #fff');
    cr.ticks().position('center').length(15);
    cr.labels().fontSize(11).padding(0,0,0,5).textFormatter(function(){
        var range = this.colorRange;
        var name;
        if (isFinite(range.start + range.end)) {
          name = range.start + ' - ' + range.end;
        } else if (isFinite(range.start)) {
          name = 'more ' + range.start;
        } else {
          name = 'less ' + range.end;
        }
        return name
    });

    s1 = map.choropleth(regionsDataSet);
    s1.geoIdField('hc-key');
    s1.stroke('#000 .3');
    s1.labels(null); //.fontSize(9).fontWeight('normal').fontColor('#212121');
    s1.selectFill(palette.colorAt(0));
    tooltipContentForMapChart(s1);
    var ocs = anychart.scales.ordinalColor([{less: 350000}, {from: 350000, to: 400000}, {from: 400000, to: 450000}, {from: 450000, to: 500000}, {from: 500000, to: 550000}, {greater: 550000}]);
    ocs.colors(['#ffd54f', '#FDC543', '#F9B033', '#F7A028', '#F28110', '#ef6c00']);
    s1.colorScale(ocs);
    map.padding(0).margin(0);
    map.container(container_id);
    map.draw();
    map.listen(anychart.enums.EventType.POINT_SELECT, function(e) {
        var selectedPoint = e.selectedPoint;
        if (selectedPoint) {
          drillDownRegion(selectedPoint);
        }
      });
    s1.select(1);
}


function shareChart(value, container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');

    var gauge = anychart.circularGauge();
    gauge.data([value, 100]);
    gauge.background(null);

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
    gauge.bar(1).dataIndex(5).radius(80).width(50).fill('#F5F4F4').stroke(stroke).zIndex(4);
    gauge.bar(0).dataIndex(0);
    gauge.bar(1).dataIndex(1);

    gauge.label()
        .text('<span style="color:' + colorAxisFont + '; font-size: 16px"> ' + value + '%</span>').useHtml(true)
        .textSettings(bigTooltipTitleSettings);
    gauge.label()
        .hAlign('center')
        .anchor('center')
        .padding(5, 10)
        .zIndex(1);
    gauge.container(container_id);
    gauge.draw()
}


function drillDownRegion(x){
    console.log(x);
    var data;
    for (var i=0; i<globalData.length; i++){
        if (globalData[i].id == x.id)
            data = globalData[i];
    }
    //s1.select(i);
    revenueChart(data.revenue, 'sales-in-region-chart');
    shareChart(data.total_share, 'total_share');
    shareChart(data.market_share, 'market_share');
    $('.region-name').html(x.properties.name);


}

function fillMenuList(data){
    for (var i=0; i<data.length; i++){
        //var li_item = $('<li class="mdl-menu__item" onclick="drillDownRegion({id: \'' + data[i].id + '\', properties: {name: \'' + data[i].x + '\'}})">' + data[i].x + '</li>');
        var li_item = $('<li class="mdl-menu__item" onclick="s1.select(' + i + ')">' + data[i].x + '</li>');
        //li_item.attr('onclick', function(){return drillDownRegion(data[i])});
        //console.log(data[i]);
        $('#region-name-menu-list').append(li_item);
    }


}