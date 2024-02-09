const amenities = {};
$(document).ready(function () {
    $('.amenities .popover ul li input').change(function () {
        const amenityName = $(this).data('name');

        if (this.checked) amenities[amenityName] = $(this).data('id');
        else delete amenities[amenityName];

        const amenityNames = Object.keys(amenities);
        $('.amenities h4').text(amenityNames.join(', '));
    })
})

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK' && status === 'success') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available');
    }
})
