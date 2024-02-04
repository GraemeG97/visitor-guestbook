const form = document.getElementById("theForm");
const messageContainer = document.getElementById("message-container");

const baseURL = "http://localhost:4444";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const guestData = Object.fromEntries(formData);

  const response = await fetch(`${baseURL}/messages`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(guestData),
  });
  if (response.ok) {
    displayGuests();
  } else {
    console.error("Failed to add guest", response.status);
  }
});

async function fetchGuests() {
  const guests = await fetch(`${baseURL}/messages`);
  let result = await guests.json();
  return result;
}

async function displayGuests() {
  let guests = await fetchGuests();

  messageContainer.innerHTML = "";
  guests.forEach((guest) => {
    let h3Tag = document.createElement("h3");
    let pTag = document.createElement("p");
    let guestmessage = document.createElement("p");
    let delButton = document.createElement("p");
    let infoDiv = document.createElement("div");
    let guestCard = document.createElement("div");

    h3Tag.textContent = guest.guestName;
    h3Tag.setAttribute(`class`, `guestName`);
    pTag.textContent = guest.roomNumb;
    guestmessage.textContent = guest.content;
    delButton.textContent = "X";

    updateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(updateForm);
      const info = Object.fromEntries(formData);
      console.log(info);
      handleUpdate(guest.id, info);
    });

    infoDiv.appendChild(h3Tag);
    infoDiv.appendChild(pTag);
    guestCard.appendChild(delButton);
    guestCard.appendChild(infoDiv);
    guestCard.appendChild(roomNumb);
    guestCard.appendChild(content);

    messageContainer.appendChild(guestCard);
  });

  displayGuests();
}
