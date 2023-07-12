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

document
  .getElementById("callIpGeoInformationFunction")
  .addEventListener("click", function () {
    document.getElementById("callIpGeoInformationFunction").disabled = true;
    clearAll();
    document.getElementById("loadingIndicator").style.display = "block";
    fetch("https://localhost:7077/GetGeoInformationOnClientsIP")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .then((result) => {
        tableHead.innerHTML = `<tr>
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
        document.getElementById(
          "callIpGeoInformationFunction"
        ).disabled = false;
      })
      .catch((error) => {
        document.getElementById("responseErrorMessage").innerHTML = error;
        document.getElementById("loadingIndicator").style.display = "none";
        document.getElementById(
          "callIpGeoInformationFunction"
        ).disabled = false;
      });
  });
