<script setup>
import { useData, useRouter } from 'vitepress'
import { computed } from 'vue'

const { lang, frontmatter } = useData()
const router = useRouter()

const texts = computed(() => {
  if (lang.value === 'pt') {
    return {
      title: 'Protocolo de Soberania Biológica',
      tagline: 'Soberania permanente sobre a sua biologia.',
      docs: 'Documentação',
      intro: 'Introdução',
      arch: 'Arquitetura',
      sdk: 'Referência SDK',
      tax: 'Biomarcadores',
      resources: 'Recursos',
      gov: 'Governança',
      blog: 'Blog',
      langTitle: 'Idioma'
    }
  } else if (lang.value === 'es') {
    return {
      title: 'Protocolo de Soberanía Biológica',
      tagline: 'Soberanía permanente sobre tu biología.',
      docs: 'Documentación',
      intro: 'Introducción',
      arch: 'Arquitectura',
      sdk: 'Referencia SDK',
      tax: 'Biomarcadores',
      resources: 'Recursos',
      gov: 'Gobernanza',
      blog: 'Blog',
      langTitle: 'Idioma'
    }
  }
  return {
    title: 'Biological Sovereignty Protocol',
    tagline: 'Permanent sovereignty over your biology.',
    docs: 'Documentation',
    intro: 'Introduction',
    arch: 'Architecture',
    sdk: 'SDK Reference',
    tax: 'Biomarkers',
    resources: 'Resources',
    gov: 'Governance',
    blog: 'Blog',
    langTitle: 'Language'
  }
})

const prefix = computed(() => {
  if (lang.value === 'pt') return '/pt'
  if (lang.value === 'es') return '/es'
  return ''
})

const onLangChange = (event) => {
  const newLang = event.target.value
  let path = window.location.pathname
  
  if (path.startsWith('/pt/')) path = path.replace('/pt/', '/')
  else if (path.startsWith('/es/')) path = path.replace('/es/', '/')
  
  if (path === '/pt' || path === '/es') path = '/'
  
  if (newLang === 'en') {
    router.go(path)
  } else {
    const fixedPath = path.startsWith('/') ? path : `/${path}`
    router.go(`/${newLang}${fixedPath === '/' ? '/' : fixedPath}`)
  }
}

const hasSidebar = computed(() => {
  if (frontmatter.value.layout === 'home' || frontmatter.value.layout === 'page') return false
  if (frontmatter.value.sidebar === false) return false
  return true
})
</script>

<template>
  <footer class="bsp-footer" :class="{ 'has-sidebar': hasSidebar }">
    <div class="footer-container">
      <div class="footer-col brand-col">
        <h3 class="footer-title">{{ texts.title }}</h3>
        <p class="footer-tagline">{{ texts.tagline }}</p>
        <p class="copyright">© 2026-present Ambrósio Institute</p>
      </div>
      
      <div class="footer-col">
        <h4 class="col-title">{{ texts.docs }}</h4>
        <ul>
          <li><a :href="`${prefix}/intro`">{{ texts.intro }}</a></li>
          <li><a :href="`${prefix}/architecture`">{{ texts.arch }}</a></li>
          <li><a :href="`${prefix}/sdk-reference`">{{ texts.sdk }}</a></li>
          <li><a :href="`${prefix}/taxonomy-list`">{{ texts.tax }}</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="col-title">{{ texts.resources }}</h4>
        <ul>
          <li><a href="https://github.com/Biological-Sovereignty-Protocol" target="_blank">GitHub</a></li>
          <li><a :href="`${prefix}/governance`">{{ texts.gov }}</a></li>
          <li><a href="/blog/">{{ texts.blog }}</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="col-title">{{ texts.langTitle }}</h4>
        
        <div class="lang-selector-wrapper">
          <svg class="globe-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
          <select class="lang-selector" @change="onLangChange" :value="lang">
            <option value="en">English</option>
            <option value="pt">Português (BR)</option>
            <option value="es">Español</option>
          </select>
          <svg class="chevron-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

      </div>
    </div>
  </footer>
</template>

<style scoped>
.bsp-footer {
  background-color: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-border);
  padding: 4rem 2rem;
  margin-top: 4rem;
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 960px) {
  .bsp-footer.has-sidebar {
    padding-left: calc(var(--vp-sidebar-width, 276px) + 2rem);
  }
}
.footer-container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  max-width: 1152px;
  margin: 0 auto;
}
.footer-title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}
.footer-tagline {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  max-width: 280px;
}
.copyright {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}
.col-title {
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: var(--vp-c-text-1);
}
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-col li {
  margin-bottom: 0.75rem;
}
.footer-col a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}
.footer-col a:hover {
  color: var(--vp-c-brand-1);
}

.lang-selector-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  transition: border-color 0.2s;
}

.lang-selector-wrapper:hover {
  border-color: var(--vp-c-brand-1);
}

.globe-icon {
  color: var(--vp-c-text-2);
  margin-right: 0.5rem;
}

.chevron-icon {
  color: var(--vp-c-text-2);
  margin-left: 0.5rem;
  pointer-events: none;
}

.lang-selector {
  appearance: none;
  background: transparent;
  border: none;
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  width: 130px;
  font-family: inherit;
}

.lang-selector option {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
