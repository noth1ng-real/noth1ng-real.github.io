(() => {
  const article = document.querySelector(".post");
  const content = document.querySelector(".post-content");

  if (!article || !content) return;

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const headings = [...content.querySelectorAll("h2, h3")];
  const usedIds = new Set();
  const headingTitles = new Map();

  headings.forEach((heading, index) => {
    const title = heading.textContent.trim();
    headingTitles.set(heading, title);
    let baseId = heading.id || slugify(title) || `section-${index + 1}`;
    let id = baseId;
    let suffix = 2;

    while (usedIds.has(id)) {
      id = `${baseId}-${suffix}`;
      suffix += 1;
    }

    heading.id = id;
    usedIds.add(id);

    const anchor = document.createElement("a");
    anchor.className = "heading-anchor";
    anchor.href = `#${id}`;
    anchor.setAttribute("aria-label", `Link to ${title}`);
    anchor.textContent = "#";
    heading.append(anchor);
  });

  if (headings.length) {
    const desktopToc = document.querySelector("[data-toc]");
    const mobileToc = document.querySelector("[data-toc-mobile]");

    const makeLink = (heading) => {
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = headingTitles.get(heading);
      link.dataset.heading = heading.id;
      if (heading.tagName === "H3") link.classList.add("toc-subitem");
      return link;
    };

    headings.forEach((heading) => {
      desktopToc.append(makeLink(heading));
      mobileToc.append(makeLink(heading));
    });

    document.querySelector(".post-toc").hidden = false;
    document.querySelector(".post-toc-mobile").hidden = false;

    const tocLinks = [...document.querySelectorAll(".toc-nav a")];
    const updateActiveHeading = () => {
      let active = headings[0].id;

      headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= 150) active = heading.id;
      });

      tocLinks.forEach((link) => {
        const isActive = link.dataset.heading === active;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    document.addEventListener("scroll", updateActiveHeading, { passive: true });
    updateActiveHeading();
  } else {
    document.querySelector(".post-layout").classList.add("post-layout-no-toc");
  }

  content.querySelectorAll("pre").forEach((pre) => {
    let host = pre.closest(".highlighter-rouge");

    if (!host) {
      host = document.createElement("div");
      pre.before(host);
      host.append(pre);
    }

    if (!host || host.querySelector(":scope > .copy-code-button")) return;

    host.classList.add("code-copy-host");
    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code to clipboard");

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent);
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = "Copy";
        }, 1600);
      } catch (_error) {
        button.textContent = "Unable to copy";
      }
    });

    host.append(button);
  });

  const progress = document.querySelector(".reading-progress-bar");
  const updateProgress = () => {
    const start = article.offsetTop;
    const distance = article.offsetHeight - window.innerHeight;
    const amount = distance > 0 ? (window.scrollY - start) / distance : 1;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, amount))})`;
  };

  document.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
})();
