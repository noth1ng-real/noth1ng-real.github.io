(() => {
  const search = document.querySelector("[data-search]");
  if (!search) return;

  const input = search.querySelector("input");
  const status = search.querySelector(".search-status");
  const results = search.querySelector(".search-results");
  let posts = [];

  const makeResult = (post) => {
    const article = document.createElement("article");
    article.className = "search-result";

    const meta = document.createElement("div");
    meta.className = "post-card-meta";
    meta.textContent = post.date;

    const title = document.createElement("h2");
    const link = document.createElement("a");
    link.href = post.url;
    link.textContent = post.title;
    title.append(link);

    article.append(meta, title);

    if (post.description) {
      const description = document.createElement("p");
      description.textContent = post.description;
      article.append(description);
    }

    if (post.tags && post.tags.length) {
      const tags = document.createElement("div");
      tags.className = "post-tags";
      post.tags.forEach((tag) => {
        const item = document.createElement("span");
        item.textContent = tag;
        tags.append(item);
      });
      article.append(tags);
    }

    return article;
  };

  const runSearch = () => {
    const query = input.value.trim().toLowerCase();
    results.replaceChildren();

    if (!query) {
      status.textContent = "Start typing to search all posts.";
      history.replaceState(null, "", window.location.pathname);
      return;
    }

    const terms = query.split(/\s+/);
    const matches = posts.filter((post) => {
      const haystack = [post.title, post.description, post.content, ...(post.tags || [])]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });

    status.textContent = `${matches.length} ${matches.length === 1 ? "result" : "results"} for “${input.value.trim()}”`;
    matches.slice(0, 20).forEach((post) => results.append(makeResult(post)));
    history.replaceState(null, "", `?q=${encodeURIComponent(input.value.trim())}`);
  };

  fetch(search.dataset.indexUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Search index unavailable");
      return response.json();
    })
    .then((data) => {
      posts = data;
      const initialQuery = new URLSearchParams(window.location.search).get("q");
      if (initialQuery) {
        input.value = initialQuery;
        runSearch();
      }
    })
    .catch(() => {
      status.textContent = "Search is temporarily unavailable.";
      input.disabled = true;
    });

  input.addEventListener("input", runSearch);
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== input) {
      event.preventDefault();
      input.focus();
    }
  });
})();
