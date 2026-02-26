<template>
<div class="arch-diagram-wrapper">
  <svg class="arch-svg" viewBox="0 0 800 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <filter id="shadow" x="-5%" y="-5%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.05" />
      </filter>
      <filter id="glow-l1" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- LAYER 3: EXCHANGE -->
    <g class="layer-3">
      <rect x="50" y="20" width="700" height="300" class="box-l3" />
      <text x="70" y="60" font-weight="bold" font-size="22" class="text-l3">Layer 3: Exchange Protocol</text>
      <text x="70" y="80" font-size="14" class="text-sub">Network Payloads, API Requests, Zero-Knowledge Proofs</text>
      
      <!-- Decorative Data Packets entering -->
      <circle cx="650" cy="50" r="4" class="data-packet" style="animation-delay: 0s" />
      <circle cx="680" cy="50" r="4" class="data-packet" style="animation-delay: 1s" />
      <circle cx="710" cy="50" r="4" class="data-packet" style="animation-delay: 2s" />
    </g>

    <!-- LAYER 2: DATA -->
    <g class="layer-2">
      <rect x="100" y="110" width="600" height="180" class="box-l2" filter="url(#shadow)" />
      <text x="120" y="150" font-weight="bold" font-size="20" class="text-l2">Layer 2: Data &amp; Taxonomy</text>
      <text x="120" y="170" font-size="14" class="text-sub">BioRecords, Structuring (BSP-LA, BSP-MT), Encryption</text>
    </g>

    <!-- LAYER 1: IDENTITY -->
    <g class="layer-1">
      <rect x="150" y="200" width="500" height="70" class="box-l1" filter="url(#glow-l1)" />
      <text x="400" y="235" font-weight="bold" font-size="20" class="text-l1" text-anchor="middle">Layer 1: Identity &amp; Consent</text>
      <text x="400" y="255" font-size="13" fill="var(--vp-c-text-1)" text-anchor="middle">BEO / IEO SmartWeave Contracts on Arweave</text>
    </g>

    <!-- Connectors -->
    <path d="M 400 200 L 400 180" stroke="var(--vp-c-brand-1)" stroke-width="2" stroke-dasharray="2 4" />
    <path d="M 400 110 L 400 90" stroke="var(--vp-c-brand-2)" stroke-width="2" stroke-dasharray="2 4" />
  </svg>
</div>
</template>

<style scoped>
.arch-diagram-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
  width: 100%;
  max-width: 800px;
  overflow-x: auto;
}

.arch-svg {
  width: 100%;
  height: auto;
  display: block;
  font-family: var(--vp-font-family-base);
}

.box-l3 {
  fill: var(--vp-c-bg-soft);
  stroke: var(--vp-c-brand-3);
  stroke-width: 2;
  stroke-dasharray: 8 4;
  rx: 16;
}

.text-l3 { fill: var(--vp-c-brand-2); }

.box-l2 {
  fill: var(--vp-c-bg-alt);
  stroke: var(--vp-c-brand-2);
  stroke-width: 2;
  rx: 12;
}

.text-l2 { fill: var(--vp-c-brand-1); }

.box-l1 {
  fill: var(--vp-c-brand-soft);
  stroke: var(--vp-c-brand-1);
  stroke-width: 2.5;
  rx: 8;
}

.text-l1 { fill: var(--vp-c-brand-1); }
.text-sub { fill: var(--vp-c-text-2); }

/* Floating Animations for the internal layers */
.layer-2 {
  animation: float1 6s infinite ease-in-out;
  transform-origin: center;
}
.layer-1 {
  animation: float2 5s infinite ease-in-out alternate;
  transform-origin: center;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@keyframes float2 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
}

/* Moving data packets */
.data-packet {
  fill: var(--vp-c-brand-2);
  animation: transfer 3s linear infinite;
}
@keyframes transfer {
  0% { opacity: 0; transform: translateY(-20px); }
  10% { opacity: 1; transform: translateY(-10px); }
  90% { opacity: 1; transform: translateY(50px); }
  100% { opacity: 0; transform: translateY(60px); }
}
</style>
