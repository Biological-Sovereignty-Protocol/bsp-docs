<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { lang } = useData()

// Multi-language content dictionary
const content = computed(() => {
  if (lang.value === 'pt') {
    return {
      heroTitle: "Protocolo de Soberania Biológica",
      heroSubtitle: "O protocolo que dá a cada ser humano soberania permanente sobre sua própria biologia.",
      heroTagline: "Um padrão aberto e criptográfico para troca de dados de saúde e longevidade.",
      btnPrimary: "O que é o BSP?",
      btnSecondary: "Guia para Desenvolvedores",
      
      f1Title: "Propriedade Permanente",
      f1Text: "O indivíduo é dono do seu BEO e de todos os dados vitalícios. Hospedado na rede Arweave, nenhuma empresa pode revogar seu acesso.",
      f2Title: "Consentimento Granular",
      f2Text: "Toda solicitação exige permissão do titular via SmartWeave. Seus dados só se movem quando você assina criptograficamente.",
      f3Title: "Ecossistema Aberto",
      f3Text: "Qualquer sistema pode enviar dados (com consentimento). Zero intermediários. Zero taxas de API.",
      f4Title: "Taxonomia Universal",
      f4Text: "Mais de 210 biomarcadores padronizados. A linguagem canônica para a Inteligência Artificial operar sua biologia.",
      
      splitTitle: "Longevidade é uma Jornada Compartilhada",
      splitP1: "A descentralização não é apenas sobre bancos de dados — é sobre retomar o controle do ativo mais importante que você tem: o seu tempo e a sua saúde.",
      splitP2: "Ao trazer total transparência para dados médicos, nós destravamos um ecossistema onde a pesquisa, os aplicativos modernos e a Inteligência Artificial trabalham nativamente para o seu bem-estar diário.",
      
      archTitle: "A Arquitetura da Soberania",
      archSub: "Reconstruímos a economia dos dados de saúde do zero. Não é mais um servidor de terceiros, mas a camada fundamental para toda a humanidade.",
      i1Title: "Para os Indivíduos",
      i1Text: "Pare de pagar para acessar seus exames. Pare de perder seu histórico médico quando muda de médico. Seu BEO é um cofre criptográfico blindado para gerar e manter valor pela vida toda.",
      i2Title: "Para Plataformas",
      i2Text: "Não construa mais silos de dados. Integre nosso SDK, solicite permissão, e leia ou escreva dados na rede perfeitamente organizados para rodar sua aplicação de imediato.",
      i3Title: "Para IAs de Longevidade",
      i3Text: "IAs não leem PDFs redigidos e escaneados. O BSP entrega dados perfeitamente estruturados para que os LLMs operem e promovam a verdadeira saúde preventiva centrada e hiper-personalizada.",
      
      ctaTitle: "Pronto para Construir?",
      ctaText: "Acesse as especificações completas, instale os SDKs abertos, e comece a enviar dados soberanos hoje mesmo.",
      ctaBtn1: "Ler Referência SDK",
      ctaBtn2: "Explorar a Arquitetura"
    }
  } else if (lang.value === 'es') {
    return {
      heroTitle: "Protocolo de Soberanía Biológica",
      heroSubtitle: "El protocolo que otorga a cada ser humano soberanía permanente sobre su propia biología.",
      heroTagline: "Un estándar abierto y criptográfico para el intercambio de datos de salud y longevidad.",
      btnPrimary: "¿Qué es el BSP?",
      btnSecondary: "Inicio Rápido (SDK)",
      
      f1Title: "Propiedad Permanente",
      f1Text: "El individuo es dueño de su BEO y registros de por vida. En la red descentralizada Arweave, ninguna empresa puede denegar el acceso.",
      f2Title: "Consentimiento Granular",
      f2Text: "Todo requerimiento de acceso necesita la aprobación vía SmartWeave. La información sólo se traslada si lo firmas criptográficamente.",
      f3Title: "Ecosistema Abierto",
      f3Text: "Cualquier plataforma puede añadir datos. Sin monopolios. Sin tarifas por llamadas a la API.",
      f4Title: "Taxonomía Universal",
      f4Text: "Más de 210 biomarcadores estandarizados a nivel global. Un estándar para que la I.A entienda su biología.",
      
      splitTitle: "La Longevidad es un Viaje Compartido",
      splitP1: "Descentralizar no es sólo hablar de bases de datos, es para recuperar el control de su activo principal: el tiempo y su salud.",
      splitP2: "Dándole transparencia total a los datos médicos, abrimos un ecosistema donde investigaciones y la Inteligencia artificial impulsan rutinas de longevidad para usted y sus seres queridos.",
      
      archTitle: "La Arquitectura de la Soberanía",
      archSub: "Recreamos la base de datos de salud. Ya no es otro servidor corporativo, sino una plataforma unida fundamental y permanente.",
      i1Title: "Para los Pacientes",
      i1Text: "No vuelva a pagar por sus estudios clínicos viejos o un PDF. El BEO es un registro irrompible y seguro que guarda todo tu historial.",
      i2Title: "Para Sistemas e IT",
      i2Text: "No reinventen la plataforma de ficheros. Usa nuestro SDK, solicita permiso al paciente, e importa historiales ordenados al instante.",
      i3Title: "Para Motores I.A",
      i3Text: "La Inteligencia artificial no trabaja leyendo resúmenes en PDF escaneados. Extraer biomarcadores y aplicarlos necesita formatos nativos e interoperables que proporciona el protocolo BSP.",
      
      ctaTitle: "¿Listo para Construir?",
      ctaText: "Use las guías, nuestro Python SDK, instale dependencias y empieza en minutos.",
      ctaBtn1: "Leer la Referencia",
      ctaBtn2: "Explorar la Arquitectura"
    }
  }
  
  // Default English (en)
  return {
    heroTitle: "Biological Sovereignty Protocol",
    heroSubtitle: "The protocol that gives every human being permanent sovereignty over their own biology.",
    heroTagline: "An open, cryptographic standard for exchanging health and longevity data.",
    btnPrimary: "What is BSP?",
    btnSecondary: "Developer Quickstart",
    
    f1Title: "Permanent Ownership",
    f1Text: "The individual owns their BEO and all BioRecords within it for life. Hosted completely on the decentralized Arweave network, no company can revoke access.",
    f2Title: "Granular Consent",
    f2Text: "Every third-party access request requires explicit BEO-holder consent via the SmartWeave contract. Your data only moves when you cryptographically sign for it.",
    f3Title: "Open Ecosystem",
    f3Text: "Any system — from local labs to smartwatch manufacturers — can submit BioRecords. Zero gatekeepers. Zero API fees.",
    f4Title: "Universal Taxonomy",
    f4Text: "Over 210 rigorously standardized biomarkers, providing a single global language for longevity AI engines to analyze human health clinically.",
    
    splitTitle: "Longevity is a Shared Journey",
    splitP1: "Decentralization isn't just about databases—it's about reclaiming the control over the most important asset you have: your time and health.",
    splitP2: "By bringing full transparency to biological data, we are unlocking an ecosystem where medical research, apps, and artificial intelligence work directly for your well-being, powering longer and healthier lives for you and those you love.",
    
    archTitle: "The Architecture of Sovereignty",
    archSub: "We are rebuilding the health data economy from the ground up. Not another silo, but a permanent foundational layer.",
    i1Title: "For Individuals",
    i1Text: "Stop paying to access your own blood tests. Stop losing your medical history when you change doctors. Your BEO is a lifelong, cryptographic vault.",
    i2Title: "For Developers & Platforms",
    i2Text: "Don't build another proprietary data silo. Integrate with BSP to instantly read standardized health data from thousands of users (with consent).",
    i3Title: "For Artificial Intelligence",
    i3Text: "AI cannot practice precision medicine on unstructured PDFs. BSP provides AI engines with cryptographically verified, perfectly structured biomarker histories.",
    
    ctaTitle: "Ready to Build?",
    ctaText: "Read the spec, use our open-source SDKs, and start requesting sovereign data today.",
    ctaBtn1: "Read SDK Reference",
    ctaBtn2: "Explore Architecture"
  }
})

// Correct localized routing prefixes
const pfx = computed(() => {
  if (lang.value === 'pt') return '/pt'
  if (lang.value === 'es') return '/es'
  return ''
})
</script>


<template>
  <div class="premium-landing">
    <!-- Background Design Elements -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    
    <!-- Hero Section -->
    <section class="p-hero">
      <div class="p-hero-content">
        <h1 class="p-title">{{ content.heroTitle }}</h1>
        <p class="p-subtitle">{{ content.heroSubtitle }}</p>
        <p class="p-tagline">{{ content.heroTagline }}</p>
        
        <div class="p-actions">
          <a :href="`${pfx}/intro`" class="btn btn-brand">{{ content.btnPrimary }}</a>
          <a :href="`${pfx}/quickstart`" class="btn btn-alt">{{ content.btnSecondary }}</a>
        </div>
      </div>
      <div class="p-hero-image-wrapper">
        <img src="/hero-image.png" alt="People Exercising" class="p-hero-img" />
        <div class="glass-badge">
          <div class="dot green"></div> <span class="badge-text">Protocol Live v1.0</span>
        </div>
      </div>
    </section>

    <!-- Glassmorphism Features Array -->
    <section class="p-features">
      <div class="glass-card fade-up" style="animation-delay: 0s;">
        <span class="f-icon">🛡️</span>
        <h3>{{ content.f1Title }}</h3>
        <p>{{ content.f1Text }}</p>
      </div>
      <div class="glass-card fade-up" style="animation-delay: 0.1s;">
        <span class="f-icon">🔐</span>
        <h3>{{ content.f2Title }}</h3>
        <p>{{ content.f2Text }}</p>
      </div>
      <div class="glass-card fade-up" style="animation-delay: 0.2s;">
        <span class="f-icon">🌐</span>
        <h3>{{ content.f3Title }}</h3>
        <p>{{ content.f3Text }}</p>
      </div>
      <div class="glass-card fade-up" style="animation-delay: 0.3s;">
        <span class="f-icon">🧬</span>
        <h3>{{ content.f4Title }}</h3>
        <p>{{ content.f4Text }}</p>
      </div>
    </section>

    <!-- The Image Split Section -->
    <section class="p-split">
      <div class="p-split-text fade-in">
        <h2>{{ content.splitTitle }}</h2>
        <p>{{ content.splitP1 }}</p>
        <p>{{ content.splitP2 }}</p>
      </div>
      <div class="p-split-img-wrapper fade-in">
        <div class="img-backdrop-glow"></div>
        <img src="/longevity-couple.jpg" alt="Health Checking" class="p-split-img" />
      </div>
    </section>

    <!-- Architecture Breakdown -->
    <section class="p-architecture">
      <div class="arch-header">
        <h2>{{ content.archTitle }}</h2>
        <p>{{ content.archSub }}</p>
      </div>
      <div class="arch-columns">
        <div class="arch-col hover-lift">
          <h3>{{ content.i1Title }}</h3>
          <p>{{ content.i1Text }}</p>
        </div>
        <div class="arch-col hover-lift">
          <h3>{{ content.i2Title }}</h3>
          <p>{{ content.i2Text }}</p>
        </div>
        <div class="arch-col hover-lift">
          <h3>{{ content.i3Title }}</h3>
          <p>{{ content.i3Text }}</p>
        </div>
      </div>
    </section>

    <!-- Cyber-styled CTA -->
    <section class="p-cta">
      <div class="cta-inner-glass">
        <h2>{{ content.ctaTitle }}</h2>
        <p>{{ content.ctaText }}</p>
        <div class="cta-btn-group">
          <a :href="`${pfx}/sdk-reference`" class="btn btn-brand-solid">{{ content.ctaBtn1 }}</a>
          <a :href="`${pfx}/architecture`" class="btn btn-brand-outline">{{ content.ctaBtn2 }}</a>
        </div>
      </div>
    </section>

  </div>
</template>

<style>
/* Apply overflow hidden globally to the body so orbs can stretch past the 1280px container without causing scrollbars */
html, body {
  overflow-x: hidden !important;
}
</style>

<style scoped>
/* 
  PREMIUM AESTHETIC STYLES 
  Bypasses Vitepress restrictions 
*/
.premium-landing {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  font-family: var(--vp-font-family-base);
}

/* Background Aesthetics */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: -1;
  opacity: 0.5;
  pointer-events: none;
}
.orb-1 {
  background: rgba(0, 118, 255, 0.4);
  width: 500px;
  height: 500px;
  top: -100px;
  right: -100px;
}
.orb-2 {
  background: rgba(59, 130, 246, 0.3);
  width: 600px;
  height: 600px;
  bottom: 20%;
  left: -200px;
}
.dark .orb-1 {
  background: rgba(50, 145, 255, 0.15);
}
.dark .orb-2 {
  background: rgba(14, 99, 199, 0.15);
}

/* ----- HERO ----- */
.p-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  min-height: calc(100vh - 200px);
  padding: 6rem 0;
}

.p-hero-content {
  flex: 1;
  max-width: 600px;
}

.p-title {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1.5px;
  margin-bottom: 1.5rem;
  background: linear-gradient(120deg, var(--vp-c-text-1) 30%, var(--vp-c-brand-1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.p-subtitle {
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.p-tagline {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2.5rem;
}

.p-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.8rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.05rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none !important;
}

.btn-brand {
  background-color: var(--vp-c-brand-1);
  color: #fff !important;
  box-shadow: 0 8px 24px var(--vp-c-brand-soft);
}
.btn-brand:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 118, 255, 0.25);
}

.btn-alt {
  background-color: transparent;
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-border);
}
.btn-alt:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  transform: translateY(-2px);
}

.p-hero-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.p-hero-img {
  width: 100%;
  max-width: 580px;
  border-radius: 32px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.15);
  object-fit: cover;
}

.glass-badge {
  position: absolute;
  bottom: -20px;
  left: -20px;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.3);
  padding: 12px 24px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.dark .glass-badge {
  background: rgba(30,30,30,0.6);
  border-color: rgba(255,255,255,0.1);
}

.dot.green {
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10b981;
}

.badge-text {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}


/* ----- FEATURES (GLASSMORPHISM) ----- */
.p-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 4rem 0 8rem;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  padding: 2rem;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.glass-card:hover {
  transform: translateY(-8px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.f-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1.2rem;
}

.glass-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
}

.glass-card p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}


/* ----- SPLIT IMAGE ----- */
.p-split {
  display: flex;
  align-items: center;
  gap: 6rem;
  margin: 8rem 0;
}

.p-split-text {
  flex: 1;
}

.p-split-text h2 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.p-split-text p {
  font-size: 1.15rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 1.2rem;
}

.p-split-img-wrapper {
  flex: 1.2;
  position: relative;
}

.img-backdrop-glow {
  position: absolute;
  top: 10%;
  left: 10%;
  right: -10%;
  bottom: -10%;
  background: var(--vp-c-brand-soft);
  border-radius: 30px;
  z-index: -1;
  transform: rotate(3deg);
  transition: transform 0.4s ease;
}

.p-split:hover .img-backdrop-glow {
  transform: rotate(5deg) scale(1.02);
}

.p-split-img {
  width: 100%;
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.15);
  object-fit: cover;
  display: block;
}


/* ----- ARCHITECTURE COLUMNS ----- */
.p-architecture {
  margin: 10rem 0;
}

.arch-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
}

.arch-header h2 {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 1rem;
}

.arch-header p {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
}

.arch-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
}

.arch-col {
  position: relative;
}

.arch-col::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 0;
  width: 40px;
  height: 4px;
  background-color: var(--vp-c-brand-1);
  border-radius: 4px;
}

.arch-col h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.arch-col p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}


/* ----- CTA CTA ----- */
.p-cta {
  margin: 8rem 0;
  position: relative;
}

.cta-inner-glass {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), rgba(0,0,0,0.01));
  border: 1px solid var(--vp-c-border);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 6rem 2rem;
  text-align: center;
}

.dark .cta-inner-glass {
  background: linear-gradient(135deg, rgba(30, 120, 255, 0.1), rgba(10, 10, 10, 0.5));
}

.cta-inner-glass h2 {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 1rem;
}

.cta-inner-glass p {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btn-group {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.btn-brand-solid {
  background-color: var(--vp-c-brand-1);
  color: white !important;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  box-shadow: 0 10px 25px rgba(0, 118, 255, 0.3);
}

.btn-brand-solid:hover {
  transform: translateY(-3px);
  background-color: var(--vp-c-brand-2);
}

.btn-brand-outline {
  border: 2px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  background-color: transparent;
}

.btn-brand-outline:hover {
  background-color: var(--vp-c-brand-soft);
  transform: translateY(-3px);
}

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-up {
  animation: fadeUp 0.8s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 1s ease forwards;
}

/* Media Queries */
@media (max-width: 1024px) {
  .p-hero, .p-split {
    flex-direction: column;
    text-align: center;
    gap: 4rem;
  }
  
  .p-hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .p-actions {
    justify-content: center;
  }
  
  .arch-col::before {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .arch-col {
    text-align: center;
  }
}
</style>
