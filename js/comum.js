
var mymap = L.map('mapid').setView([-23.4682137, -46.7191071], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <b>Maps Labs</b>',
    subdomains: ['a', 'b', 'c'],
    maxZoom: 20
}).addTo(mymap);

adresses = [{
        "description": "Rua josé Campo Barretos, 176",
        "lat": -23.4682137,
        "lng": -46.7191071
    },
    {
        "description": "Rua Brigadeiro Galvão Peixoto, 300",
        "lat": -23.5213313,
        "lng": -46.7208202
    },
    {
        "description": "Rua do Chico Nunes, 300",
        "lat": -23.6289444,
        "lng": -46.7452848
    }
];

adresses.forEach(function (address) {

    L.marker([address.lat, address.lng])
        .addTo(mymap)
        .bindPopup('<b>' + address.description + '</b>')
        .openPopup();
});

$('#search').select2({
    dropdownParent: $('#mapModal'),
    placeholder: "Search by address, city, state or country.",
    //allowClear: true,
    ajax: {
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        delay: 250,
        data: function (params) {

            if (!isEmpty(params.term)) {
                return {
                    sensor  : false,
                    address : params.term,
                    dataType: 'jsonp',
                    key     : 'AIzaSyDMHRY5qMwztkdNMgzrejpD_ymY_7yl4DE'
                }
            }
        },
        processResults: function (data) {

            var arr  = [];
            adresses = [];

            if (data.status == "OK" && isNotNull(data.results)) {

                data.results.forEach(function (value, index) {

                    arr.push({
                        id  : index,
                        text: value.formatted_address
                    });

                    adresses.push({
                        id: index,
                        lat: value.geometry.location.lat,
                        lng: value.geometry.location.lng,
                        description: value.formatted_address
                    });
                });
            }
            return {
                results: arr
            }
        },
    },
    templateSelection: function (data) {

        if (!isEmpty(data.id) && isNotNull(data)) {
            var address = adresses[data.id];

            L.marker([address.lat, address.lng])
                .addTo(mymap)
                .bindPopup('<b>' + address.description + '</b>')
                .openPopup();
        }
        return data.text;
    }
});

function isEmpty(str) {
    return (str === null || !str || 0 === str.length || str === '');
}

function isNotNull(val){
    return (val !== null && val !== undefined);
}

function clearSelect(){
    $("#search").empty().trigger('change')
}