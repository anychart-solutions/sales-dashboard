var colorAxisLines = '#CECECE';
var colorMinorAxisLines = '#EAEAEA';
var colorLightMinorAxisLines = '#F7F7F7';
var colorAxisFont = '#7c868e';
var darkAccentColor = '#545f69';
var darkAxisColor = '#B9B9B9';

var fontColor = '#212121';
var tooltipContourColor = '#c1c1c1';

var palette = anychart.palettes.distinctColors().colors(
    ['#aa8ab3', '#b7cbe2', '#cdd18e', '#938d9c',
    '#61687d', '#519790', '#6aabcc', '#6f5264',
    '#96246a', '#6a4c75']);


var paletteForMarkers = ['circle', 'diamond', 'square', 'triangleDown', 'triangleUp', 'diagonalCross', 'pentagon', 'cross', 'line', 'star5', 'star4', 'trapezium', 'star7', 'star6', 'star10'];
var bullet_range_palette = anychart.palettes.distinctColors().colors(['#8C8B8B', '#a8a8a8', '#bababa', '#d8d8d8', '#e5e4e4', '#F5F4F4']);

var line_thickness = 1.5;
var target_line_thickness = 2;

var setupBigTooltip = function (series) {
    series.tooltip(true);
    series.tooltip();
    series.tooltip(bigTooltipSettings);
    series.tooltip().content().textWrap('byLetter').useHtml(true).textSettings(bigTooltipTitleSettings);
};

var setupRanges = function (chart, target, loss_from, loss_to, orientation, text1, text2) {
    if (!text1) text1 = 'Loss';
    if (!text2) text2 = 'Target';
    var align = 'top';
    var anchor = 'rightBottom';
    var layout = 'vertical';
    var offsetY = 2;
    var offsetX = 0;
    if (orientation == 'top') {
        layout = 'horizontal';
        align = 'right';
        anchor = 'left';
        offsetY = 0;
        offsetX = 2;
        chart.rangeMarker()
            .scale(chart.yScale())
            .from(loss_from)
            .to(loss_to)
            .fill(tooltipContourColor + ' 0.4');
    } else {
        chart.rangeMarker()
            .scale(chart.yScale())
            .from(loss_from)
            .to(loss_to)
            .fill(tooltipContourColor + ' 0.4');
    }
    chart.lineMarker()
        .stroke({color: colorAxisFont, opacity: 1, thickness: target_line_thickness})
        .layout(layout)
        .scale(chart.yScale())
        .value(target);

    chart.textMarker()
        .textSettings(textLabelSettings)
        .scale(chart.yScale())
        .fontColor(colorAxisFont)
        .rotation(0)
        .layout(layout)
        .align(align)
        .anchor(anchor)
        .offsetX(offsetX)
        .offsetY(offsetY)
        .value(loss_to)
        .text(text1);

    chart.textMarker(1)
        .textSettings(textLabelSettings)
        .scale(chart.yScale())
        .fontColor(colorAxisFont)
        .rotation(0)
        .layout(layout)
        .align(align)
        .anchor(anchor)
        .offsetX(offsetX)
        .offsetY(offsetY)
        .value(target)
        .text(text2);
};

var turnOnLegend = function (chart, padding_left) {
    chart.legend().enabled(true).tooltip(false);
    chart.legend(legendSettings);
    chart.legend().paginator().textSettings(axisTitleSettings).fontSize(12);

    if (padding_left == 'center') {
        padding_left = 0;
        chart.legend().margin(0,0,0,0).align('center');
    }else if (padding_left == 'right') {
        padding_left = 0;
        chart.legend()
            .position('right')
            .hAlign('left')
            .vAlign('middle')
            .margin(0,0,0,0)
            .itemsLayout('vertical');

    } else if (!padding_left) padding_left = 102;
    chart.legend().textSettings(axisTitleSettings).padding([0, 0, 20, padding_left]);
};

var turnOnGrids = function (chart) {
    chart.xAxis().stroke(colorAxisLines);
    chart.xAxis().ticks().enabled(true);
    chart.yAxis().minorTicks().enabled(true);
    chart.grid().enabled(true);
    chart.grid(1).enabled(true);
    chart.minorGrid().enabled(true);
    chart.minorGrid(1).enabled(true);
};

var setupMarkers = function (series, orientation, size, hover_size) {
    series.markers(true);
    series.markers().size(size);
    series.hoverMarkers().size(hover_size);
    if (orientation == 'left') {
        series.markers().rotation(90);
    }
};

var setupSeriesLabels = function (series, position, anchor, rotation, padding, format) {
    var labels = series.labels();
    labels.enabled(true);
    labels.position(position);
    labels.anchor(anchor);
    labels.background('none');
    if (rotation != undefined) labels.rotation(rotation);
    labels.textSettings(textLabelSettings).fontColor(anychart.color.darken(series.color())).padding(padding);
    labels.fontSize('11px');
    labels.disablePointerEvents(true);
    series.hoverLabels().fontColor(anychart.color.darken(anychart.color.darken(series.color())));
    series.hoverLabels().fontWeight('bold');

    labels.textFormatter(function () {
        if (format == 'value_money')
            return '$' + Math.abs(parseInt(this.value)).formatMoney(0, '.', ',');
        if (format == 'simple_data')
            return this.getDataValue('data');
        if (format == 'simple_value')
            return this.value;
        if (format == 'x_value_rounded')
            return Math.round(this.x) + '/' + Math.round(this.value);
        if (format == 'simple_highest')
            return this.highest;
        if (format == 'low_high_money')
            return '$' + this.low.formatMoney(0, '.', ',') + 'k - $' + this.high.formatMoney(0, '.', ',') + 'k';
        if (format == 'low_high_money_two_lines')
            return '$' + this.low.formatMoney(0, '.', ',') + 'k -\n$' + this.high.formatMoney(0, '.', ',') + 'k';
    });
};

var setupSmallTooltip = function (series, format) {
    series.tooltip(tooltipSettings);
    series.tooltip().offsetY(10);
    series.tooltip().offsetX(10);
    series.tooltip().anchor('leftTop');
    series.tooltip().content().textSettings(tooltipTitleSettings);
    series.tooltip().contentFormatter(function () {
        if (format == 'value_money')
            return '$' + Math.abs(parseInt(this.value)).formatMoney(0, '.', ',');
        if (format == 'value_money_k')
            return '$' + Math.abs(parseInt(this.value)).formatMoney(0, '.', ',') + ',000';
        if (format == 'value_ohlc')
            return 'From ' + this.q1 + ' to ' + this.q3 + '\nMedian: ' + this.median + '\nHighest: ' + this.highest + '\nLowest: ' + this.lowest;
        if (format == 'simple_data')
            return this.getDataValue('data');
        if (format == 'x_value_rounded')
            return Math.round(this.x) + '/' + Math.round(this.value);
        if (format == 'simple_name')
            return this.getDataValue('name');
        if (format == 'value_x')
            return this.x + ':\n' + this.value;
        if (format == 'low_high_money')
            return '$' + this.low.formatMoney(0, '.', ',') + 'k - $' + this.high.formatMoney(0, '.', ',') + 'k';
    });
};

var setupSeries = function (series, hover, name, category) {
    var opacity, hoverOpacity;
    var stroke_thickness = line_thickness;

    if (category == 'like_area') {
        opacity = 0.6;
        hoverOpacity = 0.4;
        if (!hover) hoverOpacity = opacity;

        series.fill(series.color() + ' ' + opacity);
        series.hoverFill(series.color() + ' ' + hoverOpacity);
        series.stroke(stroke_thickness + ' ' + series.color());
        series.hoverStroke(stroke_thickness + ' ' + series.color());
        series.legendItem().iconStroke(null);

    } else if (category == 'like_bar' || category == 'like_markers' ){
        opacity = 0.85;
        hoverOpacity = 0.6;
        series.fill(series.color() + ' ' + opacity);
        series.hoverFill(series.color() + ' ' + hoverOpacity);
        series.stroke(stroke_thickness + ' ' + series.color() + ' ' + opacity);
        series.hoverStroke(stroke_thickness + ' ' + series.color() + ' 1');
        series.legendItem().iconType('square');
        series.legendItem().iconStroke(null);

    } else if (category == 'like_line'){
        stroke_thickness = 2;
        series.stroke(stroke_thickness + ' ' + series.color());
        series.legendItem().iconType('line');
        series.legendItem().iconStroke(series.color());

    } else if (category == 'like_range'){
        opacity = 0.6;
        hoverOpacity = 0.4;
        if (!hover) hoverOpacity = opacity;

        series.fill(series.color() + ' ' + opacity);
        series.hoverFill(series.color() + ' ' + hoverOpacity);
        series.lowStroke(stroke_thickness + ' ' + series.color()  + ' 1');
        series.highStroke(stroke_thickness + ' ' + series.color()  + ' 1');
        series.hoverLowStroke(stroke_thickness + ' ' + series.color() + ' 1');
        series.hoverHighStroke(stroke_thickness + ' ' + series.color() + ' 1');
        series.legendItem().iconStroke(null);
    }

    series.tooltip(false);
    if (category != 'like_markers'){
        series.markers().fill(series.color());
        series.markers().stroke(anychart.color.darken(series.color()));
        series.hoverMarkers().stroke(anychart.color.darken(series.color()));
        series.hoverMarkers().fill(series.color());
    }
    if (name) series.name(name)
};

var setupErrors = function (series) {
    series.error().valueErrorStroke('1 ' + anychart.color.darken(series.color()));
    series.error().xErrorStroke('1 ' + anychart.color.darken(series.color()));
};

var getPercentScale = function () {
    var extraYScale = anychart.scales.linear();
    extraYScale.ticks().interval(10);
    extraYScale.minorTicks().interval(2);
    extraYScale.minimum(0).maximum(100);
    return extraYScale
};

var getNewScale = function (from, to, step) {
    var extraYScale = anychart.scales.linear();
    extraYScale.ticks().interval(step);
    extraYScale.minorTicks().interval(step/5);
    extraYScale.minimum(from).maximum(to);
    return extraYScale
};

var axisLabelsFormatter = function (axis, format) {
    if (format == 'value_money') axis.labels().textFormatter(function () {
        return '$' + this.value.formatMoney(0, '.', ',')
    });
    if (format == 'value_money_k') axis.labels().textFormatter(function () {
        return '$' + this.value.formatMoney(0, '.', ',') + 'K'
    });
    if (format == 'value_percent') axis.labels().textFormatter(function () {
        return this.value + '%'
    });
};

var setupXAxis = function (chart, i, stroke, ticks_length, minor_ticks_length, labels_padding, if_title) {
    var axisX = chart.xAxis();
    if (i) axisX = chart.xAxis(i);
    axisX.enabled(true);
    axisX.stroke(stroke);
    axisX.labels().textSettings(textLabelSettings).fontColor(colorAxisFont).padding(labels_padding);

    if (if_title) axisX.title(axisTitleSettings);
    else axisX.title(false);

    if (ticks_length) axisX.ticks().stroke(colorAxisLines).length(ticks_length);
    else axisX.ticks().enabled(false);
    if (minor_ticks_length) axisX.minorTicks().stroke(colorMinorAxisLines).length(ticks_length - 2);
    else axisX.minorTicks().enabled(false);
};

var setupYAxis = function (chart, i, stroke, ticks_length, minor_ticks_length, labels_padding, if_title) {
    var axisY = chart.yAxis();
    if (i) axisY = chart.yAxis(i);
    axisY.enabled(true);
    axisY.stroke(stroke);
    axisY.labels().textSettings(textLabelSettings).fontColor(colorAxisFont).padding(labels_padding);

    if (if_title) axisY.title(axisTitleSettings);
    else axisY.title(false);

    if (ticks_length) axisY.ticks().stroke(colorAxisLines).length(ticks_length);
    else axisY.ticks().enabled(false);
    if (minor_ticks_length) axisY.minorTicks().stroke(colorMinorAxisLines).length(ticks_length - 2);
    else axisY.minorTicks().enabled(false);
};

var setupRadarXAxis = function (chart, i, stroke, ticks_length, labels_padding) {
    var axisX = chart.xAxis();
    if (i) axisX = chart.xAxis(i);
    axisX.enabled(true);
    axisX.stroke(stroke);
    if (labels_padding)
        axisX.labels().textWrap('byLetter').hAlign('center')
            .textSettings(textLabelSettings)
            .fontColor(colorAxisFont).padding(labels_padding);
    else axisX.labels().enabled(false);

    if (ticks_length) axisX.ticks().stroke(colorAxisLines).length(ticks_length);
    else axisX.ticks().enabled(false);
    //axisX.minorTicks().enabled(false);
};

var setupRadarYAxis = function (chart, i, stroke, ticks_length, minor_ticks_length, labels_padding) {
    var axisY = chart.yAxis();
    if (i) axisY = chart.yAxis(i);
    axisY.enabled(true);
    axisY.stroke(stroke);
    axisY.labels().textSettings(textLabelSettings).fontColor(colorAxisFont).fontSize('11px').padding(labels_padding);
    axisY.drawLastLabel(false);
    if (ticks_length) axisY.ticks().stroke(stroke).length(ticks_length);
    else axisY.ticks().enabled(false);
    if (minor_ticks_length) axisY.minorTicks().stroke(colorMinorAxisLines).length(ticks_length - 2);
    else axisY.minorTicks().stroke(null);
};

var setupChart = function (chart, type) {
    chart.palette(palette);
    //chart.padding([30, 50, 20, 20]);
    chart.background('white');

    chart.title(titleSettings);
    chart.title().padding([0, 0, 10, 0]).margin(0).align('left');
    chart.title().enabled(false);
    if (type != 'radar' && type != 'polar' && type != 'pie') {
        chart.xAxis(1).enabled(false);
        chart.yAxis(1).enabled(false);
    }
    if (type != 'pie') {
        var paletteMarkers = anychart.palettes.markers();
        paletteMarkers.markers(paletteForMarkers);
        chart.markerPalette(paletteMarkers);
        chart.yScale().minimum(0);

        chart.grid().layout('horizontal').stroke(colorAxisLines).oddFill(null).evenFill(null).zIndex(11);
        chart.minorGrid().layout('horizontal').stroke(colorMinorAxisLines).oddFill(null).evenFill(null).zIndex(10);

        chart.grid(1).layout('vertical').stroke(colorAxisLines).oddFill(null).evenFill(null).zIndex(11);
        chart.minorGrid(1).layout('vertical').stroke(colorMinorAxisLines).oddFill(null).evenFill(null).zIndex(10);

        chart.grid().enabled(false);
        chart.minorGrid().enabled(false);
        chart.grid(1).enabled(false);
        chart.minorGrid(1).enabled(false);
    }

    if (type == 'scatter') chart.yScale().minimum(null);
    else if (type == 'rangeColumn' || type == 'rangeBar' || type == 'bar' || type == 'column') {
        chart.barsPadding(.4);
        chart.barGroupsPadding(0.6);
    } else if (type == 'radar' || type == 'polar') {
        chart.yScale().minimum(0);
        chart.grid(1).enabled(true);
        chart.grid(1).layout('RADIAL').stroke(colorMinorAxisLines);

        chart.grid().stroke(colorMinorAxisLines);
        chart.minorGrid().stroke(colorLightMinorAxisLines);
        chart.minorGrid(1).layout('RADIAL').stroke(colorLightMinorAxisLines);

        chart.grid().stroke(colorAxisLines);
        chart.title().padding([0, 0, 20, 0]).margin(0).align('center');
    }else if (type == 'pie') {
        chart.title().padding([0, 0, 20, 0]).margin(0).align('center');
    }
    chart.legend().enabled(false);
    return chart;
};

var titleSettings = {
    fontFamily: "'Source Sans Pro', sans-serif;",
    fontWeight: 'normal',
    fontSize: '16px',
    fontColor: colorAxisFont,
    padding: 0
    //margin: [0, 0, 10, 0]
};

var axisTitleSettings = {
    fontFamily: "'Source Sans Pro', sans-serif;",
    fontWeight: 'normal',
    fontSize: '13px',
    fontColor: darkAccentColor,
    padding: 0,
    margin: 0
};

var legendSettings = {
    vAlign: 'bottom',
    fontSize: '13px',
    margin: 0,
    padding: [0, 0, 20, 102],
    itemsLayout: 'horizontal',
    background: null,
    position: 'top',
    align: 'left',
    iconStroke: false
};

var textLabelSettings = {
    fontFamily: "'Source Sans Pro', sans-serif;",
    fontWeight: 'normal',
    fontSize: '12px',
    fontColor: darkAccentColor
};

var tooltipSettings = {
    background: {
        fill: fontColor + ' 0.7',
        stroke: null,
        corners: 3,
        cornerType: 'ROUND'
    }
};

var tooltipTitleSettings = {
    fontFamily: "'Source Sans Pro', sans-serif;",
    fontWeight: 'normal',
    fontSize: '12px',
    hAlign: 'left',
    fontColor: 'white'
};

var bigTooltipSettings = {
    background: {fill: 'white', stroke: tooltipContourColor, corners: 3, cornerType: 'ROUND'},
    padding: [8, 13, 10, 13],
    anchor: 'LEFT_TOP',
    offsetX: 10,
    offsetY: 15
};

var bigTooltipTitleSettings = {
    fontFamily: "'Source Sans Pro', sans-serif;",
    fontWeight: 'normal',
    fontSize: '12px',
    hAlign: 'left',
    fontColor: fontColor
};

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

var getBulletScale = function (min, max) {
    var bulletScale = anychart.scales.linear();
    bulletScale.minimum(min).maximum(max);
    return bulletScale
};

var getBulletAxis = function (min, max) {
    var axis = anychart.axes.linear();
    axis.orientation('bottom');
    axis.stroke('#ccc');
    axis.title().enabled(false);
    axis.ticks().stroke('#ccc');
    axis.minorTicks().enabled(true).stroke('#ccc');
    axis.labels().fontSize('9px');
    axis.scale(getBulletScale(min, max));
    return axis
};

function applyTableSettings(table) {
    table.fontFamily("'Source Sans Pro', sans-serif;");
    table.fontWeight('normal');
    table.fontSize('12px');
    table.hAlign('left');
    table.vAlign('middle');
    table.cellPadding(0, 10, 0, 10);
    table.fontColor(colorAxisFont);
    table.border(colorAxisLines);
    table.cellBorder(colorAxisLines);
    //table.maxHeight(300);
    //table.maxWidth(300);

    // not in defaults, 0,0,0,0 - in default :
    table.left(30);
    table.right(30);
    table.bottom(30);
    table.top(30);
}

function applySparklineMarkersSettings(markers, color){
    markers.enabled(true);
    markers.size(1.8);
    markers.fill(color);
    markers.stroke(null);
    //markers.stroke(anychart.color.darken(color));
}

function applySparklineLabelSettings(labels, color, position, anchor){
    labels.enabled(true);
    labels
        .textSettings(textLabelSettings)
        .fontWeight('normal')
        .fontSize('9px')
        .fontColor(anychart.color.darken(color))
        .padding([3,0,3,0]);
    labels.position(position);
    labels.anchor(anchor);
}

function getWins(array) {
    var wins = 0;
    for (var i = 0, count = array.length - 1; i < count; i++) {
        if (array[i] > 0) wins++;
    }
    return wins;
}

function getLoses(array) {
    var loses = 0;
    for (var i = 0, count = array.length - 1; i < count; i++) {
        if (array[i] < 0) loses++;
    }
    return loses;
}

function getPercent(array) {
    var wins = 0;
    var total = array.length;
    for (var i = 0, count = array.length - 1; i < count; i++) {
        if (array[i] > 0) wins++;
    }
    return Math.round(wins / total * 100) + '%';
}