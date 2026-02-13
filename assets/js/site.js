console.log("site.js is running!");

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------
  // Collapsible sidebar sections (unchanged)
  // --------------------------------------------
  document.querySelectorAll(".collapsible").forEach(section => {
    section.setAttribute(
      "aria-expanded",
      section.classList.contains("open") ? "true" : "false"
    );
    section.addEventListener("click", () => {
      const open = section.classList.toggle("open");
      const list = section.nextElementSibling;
      if (list) list.classList.toggle("expanded");
      section.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // --------------------------------------------
  // Helper: robust content root selector
  // (works for <main class="content"> or <div class="content">)
  // --------------------------------------------
  const contentRoot =
    document.querySelector("main.content") ||
    document.querySelector(".content");

  // --------------------------------------------
  // Right-hand TOC: H2-only
  // Prefer curated ToC if present, but filter to H2 targets only.
  // Fallback to scanning H2s from the page content.
  // --------------------------------------------
  (function buildRightToc() {
    const tocList = document.getElementById("toc-list");
    if (!tocList || !contentRoot) return;

    // Look inside the article if present; else inside content root
    const scope =
      contentRoot.querySelector("article") || contentRoot;

    // Try curated ToC blocks first
    const curated = scope.querySelector(
      ".table-of-contents, nav[aria-label='Table of Contents'], #markdown-toc"
    );

    let items = [];

    if (curated) {
      const anchors = curated.querySelectorAll('a[href^="#"]');
      anchors.forEach(a => {
        const id = a.getAttribute("href").slice(1);
        if (!id) return;
        const target = scope.querySelector(`#${CSS.escape(id)}`);
        // ✅ keep only H2 targets
        if (target && target.tagName === "H2") {
          items.push({ id, text: a.textContent.trim() });
        }
      });
    }

    // Fallback: scan H2s if no curated H2 items found
    if (items.length === 0) {
      const h2s = [...scope.querySelectorAll("h2")];
      items = h2s.map(h => {
        if (!h.id) {
          h.id = h.textContent
            .trim()
            .toLowerCase()
            .replace(/[^\w\- ]+/g, "")
            .replace(/\s+/g, "-");
        }
        return { id: h.id, text: h.textContent.trim() };
      });
    }

    // Render list (H2-only)
    tocList.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${item.id}`;
      a.textContent = item.text; // keeps emojis/icons
      li.appendChild(a);
      tocList.appendChild(li);
    });

    // Scrollspy (H2-only)
    const targets = items
      .map(i => scope.querySelector(`#${CSS.escape(i.id)}`))
      .filter(Boolean);
    const links = tocList.querySelectorAll("a");

    const onScroll = () => {
      let currentId = null;
      targets.forEach(t => {
        const offset = t.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY + 120 >= offset) currentId = t.id;
      });
      links.forEach(l =>
        l.classList.toggle("active", l.getAttribute("href") === `#${currentId}`)
      );
    };

    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  // --------------------------------------------
  // Numbered steps continuity across split <ol>
  // - Continue across benign blocks (images, paragraphs, etc.)
  // - RESET when a heading (H1–H6), another list, or <hr> appears
  // - ALSO RESET when a standalone bold "Procedure"/"Steps" paragraph appears
  // - Ignore lists inside curated ToC blocks
  // --------------------------------------------
  (function fixStepNumbering() {
    if (!contentRoot) return;
    const scope =
      contentRoot.querySelector("article") || contentRoot;

    // Exclude lists inside curated ToC blocks
    const inCuratedToc = (el) =>
      el.closest(".table-of-contents, nav[aria-label='Table of Contents'], #markdown-toc") !== null;

    const ols = [...scope.querySelectorAll("ol")].filter(ol => !inCuratedToc(ol));

    let prevOl = null;
    let prevCount = 0;

    // Reset markers
    const isHeading = el => /^H[1-6]$/.test(el.tagName);
    const isBreaker = el => isHeading(el) || el.matches("ol, ul, hr");

    // <p><strong>Procedure</strong></p> or <p><strong>Steps</strong></p>
    const isProcedureMarker = el => {
      if (!el || el.tagName !== "P") return false;
      // accept either <strong> or <b>, single child
      if (el.childElementCount !== 1) return false;
      const only = el.firstElementChild;
      if (!only) return false;
      if (!/^(STRONG|B)$/.test(only.tagName)) return false;
      const text = (only.textContent || "").trim().toLowerCase();
      return /^(procedure|steps|procedure:|steps:)$/.test(text);
    };

    ols.forEach(ol => {
      const liCount = ol.querySelectorAll(":scope > li").length;
      let shouldContinue = false;

      if (prevOl) {
        let node = prevOl.nextElementSibling;
        shouldContinue = true;
        while (node && node !== ol) {
          if (isBreaker(node) || isProcedureMarker(node)) {
            shouldContinue = false;
            break;
          }
          node = node.nextElementSibling;
        }
      }

      if (shouldContinue && prevCount > 0) {
        ol.setAttribute("start", String(prevCount + 1));
      } else {
        ol.removeAttribute("start"); // default to 1
      }

      prevCount = shouldContinue ? prevCount + liCount : liCount;
      prevOl = ol;
    });
  })();
});