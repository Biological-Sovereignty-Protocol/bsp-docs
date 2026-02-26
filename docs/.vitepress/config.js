import { defineConfig } from 'vitepress'

const enSidebar = [
    {
        text: 'Getting Started',
        items: [
            { text: 'Introduction', link: '/intro' },
            { text: 'Quickstart', link: '/quickstart' },
            { text: 'User Onboarding', link: '/user-onboarding' }
        ]
    },
    {
        text: 'Architecture & Concepts',
        items: [
            { text: 'Ecosystem Flow', link: '/ecosystem-flow' },
            { text: 'BEO (Biological Entity)', link: '/beo' },
            { text: 'IEO (Institutional Entity)', link: '/ieo' },
            { text: 'Consent & AccessControl', link: '/consent-token' },
            { text: 'Security & Blockchain', link: '/security-blockchain' },
            { text: 'GitHub Architecture', link: '/github-architecture' }
        ]
    },
    {
        text: 'Protocols & Guidelines',
        items: [
            { text: 'Exchange Protocol', link: '/exchange-protocol' },
            { text: 'Governance & BIPs', link: '/governance' },
            { text: 'Canonical Glossary', link: '/glossary' }
        ]
    },
    {
        text: 'Developer Resources',
        items: [
            { text: 'Complete Taxonomy', link: '/taxonomy-list' },
            { text: 'SDK Reference', link: '/sdk-reference' },
            { text: 'Tutorials & Cookbooks', link: '/tutorials' },
            { text: 'JSON Payloads', link: '/payloads' },
            { text: 'Ecosystem Directory', link: '/directory' }
        ]
    }
]

const ptSidebar = [
    {
        text: 'Primeiros Passos',
        items: [
            { text: 'Introdução', link: '/pt/intro' },
            { text: 'Início Rápido', link: '/pt/quickstart' },
            { text: 'Onboarding de Usuário', link: '/pt/user-onboarding' }
        ]
    },
    {
        text: 'Arquitetura e Conceitos',
        items: [
            { text: 'Fluxo do Ecossistema', link: '/pt/ecosystem-flow' },
            { text: 'BEO (Entidade Biológica)', link: '/pt/beo' },
            { text: 'IEO (Entidade Institucional)', link: '/pt/ieo' },
            { text: 'Consentimento', link: '/pt/consent-token' },
            { text: 'Segurança e Blockchain', link: '/pt/security-blockchain' },
            { text: 'Arquitetura GitHub', link: '/pt/github-architecture' }
        ]
    },
    {
        text: 'Protocolos e Diretrizes',
        items: [
            { text: 'Protocolo de Troca', link: '/pt/exchange-protocol' },
            { text: 'Governança e BIPs', link: '/pt/governance' },
            { text: 'Glossário Canônico', link: '/pt/glossary' }
        ]
    },
    {
        text: 'Recursos para Desenvolvedores',
        items: [
            { text: 'Taxonomia Completa', link: '/pt/taxonomy-list' },
            { text: 'Referência SDK', link: '/pt/sdk-reference' },
            { text: 'Tutoriais e Guias', link: '/pt/tutorials' },
            { text: 'Cargas JSON', link: '/pt/payloads' },
            { text: 'Diretório do Ecossistema', link: '/pt/directory' }
        ]
    }
]

const esSidebar = [
    {
        text: 'Primeros Pasos',
        items: [
            { text: 'Introducción', link: '/es/intro' },
            { text: 'Inicio Rápido', link: '/es/quickstart' },
            { text: 'Incorporación de Usuarios', link: '/es/user-onboarding' }
        ]
    },
    {
        text: 'Arquitectura y Conceptos',
        items: [
            { text: 'Flujo del Ecosistema', link: '/es/ecosystem-flow' },
            { text: 'BEO (Entidad Biológica)', link: '/es/beo' },
            { text: 'IEO (Entidad Institucional)', link: '/es/ieo' },
            { text: 'Consentimiento', link: '/es/consent-token' },
            { text: 'Seguridad y Blockchain', link: '/es/security-blockchain' },
            { text: 'Arquitectura GitHub', link: '/es/github-architecture' }
        ]
    },
    {
        text: 'Protocolos y Directrices',
        items: [
            { text: 'Protocolo de Intercambio', link: '/es/exchange-protocol' },
            { text: 'Gobernanza y BIPs', link: '/es/governance' },
            { text: 'Glosario Canónico', link: '/es/glossary' }
        ]
    },
    {
        text: 'Desarrolladores',
        items: [
            { text: 'Taxonomía Completa', link: '/es/taxonomy-list' },
            { text: 'Referencia SDK', link: '/es/sdk-reference' },
            { text: 'Tutoriales y Guías', link: '/es/tutorials' },
            { text: 'Cargas JSON', link: '/es/payloads' },
            { text: 'Directorio del Ecosistema', link: '/es/directory' }
        ]
    }
]

export default defineConfig({
    title: "Biological Sovereignty Protocol",
    description: "The protocol that gives every human being permanent sovereignty over their own biology.",

    themeConfig: {
        logo: '/logo.svg',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/Biological-Sovereignty-Protocol' }
        ]
    },

    locales: {
        root: {
            label: 'English',
            lang: 'en',
            themeConfig: {
                nav: [
                    {
                        text: 'Documentation',
                        items: [
                            { text: 'Introduction', link: '/intro' },
                            { text: 'Architecture Diagram', link: '/architecture' },
                            { text: 'Ecosystem Flow', link: '/ecosystem-flow' }
                        ]
                    },
                    { text: 'SDK & Tools', link: '/sdk-reference' },
                    { text: 'Blog', link: '/blog/' }
                ],
                sidebar: {
                    '/blog/': [
                        {
                            text: 'Blog',
                            items: [
                                { text: 'All Posts', link: '/blog/' },
                                { text: 'The Structural Failure of Modern Health Data', link: '/blog/the-problem-with-data-silos' },
                                { text: 'Introducing the Biological Sovereignty Protocol', link: '/blog/introducing-bsp' }
                            ]
                        }
                    ],
                    '/': enSidebar
                }
            }
        },
        pt: {
            label: 'Português',
            lang: 'pt',
            link: '/pt/',
            title: 'Protocolo de Soberania Biológica',
            description: 'O protocolo que dá a cada humano soberania permanente sobre sua própria biologia.',
            themeConfig: {
                nav: [
                    {
                        text: 'Documentação',
                        items: [
                            { text: 'Introdução', link: '/pt/intro' },
                            { text: 'Diagrama de Arquitetura', link: '/pt/architecture' },
                            { text: 'Fluxo do Ecossistema', link: '/pt/ecosystem-flow' }
                        ]
                    },
                    { text: 'SDK e Ferramentas', link: '/pt/sdk-reference' },
                    { text: 'Blog', link: '/blog/' }
                ],
                sidebar: {
                    '/pt/': ptSidebar
                }
            }
        },
        es: {
            label: 'Español',
            lang: 'es',
            link: '/es/',
            title: 'Protocolo de Soberanía Biológica',
            description: 'El protocolo que otorga a cada ser humano soberanía permanente sobre su propia biología.',
            themeConfig: {
                nav: [
                    {
                        text: 'Documentación',
                        items: [
                            { text: 'Introducción', link: '/es/intro' },
                            { text: 'Diagrama de Arquitectura', link: '/es/architecture' },
                            { text: 'Flujo del Ecosistema', link: '/es/ecosystem-flow' }
                        ]
                    },
                    { text: 'SDK y Herramientas', link: '/es/sdk-reference' },
                    { text: 'Blog', link: '/blog/' }
                ],
                sidebar: {
                    '/es/': esSidebar
                }
            }
        }
    }
})
