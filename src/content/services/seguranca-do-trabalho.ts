import type { Service } from '../types'

const category = 'seguranca-do-trabalho' as const

export const segurancaDoTrabalho: Service[] = [
  {
    slug: 'pgr-programa-de-gerenciamento-de-riscos',
    category,
    title: 'PGR — Programa de Gerenciamento de Riscos',
    short: 'PGR (substitui o PPRA e o PCMAT)',
    summary:
      'Elaboração e revisão do PGR conforme NR-1: inventário de riscos e plano de ação para indústrias, comércio e construção civil.',
    norma: 'NR-1',
    icon: 'shield',
    image: '/images/equipe.webp',
    featured: true,
    whatIs: [
      'Desde 2022 o PGR substituiu o antigo PPRA (NR-9) e, na construção civil, o PCMAT (NR-18). Ele integra o Gerenciamento de Riscos Ocupacionais (GRO) da NR-1 e é composto pelo inventário de riscos e pelo plano de ação.',
      'O programa se baseia na antecipação, reconhecimento, avaliação e controle dos riscos existentes — ou que venham a existir — nos ambientes de trabalho, preservando a saúde e a integridade física dos colaboradores e dando suporte ao PCMSO, ao LTCAT e ao eSocial.',
    ],
    whenRequired: [
      'Todas as empresas com empregados regidos pela CLT (MEI e algumas ME/EPP de grau de risco 1 e 2 podem ter tratamento diferenciado).',
      'Canteiros de obra, com o PGR específico da NR-18.',
      'Na revisão periódica, em mudanças de processo ou após acidentes.',
    ],
    deliverables: [
      'Inventário de riscos ocupacionais por setor e função',
      'Avaliações qualitativas e quantitativas dos agentes',
      'Plano de ação com metas, prioridades e cronograma',
      'Um PGR por CNPJ/estabelecimento e por frente de trabalho externa',
      'Acompanhamento de prazos, vencimentos e medidas de controle',
      'Dados de base para PPP, LTCAT e eventos de SST do eSocial',
    ],
    faq: [
      {
        q: 'Minha empresa ainda tem PPRA. Ele vale?',
        a: 'Não. O PPRA foi substituído pelo PGR em janeiro de 2022. Revisamos o documento existente e o convertemos para o formato exigido pela NR-1.',
      },
      {
        q: 'O PCMAT ainda é exigido nas obras?',
        a: 'Não. Na construção civil, o PCMAT foi substituído pelo PGR conforme a NR-18.',
      },
    ],
    needsReview:
      'Conteúdo antigo falava em PPRA (NR-9) e PCMAT; reescrito para PGR (NR-1/NR-18). Validar texto e critérios de dispensa.',
    legacyUrls: ['/copia-ppra-nr-9', '/copia-ppr'],
  },
  {
    slug: 'pgr-mineracao',
    category,
    title: 'PGR para Mineração (NR-22)',
    short: 'PGR específico para mineração',
    summary:
      'Programa de Gerenciamento de Riscos e Plano de Ações Emergenciais para mineração subterrânea, a céu aberto, garimpo e beneficiamento.',
    norma: 'NR-22',
    icon: 'factory',
    whatIs: [
      'Destinado a empresas de mineração, o PGR da NR-22 compatibiliza o planejamento das atividades com a segurança e saúde dos colaboradores.',
      'Contempla riscos físicos, químicos e biológicos, atmosferas explosivas, deficiência de oxigênio, ventilação, proteção respiratória, trabalho em altura e em espaços confinados, energia elétrica, máquinas e veículos, estabilidade do maciço e plano de emergência.',
    ],
    whenRequired: [
      'Mineração subterrânea e a céu aberto, garimpos, beneficiamento mineral e pesquisa mineral.',
    ],
    deliverables: [
      'Antecipação, reconhecimento, avaliação e controle dos riscos',
      'Prioridades, metas e cronograma',
      'Plano de Ações Emergenciais',
      'Registro e manutenção dos dados por no mínimo 20 anos',
    ],
    legacyUrls: ['/copia-pcmat'],
  },
  {
    slug: 'ltcat',
    category,
    title: 'LTCAT — Laudo Técnico das Condições Ambientais do Trabalho',
    short: 'LTCAT e aposentadoria especial',
    summary:
      'LTCAT com avaliações qualitativas e quantitativas de agentes físicos, químicos e biológicos, base para PPP e aposentadoria especial.',
    icon: 'file-check',
    image: '/images/ltcat.webp',
    featured: true,
    whatIs: [
      'O LTCAT determina se os colaboradores estão expostos a agentes nocivos que dão direito à aposentadoria especial e fornece os dados para o Perfil Profissiográfico Previdenciário (PPP) e para o eSocial.',
      'Segue a estrutura das instruções normativas do INSS e avalia agentes físicos (ruído, calor, frio, radiações), químicos e biológicos, indicando medidas de eliminação, neutralização ou redução.',
    ],
    deliverables: [
      'Avaliações qualitativas e quantitativas por GHE (setor/função)',
      'Enquadramento para aposentadoria especial',
      'Recomendações de controle',
      'Laudo assinado por engenheiro de segurança do trabalho',
    ],
    needsReview: 'Texto antigo citava IN 100 do INSS e PPRA; atualizar referência normativa vigente.',
    legacyUrls: ['/copia-projetos', '/ltcat-ppp-aposentadoria-especial'],
  },
  {
    slug: 'ppp-perfil-profissiografico',
    category,
    title: 'PPP — Perfil Profissiográfico Previdenciário',
    short: 'Emissão e atualização do PPP',
    summary:
      'Elaboração do PPP com histórico laboral, exposição a agentes nocivos e monitoração biológica de cada colaborador.',
    icon: 'clipboard',
    whatIs: [
      'O PPP documenta o histórico laboral do colaborador: dados administrativos, exposição a agentes nocivos e resultados de monitoração biológica. É usado para comprovar direito a benefícios previdenciários, como aposentadoria especial.',
      'Hoje o PPP é emitido em meio eletrônico a partir das informações de SST enviadas ao eSocial. Deixar de mantê-lo atualizado ou de entregá-lo no desligamento gera multa.',
    ],
    whenRequired: [
      'Empresas cujos colaboradores estão expostos a agentes nocivos químicos, físicos ou biológicos.',
      'A cada atualização das avaliações ambientais, no desligamento e em pedidos de benefício ao INSS.',
    ],
    deliverables: [
      'Levantamento de atividades, agentes, intensidade e exames',
      'Emissão e atualização do PPP',
      'Integração com LTCAT, PGR e eSocial',
    ],
    needsReview: 'Mencionado PPP eletrônico via eSocial; confirmar como a empresa opera hoje.',
    legacyUrls: ['/copia-contato'],
  },
  {
    slug: 'laudo-de-insalubridade',
    category,
    title: 'Laudo de Insalubridade (NR-15)',
    short: 'Caracterização de insalubridade',
    summary:
      'Perícia técnica para caracterizar insalubridade (10%, 20% ou 40%) conforme NR-15, com avaliação de ruído, calor e agentes químicos.',
    norma: 'NR-15',
    icon: 'alert',
    whatIs: [
      'Atividades em condições insalubres dão direito a adicional de 10%, 20% ou 40% do salário-mínimo, conforme o grau. O laudo identifica se há ou não esse direito, considerando os limites de tolerância e as proteções fornecidas.',
      'A avaliação usa o conceito de Grupo Homogêneo de Exposição (GHE) e segue os Artigos 189, 191 e 195 da CLT e a NR-15.',
    ],
    deliverables: [
      'Estudo das operações, fontes geradoras e tempo de exposição',
      'Avaliações quantitativas (ruído, calor, químicos) e qualitativas',
      'Caracterização do grau de insalubridade por função',
      'Medidas para eliminação ou neutralização',
      'Laudo emitido em até 30 dias após a perícia',
    ],
    legacyUrls: ['/copia-laudo-de-instalacoes-eletrica'],
  },
  {
    slug: 'laudo-de-periculosidade',
    category,
    title: 'Laudo de Periculosidade (NR-16)',
    short: 'Caracterização de periculosidade',
    summary:
      'Laudo técnico conforme NR-16 para definir as funções com direito ao adicional de periculosidade de 30%.',
    norma: 'NR-16',
    icon: 'zap',
    whatIs: [
      'A NR-16 define as atividades e operações perigosas — inflamáveis, explosivos, energia elétrica, radiações ionizantes, segurança patrimonial, motocicleta, entre outras. O trabalho nessas condições assegura adicional de 30% sobre o salário-base.',
      'O laudo avalia as atividades e áreas de risco da empresa e define, função por função, quem faz jus ao adicional.',
    ],
    deliverables: [
      'Avaliação das atividades e áreas de risco',
      'Caracterização por função',
      'Recomendações preventivas',
      'Laudo técnico com ART',
    ],
    legacyUrls: ['/copia-laudo-de-insalubridade'],
  },
  {
    slug: 'analise-ergonomica-nr-17',
    category,
    title: 'Análise Ergonômica do Trabalho (NR-17)',
    short: 'AEP, AET e avaliação de postos',
    summary:
      'Avaliação ergonômica preliminar (AEP) e Análise Ergonômica do Trabalho (AET) conforme NR-17, com plano de melhorias.',
    norma: 'NR-17',
    icon: 'users',
    whatIs: [
      'A análise ergonômica adapta as condições de trabalho às características psicofisiológicas dos colaboradores, buscando conforto, desempenho eficiente e segurança.',
      'Considera mobiliário, equipamentos, levantamento e transporte de cargas, condições ambientais (ruído, temperatura, velocidade do ar, umidade) e organização do trabalho, usando métodos como RULA e NIOSH. Inclui a avaliação de postos de trabalho (APT) para prevenção de DORT.',
    ],
    whenRequired: [
      'Todas as empresas precisam da Avaliação Ergonômica Preliminar (AEP) integrada ao PGR.',
      'A AET é exigida quando a AEP indica necessidade, em alterações de posto ou mobiliário e em casos de adoecimento.',
    ],
    deliverables: [
      'Vistoria técnica e questionários',
      'Levantamentos ergonômicos e ambientais por posto',
      'Registro fotográfico e em vídeo',
      'Relatório com ações corretivas priorizadas',
    ],
    needsReview: 'Atualizado para AEP/AET da NR-17 revisada (2021); texto antigo citava PPRA e portaria de 1990.',
    legacyUrls: ['/copia-clientes', '/copia-ppp'],
  },
  {
    slug: 'ppr-protecao-respiratoria',
    category,
    title: 'PPR — Programa de Proteção Respiratória',
    short: 'Seleção e uso de respiradores',
    summary:
      'Programa de Proteção Respiratória conforme FUNDACENTRO: seleção de respiradores, ensaio de vedação, treinamento e monitoramento.',
    icon: 'lungs',
    whatIs: [
      'O PPR estabelece as diretrizes para o trabalho com aerodispersoides e possível deficiência de oxigênio: reconhecimento e quantificação dos agentes, seleção dos EPIs adequados e práticas corretas de uso, guarda e manutenção dos respiradores.',
    ],
    deliverables: [
      'Seleção de respiradores e fatores de proteção',
      'Ensaio de vedação',
      'Procedimentos de uso, emergência e higienização',
      'Treinamento dos usuários',
      'Critérios de avaliação médica e relatório anual',
    ],
    legacyUrls: ['/copia-analise-preliminar-de-risco'],
  },
  {
    slug: 'apr-analise-preliminar-de-risco',
    category,
    title: 'APR — Análise Preliminar de Risco',
    short: 'Antecipação de riscos por tarefa',
    summary:
      'Análise Preliminar de Risco para antecipar os perigos de cada etapa da tarefa e definir controles antes da execução.',
    icon: 'alert',
    whatIs: [
      'A APR é uma visão antecipada do trabalho a ser executado: identifica os riscos de cada passo da tarefa e define como eliminá-los ou controlá-los. Aplica-se a qualquer atividade e estimula o trabalho em equipe e a responsabilidade compartilhada.',
    ],
    deliverables: [
      'APR por atividade ou serviço',
      'Matriz de riscos e medidas de controle',
      'Orientação das equipes',
    ],
    legacyUrls: ['/copia-laudo-de-ruido-externo'],
  },
  {
    slug: 'mapa-de-risco',
    category,
    title: 'Mapa de Riscos (NR-5)',
    short: 'Mapa de riscos ambientais',
    summary:
      'Elaboração do mapa de riscos sobre a planta da empresa, com participação dos colaboradores e da CIPA.',
    norma: 'NR-5',
    icon: 'map',
    whatIs: [
      'O mapa de riscos representa visualmente, sobre a planta da empresa, os riscos de cada área — com círculos de três tamanhos (intensidade) e cores (tipo de risco) — e estimula a participação dos colaboradores nas atividades de prevenção.',
    ],
    deliverables: [
      'Estudo dos processos de trabalho',
      'Levantamento de colaboradores por setor, jornada e treinamentos',
      'Identificação de instrumentos e materiais',
      'Mapa de riscos por setor sobre a planta',
    ],
    legacyUrls: ['/copia-cipa'],
  },
  {
    slug: 'cipa',
    category,
    title: 'CIPA — Implantação e Treinamento (NR-5)',
    short: 'Eleição, posse e curso da CIPA',
    summary:
      'Implantação completa da CIPA — edital, eleição, atas e calendário — e treinamento dos membros conforme NR-5.',
    norma: 'NR-5',
    icon: 'users',
    whatIs: [
      'A CIPA observa e relata condições de risco nos ambientes de trabalho e solicita medidas para eliminá-las, prevenindo acidentes e doenças.',
      'Operacionalizamos toda a implantação e preparamos os membros para o mandato de um ano, com treinamento ministrado por profissionais habilitados.',
    ],
    deliverables: [
      'Edital de convocação, inscrições, eleição e apuração',
      'Atas de eleição, instalação e posse; calendário de reuniões',
      'Treinamento de titulares e suplentes',
      'Apoio na elaboração do mapa de riscos',
    ],
    needsReview: 'Carga horária do curso depende do grau de risco na NR-5 atual (8 a 20 h); antes dizia 20 h fixas.',
    legacyUrls: ['/copia-apt'],
  },
  {
    slug: 'ordens-de-servico',
    category,
    title: 'Ordens de Serviço de Segurança',
    short: 'OS de SST por função',
    summary:
      'Elaboração das Ordens de Serviço de Segurança e Saúde do Trabalho, informando a cada colaborador riscos, direitos e deveres.',
    norma: 'NR-1',
    icon: 'clipboard',
    whatIs: [
      'As Ordens de Serviço informam ao colaborador tudo sobre sua atividade: riscos, medidas de prevenção, direitos e deveres, horários de trabalho e descanso — deixando clara sua participação na segurança da empresa.',
    ],
    deliverables: ['Ordens de Serviço por função', 'Registro de ciência dos colaboradores'],
    legacyUrls: ['/copia-programa-de-gerenciamento-de'],
  },
  {
    slug: 'plano-de-emergencia-ambiental',
    category,
    title: 'Plano de Emergência Ambiental',
    short: 'Resposta a emergências ambientais',
    summary:
      'Plano de Emergência Ambiental com procedimentos formais para prevenir e mitigar vazamentos, derramamentos e desastres.',
    icon: 'shield',
    whatIs: [
      'Uma emergência ambiental é uma ameaça súbita ao meio ambiente e à saúde pública, causada pela liberação de substância perigosa ou por desastre natural. O plano define ações e procedimentos para preveni-la ou reduzir seus efeitos.',
    ],
    deliverables: [
      'Procedimentos formais para situações emergenciais',
      'Orientação dos colaboradores sobre impactos ambientais das tarefas',
      'Prevenção de danos materiais e ambientais',
    ],
    legacyUrls: ['/copia-ordens-de-servicos'],
  },
  {
    slug: 'laudo-de-instalacoes-eletricas-nr-10',
    category,
    title: 'Laudo de Instalações Elétricas (NR-10)',
    short: 'Inspeção e prontuário NR-10',
    summary:
      'Inspeção das instalações elétricas, testes e medições e relatório para adequação do prontuário NR-10 às normas ABNT.',
    norma: 'NR-10',
    icon: 'zap',
    whatIs: [
      'Inspeção visual minuciosa, testes e medições para indicar as adequações necessárias das instalações elétricas às normas técnicas da ABNT e à NR-10. O laudo elétrico também é exigido na regularização junto ao Corpo de Bombeiros.',
    ],
    deliverables: [
      'Reunião inicial de metodologia',
      'Vistoria técnica nas instalações',
      'Análise documental',
      'Relatório de inspeção para adequação do prontuário',
      'Apresentação final com recomendações de manutenção',
    ],
    legacyUrls: ['/copia-laudo-de-para-raios-nr-10'],
  },
  {
    slug: 'laudo-spda-para-raios',
    category,
    title: 'Laudo de SPDA (Para-raios)',
    short: 'Inspeção de para-raios',
    summary:
      'Inspeção do Sistema de Proteção contra Descargas Atmosféricas com medição de resistência de aterramento e laudo conforme ABNT.',
    icon: 'zap',
    whatIs: [
      'Verificamos o tipo de sistema instalado, pontos de captação, condutores de descida e de aterramento e medimos a resistência ôhmica, indicando as adaptações necessárias às normas da ABNT (NBR 5419).',
    ],
    deliverables: [
      'Inspeção visual e verificação do sistema',
      'Medição da resistência de aterramento',
      'Relatório de conformidade e recomendações',
      'Laudo com ART',
    ],
    legacyUrls: ['/copia-brigada-de-incendio-nr-23'],
  },
  {
    slug: 'laudo-de-acessibilidade',
    category,
    title: 'Laudo de Acessibilidade (NBR 9050)',
    short: 'Adequação à NBR 9050',
    summary:
      'Mapeamento do ambiente físico da empresa e indicação das melhorias de layout e infraestrutura conforme NBR 9050 e Lei 10.098.',
    icon: 'accessibility',
    whatIs: [
      'Com base em checklist da NBR 9050, mapeamos todo o ambiente físico da empresa e indicamos as melhorias necessárias de acordo com o conceito de acessibilidade universal, em conformidade com a Lei nº 10.098/2000.',
    ],
    deliverables: ['Checklist NBR 9050', 'Mapeamento e registro fotográfico', 'Relatório de adequações'],
    needsReview: 'Texto antigo citava NBR 9050:2005; atualizar para a edição vigente.',
    legacyUrls: ['/copia-laudo-de-periculosidade'],
  },
  {
    slug: 'laudo-de-ruido-externo',
    category,
    title: 'Laudo de Ruído Externo',
    short: 'Ruído para a vizinhança',
    summary:
      'Medição e análise do ruído emitido pela empresa para a vizinhança, evitando conflitos e ações judiciais.',
    icon: 'volume',
    whatIs: [
      'Analisamos os ruídos emitidos pela empresa para promover um convívio tranquilo com a comunidade vizinha e evitar dificuldades judiciais, conforme a NBR 10151.',
    ],
    deliverables: ['Medições em pontos receptores', 'Comparação com limites legais', 'Recomendações de controle'],
    legacyUrls: ['/copia-laudo-de-acessibilidade'],
  },
  {
    slug: 'pericia-judicial-do-trabalho',
    category,
    title: 'Perícia Judicial e Assistência Técnica Trabalhista',
    short: 'Perito e assistente técnico',
    summary:
      'Assistência técnica em perícias trabalhistas de insalubridade, periculosidade e acidentes: quesitos, diligências e parecer técnico.',
    icon: 'scale',
    image: '/images/pericia.webp',
    whatIs: [
      'O laudo pericial é uma das principais provas em processos trabalhistas. Atuamos como assistentes técnicos das partes, com engenheiro certificado em perícia judicial do trabalho.',
    ],
    deliverables: [
      'Elaboração de quesitos técnicos',
      'Acompanhamento das diligências periciais',
      'Parecer técnico',
    ],
    legacyUrls: ['/copia-avcb-clcb-sist-prev-cont'],
  },
]
