const signup = document.getElementById('login')
const boxCity = document.getElementById('box-city')
const boxMap = document.getElementById('box-map')
const showCity = document.getElementById('mycol')
const boxDasteBandi = document.getElementById('dastebandi-box');
const showDasteBandi = document.getElementById('daste-bandi');


if (window.outerWidth < 700) {
    signup.innerHTML = `<i class="fa fa-user" aria-hidden="true"></i>`
} else {
    signup.innerHTML = `ورود - ثبت نام<i class="fa fa-user me-2" aria-hidden="true"></i>`
}

window.addEventListener('resize', function () {
    if (window.outerWidth < 700) {
        signup.innerHTML = `<i class="fa fa-user " aria-hidden="true"></i>`
    } else {
        signup.innerHTML = `ورود - ثبت نام<i class="fa fa-user me-2" aria-hidden="true"></i>`
    }
});


if (window.outerWidth < 980) {
    boxCity.style.display = 'none'
    boxMap.classList.add('col-12')

} else {
    boxCity.style.display = 'block'
    boxMap.classList.remove('col-12')
}

window.addEventListener('resize', function () {
    if (window.outerWidth < 980) {
        boxCity.style.display = 'none'
        boxMap.classList.add('col-12')

    } else {
        boxCity.style.display = 'block'
        boxMap.classList.remove('col-12')
    }
});

const boxDasteContent = boxDasteBandi.innerHTML;
showDasteBandi.innerHTML = `${boxDasteContent}`



const boxCityContent = boxCity.innerHTML;
showCity.innerHTML += `${boxCityContent}`
$('#city').on('click', function () {
    $('#mycol').addClass('show');
    $('.overlay').fadeIn();
});

$('.overlay').on('click', function () {
    $('#mycol').removeClass('show');
    $(this).fadeOut();
});

$('#btn-close').on('click', function () {
    $('#mycol').removeClass('show');
    $('.overlay').fadeOut();
});




// ایجاد نقشه
var map = L.map('map').setView([51.200, -0.09], 10)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var markers = L.markerClusterGroup();

fetch('/api/points/')
    .then(response => response.json())
    .then(data => {
        data.forEach(point => {
            var marker = L.marker([point.lat, point.lng]).bindPopup(`<b>${point.name}</b><br>${point.description}`);
            markers.addLayer(marker);
        });
        map.addLayer(markers);
    });