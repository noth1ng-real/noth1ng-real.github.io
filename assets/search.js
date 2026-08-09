(() => {
  const search = document.querySelector("[data-global-search]");
  if (!search) return;

  const input = search.querySelector("input");
  const panel = search.querySelector(".global-search-panel");
  const status = search.querySelector(".global-search-status");
  const results = search.querySelector(".global-search-results");
  const navTrigger = document.querySelector("#nav-trigger");
  let posts = [];

  const close = () => {
    panel.hidden = true;
    input.setAttribute("aria-expanded", "false");
  };

  const open = () => {
    panel.hidden = false;
    input.setAttribute("aria-expanded", "true");
  };

  const makeResult = (post) => {
    const link = document.createElement("a");
    link.className = "global-search-result";
    link.href = post.url;

    const title = document.createElement("span");
    title.className = "global-search-result-title";
    title.textContent = post.title;

    const meta = document.createElement("span");
    meta.className = "global-search-result-meta";
    meta.textContent = [post.date, ...(post.tags || []).slice(0, 2)].join(" · ");

    link.append(title, meta);
    return link;
  };

  const runSearch = () => {
    const query = input.value.trim().toLowerCase();
    results.replaceChildren();

    if (!query) {
      close();
      return;
    }

    const terms = query.split(/\s+/);
    const matches = posts.filter((post) => {
      const haystack = [post.title, post.description, post.content, ...(post.tags || [])]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });

    status.textContent = matches.length
      ? `${matches.length} ${matches.length === 1 ? "result" : "results"}`
      : "No matching posts";
    matches.slice(0, 6).forEach((post) => results.append(makeResult(post)));
    open();
  };

  fetch(search.dataset.indexUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Search index unavailable");
      return response.json();
    })
    .then((data) => {
      posts = data;
    })
    .catch(() => {
      input.placeholder = "Search unavailable";
      input.disabled = true;
    });

  input.addEventListener("input", runSearch);
  input.addEventListener("focus", () => {
    if (input.value.trim()) runSearch();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      input.value = "";
      close();
      input.blur();
    }

    if (event.key === "Enter") {
      const firstResult = results.querySelector("a");
      if (firstResult) window.location.href = firstResult.href;
    }
  });

  document.addEventListener("click", (event) => {
    if (!search.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
    if (event.key === "/" && !typing) {
      event.preventDefault();
      if (navTrigger && window.matchMedia("(max-width: 600px)").matches) navTrigger.checked = true;
      input.focus();
    }
  });
})();
