var ContactController = function () {
    this.initialize = function () {
        registerEvent();
    }

    function registerEvent() {
        initMap();
    }

    function initMap() {
        var uluru = { lat: parseFloat($('#hidLat').val().replace(",", ".")), lng: parseFloat($('#hidLng').val().replace(",", "."))};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: uluru
        });

        var contentString = $('#hidAddress').val();

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: $('#hidName').val()
        });
        infowindow.open(map, marker);
    }
}