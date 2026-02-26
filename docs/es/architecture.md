# Protocol Architecture

---
title: "Diagrama de Arquitectura"
---

# La Arquitectura de Tres Capas

El Protocolo de Soberanía Biológica fue diseñado intencionalmente utilizando un modelo estricto de "Cliente-Ligero" (Thin-Client) sobre tres capas abstraídas. Este diseño asegura la descentralización permanente de los registros vitales, al tiempo que empuja la enorme carga de consultar grandes volúmenes de datos hacia el lado de aplicaciones locales.

<Architecture3Layer />

*(El diagrama anterior traza el ciclo de vida completo de los datos: desde la presentación clínica a la Máquina de Estados de SmartWeave, hasta el consumo local manejado por el cliente).*

---

## Capa 1: Ledger Universal Canónico (L1)

En el corazón del protocolo, la Capa 1 descarta los servidores de AWS y las clásicas bases de datos PostgreSQL en favor de una prueba criptográfica perpetua e irrompible.

*   **Infraestructura:** La Permanet de Arweave y el contrato inteligente *Biological-State-Machine* (SmartWeave).
*   **Propósito:** La única fuente de la verdad humana permanente y descentralizada.
*   **Responsabilidad:** 
    *   Almacenar enormes objetos JSON-LD (Cargas de *BioRecords*) permanentemente en los bloques ("blockweave") de Arweave para siempre.
    *   Gestionar la lógica central de clasificación donde un IEO (Entidad Corporativa Médica) envía datos a un BEO (Cuenta Pública Personal).
    *   Ejecutar el Contrato de Consentimiento (Asegurar que la App de entrenamiento solo pueda leer los datos de Juan si Juan firmó explícitamente y digitalmente este permiso).

> **La Regla de Oro:** L1 nunca rastrea información como el "Nombre Real de Juan" o el Documento de Identidad (DNI) en las redes públicas. Solo empareja información clínica rígida (Glucosa = 85mg/dL) con firmas de billeteras públicas (Hashes). Toda información de Identidad en el Mundo Real (PII) requiere cifrado simétrico extremo a extremo gestionado fuera de la Blockchain directamente por los agentes locales.

---

## Capa 2: La capa D.A.N (L2)

Las arquitecturas de cadena de bloques son notoriamente pésimas para encontrar y consultar archivos JSON rápidamente. Una aplicación móvil de fitness no puede esperar 30 segundos (el tiempo de carga del nodo principal) para mostrar rutinas diarias. Es por eso que el ecosistema ordena el uso de la D.A.N (Data Access Network).

*   **Infraestructura:** Potentes servidores caché en GraphQL (ej. GoldSky, TheGraph) o nodos de indexación mantenidos por la comunidad global.
*   **Propósito:** Velocidad ultrarrápida de Caché y Agregación.
*   **Responsabilidad:**
    *   Consultar de forma continua en paralelo los contratos de Arweave en búsqueda de nuevas interacciones y billeteras del protocolo BSP.
    *   Normalizar y limpiar las gigantescas meta-etiquetas de los contratos descentralizados (SmartWeave) transformándolos a estructuras que el servidor pueda manipular casi en tiempo real.
    *   Proveer conectores webs rápidos con solo 15ms de latencia, que permiten a las aplicaciones realizar comandos de alta carga (ej., *"Recupere todo el perfil y el historial de lípidos completos del usuario xyz6 de todo el rango ocupando el año 2024"*).

La elegancia real e intrínseca de esta capa es que cualquier grupo de nodos L2 puede **fallar y ser colapsados** de manera individual y todo el tejido seguirá fluyendo. Un nuevo clúster de L2 puede instalarse en minutos, leer datos criptográficos duros (Hashes L1) desde Arweave y reactivar nuevamente todos los servidores en horas.

---

## Capa 3: Desarrollo Externo, Lógica de Aplicación y SDK (L3)

El protocolo en sí (BSP) **no tiene y nunca hospedará** paneles y aplicaciones médicas finales para control humano a través de un portal principal. La información y gestión en salud final para los pacientes es íntegramente generada en este punto L3 de "borde" del protocolo por desarrolladores y programadores a través de Inteligencia Artificial (usando nuestros módulos oficiales (SDK-JS/Typescript, Python BSP)).

*   **Infraestructura:** Su propio código o aplicación (Telas diseñadas en sistemas NextJS o paneles nativos creados en iOS Swift o sistemas Backend en NodeJS/Python).
*   **Propósito:** Interpretación biológica "creadora de sentido" unida a interfaces visuales de alto nivel.
*   **Responsabilidad:**
    *   Proveedor de interfaces (UI), implementando además el botón oficial "Conéctese con inicio seguro de BSP Auth".
    *   Buscar porciones de JSON-LD mediante los conectores D.A.N-L2 y traducir todo a variables locales parseadas de forma pura utilizando nuestra exclusiva **Taxonomía Nativa BSP** que ya está incorporada por defecto.
    *   Descifrar los bloques de información confidenciales y vulnerables empleando un sistema exclusivo privado con las llaves locales del usuario (que no salen de la máquina local) y transmitir esa matriz estructural a servidores y motores de modelos mayores de I.A que usarán la biología base en la investigación hacia intervenciones y la medicina predictiva dirigida de acuerdo con la prevención personalizada.

## El Objeto de Entidad Biológica (BEO)

El BEO es la identidad biológica soberana de cada individuo en el ecosistema BSP. Es el centro de gravedad de todo el protocolo.

Un BEO no es una cuenta en una plataforma. Es una identidad permanente, almacenada en la blockchain de Arweave, controlada exclusivamente por el individuo a través de una clave privada. Cada BEO se identifica por un dominio `.bsp` legible por humanos — una dirección biológica permanente (ej., `andre.bsp`).

## El BioRegistro

Cada medición biológica — un resultado de análisis de sangre, un marcador genómico, una lectura de un dispositivo wearable, un informe de imagen — se representa como un BioRegistro.

Cualquier sistema puede intentar enviar un BioRegistro a un BEO. Lo que rige el acceso es el consentimiento del titular del BEO, codificado en el contrato inteligente `AccessControl` en Arweave. Los BioRegistros son inmutables una vez escritos.

## Infraestructura Descentralizada

Los registros BSP se almacenan en Arweave — un protocolo de almacenamiento permanente y descentralizado diseñado para preservar datos durante más de 200 años.

Los contratos inteligentes que gestionan las identidades BEO, los registros de dominio `.bsp` y los permisos de acceso se implementan a través de SmartWeave en Arweave — asegurando que las reglas del protocolo no puedan ser cambiadas por ningún actor individual.

## El Modelo de Soberanía

La arquitectura técnica de BSP está diseñada para hacer de la soberanía individual el valor predeterminado:
*   **Propiedad permanente**: El individuo posee su BEO y todos los BioRegistros dentro de él de por vida.
*   **Consentimiento granular**: Cada solicitud de acceso de terceros requiere el consentimiento explícito del titular del BEO.
*   **Envío abierto**: Cualquier sistema puede enviar BioRegistros a un BEO — sujeto al consentimiento del titular.
*   **Portabilidad**: Cualquier dato en un BEO puede exportarse en formato estándar BSP en cualquier momento.
*   **Inmutabilidad**: Los BioRegistros no pueden ser alterados o eliminados una vez escritos.
*   **Control criptográfico**: El acceso es controlado por claves privadas en posesión del individuo.
