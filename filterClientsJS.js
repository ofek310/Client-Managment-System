function checkIfTheInputOk(NameText, IDText, IPText, PhoneText) {
  document.getElementById("responseErrorMessage").innerHTML = "";
  var validationNameRegex = /^[A-Za-z\s]+$/;
  var vaildationIPRegex = /^[\d.]*$/;
  var validationPhoneRegex = /^[\d+\-""]*$/;
  if ((isNaN(parseInt(IDText)) || !isFinite(IDText)) && IDText.length > 0) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The id filter is not a number, pay attention";
    return false;
  } else if (!validationNameRegex.test(NameText) && NameText.length > 0) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The name filter can contain letters or space, pay attention";
    return false;
  } else if (!vaildationIPRegex.test(IPText) && IPText.length > 0) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The ip filter can contain numbers or points, pay attention";
    return false;
  } else if (!validationPhoneRegex.test(PhoneText) && PhoneText.length > 0) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The phone filter can contain numbers or + or - or '', pay attention";
    return false;
  }
  return true;
}
function clearAll() {
  //Clear the table
  tableHeadFilterClient.innerHTML = "<tr></tr>";
  tableBodyFilterClient.innerHTML = "";
  //Clear the error message
  document.getElementById("responseErrorMessage").innerHTML = "";
}
const tableFilterClient = document.querySelector("table");
const tableHeadFilterClient = tableFilterClient.querySelector("thead");
const tableBodyFilterClient = tableFilterClient.querySelector("tbody");
document
  .getElementById("callTheFilterClientFunction")
  .addEventListener("click", function () {
    document.getElementById("callTheFilterClientFunction").disabled = true;
    clearAll();
    var NameText = document.getElementById("filterName").value;
    var IDText = document.getElementById("filterID").value;
    var IPText = document.getElementById("filterIP").value;
    var PhoneText = document.getElementById("filterPhone").value;
    if (checkIfTheInputOk(NameText, IDText, IPText, PhoneText)) {
      if (IDText.length === 0) {
        IDText = -1;
      }
      var client = {
        Name: NameText,
        ID: parseInt(IDText),
        IP: IPText,
        Phone: PhoneText,
      };
      fetch("https://localhost:7077/FilterClients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      })
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
          tableHeadFilterClient.innerHTML = `<tr>
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
          tableBodyFilterClient.innerHTML = out;
          document.getElementById(
            "callTheFilterClientFunction"
          ).disabled = false;
        })
        .catch((error) => {
          document.getElementById("responseErrorMessage").innerHTML = error;
          document.getElementById(
            "callTheFilterClientFunction"
          ).disabled = false;
        });
    } else {
      document.getElementById("callTheFilterClientFunction").disabled = false;
    }
  });
