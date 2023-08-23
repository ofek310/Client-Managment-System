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
    document.getElementById("callTheGetAllFunction").classList.add("no-hover");
    clearAll();
    fetch("https://localhost:7077/GetAllExsitsClients")
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
        disabledFalseButtonGetAll();
      })
      .catch((error) => {
        document.getElementById("responseErrorMessage").innerHTML =
          error.message;
        disabledFalseButtonGetAll();
      });
  });
function disabledFalseButtonGetAll() {
  document.getElementById("callTheGetAllFunction").disabled = false;
  document.getElementById("callTheGetAllFunction").classList.remove("no-hover");
}
