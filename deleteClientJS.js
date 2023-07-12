function checkIfTheIDInputOk(IDText) {
  if (IDText.length === 0) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The ID input is empty, pay attention";
    return false;
  } else if (isNaN(parseInt(IDText)) || !isFinite(IDText)) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The id is not a number, pay attention";
    return false;
  }
  return true;
}
document
  .getElementById("callTheDeleteClientFunction")
  .addEventListener("click", function () {
    document.getElementById("callTheDeleteClientFunction").disabled = true;
    var IDText = document.getElementById("clientID").value;
    var client = {
      ID: parseInt(IDText),
    };
    if (checkIfTheIDInputOk(IDText)) {
      fetch("https://localhost:7077/DeleteClient", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      })
        .then((response) => {
          if (response.ok) {
            document.getElementById("responseErrorMessage").innerHTML =
              "Client was deleted successfully";
            document.getElementById(
              "callTheDeleteClientFunction"
            ).disabled = false;
          } else {
            return response.json().then((error) => {
              throw new Error(error.error);
            });
          }
        })
        .then((data) => {})
        .catch((error) => {
          document.getElementById(
            "callTheDeleteClientFunction"
          ).disabled = false;
          document.getElementById("responseErrorMessage").innerHTML = error;
        });
    } else {
      document.getElementById("callTheDeleteClientFunction").disabled = false;
    }
  });
