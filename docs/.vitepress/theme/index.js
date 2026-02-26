import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeroDiagram from '../components/HeroDiagram.vue'
import Architecture3Layer from '../components/Architecture3Layer.vue'
import EcosystemFlowMcp from '../components/EcosystemFlowMcp.vue'
import PremiumLanding from '../components/PremiumLanding.vue'
import CustomFooter from '../components/CustomFooter.vue'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CustomFooter)
    })
  },
  enhanceApp({ app }) {
    app.component('HeroDiagram', HeroDiagram)
    app.component('Architecture3Layer', Architecture3Layer)
    app.component('EcosystemFlowMcp', EcosystemFlowMcp)
    app.component('PremiumLanding', PremiumLanding)
  }
}
