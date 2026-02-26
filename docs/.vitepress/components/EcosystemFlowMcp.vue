<template>
<div class="mcp-diagram-wrapper">
  <svg class="mcp-svg" viewBox="0 0 1000 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <!-- Arrow heads -->
      <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="2" refY="5" orient="auto-start-reverse">
        <path d="M 0 5 L 10 10 L 10 0 Z" fill="var(--vp-c-text-3)"/>
      </marker>
      <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--vp-c-text-3)"/>
      </marker>
    </defs>

    <!-- Central BSP Core -->
    <g transform="translate(360, 150)">
      <rect width="280" height="120" class="core-box" />
      <text x="140" y="55" class="c-title" fill="var(--vp-c-brand-1)" text-anchor="middle" font-size="20">Biological Sovereignty Protocol</text>
      <text x="140" y="75" class="c-sub" text-anchor="middle">Standardized Architecture</text>
    </g>

    <!-- Left Side: Consumers -->
    <g class="g-hoverable" transform="translate(50, 70)">
      <rect width="240" height="60" class="node-box" />
      <text x="120" y="26" class="c-title" text-anchor="middle">Intelligence &amp; AI</text>
      <text x="120" y="44" class="c-sub" text-anchor="middle">AVA Core, Health LLMs</text>
    </g>
    <g class="g-hoverable" transform="translate(50, 180)">
      <rect width="240" height="60" class="node-box" />
      <text x="120" y="26" class="c-title" text-anchor="middle">Physician Dashboards</text>
      <text x="120" y="44" class="c-sub" text-anchor="middle">Clinical EMRs, Diagnostics</text>
    </g>
    <g class="g-hoverable" transform="translate(50, 290)">
      <rect width="240" height="60" class="node-box" />
      <text x="120" y="26" class="c-title" text-anchor="middle">User Mobile Apps</text>
      <text x="120" y="44" class="c-sub" text-anchor="middle">Health Platforms, Wallets</text>
    </g>
    <text x="170" y="380" font-size="12" fill="var(--vp-c-text-3)" text-anchor="middle" font-weight="600" text-transform="uppercase" letter-spacing="1">Longevity &amp; Consumers</text>

    <!-- Right Side: Producers -->
    <g class="g-hoverable" transform="translate(710, 70)">
      <rect width="240" height="60" class="node-box" />
      <text x="120" y="26" class="c-title" text-anchor="middle">Clinical Laboratories</text>
      <text x="120" y="44" class="c-sub" text-anchor="middle">Fleury, Quest, Genomics</text>
    </g>
    <g class="g-hoverable" transform="translate(710, 180)">
      <rect width="240" height="60" class="node-box" />
      <text x="120" y="26" class="c-title" text-anchor="middle">Wearables &amp; Hardware</text>
      <text x="120" y="44" class="c-sub" text-anchor="middle">Oura, WHOOP, Garmin</text>
    </g>
    <g class="g-hoverable" transform="translate(710, 290)">
      <rect width="240" height="60" class="node-box" />
      <text x="120" y="26" class="c-title" text-anchor="middle">Researchers &amp; Trials</text>
      <text x="120" y="44" class="c-sub" text-anchor="middle">University Cohorts, Pharma</text>
    </g>
    <text x="830" y="380" font-size="12" fill="var(--vp-c-text-3)" text-anchor="middle" font-weight="600" text-transform="uppercase" letter-spacing="1">Data Sources &amp; Institutions</text>

    <!-- Left Lines -->
    <path d="M 295 100 C 320 100, 320 170, 345 170" class="data-line" marker-start="url(#arrow-start)" marker-end="url(#arrow-end)" />
    <path d="M 295 210 L 345 210" class="data-line" marker-start="url(#arrow-start)" marker-end="url(#arrow-end)" />
    <path d="M 295 320 C 320 320, 320 250, 345 250" class="data-line" marker-start="url(#arrow-start)" marker-end="url(#arrow-end)" />
    
    <text x="320" y="285" font-size="10" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">Bidirectional</text>
    <text x="320" y="297" font-size="10" fill="var(--vp-c-text-2)" text-anchor="middle">data flow</text>

    <!-- Right Lines -->
    <path d="M 655 170 C 680 170, 680 100, 705 100" class="data-line" marker-start="url(#arrow-start)" marker-end="url(#arrow-end)" />
    <path d="M 655 210 L 705 210" class="data-line" marker-start="url(#arrow-start)" marker-end="url(#arrow-end)" />
    <path d="M 655 250 C 680 250, 680 320, 705 320" class="data-line" marker-start="url(#arrow-start)" marker-end="url(#arrow-end)" />

    <text x="680" y="285" font-size="10" font-weight="600" fill="var(--vp-c-text-1)" text-anchor="middle">Bidirectional</text>
    <text x="680" y="297" font-size="10" fill="var(--vp-c-text-2)" text-anchor="middle">data flow</text>
  </svg>
</div>
</template>

<style scoped>
.mcp-diagram-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
  width: 100%;
  overflow-x: auto;
}

.mcp-svg {
  min-width: 800px;
  width: 100%;
  height: auto;
  display: block;
  font-family: var(--vp-font-family-base);
}

.node-box {
  fill: var(--vp-c-bg);
  stroke: var(--vp-c-border);
  stroke-width: 1.5;
  rx: 6;
  transition: all 0.2s ease;
}

.g-hoverable:hover .node-box {
  stroke: var(--vp-c-brand-1);
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

.core-box {
  fill: var(--vp-c-brand-soft);
  stroke: var(--vp-c-brand-1);
  stroke-width: 1.5;
  rx: 8;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.05));
}

.c-title {
  font-weight: 600;
  font-size: 15px;
  fill: var(--vp-c-text-1);
}

.c-sub {
  font-size: 13px;
  fill: var(--vp-c-text-2);
}

.data-line {
  fill: none;
  stroke: var(--vp-c-border);
  stroke-width: 2;
  stroke-dasharray: 8 6;
  animation: flow 3s linear infinite;
}

@keyframes flow {
  to { stroke-dashoffset: -28; }
}
</style>
