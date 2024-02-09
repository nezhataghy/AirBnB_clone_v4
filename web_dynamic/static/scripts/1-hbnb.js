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
