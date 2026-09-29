import type { Category } from './types'

export const categories: Category[] = [
  {
    slug: 'engenharia-mecanica',
    title: 'Engenharia Mecânica e Industrial',
    short: 'NR-12, NR-13, climatização, tubulações, GLP e gestão de projetos.',
    description:
      'Projetos, inspeções e laudos para máquinas, equipamentos e instalações industriais e prediais — do projeto conceitual ao executivo, com ART e foco em segurança, eficiência e conformidade.',
    icon: 'cog',
    image: '/images/caldeira.webp',
  },
  {
    slug: 'estruturas-metalicas',
    title: 'Estruturas Metálicas',
    short: 'Galpões, pontes rolantes, pórticos e linhas de vida calculados em CYPE 3D.',
    description:
      'Cálculo, dimensionamento e detalhamento de estruturas metálicas com o software CYPE Metálicas 3D, laudos e ART — de mezaninos e coberturas a pontes rolantes e linhas de vida.',
    icon: 'building',
    image: '/images/portico.webp',
  },
  {
    slug: 'seguranca-do-trabalho',
    title: 'Segurança e Saúde do Trabalho',
    short: 'PGR, LTCAT, laudos, ergonomia, CIPA e perícias trabalhistas.',
    description:
      'Programas, laudos e assessoria em Segurança e Saúde do Trabalho para manter sua empresa em conformidade com as Normas Regulamentadoras, o eSocial e a legislação previdenciária.',
    icon: 'hard-hat',
    image: '/images/equipe.webp',
  },
  {
    slug: 'prevencao-incendio',
    title: 'Prevenção e Combate a Incêndio',
    short: 'AVCB, CLCB, projetos técnicos, brigada e rotas de fuga.',
    description:
      'Regularização completa junto ao Corpo de Bombeiros do Estado de São Paulo: projeto técnico, adequação das medidas de segurança, laudos, ARTs, treinamento de brigada e acompanhamento do processo.',
    icon: 'flame',
    image: '/images/hidrante.webp',
  },
  {
    slug: 'treinamentos',
    title: 'Treinamentos',
    short: 'Cursos de NR com certificado, ministrados por engenheiros.',
    description:
      'Treinamentos teóricos e práticos em Normas Regulamentadoras, ministrados por profissionais habilitados, com certificado individual e registro para a empresa.',
    icon: 'graduation-cap',
    image: '/images/treinamento.webp',
  },
]
