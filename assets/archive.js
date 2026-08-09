(() => {
  const archive = document.querySelector(".archive");
  if (!archive) return;

  const buttons = [...archive.querySelectorAll("[data-tag-filter]")];
  const posts = [...archive.querySelectorAll("[data-post-tags]")];
  const yearGroups = [...archive.querySelectorAll(".archive-year-group")];
  const status = archive.querySelector(".archive-filter-status");

  if (!buttons.length) return;

  const setVisible = (element, visible) => {
    element.hidden = !visible;
    element.classList.toggle("is-filtered-out", !visible);
    element.style.display = visible ? "" : "none";
  };

  const applyFilter = (requestedTag) => {
    const validTags = buttons.map((button) => button.dataset.tagFilter);
    const tag = validTags.includes(requestedTag) ? requestedTag : "all";
    let visibleCount = 0;

    posts.forEach((post) => {
      const tags = post.dataset.postTags.split("|").filter(Boolean);
      const visible = tag === "all" || tags.includes(tag);
      setVisible(post, visible);
      if (visible) visibleCount += 1;
    });

    yearGroups.forEach((group) => {
      const hasVisiblePost = [...group.querySelectorAll("[data-post-tags]")]
        .some((post) => !post.hidden);
      setVisible(group, hasVisiblePost);
    });

    buttons.forEach((button) => {
      const active = button.dataset.tagFilter === tag;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    const activeButton = buttons.find((button) => button.dataset.tagFilter === tag);
    status.textContent = tag === "all"
      ? `${visibleCount} ${visibleCount === 1 ? "post" : "posts"}`
      : `${visibleCount} ${visibleCount === 1 ? "post" : "posts"} tagged “${activeButton.dataset.tagLabel}”`;

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
