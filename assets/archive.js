(() => {
  const archive = document.querySelector(".archive");
  if (!archive) return;

  const buttons = [...archive.querySelectorAll("[data-tag-filter]")];
  const posts = [...archive.querySelectorAll("[data-post-tags]")];
  const years = [...archive.querySelectorAll(".archive-year")];
  const status = archive.querySelector(".archive-filter-status");

  if (!buttons.length) return;

  const applyFilter = (requestedTag) => {
    const validTags = buttons.map((button) => button.dataset.tagFilter);
    const tag = validTags.includes(requestedTag) ? requestedTag : "all";
    let visibleCount = 0;

    posts.forEach((post) => {
      const tags = post.dataset.postTags.split(" ").filter(Boolean);
      const visible = tag === "all" || tags.includes(tag);
      post.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    years.forEach((year) => {
      let sibling = year.nextElementSibling;
      let hasVisiblePost = false;

      while (sibling && !sibling.classList.contains("archive-year")) {
        if (sibling.matches("[data-post-tags]") && !sibling.hidden) hasVisiblePost = true;
        sibling = sibling.nextElementSibling;
      }

      year.hidden = !hasVisiblePost;
    });

    buttons.forEach((button) => {
      const active = button.dataset.tagFilter === tag;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const activeButton = buttons.find((button) => button.dataset.tagFilter === tag);
    status.textContent = tag === "all"
      ? `${visibleCount} ${visibleCount === 1 ? "post" : "posts"}`
      : `${visibleCount} ${visibleCount === 1 ? "post" : "posts"} tagged “${activeButton.childNodes[0].textContent.trim()}”`;

    const url = new URL(window.location);
    if (tag === "all") url.searchParams.delete("tag");
    else url.searchParams.set("tag", tag);
    history.replaceState(null, "", url);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.tagFilter));
  });

  applyFilter(new URLSearchParams(window.location.search).get("tag") || "all");
})();
