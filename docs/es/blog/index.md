---
layout: doc
aside: false
sidebar: false
---

# Inteligencia & Filosofía

<p class="blog-subtitle">Últimos ensayos, actualizaciones de protocolo y noticias del ecosistema de los creadores del Protocolo de Soberanía Biológica.</p>

<div class="premium-blog-grid">

  <!-- Featured Post -->
  <a href="/es/blog/the-problem-with-data-silos" class="blog-card featured">
    <div class="card-image">
      <img src="/blog-silos.png" alt="El Fallo Estructural de la Era Moderna de los Datos de Salud" />
    </div>
    <div class="card-content">
      <div class="card-meta">
        <span class="tag philosophy">Filosofía</span>
        <span class="date">5 de Marzo de 2026</span>
      </div>
      <h2>El Fallo Estructural de la Era Moderna de los Datos de Salud</h2>
      <p>Por qué el sistema de salud global está fundamentalmente roto, y por qué las políticas de privacidad no son suficientes para arreglarlo. Un análisis profundo de la arquitectura de los silos de datos.</p>
      <div class="read-more">Leer Ensayo →</div>
    </div>
  </a>

  <!-- Standard Post -->
  <a href="/es/blog/introducing-bsp" class="blog-card">
    <div class="card-image">
      <img src="/blog-bsp.png" alt="Presentando el Protocolo de Soberanía Biológica" />
    </div>
    <div class="card-content">
      <div class="card-meta">
        <span class="tag protocol">Lanzamiento del Protocolo</span>
        <span class="date">26 de Febrero de 2026</span>
      </div>
      <h2>Presentando el Protocolo de Soberanía Biológica</h2>
      <p>Una nueva capa de infraestructura diseñada para otorgar a todo ser humano soberanía criptográfica permanente sobre sus datos biológicos.</p>
      <div class="read-more">Leer Anuncio →</div>
    </div>
  </a>

</div>

<style>
/* Base Typography override for the blog header */
h1 {
  font-size: 3rem !important;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem !important;
  background: linear-gradient(120deg, var(--vp-c-text-1), var(--vp-c-brand-1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.blog-subtitle {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin-bottom: 3rem !important;
  line-height: 1.6;
}

/* Premium Grid Layout */
.premium-blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
}

/* Featured card takes full width on desktop */
@media (min-width: 768px) {
  .featured {
    grid-column: 1 / -1;
    flex-direction: row !important;
  }
  .featured .card-image {
    width: 55%;
    height: auto !important;
    min-height: 380px;
  }
  .featured .card-content {
    width: 45%;
    padding: 3.5rem !important;
    justify-content: center;
  }
  .featured h2 {
    font-size: 2.2rem !important;
  }
}

/* Premium Card Design */
.blog-card {
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
}

.dark .blog-card {
  background-color: #1a1a1a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.blog-card:hover {
  transform: translateY(-6px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 20px 40px rgba(0, 118, 255, 0.15);
}

/* Image Wrapper */
.card-image {
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;
  background-color: var(--vp-c-bg-alt);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.blog-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* Meta tags */
.card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.tag {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.70rem;
}

.tag.philosophy {
  background-color: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.tag.protocol {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.dark .tag.philosophy {
  background-color: rgba(139, 92, 246, 0.15);
  color: #b49ff9;
}

.date {
  color: var(--vp-c-text-3);
}

/* Typography inside cards */
.blog-card h2 {
  margin: 0 0 1rem 0 !important;
  border: none !important;
  font-size: 1.5rem;
  line-height: 1.3;
  color: var(--vp-c-text-1);
  transition: color 0.2s;
}

.blog-card:hover h2 {
  color: var(--vp-c-brand-1);
}

.blog-card p {
  margin: 0 0 2rem 0 !important;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  flex-grow: 1;
}

/* Read more link styling */
.read-more {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  margin-top: auto;
  transition: transform 0.2s;
}

.blog-card:hover .read-more {
  transform: translateX(4px);
}
</style>
