# Protocol Architecture

# Arquitetura do Protocolo

O BSP é um padrão aberto que define como os dados biológicos são estruturados, armazenados, trocados e governados. Ele opera em três camadas.

---
title: "Diagrama da Arquitetura"
---

# A Arquitetura Três-Camadas

O *Biological Sovereignty Protocol* foi desenhado intencionalmente usando um modelo restrito de "Thin-Client" (Cliente-Leve) arquitetado sobre três camadas distintas. Este design garante a descentralização permanente dos registros vitais, enquanto empurra a complexa sobrecarga de indexação e as UIs ricas para o escopo dos desenvolvedores de dApps.

<Architecture3Layer />

*(O diagrama acima mapeia o fluxo completo de dados: da submissão clínica na Máquina de Estado SmartWeave até o consumo do lado do cliente.)*

---

## Camada 1: Ledger Universal (L1)

No coração do protocolo, a Camada 1 descarta a AWS (Amazon) e os bancos de dados tradicionais (PostgreSQL, MongoDB) em prol de uma prova criptográfica resistente e perpétua.

*   **Infraestrutura:** A "Permanet" Arweave e o Contrato Inteligente *Biological-State-Machine* (SmartWeave).
*   **Propósito:** Atua como o registrador imutável e descentralizado da verdade humana.
*   **Responsabilidade:**
    *   Hospedar em cache os objetos gigantes JSON-LD (Cargas de *BioRecords*) permanentemente e para sempre usando uma prova global.
    *   Fazer a triagem da lógica central do sistema IEO (Organização Médica) fazendo push dos dados em uma BEO (Conta Pessoal Humana).
    *   Executar o Contrato de Consentimento (Garantir que os aplicativos só leiam dados do João se o João explicitamente assinar aprovação na rede).

> **A Regra de Ouro:** A L1 nunca armazena o "Nome Completo" ou o "CPF/SSN" em formato de texto simples. Ela vincula dados biológicos rígidos (Glicose = 85mg/dL) aos hashes públicos da carteira. Identidade do mundo real (PII) requer criptografia ponta a ponta simétrica de conhecimento zero a cargo exclusivo do usuário.

---

## Camada 2: A Camada D.A.N (L2)

As tecnologias em Blockchain são notoriamente ineficientes para consultar arquivos JSON rapidamente. Um aplicativo de condicionamento físico para a terceira idade não pode esperar o tempo de ping de 30 segundos de uma rede principal enquanto um paciente atualiza o dashboard. É por isso que o padrão exige uma D.A.N (Rede de Acesso de Dados).

*   **Infraestrutura:** Servidores Cache GraphQL (ex: GoldSky, TheGraph) ou nós construídos puramente pela comunidade usando protocolos P2P.
*   **Propósito:** Velocidade ultrarrápida (Cache) e Agregação.
*   **Responsabilidade:**
    *   Constantemente escanear a Blockchain da L1 por novas carteiras BSP.
    *   Normalizar as gigantes meta-tags SmartWeave que descrevem todas as interações do paciente nos blocos JSON em tempo real.
    *   Fornecer endpoints ultrarrápidos, com 15ms de latência, que permitem aos aplicativos executar buscas (ex: *"Buscar os históricos de lipídios do usuário xyz6 durante todo o ano de 2024"*).

A beleza desta camada é que os Nódulos da L2 podem **falhar a qualquer segundo** ou os servidores indexadores podem explodir sem afetar o ecossistema. Novas entidades L2 simplesmente lerão sincronamente tudo e clonarão as referências dos hashes imutáveis da Arweave para reviver toda a rede.

---

## Camada 3: Aplicações Locais e Lógica do SDK (L3)

O BSP em si **não possui e nunca desenvolverá** um site de frente ao consumidor. Todo o valor final da saúde é gerado no escopo aberto de desenvolvedores corporativos e individuais e pelos robôs de Inteligência Artificial usando nossos SDKs (SDK-PHP, SDK-TS, Python BSP).

*   **Infraestrutura:** Aplicações do Seu Lado (Telas NextJS, Dashboards para iOS, Servidores locais em Node).
*   **Propósito:** Fornecer interfaces para humanos e criar "sentido" na vida.
*   **Responsabilidade:**
    *   Fornecer os gráficos em IU de maneira amigável. Implementar o botão "Conectar com Wallet/BSP Auth".
    *   Recuperar os modelos JSON-LD JSON através da L2 e parseá-los usando a **Taxonomia do BSP** nativamente embutida nos clientes.
    *   Descriptografar os blocos restritos usando as chaves locais exclusivas privadas do usuário e enviar a biologia limpa para uma IA desenhar as tabelas de longevidade, diagnósticos prescritivos ou regimes esportivos hiperpersonalizados.

## As Três Camadas

| Camada | O Que Define |
| --- | --- |
| **Camada 1 — Identidade** | Quem detém os dados. Cada indivíduo e cada instituição no ecossistema BSP possui uma identidade permanente e descentralizada: o Objeto de Entidade Biológica (BEO) ou Objeto de Entidade Institucional (IEO). |
| **Camada 2 — Dados** | O que os dados contêm. Cada medição biológica é estruturada como um BioRegistro — uma unidade padronizada e imutável de informação biológica ancorada a um BEO específico e classificada sob a taxonomia BSP. |
| **Camada 3 — Troca** | Como os dados se movem. O Protocolo de Troca BSP define o formato de requisições e respostas entre sistemas — como qualquer sistema envia dados para um BEO, como uma plataforma solicita acesso, como um motor de IA consulta um histórico biológico completo. |

## O Objeto de Entidade Biológica (BEO)

O BEO é a identidade biológica soberana de cada indivíduo no ecossistema BSP. É o centro de gravidade de todo o protocolo.

Um BEO não é uma conta em uma plataforma. É uma identidade permanente, armazenada na blockchain Arweave, controlada exclusivamente pelo indivíduo através de uma chave privada. Cada BEO é identificado por um domínio `.bsp` legível por humanos — um endereço biológico permanente (por exemplo, `andre.bsp`).

## O BioRegistro

Cada medição biológica — um resultado de exame de sangue, um marcador genômico, uma leitura de dispositivo vestível, um relatório de imagem — é representada como um BioRegistro.

Qualquer sistema pode tentar submeter um BioRegistro a um BEO. O que governa o acesso é o consentimento do titular do BEO, codificado no contrato inteligente `AccessControl` na Arweave. BioRegistros são imutáveis uma vez escritos.

## Infraestrutura Descentralizada

Os registros BSP são armazenados na Arweave — um protocolo de armazenamento permanente e descentralizado projetado para preservar dados por mais de 200 anos.

Contratos inteligentes que gerenciam identidades BEO, registros de domínio `.bsp` e permissões de acesso são implantados via SmartWeave na Arweave — garantindo que as regras do protocolo não possam ser alteradas por nenhum ator único.

## O Modelo de Soberania

A arquitetura técnica do BSP é projetada para tornar a soberania individual o padrão:
*   **Propriedade permanente**: O indivíduo possui seu BEO e todos os BioRegistros dentro dele por toda a vida.
*   **Consentimento granular**: Cada solicitação de acesso de terceiros requer consentimento explícito do titular do BEO.
*   **Submissão aberta**: Qualquer sistema pode submeter BioRegistros a um BEO — sujeito ao consentimento do titular.
*   **Portabilidade**: Qualquer dado em um BEO pode ser exportado no formato padrão BSP a qualquer momento.
*   **Imutabilidade**: BioRegistros não podem ser alterados ou excluídos uma vez escritos.
*   **Controle criptográfico**: O acesso é controlado por chaves privadas mantidas pelo indivíduo.
