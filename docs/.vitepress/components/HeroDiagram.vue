<template>
<div class="hero-diagram-wrapper">
  <svg class="hero-svg" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <!-- Gradients -->
      <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--vp-c-brand-1)" />
        <stop offset="100%" stop-color="var(--vp-c-brand-3)" />
      </linearGradient>
      <!-- Glow Filter -->
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Connectors Left -->
    <path d="M 250 100 Q 375 100 455 180" class="conn-line" />
    <path d="M 250 200 L 455 200" class="conn-line" />
    <path d="M 250 300 Q 375 300 455 220" class="conn-line" />

    <!-- Connectors Right -->
    <path d="M 750 100 Q 625 100 545 180" class="conn-line" />
    <path d="M 750 200 L 545 200" class="conn-line" />
    <path d="M 750 300 Q 625 300 545 220" class="conn-line" />

    <!-- Center Core -->
    <g class="core-node">
      <circle cx="0" cy="0" r="70" fill="url(#brandGrad)" filter="url(#glow)" opacity="0.3" />
      <circle cx="0" cy="0" r="45" fill="var(--vp-c-brand-soft)" stroke="var(--vp-c-brand-1)" stroke-width="2" />
      <text x="0" y="-5" font-size="20" font-weight="bold" fill="var(--vp-c-brand-1)" text-anchor="middle">User BEO</text>
      <text x="0" y="16" font-size="12" font-weight="500" fill="var(--vp-c-text-1)" text-anchor="middle">Sovereign Identity</text>
    </g>

    <!-- Left Side: Data Sources -->
    <g transform="translate(150, 100)">
      <rect x="-100" y="-30" width="200" height="60" class="arch-box" />
      <text x="0" y="-5" class="title">Clinical Labs</text>
      <text x="0" y="15" class="subtitle">Blood, Genomics</text>
    </g>
    <g transform="translate(150, 200)">
      <rect x="-100" y="-30" width="200" height="60" class="arch-box" />
      <text x="0" y="-5" class="title">Wearables</text>
      <text x="0" y="15" class="subtitle">HRV, Sleep, CGM</text>
    </g>
    <g transform="translate(150, 300)">
      <rect x="-100" y="-30" width="200" height="60" class="arch-box" />
      <text x="0" y="-5" class="title">Hospital EMRs</text>
      <text x="0" y="15" class="subtitle">FHIR Integration</text>
    </g>

    <!-- Right Side: Consumers / Analysis -->
    <g transform="translate(850, 100)">
      <rect x="-100" y="-30" width="200" height="60" class="arch-box" />
      <text x="0" y="-5" class="title">AI Health Engines</text>
      <text x="0" y="15" class="subtitle">AVA Core, LLMs</text>
    </g>
    <g transform="translate(850, 200)">
      <rect x="-100" y="-30" width="200" height="60" class="arch-box" />
      <text x="0" y="-5" class="title">Longevity Dashboards</text>
      <text x="0" y="15" class="subtitle">Consumer Apps</text>
    </g>
    <g transform="translate(850, 300)">
      <rect x="-100" y="-30" width="200" height="60" class="arch-box" />
      <text x="0" y="-5" class="title">Research Trials</text>
      <text x="0" y="15" class="subtitle">Anonymized Cohorts</text>
    </g>
  </svg>
</div>
</template>

<style scoped>
.hero-diagram-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
  width: 100%;
  max-width: 1000px;
  overflow-x: auto;
}

.hero-svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: var(--vp-font-family-base);
}

.arch-box {
  fill: var(--vp-c-bg-soft);
  stroke: var(--vp-c-border);
  stroke-width: 1.5;
  rx: 8;
  transition: all 0.3s ease;
}

.title {
  font-size: 14px;
  font-weight: 600;
  fill: var(--vp-c-text-1);
  text-anchor: middle;
}

.subtitle {
  font-size: 12px;
  fill: var(--vp-c-text-2);
  text-anchor: middle;
}

.conn-line {
  stroke: var(--vp-c-border);
  stroke-width: 2;
  stroke-dasharray: 6 6;
  fill: none;
  animation: dash 3s linear infinite;
}

@keyframes dash {
  to { stroke-dashoffset: -24; }
}

.core-node {
  transform-origin: center;
  animation: pulse 4s infinite alternate ease-in-out;
}

@keyframes pulse {
  0% { transform: translate(500px, 200px) scale(0.98); }
  100% { transform: translate(500px, 200px) scale(1.02); }
}
</style>
