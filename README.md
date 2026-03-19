
# Doc Site Using Jekyll

Welcome to the third project in my **Docs‑as‑Code Portfolio Series**, where I’m building and publishing documentation sites using four different static site generators: **MkDocs**, **Hugo**, **Docusaurus**, and **Jekyll**.

This site represents my work with **Jekyll** and demonstrates how I approach modern documentation workflows—from information architecture and content strategy to build automation and publishing.

---

## 🎯 Purpose of This Project

As a Sr. Technical Writer, I use git‑based workflows and developer‑centric tooling.  
This portfolio series is my opportunity to:

- Strengthen and demonstrate my docs‑as‑code skills  
- Explore and compare popular SSGs used in engineering teams  
- Showcase real examples of my technical writing  
- Build documentation sites end‑to‑end using best practices  
- Create a curated, public‑facing writing and tooling portfolio  

> **Tip:**  
> This page serves as the documentation homepage in this Jekyll version of the project. 

---

## ⚙️ What I Built Using **Jekyll**


### 🔧 Workflow & Architecture
- Information architecture using **Jekyll collections** + custom sidebar  
- Markdown authoring and **Git‑based reviews**  
- **Accessibility‑minded** content (alt text, semantic headings)

### 🚀 Build & Delivery
- **GitHub Actions** pipeline (Ruby 3.1 via `ruby/setup-ruby`) with lockfile/platform normalization for Linux runners  
- Pages‑safe asset/link handling using Jekyll URL filters to respect the `/<repo>` base path  
- Local preview with `bundle exec jekyll serve` and production builds in CI

> **Build & Hosting Notes**  
> - This is a **GitHub Pages *project* site**, so assets/links are generated with `relative_url` to work under `/<repo>`. [1](https://www.fatlemon.co.uk/2023/12/custom-gems-with-github-pages/)  
> - **GitHub Actions** is the recommended approach for Pages; it avoids local Windows/Jekyll issues and gives full control over Ruby/plugins. [2](https://stackoverflow.com/questions/79351017/im-getting-a-github-pages-build-error-that-i-dont-understand)

### 📚 Organized Documentation Examples

- [User Guides](docs/user-guides)
- [API Guides](docs/api-guides)
- [How‑To Articles](docs/how-to-articles)
- [Technical Reference Guides](docs/technical-reference-guides)

---

## 🧱 Tech Stack
- **Jekyll** for static generation (Markdown + Liquid templating) [2](https://stackoverflow.com/questions/79351017/im-getting-a-github-pages-build-error-that-i-dont-understand)  
- **GitHub Actions** to build/deploy (recommended path for GitHub Pages) [2](https://stackoverflow.com/questions/79351017/im-getting-a-github-pages-build-error-that-i-dont-understand)  
- **GitHub Pages** project‑site hosting; URLs generated with `relative_url` for subpath safety [1](https://www.fatlemon.co.uk/2023/12/custom-gems-with-github-pages/)

**Source & CI:**  
[Repository](https://github.com/LizMarlowe-byte/docs-as-code-portfolio-jekyll) · [Actions](https://github.com/LizMarlowe-byte/docs-as-code-portfolio-jekyll/actions)
