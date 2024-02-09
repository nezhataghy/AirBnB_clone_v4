const amenities = {};
$(document).ready(function () {
    $('.amenities .popover ul li input').change(function () {
        const amenityName = $(this).data('name');

        if (this.checked) amenities[amenityName] = $(this).data('id');
        else delete amenities[amenityName];

        const amenityNames = Object.keys(amenities);
        $('.amenities h4').text(amenityNames.join(', '));
    })

    $.get(`http://127.0.0.1:5001/api/v1/status/`, function (data, status) {
    if (data.status === 'OK' && status === 'success') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available');
    }
})

    $("button").click(function () {
        console.log(Object.values(amenities));
        searchPlacesAmenities();
    });
})

function searchPlacesAmenities () {
    $.post({
        url: `http://127.0.0.1:5001/api/v1/places_search/`,
        data: JSON.stringify({amenities: Object.values(amenities)}),
        headers: {
            'Content-Type': 'application/json'
        },
        success: (data) => {
            data.forEach(place => {
                $(`<article>
                <div class="title_box">
                <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night}</div>
                        </div>
                    <div class="information">
                        <div class="max_guest">
                        ${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}
                        </div>
                        <div class="number_rooms">
                        ${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}
                        </div>
                        <div class="number_bathrooms">
                        ${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}
                        </div>
                        </div>
                        <div class="user">
                        <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                    </div>
                    <div class="description">
                    ${place.description}
                    </div>
                </article>`).appendTo('section.places')
            })
        }
    })
}
