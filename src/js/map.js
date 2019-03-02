window.init = function () {
    var coords = {
		latitude: 53.902496,
        longitude: 27.561481
	}
    var myMap = null;

    var ZONE_DATA = {
        type: "FeatureCollection",
        features: [
// зона доставки 0
            {
                type: "Feature",
                id: 0,
                geometry: {
                    type: "Polygon",
                    coordinates: [[
					
					[53.970429260475,27.599479070758], [53.970890969196,27.584348132272], [53.96747786118,27.472920819164], [53.959714232663,27.456919640763], [53.948708954103,27.442291753377], [53.92885722658,27.420319097127], [53.913050088969,27.41001941451], [53.901627278872,27.405198195651], [53.880333094514,27.41875944443], [53.878507371504,27.413781264499], [53.884288552945,27.41257963486], [53.88418713563,27.409661391452], [53.881347350467,27.409318068698], [53.880941651052,27.406056502536], [53.882158737431,27.406228163913], [53.881651622433,27.400906661227], [53.876985874482,27.400391677096], [53.876478696447,27.397130110934], [53.876478696447,27.387688735202], [53.875160004634,27.387002089694], [53.871508024648,27.375157454684], [53.861424556685,27.394545792333], [53.860917189048,27.400897263281], [53.867816859322,27.401240586035], [53.867816859322,27.411368607275], [53.870048860824,27.411368607275], [53.870454666423,27.422526596777], [53.853619866929,27.430099176523], [53.845313013505,27.451195312815], [53.842064497673,27.476601196604], [53.835363633972,27.534966064768], [53.833129773332,27.575821472483], [53.834348257612,27.631439758616], [53.834738792895,27.648617385149], [53.840424528693,27.664066909075], [53.845079256159,27.668187715994], [53.835942108652,27.679174044119], [53.830401831629,27.704923444321], [53.82999563571,27.715223126938], [53.838931031793,27.726209455064], [53.859940349925,27.683025526749], [53.87677023312,27.697505817966], [53.884681451269,27.697162495213], [53.930759621542,27.748509734373], [53.935440594771,27.746262872726], [53.934943404397,27.751907043081], [53.934732792318,27.753849363702], [53.935513802959,27.755657373225], [53.935535114009,27.758838673764], [53.936145158473,27.758463969139], [53.935994369771,27.75668874909], [53.936729297801,27.756230292508], [53.937033738546,27.757703026416], [53.938137532707,27.756663133956], [53.942051811468,27.754893680644], [53.941592598392,27.75293340698], [53.943008725391,27.754142484738], [53.94600398131,27.752131344869], [53.945993267906,27.755340737179], [53.946013227894,27.755314650252], [53.946109137789,27.755417309359], [53.948604694258,27.758197548226], [53.94975845977,27.758231205062], [53.954314799732,27.756600421981], [53.955622338145,27.756318049898], [53.957357488602,27.753106857816], [53.959282091898,27.748790479608], [53.959813568693,27.74780342669], [53.955387879341,27.737706861992], [53.956835278811,27.733627146604], [53.958245256246,27.71971176175], [53.960976965495,27.704898348861], [53.961229242317,27.685918368448], [53.962985170906,27.66908246887], [53.964301078808,27.653032130125], [53.966667077453,27.641208952787], [53.965794077622,27.632132357481], [53.969967546622,27.617614083341], [53.970429260475,27.599479070758]
					]]
				},
                options: {
                    strokeColor: "#FFFFFF",
                    fillColor: "#ff5c3370"
                },
                properties: {
                    name: "Минск",
                    price: "8,5 - 50,6 руб."
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
                    latitude: 53.902496,
                    longitude: 27.561481
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

        var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: 600;">$[properties.iconContent]</div>'
        );

        var myPlacemarkWithContent = new ymaps.Placemark([52.349276382492711, 30.898958478515610], {
            hintContent: 'Надпись при наведении',
            balloonContent: 'Котяра',
            // iconContent: 'надпись поверх метки' // расскоменть если надо
        }, {
            iconLayout: 'default#imageWithContent',
            // iconImageHref: 'http://freeicons.net.ru/wp-content/uploads/2013/08/walkingcat_white.gif',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
            iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout
        });

        myMap.geoObjects.add(deliveryPoint).add(myPlacemarkWithContent);

        //+ ЭТО УДАЛИТЬ после того как сделаю зоны, показывает координаты клика
       /* myMap.events.add('click', function (e) {
            if (!myMap.balloon.isOpen()) {
                var coords = e.get('coords');
                myMap.balloon.open(coords, {
                    contentHeader: 'Координаты',
                    contentBody: '<p>в массив координат</p><p>' + [
                    coords[0].toPrecision(17),
                    coords[1].toPrecision(17)
                    ].join(', ') + '</p>'
                });
            } else {
                myMap.balloon.close();
            }
        });*/
        //- ЭТО УДАЛИТЬ после того как сделаю зоны

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
                        // запрос к геокодеру при каждом перемещении метки
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
