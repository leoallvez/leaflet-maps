$( document ).ready(function() { 
    searchAddress('02952-230');
        
});

var mymap = L.map('mapid').setView([-23.4682137, -46.7191071], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <b>Léo Alves</b>',
    subdomains: ['a','b','c'],
    maxZoom: 20
}).addTo(mymap);

markers = [ 
    { "name": "Marcos Costas", "age": "22", "address": "Rua josé Campo Barretos, 176", "latitude": -23.4682137, "longitude": -46.7191071 },
    { "name": "Maria de Lima", "age": "32", "address": "Rua Brigadeiro Galvão Peixoto, 300", "latitude": -23.5213313, "longitude": -46.7208202 },
    { "name": "Lucas Mariano", "age": "43", "address": "Rua do Chico Nunes, 300", "latitude": -23.6289444, "longitude": -46.7452848}
];

markers.forEach(function(m) { 

    L.marker( [m.latitude, m.longitude] )
        .addTo(mymap)
        .bindPopup('<b>' + m.name + '</b><br>' + 'Idade:' + m.age + '<br>' + m.address)
        .openPopup();
});

function searchAddress(value) {
    $.getJSON( {
        url  : 'https://maps.googleapis.com/maps/api/geocode/json',
        data : {
            sensor   : false,
            address  : value,
            dataType : 'jsonp',
            key: 'AIzaSyDMHRY5qMwztkdNMgzrejpD_ymY_7yl4DE'
        },
        success : function( data, textStatus ) {
            console.log( textStatus, data );
        }
    });
}