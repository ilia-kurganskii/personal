function sendEmail(event: Event) {
  event.preventDefault();

  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      //js_onSuccess();
    } else if (request.readyState == 4) {
      //js_onError(request.response);
    }
  };
  let dataJS: any = {
    access_token: "xa1j4squk3a1v4e1k6vy36ln",
  };
  dataJS["subject"] = "Subject";
  dataJS["text"] = "Messages";
  const params = toParams(dataJS);

  request.open("POST", "https://postmail.invotes.com/send", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.send(params);

  return false;
}

function toParams(dataJS: Object) {
  var form_data = [];
  for (let key in dataJS) {
    // @ts-ignore
    form_data.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(dataJS[key])
    );
  }

  return form_data.join("&");
}

document.getElementById("contact-form").onsubmit = sendEmail;
