function checkIfTheInputOk(NameText, IDText, IPText, PhoneText) {
  var validateIpRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  var validatePhoneRegex = /^\+972-\d{9}$/;
  if (
    NameText.length === 0 ||
    IDText.length === 0 ||
    IPText.length === 0 ||
    PhoneText.length === 0
  ) {
    document.getElementById("responseErrorMessage").innerHTML =
      "one or more of the input is empty, pay attention";
    return false;
  } else if (isNaN(parseInt(IDText)) || !isFinite(IDText)) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The id is not a number, pay attention";
    return false;
  } else if (!/^\D*$/.test(NameText)) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The Name is contain numbers, pay attention";
    return false;
  } else if (!validateIpRegex.test(IPText)) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The IP is not in the correct pattern, pay attention";
    return false;
  } else if (!validatePhoneRegex.test(PhoneText)) {
    document.getElementById("responseErrorMessage").innerHTML =
      "The Phone is not in the correct pattern, pay attention";
    return false;
  }
  return true;
}
document
  .getElementById("callThePostClientFunction")
  .addEventListener("click", function () {
    var NameText = document.getElementById("clientName").value;
    var IDText = document.getElementById("clientID").value;
    var IPText = document.getElementById("clientIP").value;
    var PhoneText = document.getElementById("clientPhone").value;
    document.getElementById("callThePostClientFunction").disabled = true;
    document
      .getElementById("callThePostClientFunction")
      .classList.add("no-hover");
    if (checkIfTheInputOk(NameText, IDText, IPText, PhoneText)) {
      var client = {
        Name: NameText,
        ID: parseInt(IDText),
        IP: IPText,
        Phone: PhoneText,
      };
      fetch("https://localhost:7077/AddClient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      })
        .then((response) => {
          document.getElementById("responseErrorMessage").innerHTML =
            "Client was added successfully";
          disabledFalseButtonPost();
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(error.title);
            });
          }
        })
        .then((data) => {})
        .catch((error) => {
          document.getElementById("responseErrorMessage").innerHTML =
            error.message;
          disabledFalseButtonPost();
        });
    } else {
      disabledFalseButtonPost();
    }
  });
function disabledFalseButtonPost() {
  document.getElementById("callThePostClientFunction").disabled = false;
  document
    .getElementById("callThePostClientFunction")
    .classList.remove("no-hover");
}
