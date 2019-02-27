window.init = function () {
    var coords = {}
    var myMap = null;

    var ZONE_DATA = {
        type: "FeatureCollection",
        features: [

            {
                type: "Feature",
                id: 1,
                geometry: {
                    type: "Polygon",
                    coordinates: [[["54.0207187", "27.29947"], ["54.0204221", "27.2998437"], ["54.0188107", "27.3018744"], 
                                   ["54.0182751", "27.3054168"], ["54.0173447", "27.3075359"], ["54.0169136", "27.3128773"], ["54.0108331", "27.3111423"], ["54.0105094", "27.3116661"], ["54.0089407", "27.316592"], 
                                   ["54.0080722", "27.3166969"], ["54.0066443", "27.3383154"], ["54.0054343", "27.3373874"], ["54.0047831", "27.3367153"], ["54.0039556", "27.335861"], ["54.0029457", "27.3348186"], 
                                   ["54.0004301", "27.3322222"], ["54.0003211", "27.3321097"], ["53.9974916", "27.3278469"], ["53.9979251", "27.3261263"], ["53.9989949", "27.3218803"], ["54.0011734", "27.3188573"], ["54.0026624", "27.3117573"], ["54.0007996", "27.3081755"], ["53.9962741", "27.3072493"], ["53.9952671", "27.3132741"], ["53.9944763", "27.3147797"], ["53.9933409", "27.3169031"], ["53.9927454", "27.3156435"], ["53.9914617", "27.3132117"], ["53.9899883", "27.3084873"], ["53.9895632", "27.3071243"], ["53.990194", "27.3060745"], ["53.990215", "27.3051479"], 
                                   ["53.9894862", "27.3049095"], ["53.9901633", "27.3039475"], ["53.9908298", "27.3029926"], 
                                   ["53.991223", "27.3024597"], ["53.9919385", "27.301537"], ["53.9920016", "27.3003712"], 
                                   ["53.9922792", "27.2988405"], ["53.9929015", "27.2966518"], ["53.9931627", "27.2957949"], ["53.9938525", "27.2940144"], ["53.99514", "27.2905499"], ["53.99789", "27.2861799"], 
                                   ["53.9881332", "27.290165"], ["53.9822868", "27.2925524"], ["53.9815268", "27.2839862"], 
                                   ["53.9809181", "27.2806557"], ["53.9813821", "27.2773249"], ["53.9838871", "27.2707983"], ["53.9836177", "27.2606423"], ["53.9851765", "27.2566194"], ["53.9877141", "27.2568407"], ["53.9901564", "27.2465296"], ["53.9913362", "27.2473502"], ["53.9918532", "27.2477098"], ["53.9938292", "27.2490841"], ["53.9937661", "27.2607549"], ["53.9940887", "27.2635874"], ["53.9953291", "27.2667522"], ["53.995635", "27.267533"], ["53.9961647", "27.2688841"], 
                                   ["53.9967753", "27.2681484"], ["53.9972735", "27.2672051"], ["53.9974072", "27.2663026"], ["53.9977691", "27.2644462"], ["53.9983292", "27.2619248"], ["54.00109", "27.2582061"], 
                                   ["54.0043042", "27.2652744"], ["54.0045", "27.2658399"], ["54.0116997", "27.2557361"], 
                                   ["54.0120062", "27.2549189"], ["54.01248", "27.2557099"], ["54.0134745", "27.2566033"], 
                                   ["54.014375", "27.2549848"], ["54.0148689", "27.2554892"], ["54.0177501", "27.2513839"], 
                                   ["54.0180695", "27.2515967"], ["54.021308", "27.2539305"], ["54.0234598", "27.2565765"], 
                                   ["54.025575", "27.2513749"], ["54.0250721", "27.2469361"], ["54.0262008", "27.246247"], 
                                   ["54.026633", "27.2442252"], ["54.0284863", "27.2407499"], ["54.0297065", "27.2399498"], 
                                   ["54.031489", "27.2420926"], ["54.0344519", "27.246855"], ["54.0313791", "27.2528455"], 
                                   ["54.0283713", "27.258917"], ["54.0265154", "27.2629596"], ["54.0224767", "27.2717562"], 
                                   ["54.0220577", "27.2760763"], ["54.0258065", "27.2801061"], ["54.0288398", "27.2880071"], ["54.0249843", "27.2924956"], ["54.0219272", "27.2994473"], ["54.0207187", "27.29947"]]]
                },
                options: {
                    strokeColor: "#FFFFFF",
                    fillColor: "#1F44FF70"
                },
                properties: {
                    name: "Адрес писать тута 2",
                    price: "Мильярд"
                }
                      },

            {
                type: "Feature",
                id: 2,
                geometry: {
                    type: "Polygon",
                    coordinates: [
                                          [ // это массивы координат, вставляй сбда данные которые будут появляться по клику на карту
                                            [52.371551, 30.386557]]
                                        ]
                },
                options: {
                    strokeColor: "#FFFFFF",
                    fillColor: "#f3ec1070"
                },
                properties: {
                    name: "xddftdfgfhcfgf",
                    price: "100500"
                }
                      }
                    ]
    }

    function runThis() {
        return new Promise(function (resolve, reject) {
            function success(position) {
                coords = position.coords;
                resolve();
            }

            function error() {
                coords = {
                    latitude: 52.421065,
                    longitude: 31.007457
                }
                resolve();
            }
            navigator.geolocation.getCurrentPosition(success, error)

        });
    }


    runThis().then(function () {
        myMap = new ymaps.Map("map", {
            center: [coords.latitude || 0, coords.longitude || 0],
            zoom: 10,
            controls: ['geolocationControl', 'searchControl']
        });
        var deliveryPoint = new ymaps.GeoObject({
            geometry: {
                type: 'Point'
            },
            properties: {
                iconCaption: 'Адрес'
            }
        }, {
            preset: 'islands#blackDotIconWithCaption',
            draggable: true,
            iconCaptionMaxWidth: '215'
        });
        var searchControl = myMap.controls.get('searchControl');
        searchControl.options.set({
            noPlacemark: true,
            placeholderContent: 'Введите адрес доставки'
        }); //надпись на поиске

        // Создаём макет содержимого.
        var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: 600;">$[properties.iconContent]</div>'
        );

        var myPlacemarkWithContent = new ymaps.Placemark([52.349276382492711, 30.898958478515610], {
            hintContent: 'Надпись при наведении',
            balloonContent: 'Котяра',
            // iconContent: 'надпись поверх метки' // расскоменть если надо
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'http://freeicons.net.ru/wp-content/uploads/2013/08/walkingcat_white.gif',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
            iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout
        });

        myMap.geoObjects.add(deliveryPoint).add(myPlacemarkWithContent);

        //+ ЭТО УДАЛИТЬ после того как сделаешь зоны, показывает координаты клика
        myMap.events.add('click', function (e) {
            if (!myMap.balloon.isOpen()) {
                var coords = e.get('coords');
                myMap.balloon.open(coords, {
                    contentHeader: 'Координаты',
                    contentBody: '<p>вставь это в массивы координат</p><p>' + [
                    coords[0].toPrecision(17),
                    coords[1].toPrecision(17)
                    ].join(', ') + '</p>'
                });
            } else {
                myMap.balloon.close();
            }
        });
        //- ЭТО УДАЛИТЬ после того как сделаешь зоны

        onZonesLoad();

        function onZonesLoad() {
            // Добавляем зоны на карту.
            var yZones = ymaps.geoQuery(ZONE_DATA).addToMap(myMap);
            // Задаём цвет и контент балунов полигонов.
            yZones.each(function (obj) {
                var color = obj.options.get('fillColor');
                color = color.substring(0, color.length - 2);
                obj.options.set({
                    fillColor: color,
                    fillOpacity: 0.4
                });
                obj.properties.set('balloonContent', obj.properties.get('name'));
                obj.properties.set('balloonContentHeader', 'Стоимость доставки: ' + obj.properties.get('price') + ' р.') // контент верхнего блока сообщения
            });

            // Проверим попадание результата поиска в одну из зон доставки.
            searchControl.events.add('resultshow', function (e) {
                highlightResult(searchControl.getResultsArray()[e.get('index')]);
            });

            // Проверим попадание метки геолокации в одну из зон доставки.
            myMap.controls.get('geolocationControl').events.add('locationchange', function (e) {
                highlightResult(e.get('geoObjects').get(0));
            });

            // При перемещении метки сбрасываем подпись, содержимое балуна и перекрашиваем метку.
            deliveryPoint.events.add('dragstart', function () {
                deliveryPoint.properties.set({
                    iconCaption: '',
                    balloonContent: ''
                });
                deliveryPoint.options.set('iconColor', 'black');
            });

            // По окончании перемещения метки вызываем функцию выделения зоны доставки.
            deliveryPoint.events.add('dragend', function () {
                highlightResult(deliveryPoint);
            });

            function highlightResult(obj) {
                // Сохраняем координаты переданного объекта.
                var coords = obj.geometry.getCoordinates(),
                    // Находим полигон, в который входят переданные координаты.
                    polygon = yZones.searchContaining(coords).get(0);

                if (polygon) {
                    // Уменьшаем прозрачность всех полигонов, кроме того, в который входят переданные координаты.
                    yZones.setOptions('fillOpacity', 0.4);
                    polygon.options.set('fillOpacity', 0.8);
                    // Перемещаем метку с подписью в переданные координаты и перекрашиваем её в цвет полигона.
                    deliveryPoint.geometry.setCoordinates(coords);
                    deliveryPoint.options.set('iconColor', polygon.options.get('fillColor'));
                    // Задаем подпись для метки.
                    if (typeof (obj.getThoroughfare) === 'function') {
                        setData(obj);
                    } else {
                        // Если вы не хотите, чтобы при каждом перемещении метки отправлялся запрос к геокодеру,
                        // закомментируйте код ниже.
                        ymaps.geocode(coords, {
                            results: 1
                        }).then(function (res) {
                            var obj = res.geoObjects.get(0);
                            setData(obj);
                        });
                    }
                } else {
                    // Если переданные координаты не попадают в полигон, то задаём стандартную прозрачность полигонов.
                    yZones.setOptions('fillOpacity', 0.4);
                    // Перемещаем метку по переданным координатам.
                    deliveryPoint.geometry.setCoordinates(coords);
                    // Задаём контент балуна и метки.
                    deliveryPoint.properties.set({
                        iconCaption: 'Доставка транспортной компанией', // сообщение показываемое при определении местоположения юзвера
                        balloonContent: 'Cвяжитесь с оператором', // что писать при клике на верхнее сообщение
                        balloonContentHeader: ''
                    });
                    // Перекрашиваем метку в чёрный цвет.
                    deliveryPoint.options.set('iconColor', 'black'); // цвет геометки
                }

                function setData(obj) {
                    var address = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
                    if (address.trim() === '') {
                        address = obj.getAddressLine();
                    }
                    deliveryPoint.properties.set({
                        iconCaption: address,
                        balloonContent: address,
                        balloonContentHeader: '<b>Стоимость доставки: ' + polygon.properties.get('price') + ' р.</b>'
                    });
                }
            }
        }
    })
}
