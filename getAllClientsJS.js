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
var arrayResult = [];

document
  .getElementById("callTheGetAllFunction")
  .addEventListener("click", function () {
    //reset all
    document.getElementById("pagination_text").innerHTML = "";
    document.getElementById("pagination_control_buttons").innerHTML = "";
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
        reset(result);
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
