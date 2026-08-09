(() => {
  document.documentElement.classList.add("js");

  document.querySelectorAll("[data-tabs]").forEach((tabs, tabsIndex) => {
    const buttons = [...tabs.querySelectorAll("[data-tab]")];
    const panels = [...tabs.querySelectorAll("[data-tab-panel]")];
    if (!buttons.length || !panels.length) return;

    const activate = (name, moveFocus = false) => {
      buttons.forEach((button) => {
        const active = button.dataset.tab === name;
        button.setAttribute("aria-selected", String(active));
        button.tabIndex = active ? 0 : -1;
        if (active && moveFocus) button.focus();
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.tabPanel !== name;
      });
    };

    buttons.forEach((button, buttonIndex) => {
      const name = button.dataset.tab;
      const panel = panels.find((item) => item.dataset.tabPanel === name);
      if (!panel) return;

      button.id ||= `tabs-${tabsIndex}-tab-${buttonIndex}`;
      panel.id ||= `tabs-${tabsIndex}-panel-${buttonIndex}`;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-controls", panel.id);
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", button.id);

      button.addEventListener("click", () => activate(name));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (buttonIndex + direction + buttons.length) % buttons.length;
        activate(buttons[next].dataset.tab, true);
      });
    });

    tabs.querySelector("[role=tablist]")?.setAttribute("aria-label", tabs.dataset.tabsLabel || "Options");
    activate(buttons.find((button) => button.getAttribute("aria-selected") === "true")?.dataset.tab || buttons[0].dataset.tab);
  });

  const postImages = [...document.querySelectorAll(".post-content img")]
    .filter((image) => !image.closest("a") && !image.classList.contains("no-zoom"));

  if (postImages.length && typeof HTMLDialogElement !== "undefined") {
    const dialog = document.createElement("dialog");
    dialog.className = "image-lightbox";
    dialog.innerHTML = '<button type="button" aria-label="Close image">×</button><img alt=""><p></p>';
    document.body.append(dialog);

    const dialogImage = dialog.querySelector("img");
    const caption = dialog.querySelector("p");
    const closeButton = dialog.querySelector("button");

    postImages.forEach((image) => {
      image.classList.add("zoomable-image");
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", `${image.alt || "Post image"} — open full size`);

      const openImage = () => {
        dialogImage.src = image.currentSrc || image.src;
        dialogImage.alt = image.alt;
        caption.textContent = image.closest("figure")?.querySelector("figcaption")?.textContent || image.alt;
        caption.hidden = !caption.textContent;
        dialog.showModal();
        document.body.classList.add("lightbox-open");
      };

      image.addEventListener("click", openImage);
      image.addEventListener("keydown", (event) => {
        if (["Enter", " "].includes(event.key)) {
          event.preventDefault();
          openImage();
        }
      });
    });

    const close = () => dialog.close();
    closeButton.addEventListener("click", close);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) close();
    });
    dialog.addEventListener("close", () => document.body.classList.remove("lightbox-open"));
  }

  const revealItems = [...document.querySelectorAll(".post-card, .archive-item")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -35px", threshold: 0.08 });

    revealItems.forEach((item, index) => {
      item.classList.add("reveal-ready");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 180)}ms`);
      observer.observe(item);
    });
  }
})();
