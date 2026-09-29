import type { Service } from '../types'

const category = 'engenharia-mecanica' as const

export const engenhariaMecanica: Service[] = [
  {
    slug: 'nr-12-maquinas-e-equipamentos',
    category,
    title: 'NR-12 — Máquinas e Equipamentos',
    short: 'Adequação, laudos e projetos NR-12',
    summary:
      'Inventário, apreciação de riscos, laudo e projeto de adequação de máquinas e equipamentos à NR-12, com ART de engenheiro mecânico.',
    norma: 'NR-12',
    icon: 'cog',
    image: '/images/maquina-nr12.webp',
    featured: true,
    whatIs: [
      'A NR-12 define referências técnicas, princípios fundamentais e medidas de proteção para garantir a saúde e a integridade física dos trabalhadores nas fases de projeto e utilização de máquinas e equipamentos de todos os tipos — incluindo fabricação, importação, comercialização e cessão.',
      'Máquinas com movimentos giratórios, alternados ou retilíneos oferecem riscos de puxar, esmagar, decepar, furar ou queimar. A norma exige que o empregador adote medidas de proteção nesta ordem de prioridade: proteção coletiva, medidas administrativas e de organização do trabalho e, por fim, proteção individual.',
    ],
    whenRequired: [
      'Toda empresa que utiliza, fabrica, importa ou comercializa máquinas e equipamentos.',
      'Na aquisição, reforma ou mudança de layout de máquinas.',
      'Em notificações de fiscalização ou exigências de seguradoras e clientes.',
    ],
    deliverables: [
      'Inventário de máquinas e equipamentos',
      'Apreciação e classificação de riscos (HRN / ABNT NBR ISO 12100)',
      'Laudo técnico NR-12 com ART',
      'Projeto mecânico de adequação: proteções fixas e móveis, dispositivos de parada de emergência, sistemas de segurança e acessos',
      'Especificação de sinalização e procedimentos de bloqueio (LOTO)',
      'Acompanhamento da implantação e validação final',
    ],
    steps: [
      'Visita técnica e levantamento das máquinas',
      'Apreciação de riscos por máquina',
      'Laudo com plano de ação priorizado',
      'Projeto das adequações e acompanhamento da execução',
    ],
    faq: [
      {
        q: 'Quem pode assinar o laudo NR-12?',
        a: 'Profissional legalmente habilitado — no caso de máquinas, engenheiro mecânico com registro no CREA, que emite a ART correspondente.',
      },
      {
        q: 'Máquinas antigas também precisam se adequar?',
        a: 'Sim. A NR-12 se aplica a máquinas novas e usadas; para as antigas, a apreciação de riscos define as medidas de proteção necessárias.',
      },
    ],
    needsReview: 'Lista de entregáveis ampliada (HRN, LOTO); confirmar escopo oferecido.',
    legacyUrls: ['/copia-servicos-2', '/copia-projeto-mecanico-elevadores-1'],
  },
  {
    slug: 'nr-13-caldeiras-e-vasos-de-pressao',
    category,
    title: 'NR-13 — Caldeiras, Vasos de Pressão e Tubulações',
    short: 'Inspeção, prontuário e laudo NR-13',
    summary:
      'Inspeção de segurança de caldeiras, vasos de pressão e tubulações, cálculo de PMTA, prontuário e laudo NR-13 com ART.',
    norma: 'NR-13',
    icon: 'gauge',
    image: '/images/caldeira.webp',
    featured: true,
    whatIs: [
      'A NR-13 estabelece requisitos para a gestão da integridade estrutural de caldeiras a vapor, vasos de pressão, tubulações e tanques metálicos de armazenamento, visando a segurança de quem opera e de quem está no entorno.',
      'O engenheiro mecânico habilitado identifica e classifica os equipamentos, verifica a proteção contra sobrepressão, calcula a PMTA, organiza o prontuário, define os intervalos de inspeção e treina operadores. Uma inspeção de caldeira não é apenas um documento exigido pela fiscalização: é segurança e responsabilidade.',
    ],
    whenRequired: [
      'Caldeiras a vapor de qualquer porte.',
      'Vasos de pressão com produto P·V superior a 8 (P em kPa, V em m³) ou que contenham fluido classe A (inflamáveis, tóxicos, hidrogênio, acetileno).',
      'Tubulações interligadas a caldeiras ou vasos que contenham fluidos classe A ou B.',
      'Compressores de ar com reservatório enquadrado pela norma.',
    ],
    deliverables: [
      'Inspeção de segurança inicial, periódica e extraordinária',
      'Cálculo de PMTA e PMTP',
      'Prontuário, registro de segurança e placa de identificação',
      'Medição de espessura por ultrassom e teste hidrostático',
      'Laudo NR-13 com ART',
      'Plano de inspeção e cronograma de vencimentos',
    ],
    faq: [
      {
        q: 'O laudo NR-13 do meu vaso de pressão venceu. E agora?',
        a: 'Entre em contato: agendamos a inspeção periódica, executamos os ensaios necessários e emitimos o novo laudo com ART.',
      },
      {
        q: 'A NR-13 se aplica a extintores e cilindros transportáveis?',
        a: 'Não. Cilindros transportáveis, extintores, vasos destinados à ocupação humana e vasos integrantes de máquinas rotativas estão fora do escopo da norma.',
      },
    ],
    needsReview: 'Escopo atualizado para a NR-13 vigente (inclui tanques metálicos); confirmar.',
    legacyUrls: ['/copia-nr-12-maquinas-e-equipamentos'],
  },
  {
    slug: 'testes-hidrostaticos-e-ultrassom',
    category,
    title: 'Teste Hidrostático e Medição de Espessura por Ultrassom',
    short: 'Ensaios em vasos de pressão',
    summary:
      'Teste hidrostático e medição de espessura por ultrassom em vasos de pressão e reservatórios de compressores em São João da Boa Vista e região.',
    norma: 'NR-13',
    icon: 'gauge',
    image: '/images/teste-hidrostatico.webp',
    whatIs: [
      'O teste hidrostático verifica a estanqueidade e a resistência do equipamento submetendo-o a uma pressão controlada, superior à de operação. A medição de espessura por ultrassom identifica perda de material por corrosão sem danificar o equipamento.',
      'Os dois ensaios alimentam a inspeção de segurança NR-13 e o cálculo da PMTA, garantindo que o equipamento opere dentro de limites seguros.',
    ],
    deliverables: [
      'Medição de espessura por ultrassom com mapa de pontos',
      'Teste hidrostático com registro de pressão e tempo',
      'Relatório técnico e atualização do prontuário',
      'ART de engenheiro mecânico',
    ],
    legacyUrls: ['/cópia-projetos-de-galpões'],
  },
  {
    slug: 'refrigeracao',
    category,
    title: 'Refrigeração Industrial e Comercial',
    short: 'Projetos de refrigeração',
    summary:
      'Projetos de refrigeração industrial e comercial, do conceitual ao executivo, com análise energética, comissionamento e retrofit.',
    icon: 'snowflake',
    image: '/images/refrigeracao.webp',
    whatIs: [
      'Nossa equipe atua em refrigeração industrial e comercial com base em tecnologia atualizada e projeto sustentável, dos sistemas convencionais aos mais complexos.',
    ],
    deliverables: [
      'Projeto base (conceitual) e executivo (detalhamento final)',
      'Balanço termodinâmico e análises energéticas',
      'Memorial descritivo, estimativa de custos e planilha quantitativa',
      'Comissionamento e retrocomissionamento',
      'Inspeções técnicas, análise de desempenho e retrofits',
      'Parecer técnico em projetos e instalações existentes',
    ],
    legacyUrls: ['/copia-refrigeracao'],
  },
  {
    slug: 'ar-condicionado',
    category,
    title: 'Ar-Condicionado e Climatização',
    short: 'Projetos de climatização',
    summary:
      'Projetos de ar-condicionado e climatização com foco em conforto térmico, eficiência energética e redução de emissões.',
    icon: 'wind',
    image: '/images/ar-condicionado.webp',
    whatIs: [
      'Desenvolvemos desde projetos de climatização convencionais até os mais complexos, com foco em eficiência energética, projeto sustentável e redução das emissões de gases de efeito estufa.',
    ],
    deliverables: [
      'Projeto base e projeto executivo',
      'Cálculo de carga térmica e conforto térmico',
      'Análises energéticas',
      'Memorial descritivo, estimativa de custos e planilha quantitativa',
      'Comissionamento, retrocomissionamento e retrofits',
      'Inspeções técnicas e parecer em instalações existentes',
    ],
    legacyUrls: ['/copia-refrigeracao-1'],
  },
  {
    slug: 'tubulacao-e-hidraulica',
    category,
    title: 'Tubulação e Hidráulica',
    short: 'Instalações hidráulicas e de vapor',
    summary:
      'Projetos de instalações hidráulicas de água fria e quente, bombeamento, hidrossanitárias e geração de vapor.',
    icon: 'droplets',
    image: '/images/tubulacao.webp',
    whatIs: [
      'Atuamos em sistemas de instalações hidráulicas de água fria e quente, bombeamento, parques aquáticos, instalações hidrossanitárias e geração de vapor para os segmentos educacional, saúde, comércio, esporte e indústria.',
    ],
    deliverables: [
      'Levantamento de redes existentes',
      'Estudos de viabilidade e estimativa de custo',
      'Projeto básico e executivo',
      'Projeto de aquecimento solar e a gás',
      'Auditoria, inspeção técnica e análise de desempenho',
      'Revisão e parecer técnico em projetos existentes',
    ],
    legacyUrls: ['/copia-ar-condicionado'],
  },
  {
    slug: 'exaustao-e-ventilacao',
    category,
    title: 'Exaustão e Ventilação',
    short: 'Exaustão, ventilação e pressurização',
    summary:
      'Projetos de exaustão, ventilação e pressurização para cozinhas industriais, garagens, processos industriais e escadas de incêndio.',
    icon: 'wind',
    image: '/images/exaustao.webp',
    whatIs: [
      'Projetamos sistemas de exaustão, ventilação e pressurização para cozinhas profissionais, sanitários, garagens, halls, rotas de fuga, processos industriais, galpões e casas de máquinas.',
    ],
    deliverables: [
      'Controle de fumaça para proteção contra incêndio',
      'Pressurização de escadas de incêndio em edifícios',
      'Difusão e renovação de ar',
      'Ventilação natural e mecânica',
      'Memorial de cálculo e projeto executivo',
    ],
    legacyUrls: ['/copia-tubulacao-e-hidraulica'],
  },
  {
    slug: 'ruidos-e-vibracoes',
    category,
    title: 'Ruídos e Vibrações Mecânicas',
    short: 'Avaliação e controle de ruído',
    summary:
      'Avaliação e controle de ruído e vibrações mecânicas em sistemas e equipamentos, com projeto de atenuação e monitoramento.',
    icon: 'volume',
    image: '/images/ruidos.webp',
    whatIs: [
      'Muitas instalações apresentam ruído e vibração excessivos mesmo com equipamentos adequados, porque eles não foram integrados em um sistema corretamente projetado ou algum detalhe foi omitido.',
      'Desenvolvemos soluções para o controle de ruído e vibrações mecânicas desde a avaliação até o monitoramento.',
    ],
    deliverables: [
      'Avaliação de ruído e vibrações mecânicas',
      'Projeto e consultoria para atenuação',
      'Estudo de impacto ambiental',
      'Relatório e monitoramento de emissões',
    ],
    legacyUrls: ['/copia-exaustao-e-ventilacao'],
  },
  {
    slug: 'instalacao-de-maquinas-industriais',
    category,
    title: 'Instalação de Máquinas e Equipamentos Industriais',
    short: 'Projeto de instalação e bases',
    summary:
      'Projeto e acompanhamento da instalação de máquinas e equipamentos industriais: bases, fixação, utilidades e liberação segura.',
    icon: 'factory',
    image: '/images/instalacao-maquinas.webp',
    whatIs: [
      'Planejamos a instalação de máquinas e equipamentos industriais considerando layout, bases e fixação, alimentação de utilidades (ar comprimido, vapor, água) e os requisitos de segurança da NR-12.',
    ],
    deliverables: [
      'Estudo de layout e interferências',
      'Projeto de bases e fixação',
      'Especificação de utilidades',
      'Acompanhamento técnico da instalação e liberação com ART',
    ],
    needsReview: 'Página antiga só tinha o título; texto novo precisa de validação técnica.',
    legacyUrls: ['/copia-ruidos-e-vibracoes-mecanica-1'],
  },
  {
    slug: 'projetos-de-gas-glp',
    category,
    title: 'Projetos de Gás GLP',
    short: 'Centrais e redes de GLP',
    summary:
      'Projeto técnico de centrais e redes de GLP com laudo, ART e teste de estanqueidade para condomínios, hospitais, comércio e indústria.',
    icon: 'flame',
    image: '/images/glp.webp',
    whatIs: [
      'As instalações prediais de gás podem ser abastecidas por rede de rua ou por central de GLP, com o gás conduzido por um sistema de tubulações que deve ser estanque, desobstruído e dotado de válvulas de bloqueio em cada ponto necessário à segurança, operação e manutenção.',
      'O GLP é amplamente usado na indústria e no comércio pela alta eficiência e poder calorífico. Um projeto correto garante segurança e aprovação junto ao Corpo de Bombeiros.',
    ],
    deliverables: [
      'Projeto técnico da central e da rede de distribuição',
      'Memorial de cálculo e dimensionamento',
      'Teste de estanqueidade',
      'Laudo de GLP e ART para AVCB/CLCB',
    ],
    faq: [
      {
        q: 'Onde a ENGTECN já executou projetos de GLP?',
        a: 'Entre outros, no Condomínio Areias, na UPA e na Santa Casa de Misericórdia de São João da Boa Vista — todos com laudo, ART e teste de estanqueidade.',
      },
    ],
    legacyUrls: ['/copia-gerenciamento-de-projetos-1', '/copia-projetos-estruturais-monorail'],
  },
  {
    slug: 'elevadores',
    category,
    title: 'Responsabilidade Técnica em Elevadores',
    short: 'Engenheiro responsável por elevadores',
    summary:
      'Engenheiro mecânico responsável técnico por projeto, instalação e manutenção de elevadores, com emissão de ART junto ao CREA.',
    icon: 'arrow-up-down',
    whatIs: [
      'Todo edifício com elevador precisa de um engenheiro mecânico responsável pela manutenção do equipamento. Empresas que atuam em projeto, fabricação, instalação, inspeção e manutenção de elevadores, escadas rolantes e plataformas de acessibilidade devem registrar a atividade no CREA.',
      'Atuamos como responsáveis técnicos de empresas de elevadores desde 2016, com mais de 20 obras e serviços com ART.',
    ],
    deliverables: [
      'Responsabilidade técnica perante o CREA',
      'ART de manutenção, instalação e modernização',
      'Projetos mecânicos de elevadores e plataformas',
      'Inspeções e pareceres técnicos',
    ],
    legacyUrls: ['/projects'],
  },
  {
    slug: 'gerenciamento-de-projetos',
    category,
    title: 'Gerenciamento de Projetos',
    short: 'Gestão da implantação',
    summary:
      'Gerenciamento de projetos de engenharia na fase de implantação: escopo, contratos, orçamento, prazos e qualidade.',
    icon: 'clipboard',
    image: '/images/gerenciamento.webp',
    whatIs: [
      'Atuamos principalmente na fase de implantação, de forma acessível e colaborativa com a equipe do cliente, para traduzir a intenção do projeto no projeto instalado.',
    ],
    deliverables: [
      'Adequação do escopo de serviços aos recursos',
      'Administração de contratos',
      'Controle de orçamento, prazos e garantia de qualidade',
      'Estudos de viabilidade técnico-econômica',
      'Compatibilização entre disciplinas',
    ],
    legacyUrls: ['/copia-ruidos-e-vibracoes-mecanica'],
  },
]
