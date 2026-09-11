async function fetchEvents() {
  const response = await fetch("./events.json");

  if (!response.ok) {
    throw new Error(`Failed to load events: ${response.status}`);
  }

  return response.json();
}

function renderEvents(events) {
  const list = document.getElementById("repo-list");
  const status = document.getElementById("status");

  if (!list || !status) {
    return;
  }

  list.innerHTML = "";

  events.forEach((event) => {
    const item = document.createElement("li");
    item.className = "repo-item";

    const link = document.createElement("a");
    link.href = event.url;
    link.textContent = event.repo;
    link.target = "_blank";
    link.rel = "noreferrer noopener";

    const description = document.createElement("p");
    description.textContent = event.description;

    const meta = document.createElement("span");
    meta.className = "repo-meta";
    meta.textContent = `${event.language} | Starred on ${event.starred_at}`;

    item.appendChild(link);
    item.appendChild(description);
    item.appendChild(meta);
    list.appendChild(item);
  });

  status.textContent = `Showing ${events.length} starred repositories.`;
}

async function init() {
  const status = document.getElementById("status");

  try {
    const events = await fetchEvents();
    renderEvents(events);
  } catch (error) {
    if (status) {
      status.textContent = "Could not load starred repositories.";
      status.classList.add("error");
    }
  }
}

init();
