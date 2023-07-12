function clearAll() {
  //Clear the table
  tableHeadGetAllClient.innerHTML = "<tr></tr>";
  tableBodyGetAliiClient.innerHTML = "";
  //Clear the error message
  document.getElementById("responseErrorMessage").innerHTML = "";
}

const tableGetAllClient = document.querySelector("table");
const tableHeadGetAllClient = tableGetAllClient.querySelector("thead");
const tableBodyGetAliiClient = tableGetAllClient.querySelector("tbody");

document
  .getElementById("callTheGetAllFunction")
  .addEventListener("click", function () {
    document.getElementById("callTheGetAllFunction").disabled = true;
    clearAll();
    fetch("https://localhost:7077/GetAllExsitsClients")
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
        tableHeadGetAllClient.innerHTML = `<tr>
                                  <th>Name</th>
                                  <th>ID</th>
                                  <th>IP</th>
                                  <th>Phone</th>
                              </tr>`;

        let out = "";
        for (const r of result) {
          out += `
                <tr>
                    <td>${r.Name}</td>
                    <td>${r.ID}</td>
                    <td>${r.IP}
                    <td>${r.Phone}</td>
                </tr>`;
        }
        tableBodyGetAliiClient.innerHTML = out;
        document.getElementById("callTheGetAllFunction").disabled = false;
      })
      .catch((error) => {
        document.getElementById("responseErrorMessage").innerHTML = error;
        document.getElementById("callTheGetAllFunction").disabled = false;
      });
  });
