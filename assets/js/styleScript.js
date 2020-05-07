/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*PUT YOUR OWN KEY HERE - THIS MIGHT NOT WORK
SUBSCRIBE HERE: https://home.openweathermap.org/users/sign_up*/
const apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    //check if there's already a city
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            //athens,gr
            if (inputVal.includes(",")) {
                //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                        .querySelector(".city-name span")
                        .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                //athens
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${
                filteredArray[0].querySelector(".city-name span").textContent
                } ...otherwise be more specific by providing the country code as well `;
            form.reset();
            input.focus();
            return;
        }
    }

    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {main, name, sys, weather} = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                weather[0]["icon"]
                }.svg`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
                weather[0]["description"]
                }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});
/*current */


$(document).ready(function () {
    /* var options = {
       enableHighAccuracy: true,
       timeout: 8000,
       maximumAge: 0
     }; */

    var APIk = "7df44527166b406422ed8976a5cc8b5e";
    var lat = "0";
    var lon = "0";
    var u = "metric";

    /* finally found a secure ip API */
    $.getJSON('https://ipapi.co/json/', function (data) {
        lat = data.latitude;
        lon = data.longitude;
        currentWeather(lat, lon, "metric", "&deg;C", "m/s");

    });

    //currentWeather(lat, lon, "metric");

    function currentWeather(x, y, units, sym, sym1, w) { //get the current weatherdata at openweathermap.org.

        var owm = "//api.openweathermap.org/data/2.5/weather?lat=" + x + "&lon=" + y + "&units=" + units + "&APPID=" + APIk + "&callback=?";

        $.getJSON(owm, function (data) { //the actual weather data
            var temp = data.main.temp;
            var city = data.name;
            var country = data.sys.country;
            var wind = data.wind.speed;
            var degree = data.wind.deg;
            var conditions = data.weather[0].main;
            var description = data.weather[0].description;
            var icon = data.weather[0].icon;
            var clouds = data.clouds.all;
            var humidity = data.main.humidity;
            var bckid = data.weather[0].id;

            $('#currentTemp').html(Math.round(temp) + sym);
            $('#city').html(city);
            $('#country').html(country);
            $('#conditions').html(conditions + ": ");
            $('#more').html(description);
            $('#clouds').html("cloudiness: " + clouds + "&#37");
            $('#wind').html(wind + sym1);
            $('#degree').html(degree + "&degr;");
            $('#humidity').html(humidity + "&#37; humidity");
            $('#icon').prop("src", "http://openweathermap.org/img/w/" + icon + ".png");

            //     $('#icon').prop("height", "200px");
            //    $('#icon').prop("width", "200px");
            getWind(wind, w);
            getWindDirection(degree);
            changeBackground(bckid);
        });
        document.getElementById('c').addEventListener('click', function () {
            $('#celsius').click(toCelsius);
        }, false);
        document.getElementById('f').addEventListener('click', function () {
            $('#fahr').click(toFahrenheit);
        }, false);

    } //end of currenWeather


    function changeBackground(bckid) { // add appropriate backgrounds
        var postimg = "https://s20.postimg.cc/"
        var bckimg = "";
        var x = bckid;

        switch (x) {
            case 200:
            case 201:
            case 230:
            case 231:
                bckimg = postimg + "ml612c8dp/lightning_962789_1920.jpg";
                break;
            case 210:
            case 211:
                bckimg = postimg + "42sy9zsrx/thunderstorm_50428.jpg";
                break;
            case 202:
            case 212:
            case 221:
            case 232:
                bckimg = postimg + "h1ppfw771/norman_79860.jpg";
                break;
            case 300:
            case 301:
            case 302:
            case 310:
                bckimg = postimg + "zbx8c4z8t/drip_8763_1920.jpg";
                break;
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
                bckimg = postimg + "vng9krn1p/rain_645797_1920.jpg";
                break;
            case 500:
            case 501:
                bckimg = postimg + "/5rse77crx/japan_1160738_1920.jpg";
                break;
            case 502:
                bckimg = postimg + "b4h8lc0od/flower_315445.jpg";
                break;
            case 503:
                bckimg = postimg + "eqn1xz71p/rain_462828.jpg";
                break;
            case 504:
                bckimg = postimg + "rkur26g6l/thunderstorm_408720.jpg";
                break;
            case 511:
                bckimg = postimg + "bqxrrw419/ice_658423_1920.jpg";
                break;
            case 520:
            case 521:
                bckimg = postimg + "/nzp883fxp/its_raining_422539_1920.jpg";
                break;
            case 522:
            case 531:
                bckimg = postimg + "6dqjusmlp/water_815271_1920.jpg";
                break;
            case 600:
            case 601:
            case 602:
                bckimg = postimg + "ovqb1aezx/girl_926020_1920.jpg";
                break;

            case 602:
                bckimg = postimg + "7y9nyez59/bicycles_1176560_1920.jpg";
                break;
            case 611:
            case 612:
                bckimg = postimg + "v3bccb6gd/ice_591137_1920.jpg";
                break;
            case 615:
            case 616:
                bckimg = postimg + "tah5w3j3h/tree_550633_1920.jpg";
                break;
            case 621:
            case 622:
                bckimg = postimg + "z72nty6p9/hut_1025006_1920.jpg";
                break;
            case 701:
                bckimg = postimg + "5gahb2fe5/italy_634155.jpg";
                break;
            case 711:
                bckimg = postimg + "kmqmw8i25/kairo_918804_1920.jpg";
                break;
            case 721:
                bckimg = postimg + "60ukavey5/forest_54555_1920.jpg";
                break;
            case 731:
            case 751:
            case 761:
                bckimg = postimg + "ej92cbrsd/monument_valley_482726_1920.jpg";
                break;
            case 771:
                bckimg = postimg + "x84fli5wt/coast_520504_1920.jpg";
                break;
            case 781:
                bckimg = postimg + "wi2t6suwd/tornado_541911.jpg";
                break;

            case 800: //clear sky
                bckimg = postimg + "uddurz3vx/blue_sky_299764_1920.jpg";
                break;
            case 801: //few clouds
                bckimg = postimg + "j6num7cz1/rhodes_89585_1920.jpg";
                break;
            case 802: //scattered clouds
                bckimg = postimg + "ii0rent65/pier_569314_1920.jpg";
                break;
            case 803: //broken clouds
                bckimg = postimg + "5w4l6fbsd/sky_264778.jpg";
                break;
            case 804: //overcast clouds
                bckimg = postimg + "tpnubdfn1/grove_of_trees_977412_1920.jpg";
                break;
            case 900: //tornado
                bckimg = postimg + "wi2t6suwd/tornado_541911.jpg";
                break;
            case 901: //tropical storm
                bckimg = postimg + "n1vu2ilil/stormy_240926_1920.jpg";
                break;
            case 902: //hurricane
            case 962:
                bckimg = postimg + "5ubtanzhp/beach_768587.jpg";
                break;
            case 903: //cold
                bckimg = postimg + "3y2im68od/robin_675262.jpg";
                break;
            case 904: //hot
                bckimg = postimg + "wst5shjzh/maldives_666118_1920.jpg";
                break;
            case 905: //windy
                bckimg = postimg + "x84fli5wt/coast_520504_1920.jpg";
                break;
            case 906: //hail
                bckimg = postimg + "n20fg9awd/hail_844337_1920.jpg";
                break;

            case 951:
                bckimg = postimg + "7e9qzjcdp/hot_air_balloons_1253229.jpg";
                break;
            case 952:
            case 953:
                bckimg = postimg + "6o34b97jh/grasses_419891_1920.jpg";
                break;
            case 954:
            case 955:
            case 956:
                bckimg = postimg + "fx5aldgfh/seabreeze.png";
                break;
            case 957:
                bckimg = postimg + "4l1fbp5kd/breakwater_379252_1920.jpg";
                break;
            case 958:
            case 959:
                bckimg = postimg + "5ubtanzhp/beach_768587.jpg";
                break;
            case 960:
                bckimg = postimg + "pg4vklral/storm_691286_1920.jpg";
                break;
            case 961: //violent storm
                bckimg = postimg + "uuid04j1p/storm_clouds_1081942_1920.jpg";
                break;
            default:
                break;
        }

    }


    function getWind(s, pick) {
        var windDesc = "";
        var beaufort = "";

        if (pick === "i") {
            s = s * 0.44704; //convert mph to m/sec
        } else {
            //do nothing, the table uses m/sec

        }
        if (s < 1.9) {  // convert to Beaufort
            windDesc = " light air";
            beaufort = "1Bft";
        } else if (s >= 1.9 && s < 3.4) {
            windDesc = " light breeze";
            beaufort = "2Bft";
        } else if (s >= 3.4 && s < 5.5) {
            windDesc = " gentle breeze";
            beaufort = "3Bft";
        } else if (s >= 5.5 && s < 8.0) {
            windDesc = " breeze";
            beaufort = "4Bft";
        } else if (s >= 8.0 & s < 11.1) {
            windDesc = " fresh breeze";
            beaufort = "5Bft";
        } else if (s >= 11.1 && s < 14.2) {
            windDesc = " strong breeze";
            beaufort = "6Bft";
        } else if (s >= 14.2 && s < 17.3) {
            windDesc = " near gale";
            beaufort = "7Bft";
        } else if (s >= 17.3 && s < 20.9) {
            windDesc = " gale";
            beaufort = "8Bft";
        } else if (s >= 20.9 && s < 24.5) {
            windDesc = " strong gale";
            beaufort = "9Bft";
        } else if (s >= 24.5 && s < 28.6) {
            windDesc = " stormt";
            beaufort = "10Bft";
        } else if (s >= 28.6 && s < 32.7) {
            windDesc = " violent stormt";
            beaufort = "11Bft";
        } else if (s >= 32.7) {
            windDesc = " hurricane";
            beaufort = "12Bft";
        } else {
            windDesc = ""; // in case of no input
        }
        $('#windDescription').html(windDesc);
        $('#beaufort').html(beaufort);
    }

    function getWindDirection(val) { // determine which way the wind blows from
        var windDir = "";
        var d = val;
        var windIcon = "";
        var txt = "from ";
        if (d >= 384.75 || d < 11.25) {
            windDir = "N";
            windIcon = "https://s23.postimg.cc/b6jqx1qrr/image.png";
        } else if (d >= 11.25 && d < 33.75) {
            windDir = "NNE";
            windIcon = "https://s23.postimg.cc/h525l0z47/SSW.png";
        } else if (d >= 33.75 && d < 56.25) {
            windDir = "NE";
            windIcon = "https://s23.postimg.cc/q3wtbstdz/image.png";
        } else if (d >= 56.25 && d < 78.75) {
            windDir = "ENE";
            windIcon = "https://s23.postimg.cc/c8yitbyyv/WSW.png";
        } else if (d >= 78.75 && d < 101.25) {
            windDir = "E";
            windIcon = "https://s23.postimg.cc/zcyzlx29z/image.png";
        } else if (d >= 101.25 && d < 123.75) {
            windDir = "ESE";
            windIcon = "https://s23.postimg.cc/y6uzn4dzb/WNW.png";
        } else if (d >= 123.75 && d < 146.25) {
            windDir = "SE";
            windIcon = "https://s23.postimg.cc/5yynsla6f/image.png";
        } else if (d >= 146.25 && d < 168.75) {
            windDir = "SSE";
            windIcon = "https://s23.postimg.cc/61n4t637r/NNW.png";
        } else if (d >= 168.75 && d < 191.25) {
            windDir = "S";
            windIcon = "https://s23.postimg.cc/b6jqx1qrr/image.png";
        } else if (d >= 191.25 && d < 213.75) {
            windDir = "SSW";
            windIcon = "https://s23.postimg.cc/6w531glon/NNE.png";
        } else if (d >= 213.75 && d < 236.25) {
            windDir = "SW";
            windIcon = "https://s23.postimg.cc/7phou2rpj/image.png";
        } else if (d >= 236.25 && d < 258.75) {
            windDir = "WSW";
            windIcon = "https://s23.postimg.cc/gvzzhcwxz/ENE.png";
        } else if (d >= 258.75 && d < 281.25) {
            windDir = "W";
            windIcon = "https://s23.postimg.cc/p95oc0w5j/image.png";
        } else if (d >= 281.25 && d < 303.75) {
            windDir = "WNW";
            windIcon = "https://s23.postimg.cc/mt3uy6e2v/ESE.png";
        } else if (d >= 303.75 && d < 326.25) {
            windDir = "NW";
            windIcon = "https://s23.postimg.cc/foqn2vw7b/image.png";
        } else if (d >= 326.25 && d < 348.75) {
            windDir = "NNW";
            windIcon = "https://s23.postimg.cc/jwlfbmxmv/SSE.png";
        } else {
            windDir = "";
            txt = "";
            windIcon = "https://s29.postimg.cc/m8odbyr1v/no_Wind_01.png";
        }
        $('#whereFrom').html(txt + windDir);
        $('#windIcon').prop("src", windIcon);
    }

    function myDate() {
        var d = new Date();
        var date = d.toLocaleDateString();
        $('#date').html(date);

    }

    myDate();

    function myTime() {
        var t = new Date();
        var time = t.toLocaleTimeString();
        $('#time').html(time);
    }

    myTime();

    function adaptiveBackground() { //adapt the pictures to the weather and city
        //perhaps later
    }

    function icons() { //pick the icons from the owm library
        //perhaps later
    }

    function toFahrenheit() {

        currentWeather(lat, lon, "imperial", "&deg;F", "mph", "i");

    }

    function toCelsius() {

        currentWeather(lat, lon, "metric", " &deg;C", "m/s", "m");
    }

});
