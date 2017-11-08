var activeMember;
var hoverRow = null;
var mainTableHeight, mainTableRect;

function drawTeamMainChart(container_id){
    var $chartContainer = $('#' + container_id);
    mainTableHeight = parseInt($chartContainer.attr('data-height'));
    $chartContainer.css('height', mainTableHeight).html('');
    var stage = anychart.graphics.create(container_id);

    mainTableRect = anychart.graphics.rect(0, 35,
        parseInt($chartContainer.width()),
        mainTableHeight - 50).parent(stage);
    mainTableRect.fill('#fff .0000000001').stroke(null).zIndex(200);

    var table = createTable();
    var content = [
        ['Name', 'Revenue', 'Variance from Avg', 'Avg Or.', 'New Clients']
    ];
    table.contents(content);
    anychart.graphics.events.listen(stage, "stageresize", function(e){
        var bounds = stage.getBounds();
        bounds.top += 35;
        bounds.height -= 55;
        mainTableRect.setBounds(bounds);
    });
    table.getCol(1).hAlign('center');
    table.getCol(2).hAlign('center').cellPadding(0);
    table.getCol(3).hAlign('center');
    table.getCol(1).width(60);
    table.getCol(3).width(60);
    table.container(stage).draw();
    return table
}
function drawTeamPersonalRevenueChart(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createRevenueChart();
    chart.container(container_id);
    chart.draw();
    return chart;
}
function drawTeamPersonalShareChart(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createSolidChart();
    chart.container(container_id);
    chart.draw();
    return chart
}
function drawTeamPersonalWinRatioChart(container_id){
    var $chartContainer = $('#' + container_id);
    $chartContainer.css('height', parseInt($chartContainer.attr('data-height'))).html('');
    var chart = createSolidChart();
    chart.container(container_id);
    chart.draw();
    return chart
}


function setMainTeamChartData(table, data, index){
    if (activeMember) {
        table.getRow(activeMember).cellFill(null);
    }

    function selectChosenRow(row_index){
        table.getRow(row_index).cellFill("#F7A028 0.3");
        teamPersonalShareChart.data([data['team_data'][row_index - 1].sales_share, 100]);
        teamPersonalShareChart.label().text(data['team_data'][row_index - 1].sales_share + '%');
        teamPersonalWinRatioChart.data([data['team_data'][row_index - 1].win_ratio, 100]);
        teamPersonalWinRatioChart.label().text(data['team_data'][row_index - 1].win_ratio + '%');
        setGeneralRevenueData(teamPersonalRevenueChart, data['team_data'][row_index-1].revenue_trend);
        $('.person-name').html(data['team_data'][row_index-1].name);
    }
    var content = [
        ['Name', 'Revenue', 'Variance from Avg', 'Avg Or.', 'New Clients']
    ];
    for (var i=0; i<data['team_data'].length; i++){
        content.push(
            [
                data['team_data'][i].name,
                '$' + parseInt(data['team_data'][i].revenue).formatMoney(0, '.', ','),
                createBulletChart(-50, 50, data['team_data'][i].revenue, data.average_revenue),
                '$' + parseInt(data['team_data'][i].average_order).formatMoney(0, '.', ','),
                createSparkLine(data['team_data'][i].new_clients)]
        )
    }
    content.push(
        [null, null, createBulletScale(50, -50, 50, '%'), null, null]
    );
    table.contents(content);
    table.getRow(data['team_data'].length + 1).vAlign('top').fontSize(10);
    table.getRow(data['team_data'].length + 1).height(20);

    anychart.graphics.events.listen(mainTableRect, "click", function(e){
        var h = (mainTableHeight - 50) / data['team_data'].length;
        var row = Math.round(e.offsetY/h)-1;
        if (activeMember) {
            table.getRow(activeMember).cellFill(null);
        }
        activeMember = row;
        selectChosenRow(activeMember);

    });

    anychart.graphics.events.listen(mainTableRect, "mousemove", function(e){
        var h = (mainTableHeight - 50) / data['team_data'].length;
        var row = Math.round(e.offsetY/h)-1;
        if (hoverRow && hoverRow != activeMember){
            table.getRow(hoverRow).cellFill(null);
        }
        hoverRow = row;
        if (hoverRow != activeMember && hoverRow != 0) table.getRow(hoverRow).cellFill("#F7A028 0.1");
    });

    anychart.graphics.events.listen(mainTableRect, "mouseout", function(e){
        if (hoverRow && hoverRow != activeMember){
            table.getRow(hoverRow).cellFill(null);
        }
    });

    if (!index || index == 0) activeMember = 1;
    else activeMember = index + 1;
    selectChosenRow(activeMember);
}