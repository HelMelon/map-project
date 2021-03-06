ymaps.ready(init);

var districtByIso = {
    'RU-BEL': 'cfo',
    'RU-BRY': 'cfo',
    'RU-VLA': 'cfo',
    'RU-VOR': 'cfo',
    'RU-IVA': 'cfo',
    'RU-KLU': 'cfo',
    'RU-KOS': 'cfo',
    'RU-KRS': 'cfo',
    'RU-LIP': 'cfo',
    'RU-MOS': 'cfo',
    'RU-MOW': 'cfo',
    'RU-ORL': 'cfo',
    'RU-RYA': 'cfo',
    'RU-SMO': 'cfo',
    'RU-TAM': 'cfo',
    'RU-TVE': 'cfo',
    'RU-TUL': 'cfo',
    'RU-YAR': 'cfo',
    'RU-ARK': 'szfo',
    'RU-VLG': 'szfo',
    'RU-KGD': 'szfo',
    'RU-KR': 'szfo',
    'RU-KO': 'szfo',
    'RU-LEN': 'szfo',
    'RU-MUR': 'szfo',
    'RU-NEN': 'szfo',
    'RU-NGR': 'szfo',
    'RU-PSK': 'szfo',
    'RU-SPE': 'szfo',
    'RU-AD': 'yfo',
    'RU-AST': 'yfo',
    'RU-VGG': 'yfo',
    'RU-KL': 'yfo',
    'RU-KDA': 'yfo',
    'RU-SEV': 'yfo',
    'RU-KRY': 'yfo',
    'RU-ROS': 'yfo',
    'RU-DA': 'skfo',
    'RU-IN': 'skfo',
    'RU-KB': 'skfo',
    'RU-KC': 'skfo',
    'RU-SE': 'skfo',
    'RU-STA': 'skfo',
    'RU-CE': 'skfo',
    'RU-BA': 'pfo',
    'RU-KIR': 'pfo',
    'RU-ME': 'pfo',
    'RU-MO': 'pfo',
    'RU-NIZ': 'pfo',
    'RU-ORE': 'pfo',
    'RU-PNZ': 'pfo',
    'RU-PER': 'pfo',
    'RU-SAM': 'pfo',
    'RU-SAR': 'pfo',
    'RU-TA': 'pfo',
    'RU-UD': 'pfo',
    'RU-ULY': 'pfo',
    'RU-CU': 'pfo',
    'RU-KGN': 'urfo',
    'RU-SVE': 'urfo',
    'RU-TYU': 'urfo',
    'RU-KHM': 'urfo',
    'RU-CHE': 'urfo',
    'RU-YAN': 'urfo',
    'RU-ALT': 'sfo',
    'RU-AL': 'sfo',
    'RU-BU': 'sfo',
    'RU-ZAB': 'sfo',
    'RU-IRK': 'sfo',
    'RU-KEM': 'sfo',
    'RU-KYA': 'sfo',
    'RU-NVS': 'sfo',
    'RU-OMS': 'sfo',
    'RU-TOM': 'sfo',
    'RU-TY': 'sfo',
    'RU-KK': 'sfo',
    'RU-AMU': 'dfo',
    'RU-YEV': 'dfo',
    'RU-KAM': 'dfo',
    'RU-MAG': 'dfo',
    'RU-PRI': 'dfo',
    'RU-SA': 'dfo',
    'RU-SAK': 'dfo',
    'RU-KHA': 'dfo',
    'RU-CHU': 'dfo',
    'BY-HO': 'fff'
};

function init() {

    var map = new ymaps.Map('district-map', {
        center: [52, 31],
        zoom: 2,
        type: null,
        controls: ['zoomControl']
    },{
        restrictMapArea: [[-20, -20], [85,-160]]
    });
    map.controls.get('zoomControl').options.set({size: 'small'});
    // Добавим заливку цветом.
    var pane = new ymaps.pane.StaticPane(map, {
        zIndex: 100, css: {
            width: '100%', height: '100%', backgroundColor: '#f7f7f7'
        }
    });
    map.panes.append('white', pane);
    // Зададим цвета федеральных округов.
    var districtColors = {
        cfo: '#ffff6f',
        szfo: '#54cbba',
        yfo: '#f9768e',
        skfo: '#9a5597',
        pfo: '#30cb05',
        urfo: '#bac1cc',
        sfo: '#16acdb',
        dfo: '#fbc520',
        fff: '#3c3c3c'
    };
    // Зададим подсказки при наведении на федеральный округ.
    var districtsHints = {
        cfo: 'ЦФО',
        szfo: 'СЗФО',
        yfo: 'ЮФО',
        skfo: 'СКФО',
        pfo: 'ПФО',
        urfo: 'УрФО',
        sfo: 'СФО',
        dfo: 'ДФО',
        fff: 'FFF'
    };
    // Создадим балун.
    var districtBalloon = new ymaps.Balloon(map);
    districtBalloon.options.setParent(map.options);
    // Загрузим регионы.
    ymaps.borders.load('RU', {
        lang: 'ru',
        quality: 2
    }).then(function (result) {
        // Создадим объект, в котором будут храниться коллекции с нашими регионами.
        var districtCollections = {};
        // Для каждого федерального округа создадим коллекцию.
        for (var district in districtColors) {
            districtCollections[district] = new ymaps.GeoObjectCollection(null, {
                fillColor: districtColors[district],
                strokeColor: districtColors[district],
                strokeOpacity: 0.3,
                fillOpacity: 0.3,
                hintCloseTimeout: 0,
                hintOpenTimeout: 0
            });
            // Создадим свойство в коллекции, которое позже наполним названиями субъектов РФ.
            districtCollections[district].properties.districts = [];
        }

        result.features.forEach(function (feature) {
            var iso = feature.properties.iso3166;
            var name = feature.properties.name;
            var district = districtByIso[iso];
            // Для каждого субъекта РФ зададим подсказку с названием федерального округа, которому он принадлежит.
            feature.properties.hintContent = districtsHints[district];
            // Добавим субъект РФ в соответствующую коллекцию.
            districtCollections[district].add(new ymaps.GeoObject(feature));
            // Добавим имя субъекта РФ в массив.
            districtCollections[district].properties.districts.push(name);

        });
        // Создадим переменную, в которую будем сохранять выделенный в данный момент федеральный округ.
        var highlightedDistrict;
        for (var districtName in districtCollections) {
            // Добавим коллекцию на карту.
            map.geoObjects.add(districtCollections[districtName]);
            // При наведении курсора мыши будем выделять федеральный округ.
            districtCollections[districtName].events.add('mouseenter', function (event) {
                var district = event.get('target').getParent();
                district.options.set({fillOpacity: 1});
            });
            // При выводе курсора за пределы объекта вернем опции по умолчанию.
            districtCollections[districtName].events.add('mouseleave', function (event) {
                var district = event.get('target').getParent();
                if (district !== highlightedDistrict) {
                    district.options.set({fillOpacity: 0.3});
                }
            });
            // Подпишемся на событие клика.
            districtCollections[districtName].events.add('click', function (event) {
                var target = event.get('target');
                var district = target.getParent();
                // Если на карте выделен федеральный округ, то мы снимаем с него выделение.
                if (highlightedDistrict) {
                    highlightedDistrict.options.set({fillOpacity: 0.3})
                }
                // Откроем балун в точке клика. В балуне будут перечислены регионы того федерального округа,
                // по которому кликнул пользователь.
                districtBalloon.open(event.get('coords'), district.properties.districts.join('<br>'));
                // Выделим федеральный округ.
                district.options.set({fillOpacity: 1});
                // Сохраним ссылку на выделенный федеральный округ.
                highlightedDistrict = district;
            });
        }
    })
}