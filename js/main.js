"use strict";
(() => {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.documentElement.classList.add("js");
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
  }
  const entries = [
    { src: "assets/images/ink-paper-1536.jpg", title: "Gesto", alt: "Detalle ilustrativo de un gesto de tinta negra sobre papel de fibras visibles.", description: "Estudio de tinta sobre papel. Imagen generada con IA para esta propuesta; no es un tatuaje ni un trabajo del profesional." },
    { src: "assets/images/ink-water-1024.jpg", title: "Suspensión", alt: "Tinta negra dispersándose en agua y formando filamentos translúcidos.", description: "Estudio de tinta en agua. Imagen generada con IA para esta propuesta; no es un tatuaje ni un trabajo del profesional." },
    { src: "assets/images/study-contour.svg", title: "Continuidad", alt: "Dibujo original de líneas curvas que se entrelazan.", description: "Dibujo vectorial original creado para la dirección artística. No representa un diseño de tatuaje del profesional." },
    { src: "assets/images/study-interference.svg", title: "Interferencia", alt: "Composición original de arcos concéntricos y una marca de rojo tinta.", description: "Composición vectorial original creada para esta propuesta. No representa un trabajo del profesional." }
  ];
  const triggers = [...document.querySelectorAll("[data-artwork]")];
  const dialog = document.getElementById("artwork-dialog");
  const image = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");
  const description = document.getElementById("lightbox-description");
  const counter = document.getElementById("lightbox-counter");
  const status = document.getElementById("lightbox-status");
  let current = 0;
  let previousFocus = null;
  function show(index) {
    current = (index + entries.length) % entries.length;
    const entry = entries[current];
    image.src = entry.src;
    image.alt = entry.alt;
    title.textContent = entry.title;
    description.textContent = entry.description;
    counter.textContent = String(current + 1).padStart(2, "0") + " / 04";
    status.textContent = entry.title + ". Imagen " + (current + 1) + " de " + entries.length + ".";
  }
  triggers.forEach(trigger => trigger.addEventListener("click", () => {
    previousFocus = trigger;
    show(Number(trigger.dataset.artwork));
    dialog.showModal();
    document.documentElement.classList.add("has-modal");
  }));
  document.getElementById("lightbox-close").addEventListener("click", () => dialog.close());
  document.getElementById("lightbox-previous").addEventListener("click", () => show(current - 1));
  document.getElementById("lightbox-next").addEventListener("click", () => show(current + 1));
  dialog.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      const controls = [...dialog.querySelectorAll("button:not([disabled])")];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
  });
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("has-modal");
    if (previousFocus) previousFocus.focus({ preventScroll: true });
  });
  if ("IntersectionObserver" in window) {
    const links = [...document.querySelectorAll("nav a")];
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) links.forEach(link => {
          if (link.hash === "#" + entry.target.id) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-10% 0px -55% 0px" });
    document.querySelectorAll("#archivo,#mirada,#contacto").forEach(section => navObserver.observe(section));
  }
})();
