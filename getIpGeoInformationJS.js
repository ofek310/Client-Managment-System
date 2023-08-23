function clearAll() {
  //Clear the table
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";
  //Clear the error message
  document.getElementById("responseErrorMessage").innerHTML = "";
}

const t = document.querySelector("table");
const tableHead = t.querySelector("thead");
const tableBody = t.querySelector("tbody");
//button that open the google maps
var googleMapsButton = document.getElementById("googleMap");

document
  .getElementById("callIpGeoInformationFunction")
  .addEventListener("click", function () {
    document.getElementById("callIpGeoInformationFunction").disabled = true;
    document
      .getElementById("callIpGeoInformationFunction")
      .classList.add("no-hover");
    clearAll();
    document.getElementById("loadingIndicator").style.display = "block";
    fetch("https://localhost:7077/GetGeoInformationOnClientsIP")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.title);
          });
        }
      })
      .then((result) => {
        tableHead.innerHTML = `<tr>
                                    <th></th>
                                    <th>Id Client</th>
                                    <th>Ip</th>
                                    <th>Country</th>
                                    <th>Region</th>
                                    <th>RegionName</th>
                                    <th>City</th>
                                    <th>Lat</th>
                                    <th>Lon</th>
                                </tr>`;

        let out = "";
        for (const r of result) {
          out += `
                  <tr>
                      <td><input type="checkbox" class="checkBoxButton"></td>
                      <td>${r.clientId}</td>
                      <td>${r.query}</td>
                      <td>${r.country}</td>
                      <td>${r.region}
                      <td>${r.regionName}</td>
                      <td>${r.city}</td>
                      <td>${r.lat}</td>
                      <td>${r.lon}</td>
                  </tr>`;
        }
        tableBody.innerHTML = out;
        document.getElementById("loadingIndicator").style.display = "none";
        disabledFalseButtonGeo();
        //get all the checkboxes
        var checkboxes = document.querySelectorAll(".checkBoxButton");
        //add event Listener to all the checkboxes
        checkboxes.forEach(function (checkbox) {
          checkbox.addEventListener("change", function () {
            var checkedCheckBoxes = document.querySelectorAll(
              ".checkBoxButton:checked"
            );
            var count = checkedCheckBoxes.length;

            if (count == 1) {
              googleMapsButton.style.display = "block";
            } else {
              googleMapsButton.style.display = "none";
            }
          });
        });
      })
      .catch((error) => {
        document.getElementById("responseErrorMessage").innerHTML =
          error.message;
        document.getElementById("loadingIndicator").style.display = "none";
        disabledFalseButtonGeo();
      });
  });
document.getElementById("googleMap").addEventListener("click", function () {
  var checkedCheckBoxes = document.querySelectorAll(".checkBoxButton:checked");
  //i knew for sure that if the user press this button
  //one check box is checked becuse the googleMapButton is
  //showed just when one check box are press.
  checkedCheckBoxes.forEach(function (checkbox) {
    var cells = checkbox.parentNode.parentNode.cells;
    var latitude = cells[7].textContent;
    var longitude = cells[8].textContent;
    var ip = cells[2].textContent;
    var mapsUrl =
      "https://www.google.com/maps/search/?api=1&q=" +
      encodeURIComponent(ip) +
      "&query=" +
      latitude +
      "," +
      longitude;

    window.open(mapsUrl);
  });
});

function disabledFalseButtonGeo() {
  document.getElementById("callIpGeoInformationFunction").disabled = false;
  document
    .getElementById("callIpGeoInformationFunction")
    .classList.remove("no-hover");
}
