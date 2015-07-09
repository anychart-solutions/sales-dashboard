var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var YEARS = ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'];
var WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var REGION_NAMES = ['Alsace', 'Aquitaine', 'Auvergne', 'Brittany', 'Burgundy', 'Centre-Val de Loire', 'Champagne-Ardenne', 'Franche-Comté', 'Île-de-France', 'Languedoc-Roussillon', 'Limousin', 'Lorraine', 'Lower Normandy', 'Midi-Pyrénées', 'Nord-Pas-de-Calais', 'Pays de la Loire', 'Picardy', 'Poitou-Charentes', 'Provence-Alpes-Côte d\'Azur', 'Rhône-Alpes', 'Upper Normandy', 'Corsica', 'French Guiana', 'Guadeloupe', 'Martinique', 'Mayotte', 'Reunion'];
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
    if (period == 'YTD') {
        for (var i = 0; i < 12; i++){
            result.push([MONTHS[i], generateNumber(300000, 600000), generateNumber(430, 520)]);
        }
    }
    return result
};


var makeCategoriesChartData = function(names){
    var result = generateData(1200, 600000, 8, true, names);
    for (var i = 0; i < result.length; i++){
        result[i].push(generateNumber(430, 520));
    }
    return result
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