var darkAccentColor = '#545f69';
var fontColor = '#212121';

function revenueChart(){
    var chart = anychart.column();
    var series = chart.column(revenue_data);
    chart.title('Revenue dynamic');
    var series2 = chart.line(revenue_data);
    return chart
}
function topSales(){
    var chart = anychart.bar();
    var series = chart.bar(categorized_data);
    chart.title(null);
    return chart
}
var palette = anychart.palettes.distinctColors().colors(['#64b5f6', '#1976d2', '#ef6c00', '#ffd54f', '#455a64', '#96a6a6', '#dd2c00', '#00838f', '#00bfa5', '#ffa000']);
var hoverOpacity = 0.8;
function topRegions(){
    var data = [
        {
            name: 'Department Stores',
            value: 6371664,
            hoverFill: palette.colorAt(0) + ' ' + hoverOpacity,
            label: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(0))), fontWeight: 'bold'},
            hoverLabels: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(0))), fontWeight: 'bold'}
        },
        {
            name: 'Discount Stores',
            value: 7216301,
            hoverFill: palette.colorAt(1) + ' ' + hoverOpacity,
            label: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(1))), fontWeight: 'bold'},
            hoverLabel: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(1))), fontWeight: 'bold'}},
        {
            name: 'Men\'s/Women\'s Stores',
            value: 1486621,
            hoverFill: palette.colorAt(2) + ' ' + hoverOpacity,
            label: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(2))), fontWeight: 'bold'},
            hoverLabels: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(2))), fontWeight: 'bold'}},
        {
            name: 'Juvenile Specialty Stores',
            value: 786622,
            hoverFill: palette.colorAt(3) + ' ' + hoverOpacity,
            label: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(3))), fontWeight: 'bold'},
            hoverLabels: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(3))), fontWeight: 'bold'}},
        {
            name: 'All other outlets',
            value: 900000,
            hoverFill: palette.colorAt(4) + ' ' + hoverOpacity,
            label: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(4))), fontWeight: 'bold'},
            hoverLabels: {fontColor: anychart.color.darken(anychart.color.darken(palette.colorAt(4))), fontWeight: 'bold'}}
    ];
    var chart = anychart.pie(data);
    chart.stroke(null);
    chart.title(null);
    chart.innerRadius('30%');
    chart.hoverStroke(null);
    return chart
}

var createBulletChart = function(name, range_markers, axis_title){
    var data = table_data[name];
    var target = eval(data['toGoal'].join('+'));
    var actual = eval(data['actualSales'].join('+'));
    var profit = eval(data['profitTrend'].join('+'));
    if (range_markers){
        var bullet = anychart.bullet([
            {value: Math.round(actual), type: 'x', gap: 0.2, fill: fontColor, stroke: {thickness:1, color: fontColor}},
            {value: Math.round(profit), type: 'ellipse', gap: 0.2, fill: null , stroke: {thickness:2, color: fontColor}},
            {value: Math.round(target), 'type': 'line', 'gap': 0.2, fill: fontColor,
                stroke: {thickness:2, color: fontColor}
            }
        ]);
        bullet.background().enabled(true).fill('white').stroke('1 ' +  colorAxisFont);
        bullet.margin(5, 0);

        bullet.range().from(0).to(Math.round(target)*2/5);
        bullet.range(1).from(Math.round(target)*2/5).to(Math.round(target)*3/5);
        bullet.range(2).from(Math.round(target)*3/5).to(Math.round(target)*4/5);
        bullet.range(3).from(Math.round(target)*4/5).to(Math.round(target) + 2);
        bullet.range(4).from(Math.round(target) + 2).to(37);
    } else {
        bullet = anychart.bullet([
            {value: Math.round(actual), type: 'bar', gap: 0.7, fill: fontColor, stroke: null},
            {value: Math.round(target), 'type': 'line', 'gap': 0.2, fill: fontColor,
                stroke: {thickness:2, color: fontColor}
            }
        ]);
        bullet.margin(0);
    }
    bullet.axis(null);
    bullet.title().text(name).vAlign('middle');
    bullet.title().padding([0, 20, 0, 10]).fontSize(14).margin(0);
    if (!axis_title) bullet.title().enabled(false);
    else{
        bullet.margin(15, 0);
        bullet.axis().enabled(true);
        bullet.axis().labels().textWrap('byLetter').hAlign('center').padding([0, 0, 0, 0]);
        bullet.axis().minorTicks().enabled(false);

        bullet.axis().title({text:'Actual to target', fontSize:12, padding:[0,0,0,0]});

        // по умолчанию title у оси по-прежнему отключен
        bullet.axis().enabled(true);
    }
    bullet.padding(0, -1);
    bullet.scale().minimum(0);
    bullet.scale().maximum(37);
    bullet.layout('horizontal');
    return bullet;
};


function bulletMetrics(){
    var table = anychart.ui.table();
    table.contents([
        ['Revenue (USD)', createBulletChart('Alabama'), '$30456'],
        ['Profit', createBulletChart('Alaska'), '$20456'],
        ['Avg order size', createBulletChart('Arizona'), '$530'],
        ['New customers', createBulletChart('Idaho'), '2/day'],
        ['Market share', createBulletChart('Illinois'), '3.4%']
    ]);
    return table
}


anychart.onDocumentLoad(function() {
    var stage = anychart.graphics.create('key-metric-dashboard');
    var table = anychart.ui.table(4, 3);
    //table.border(null);
    //table.margin(40);
    //table.cellBorder(null);
    table.getCell(0, 0).content('Key metrics');
    table.getCell(0, 0)
        .fontFamily("'Verdana', Helvetica, Arial, sans-serif")
        .fontSize(16)
        //.hAlign('center')
        .fontColor(darkAccentColor);
    table.getRow(0).height(30);
    table.getRow(2).height(30);

    //table.getCell(1, 0).content(generalSales());
    //table.getCell(1, 1).content(generalSalesByMajorProducts());
    table.getCell(1, 0).colSpan(2).content(revenueChart());
    table.getCell(1, 2).content(bulletMetrics());

    table.getCell(2, 0).content('Top 5 sales men');
    table.getCell(2, 1).content('Top 5 regions');
    table.getCell(2, 2).content('Top 5 products');

    table.getCell(3, 0).content(topSales());
    table.getCell(3, 1).content(topSales());
    table.getCell(3, 2).content(topSales());
    table.minHeight(600);
    //table.getRow(2).maxHeight(380);

    table.getRow(0).vAlign('middle');
    table.container(stage).draw();
});