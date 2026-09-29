import type { Service } from '../types'

const category = 'estruturas-metalicas' as const

export const estruturasMetalicas: Service[] = [
  {
    slug: 'projeto-estrutural-cype-3d',
    category,
    title: 'Projeto Estrutural em CYPE Metálicas 3D',
    short: 'Cálculo e dimensionamento de estruturas',
    summary:
      'Cálculo estrutural e dimensionamento de estruturas de aço, alumínio e madeira no CYPE Metálicas 3D, com projeto executivo e ART.',
    icon: 'building',
    image: '/images/cype-3d.webp',
    featured: true,
    whatIs: [
      'Qualquer edificação — de pequeno, médio ou grande porte — pode ser construída em estrutura metálica, com aço carbono (MR250/A36), aço de alta resistência (AR350/A572) ou aço patinável (AR350COR/A588) para ambientes agressivos.',
      'A estrutura pré-fabricada reduz o tempo de obra em até 50% em relação à alvenaria, diminui o peso sobre as fundações e é reciclável. O projeto executivo, feito por engenheiro, evita subdimensionamento e superdimensionamento dos elementos.',
      'Usamos o CYPE Metálicas 3D, que verifica cada barra conforme a norma escolhida e indica o perfil adequado, reduzindo prazos e retrabalho.',
    ],
    deliverables: [
      'Modelo e cálculo estrutural (NBR 8800 / NBR 14762)',
      'Memorial de cálculo',
      'Projeto executivo e detalhamento para fabricação e montagem',
      'Lista de materiais',
      'ART de projeto',
    ],
    faq: [
      {
        q: 'Quais estruturas vocês projetam?',
        a: 'Galpões, mezaninos, pórticos, pontes rolantes, passarelas, torres autoportantes, estruturas para silos, pergolados, coberturas em aço e alumínio e linhas de vida.',
      },
    ],
    needsReview: 'Texto antigo citava "A558" para aço anticorrosivo; corrigido para A588. Confirmar.',
    legacyUrls: ['/copia-gerenciamento-de-projetos'],
  },
  {
    slug: 'galpoes-e-mezaninos',
    category,
    title: 'Galpões e Mezaninos',
    short: 'Galpões industriais e mezaninos',
    summary:
      'Projeto de galpões industriais e mezaninos metálicos calculados em CYPE 3D, com detalhamento para fabricação e ART.',
    icon: 'factory',
    image: '/images/galpao.webp',
    whatIs: [
      'Projetamos galpões industriais, comerciais e agrícolas e mezaninos metálicos, otimizando vãos, peso de aço e prazo de montagem.',
    ],
    deliverables: [
      'Concepção estrutural e cálculo em CYPE Metálicas 3D',
      'Projeto executivo de fabricação e montagem',
      'Cobertura e fechamentos',
      'ART de projeto',
    ],
    legacyUrls: ['/copia-projeto-de-gas-liquifeito-de'],
  },
  {
    slug: 'pontes-rolantes-e-porticos',
    category,
    title: 'Pontes Rolantes, Pórticos e Monovias',
    short: 'Estruturas para movimentação de carga',
    summary:
      'Projeto e cálculo estrutural de pontes rolantes, pórticos e monovias (monorail) com laudo e ART.',
    icon: 'hammer',
    image: '/images/ponte-rolante.webp',
    whatIs: [
      'Estruturas de movimentação de carga exigem cálculo cuidadoso de esforços dinâmicos, fadiga e deformações. Projetamos pontes rolantes, pórticos e monovias com laudo estrutural e ART.',
      'Exemplos: ponte rolante para a GeHfer Industrial (Andradas-MG) e monorail para a Job Kids e a Henri Motors (São João da Boa Vista-SP).',
    ],
    deliverables: [
      'Cálculo estrutural e mecânico',
      'Projeto executivo',
      'Laudo técnico e ART',
      'Análise de estruturas existentes',
    ],
    legacyUrls: ['/cópia-projetos-estruturais-monorail', '/copia-projeto-mecanico-elevadores'],
  },
  {
    slug: 'linha-de-vida',
    category,
    title: 'Linha de Vida e Pontos de Ancoragem',
    short: 'Linhas de vida e ancoragem',
    summary:
      'Projeto, construção e ensaio de linhas de vida para lonagem de caminhões e pontos de ancoragem conforme NBR 16325.',
    norma: 'NR-35',
    icon: 'truck',
    image: '/images/linha-de-vida.webp',
    featured: true,
    whatIs: [
      'Linhas de vida e pontos de ancoragem protegem trabalhadores em altura — como na lonagem de caminhões — e precisam ser projetados, instalados e ensaiados por profissional habilitado.',
      'Executamos projetos para a Soufer Industrial (Cambuí-MG) e a Saint-Gobain do Brasil, além de ensaios de ancoragem com dinamômetro em condomínios.',
    ],
    deliverables: [
      'Análise estrutural, mecânica e de segurança',
      'Projeto conforme NBR 16325, NBR 14762 e NBR 8800',
      'Fabricação e montagem',
      'Ensaio de pontos de ancoragem com dinamômetro',
      'Laudo técnico e ART',
    ],
    legacyUrls: ['/copia-projetos-estruturais-monorail-1'],
  },
  {
    slug: 'portoes-basculantes',
    category,
    title: 'Projetos de Portões Basculantes',
    short: 'Projeto pronto para o serralheiro',
    summary:
      'Projeto calculado de portões basculantes para serralherias: contrapeso, estrutura e especificação prontos para execução.',
    icon: 'door',
    image: '/images/portao-basculante.webp',
    whatIs: [
      'O serralheiro perde tempo calculando o portão basculante — e um cálculo errado compromete a instalação do motor. Entregamos o projeto pronto para executar.',
    ],
    deliverables: [
      'Cálculo de estrutura e contrapeso',
      'Desenho de fabricação com especificação completa',
      'Ganho de tempo e segurança na montagem',
    ],
    legacyUrls: ['/copia-projetos-estruturais-cype'],
  },
]
