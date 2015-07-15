var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var YEARS = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
var WEEK_DAYS = ['Su.', 'Mo.', 'Tu.', 'We.', 'Th.', 'Fr.', 'Sa.'];

var REGION_NAMES = [
    {id: 'fr-a', name: 'Alsace'},
    {id: 'fr-b', name: 'Aquitaine'},
    {id: 'fr-c', name: 'Auvergne'},
    {id: 'fr-d', name: 'Bourgogne'},
    {id: 'fr-e', name: 'Bretagne'},
    {id: 'fr-f', name: 'Centre-Val de Loire'},
    {id: 'fr-g', name: 'Champagne-Ardenne'},
    {id: 'fr-h', name: 'Corse'},
    {id: 'fr-i', name: 'Franche-Comté'},
    {id: 'fr-j', name: 'Île-de-France'},
    {id: 'fr-k', name: 'Languedoc-Roussillon'},
    {id: 'fr-l', name: 'Limousin'},
    {id: 'fr-m', name: 'Lorraine'},
    {id: 'fr-n', name: 'Midi-Pyrénées'},
    {id: 'fr-o', name: 'Nord-Pas-de-Calais'},
    {id: 'fr-p', name: 'Basse-Normandie'},
    {id: 'fr-q', name: 'Haute-Normandie'},
    {id: 'fr-r', name: 'Pays de la Loire'},
    {id: 'fr-s', name: 'Picardie'},
    {id: 'fr-t', name: 'Poitou-Charentes'},
    {id: 'fr-u', name: 'Provence-Alpes-Côte d\'Azur'},
    {id: 'fr-v', name: 'Rhône-Alpes'},
    {id: 'fr-gf', name: 'French Guiana'},
    {id: 'fr-gp', name: 'Guadeloupe'},
    {id: 'fr-mg', name: 'Martinique'},
    {id: 'fr-yt', name: 'Mayotte'},
    {id: 'fr-re', name: 'Reunion'}];
var PEOPLE = ['Katherine Bailey', 'Joyce Owens', 'Nancy Gordon', 'Harold Sanchez', 'Jesse Cooper', 'Ann Bradley', 'Matthew Phillips', 'Jose Hart', 'Frances Chapman', 'Jerry Clark', 'Rose Montgomery', 'Roger Williamson', 'Norma Duncan', 'Frances Henderson', 'Melissa Riley', 'Ralph Butler', 'Marilyn Wood', 'Katherine Dean', 'Russell Thomas', 'Elizabeth Hudson', 'Willie Hansen', 'Dorothy Meyer', 'Judy Howell', 'Phillip Weaver', 'Arthur Boyd', 'Douglas Lopez', 'Sara Larson', 'Jimmy Hawkins', 'Juan Carpenter', 'Debra White', 'Billy Oliver', 'Angela Long', 'Beverly Gutierrez'];
var CATEGORIES_REGION = ['Alsace', 'Beaujolais', 'Bordeaux', 'Brittany', 'Burgundy', 'Champagne', 'Corsica', 'Ile de France', 'Jura', 'Languedoc-Roussillon', 'Loire', 'Normandy', 'Picardy', 'Provence', 'Rhône', 'Savoy', 'South West France'];
var CATEGORIES_GRAPE = ['Merlot', 'Grenache', 'Ugni blanc', 'Syrah', 'Carignan', 'Cabernet Sauvignon', 'Chardonnay', 'Cabernet Franc', 'Gamay', 'Pinot noir', 'Sauvignon blanc', 'Cinsaut', 'Melon de Bourgogne', 'Sémillon', 'Pinot Meunier', 'Chenin blanc', 'Mourvèdre', 'Colombard', 'Muscat Blanc à Petits Grains', 'Malbec', 'Alicante Bouschet', 'Grenache blanc', 'Viognier', 'Muscat de Hambourg', 'Riesling', 'Vermentino', 'Aramon', 'Gewurztraminer', 'Tannat', 'Gros Manseng', 'Macabeu', 'Muscat d\'Alexandrie', 'Pinot gris', 'Clairette', 'Caladoc', 'Grolleau', 'Auxerrois blanc', 'Marselan', 'Mauzac', 'Aligoté', 'Folle blanche', 'Grenache gris', 'Chasselas', 'Nielluccio', 'Fer', 'Muscadelle', 'Terret blanc', 'Sylvaner', 'Piquepoul blanc', 'Villard noir', 'Marsanne', 'Négrette', 'Roussanne', 'Pinot blanc', 'Plantet', 'Jacquère'];
var VINES = [
    'Henry Fessy',
    'Chateau Beaulieu',
    'Clos Floridene Rouge',
    'Chateau Galochet',
    'Chateau Beaumont',
    'Georges Duboeuf',
    'Clos Floridene',
    'Maison Bouey Lettres',
    'Georges Duboeuf',
    'Maison Bouey',
    'Chateau Reynon',
    'Perrin et Fils',
    'Le "G" de Chateau Guiraud',
    'Paul Jaboulet Aine',
    'Zind-Humbrecht',
    'Simonnet-Febvre',
    'Chateau Beausejour',
    'Chevalier Lacassan',
    'Vignerons de Provence',
    'Maison Bouey',
    'Chevalier Degroote',
    'Jean de Saligny',
    'Domaine Chante Cigale',
    'Maison Lacassan',
    'Tutti Frutti Arrogant',
    'Chateau Pey La Tour',
    'Robert Ampeau et Fils',
    'Les Domaines Montariol',
    'Tour du Vosc',
    'Chevalier Nicolas',
    'Chateau Saint Nicolas,',
    'Georges Duboeuf',
    'Barton & Guestier',
    'Domaine de Tara',
    'Barton & Guestier',
    'Les Colombieres',
    'Comtes de Tastes',
    'Patriarche, Pinot Noirs',
    'Les Colombieres',
    'Charles Yung et Fils',
    'Jean de Saligny',
    'Chateau Sainte Elisabeth',
    'Chateau Le Crock',
    'Robert Ampeau et Fils',
    'Gewurztraminer',
    'Chateau de Chamirey',
    'Les Colombieres',
    'Belle Arche Rouge',
    'Dourthe №1 Sauvignon',
    'Georges Duboeuf, Morgon',
    'E. Guigal, Cotes du Rhone',
    '"Chateau Reynon" Sauvignon',
    'Belle Arche',
    'Bordeaux, Bordeaux',
    'Chateau Tour de Bonnet',
    'Andre Lurton',
    'La Patache, Medoc',
    'Louis Latour',
    'Chateau Haura',
    'Noemie Vernaux'
];

var generateNumber = function(min, max){
    return Math.floor(min + Math.random() * (max + 1 - min));
};


var generateName = function(names){
    if (names == 'regions') return REGION_NAMES[generateNumber(0, REGION_NAMES.length - 1)];
    else if (names == 'vines') return VINES[generateNumber(0, VINES.length - 1)];
    else if (names == 'categories_region') return CATEGORIES_REGION[generateNumber(0, CATEGORIES_REGION.length - 1)];
    else if (names == 'categories_grape') return CATEGORIES_GRAPE[generateNumber(0, CATEGORIES_GRAPE.length - 1)];
    else if (names == 'people') return PEOPLE[generateNumber(0, PEOPLE.length - 1)];
};


var generateData = function(min, max, len, sort_needed, names){
    var result = [];
    var names_list = {};
    for (var i = 0; i < len; i++){
        var rand = generateNumber(min, max);
        if (names == 'month') result.push([MONTHS[i], rand]);
        else if (names == 'years') result.push([YEARS[i], rand]);
        else if (names == 'week_days') result.push([WEEK_DAYS[i], rand]);
        else if (names.name == 'quarter') result.push([MONTHS[i + names.value], rand]);
        else if (names == 'days') result.push([i + 1, rand]);
        else if (names) {
            do {
                var name = generateName(names);
            } while (name in names_list);
            names_list[name] = true;
            result.push([name, rand]);
        }
        else result.push(rand);
    }
    if (sort_needed && names) {
        return result.sort(function (a, b) {
            return a[1] < b[1] ? 1 : -1;
        });
    } else if (sort_needed) {
        return result.sort();
    } else
        return result
};


var makeRevenueChartData = function(period){
    var result = [];
    if (period == 'all') {
        for (var i = 0; i < YEARS.length; i++){
            result.push([YEARS[i], generateNumber(300000, 600000), generateNumber(430, 520)]);
        }
    } else if (period == 'YTD') {
        for (i = 0; i < 12; i++){
            result.push([MONTHS[i], generateNumber(300000, 600000), generateNumber(430, 520)]);
        }
    } else if (period == 'QTD') {
        for (i = 0; i < 4; i++){
            result.push([MONTHS[i], generateNumber(300000, 600000), generateNumber(430, 520)]);
        }
    } else if (period == 'MTD') {
        for (i = 0; i < 31; i++){
            result.push([i, generateNumber(300000, 600000), generateNumber(430, 520)]);
        }
    } else if (period == 'WTD') {
        for (i = 0; i < WEEK_DAYS.length; i++){
            result.push([WEEK_DAYS[i], generateNumber(300000, 600000), generateNumber(430, 520)]);
        }
    }
    return result
};

var makeMapData = function(){
    var data = [];
    for (var i = 0; i < REGION_NAMES.length; i++){
        data.push({
            id: REGION_NAMES[i].id,
            x: REGION_NAMES[i].name,
            value: generateNumber(300000, 600000)
        })
    }
    return data
};

var makeCategoriesProductData = function(){
    var data = [];
    var result = generateData(1200, 600000, generateNumber(20, 30), false, 'vines');
    for (var i = 0; i < result.length; i++){
        data.push({
            x: result[i][0],
            revenue: result[i][1],
            last: generateData(1500, 12000, 12, false, false),
            price: generateNumber(5, 60),
            average_price: generateNumber(10, 20),
            mapData: makeMapData()
        });
    }
    return data
};

var makeCategoriesData = function(){
    var data = [];
    var result = generateData(1200, 600000, 13, true, 'categories_region');
    for (var i = 0; i < result.length; i++){
        data.push({
            x: result[i][0],
            value: result[i][1],
            data: makeCategoriesProductData(),
            mapData: makeMapData()
        });
    }
    return data
};

var generateFiveBest = function () {
    var people_list = generateData(1200, 600000, 5, true, 'people');
    people_list.push(['Other', generateNumber(300000, 600000)]);
    var region_list = generateData(1200, 600000, 5, true, 'categories_region');
    region_list.push(['Other', generateNumber(300000, 600000)]);
    var product_list = generateData(1200, 600000, 5, true, 'vines');
    product_list.push(['Other', generateNumber(300000, 600000)]);
    return {
        'sales_men': people_list,
        'regions': region_list,
        'products': product_list
    }
};


var generateGeneralDataForAll = function(){
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


var generateProductsDataForAll = function(){
    return {
        all: {'categories_data': makeCategoriesData()},
        YTD: {'categories_data': makeCategoriesData()},
        QTD: {'categories_data': makeCategoriesData()},
        MTD: {'categories_data': makeCategoriesData()},
        WTD: {'categories_data': makeCategoriesData()}
    }
};