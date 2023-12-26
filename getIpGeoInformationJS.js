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
    //reset all
    document.getElementById("pagination_text").innerHTML = "";
    document.getElementById("pagination_control_buttons").innerHTML = "";
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
        reset(result);
        document.getElementById("loadingIndicator").style.display = "none";
        disabledFalseButtonGeo();
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

//will override the additionalImplementation in pagenation.js
function additionalImplementation() {
  googleMapsButton.style.display = "none";
  var tr = document.querySelectorAll("tr");
  tr[0].innerHTML = "<th>openMap</th>" + tr[0].innerHTML;
  for (i = 1; i < tr.length; i++) {
    //over all the tr in the table and add the check box button to every tr
    tr[i].innerHTML =
      `<td><input type="checkbox" class="checkBoxButton" id="checkBoxButton${i}"></td>` +
      tr[i].innerHTML;
    document
      .getElementById("checkBoxButton" + i)
      .addEventListener("change", function () {
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
  }
}
function disabledFalseButtonGeo() {
  document.getElementById("callIpGeoInformationFunction").disabled = false;
  document
    .getElementById("callIpGeoInformationFunction")
    .classList.remove("no-hover");
}
