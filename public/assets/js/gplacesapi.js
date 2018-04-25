function initialize() {
    var input = /** @type {HTMLInputElement} */ (document.getElementsByClassName('birth-place'));

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', fillInAddress(autocomplete))

}

function fillInAddress(autocomplete) {
    var place = autocomplete.getPlace()
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);