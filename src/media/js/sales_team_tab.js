
var activeRow = null;
var hoverRow = null;


function createBulletChartRevenue(actual, target){
    var value = -(100 - Math.round(actual * 100 / target));

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
    bullet.scale().minimum(-50);
    bullet.scale().maximum(50);
    bullet.layout('horizontal');
    return bullet;

}



function salesTeamChart(data, average_price, container_id){

    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var stage = anychart.graphics.create(container_id);

    var rect = anychart.graphics.rect(0, 35,
        parseInt($chartContainer.width()),
        parseInt($chartContainer.attr('data-height')) - 50).parent(stage);
    rect.fill('#fff .0000000001').stroke(null).zIndex(200);

    var table = anychart.ui.table();
    var content = [
        ['Name', 'Revenue', 'Variance from Avg', 'Avg Or.', 'New Clients']
    ];
    for (var i=0; i<data.length; i++){
        content.push(
            [
                data[i].name,
                '$' + parseInt(data[i].revenue).formatMoney(0, '.', ','),
                createBulletChartRevenue(data[i].revenue, 2100),
                '$' + parseInt(data[i].average_order).formatMoney(0, '.', ','),
                createSparkLine(data[i].new_clients)]
        )
    }
    content.push(
        [null, null, createBulletScale(), null, null]
    );
    table.contents(content);
    table.cellBorder(null);

    anychart.graphics.events.listen(stage, anychart.graphics.vector.Stage.EventType.STAGE_RESIZE, function(e){
        rect.setBounds(stage.getBounds());
    });

    anychart.graphics.events.listen(rect, anychart.graphics.events.EventType.CLICK, function(e){
        var h = (parseInt($chartContainer.attr('data-height')) - 50) / data.length;
        var row = Math.round(e.offsetY/h)-1;
        if (activeRow){
            table.getRow(activeRow).cellFill(null);
        }
        activeRow = row;
        table.getRow(activeRow).cellFill("#F7A028 0.3");
        shareChart(data[activeRow-1].win_ratio, 'win_ratio_for_person');
        shareChart(data[activeRow-1].sales_share, 'total_share_for_person');
        revenueChart(data[activeRow-1].revenue_trend, 'sales-for-person');
        $('.person-name').html(data[activeRow-1].name);
    });

    anychart.graphics.events.listen(rect, anychart.graphics.events.EventType.MOUSEMOVE, function(e){
        var h = (parseInt($chartContainer.attr('data-height')) - 50) / data.length;
        var row = Math.round(e.offsetY/h)-1;
        if (hoverRow && hoverRow != activeRow){
            table.getRow(hoverRow).cellFill(null);
        }
        hoverRow = row;
        if (hoverRow != activeRow && hoverRow != 0) table.getRow(hoverRow).cellFill("#F7A028 0.1");
    });

    anychart.graphics.events.listen(rect, anychart.graphics.events.EventType.MOUSEOUT, function(e){
        if (hoverRow && hoverRow != activeRow){
            table.getRow(hoverRow).cellFill(null);
        }
    });


    table.fontFamily("'Verdana', Helvetica, Arial, sans-serif")
        .fontSize(11)
        .useHtml(true)
        .fontColor(darkAccentColor)
        .vAlign('middle');

    table.fontFamily("'Verdana', Helvetica, Arial, sans-serif")
        .fontSize(11)
        .useHtml(true)
        .fontColor(darkAccentColor)
        .vAlign('middle');
    table.getRow(0).cellBorder().bottom('1px #dedede');
    table.getRow(0).vAlign('bottom');
    table.getRow(0).height(35);

    table.getRow(data.length + 1).vAlign('top').fontSize(10);
    table.getRow(data.length + 1).height(20);

    table.getCol(1).hAlign('center');
    table.getCol(2).hAlign('center');
    table.getCol(3).hAlign('center');
    //table.getCol(4).hAlign('center');
    table.getCol(1).width(60);
    table.getCol(3).width(60);

    table.container(stage).draw();

    activeRow = 1;
    table.getRow(activeRow).cellFill("#F7A028 0.3");
    shareChart(data[activeRow-1].win_ratio, 'win_ratio_for_person');
    shareChart(data[activeRow-1].sales_share, 'total_share_for_person');
    revenueChart(data[activeRow-1].revenue_trend, 'sales-for-person');
    $('.person-name').html(data[activeRow-1].name);

}