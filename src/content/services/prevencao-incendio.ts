import type { Service } from '../types'

const category = 'prevencao-incendio' as const

export const prevencaoIncendio: Service[] = [
  {
    slug: 'avcb-clcb',
    category,
    title: 'AVCB e CLCB — Alvará do Corpo de Bombeiros',
    short: 'Obtenção e renovação de AVCB/CLCB',
    summary:
      'Obtenção e renovação de AVCB e CLCB em SP: projeto técnico, adequação, laudos, ARTs e acompanhamento até a emissão do alvará.',
    icon: 'flame',
    image: '/images/hidrante.webp',
    featured: true,
    whatIs: [
      'O Auto de Vistoria do Corpo de Bombeiros (AVCB) e o Certificado de Licença do Corpo de Bombeiros (CLCB) atestam que a edificação possui as medidas de segurança contra incêndio exigidas pelo Corpo de Bombeiros da Polícia Militar do Estado de São Paulo.',
      'Sem o alvará, o responsável pelo imóvel responde por qualquer sinistro, e o imóvel fica impedido de ser locado, vendido ou licenciado (Habite-se, Vigilância Sanitária), além de poder perder a cobertura do seguro.',
    ],
    whenRequired: [
      'Projeto Técnico (AVCB-PT): imóveis com mais de 750 m², mais de 3 pavimentos ou risco elevado de incêndio. Análise em até 30 dias após o protocolo.',
      'Projeto Técnico Simplificado — CLCB: até 750 m² e até 3 pavimentos, baixo risco, sem vistoria. Pode sair em até 48 horas pelo Via Fácil.',
      'Projeto Técnico Simplificado — AVCB-PTS: mesmo porte do CLCB, porém com vistoria (até 30 dias).',
      'Renovação periódica: validade de 1 a 5 anos conforme o tipo de ocupação.',
    ],
    deliverables: [
      'Visita técnica e enquadramento da edificação',
      'Projeto técnico de incêndio (plantas com medidas de segurança)',
      'Adequação: extintores, iluminação de emergência, sinalização, hidrantes, alarme, sprinklers',
      'Laudos (elétrica, GLP, gerador) e ARTs (CMAR, elétrica, medidas de segurança)',
      'Treinamento de brigada de incêndio',
      'Protocolo e acompanhamento até a emissão do alvará',
    ],
    steps: [
      'Analisamos o seu caso e o enquadramento do imóvel',
      'Vistoria para identificar as medidas necessárias',
      'Projeto e adequação do imóvel',
      'Pedido de obtenção ou renovação e acompanhamento do processo',
    ],
    faq: [
      {
        q: 'Qual a diferença entre AVCB e CLCB?',
        a: 'O CLCB é a licença para imóveis de baixo risco (até 750 m² e 3 pavimentos) e dispensa vistoria. O AVCB exige vistoria do Corpo de Bombeiros e é obrigatório para imóveis maiores ou de risco elevado.',
      },
      {
        q: 'Meu imóvel perdeu o projeto antigo. E agora?',
        a: 'Elaboramos um novo projeto técnico com base nas instruções técnicas atuais e adequamos o que for necessário para a renovação.',
      },
      {
        q: 'Vocês fazem AVCB para eventos temporários?',
        a: 'Sim, atendemos eventos especiais e ocupações temporárias em edificações permanentes. Consulte-nos.',
      },
    ],
    needsReview: 'Texto antigo citava o Decreto Estadual 56.819/2011; confirmar a regulamentação vigente do Corpo de Bombeiros de SP.',
    legacyUrls: ['/copia-servicos-1', '/copia-projetos-1'],
  },
  {
    slug: 'brigada-de-incendio',
    category,
    title: 'Brigada de Incêndio',
    short: 'Formação de brigadistas',
    summary:
      'Treinamento teórico e prático de brigada de incêndio conforme IT-17 do Corpo de Bombeiros e NR-23, com certificado.',
    norma: 'NR-23',
    icon: 'flame',
    image: '/images/extintor.webp',
    whatIs: [
      'A brigada é formada por colaboradores preparados para agir em princípios de incêndio, orientar o abandono e inspecionar o sistema de proteção contra incêndio. É fundamental para obter ou renovar o AVCB em edificações de risco.',
    ],
    deliverables: [
      'Teoria: classes de incêndio, teoria do fogo, métodos de extinção, prevenção, equipamentos, abandono e primeiros socorros',
      'Prática: manuseio de extintores e hidrantes, abandono por rotas de fuga e transporte de vítimas',
      'Certificados individuais e registro para a empresa',
    ],
    needsReview: 'Carga horária (antes 4 h teoria + 4 h prática) varia conforme IT-17 e o risco da edificação.',
    legacyUrls: ['/copia-rota-de-fuga-nr-23'],
  },
  {
    slug: 'rota-de-fuga',
    category,
    title: 'Rotas de Fuga e Plano de Abandono',
    short: 'Estudo de rotas de fuga',
    summary:
      'Estudo das rotas de fuga e plano de abandono: população por setor, rotas alternativas, orientadores de percurso e sinalização.',
    norma: 'NR-23',
    icon: 'door',
    image: '/images/saida-emergencia.webp',
    whatIs: [
      'Estudamos as condições físicas do estabelecimento para definir a melhor estratégia de remoção das pessoas em uma emergência.',
    ],
    deliverables: [
      'Levantamento da população fixa por andar e setor',
      'Rotas principais e alternativas de fuga',
      'Dimensionamento de orientadores de percurso',
      'Projeto de sinalização',
    ],
    legacyUrls: ['/copia-mapa-de-risco-nr-5'],
  },
]
