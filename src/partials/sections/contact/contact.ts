function sendEmail(event: Event) {
  event.preventDefault();
  // fetch("https://postmail.invotes.com/send", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     access_token: "xa1j4squk3a1v4e1k6vy36ln",
  //     subject: "Subject",
  //     text: "Messages",
  //   }),
  // }).then((r) => console.log(r));

  return false;
}

document.getElementById("contact-form").onsubmit = sendEmail;
