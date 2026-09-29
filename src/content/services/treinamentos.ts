import type { Service } from '../types'

const category = 'treinamentos' as const

export const treinamentos: Service[] = [
  {
    slug: 'nr-13-operador-de-caldeira',
    category,
    title: 'NR-13 — Treinamento de Operador de Caldeira',
    short: 'Operação segura de caldeiras',
    summary:
      'Curso de segurança na operação de caldeiras conforme NR-13, com teoria, prática e certificado, ministrado por engenheiro mecânico.',
    norma: 'NR-13',
    icon: 'graduation-cap',
    image: '/images/treinamento.webp',
    featured: true,
    whatIs: [
      'Capacita operadores e mantenedores para operar caldeiras com segurança, realizar manutenção preventiva, diagnosticar falhas e interpretar instrumentos e controles.',
    ],
    deliverables: [
      'Tipos de caldeiras: flamotubulares, aquatubulares, elétricas e de recuperação',
      'Instrumentação e controle: manômetros, pressostatos, válvulas de segurança, controle de nível e de chama',
      'Tratamento de água: corrosão, incrustação, arraste e tratamentos',
      'Obrigações diárias do operador',
      'Segurança na operação, partida, parada e manutenção',
      'NR-13 e suas aplicações; defeitos de operação e manutenção',
    ],
    needsReview: 'Antes: 24 h. A NR-13 atual define carga horária por categoria de caldeira; confirmar programa.',
    legacyUrls: ['/copia-solucoes-em-treinamentos'],
  },
  {
    slug: 'gestao-sst-esocial',
    category,
    title: 'Gestão de SST para o eSocial',
    short: 'Curso de 8 horas sobre eventos de SST',
    summary:
      'Curso de 8 horas para quem lança os eventos de Segurança e Saúde no Trabalho no eSocial: preenchimento correto e vulnerabilidades.',
    icon: 'graduation-cap',
    image: '/images/esocial.webp',
    whatIs: [
      'As informações lançadas no eSocial ficam disponíveis às autoridades e revelam as condições de trabalho da empresa. O curso ensina o preenchimento correto dos eventos de SST e a identificar vulnerabilidades nos laudos, programas e registros que os originam.',
    ],
    deliverables: ['Carga horária de 8 horas', 'Eventos de SST (S-2210, S-2220, S-2240)', 'Certificado'],
    legacyUrls: [],
  },
]
