export const site = {
  name: 'ENGTECN Soluções',
  legalName: 'ENGTECN Soluções Industriais e Comerciais LTDA',
  cnpj: '35.948.158/0001-72',
  url: 'https://www.engtecnsolucoes.com.br',
  email: 'atendimento@engtecnsolucoes.com.br',
  phoneDisplay: '(19) 99745-9888',
  phoneE164: '+5519997459888',
  whatsapp: '5519997459888',
  responsible: {
    name: 'Raphael Endrigo Paina',
    role: 'Engenheiro Mecânico e de Segurança do Trabalho',
  },
  address: {
    street: 'Rua Getúlio Vargas, 507 — 2º andar, sala 11',
    district: 'Centro',
    city: 'São João da Boa Vista',
    state: 'SP',
    zip: '13870-100',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Get%C3%BAlio+Vargas+507+S%C3%A3o+Jo%C3%A3o+da+Boa+Vista+SP',
  /** Empty until the client sends the correct profile URLs. */
  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
  },
  region: 'São João da Boa Vista, região e Sul de Minas',
  mission:
    'Prestação de serviços técnicos e engenharia de projetos especializados, estabelecendo duradouras parcerias de confiança com os nossos clientes.',
  vision:
    'Ser uma empresa em constante evolução, atenta às necessidades do mercado e ao desenvolvimento tecnológico global.',
  values: ['Ética', 'Comprometimento', 'Transparência', 'Confiança', 'Desenvolvimento sustentável'],
} as const

export const clients = [
  'GeHfer Industrial',
  'Soufer Industrial',
  'Saint-Gobain do Brasil',
  'Sinter',
  'Dacota Cabos Elétricos',
  'Santa Izabel Agroindústria',
  'Biselli Engenharia',
  'Bauer',
  'Liderkraft Embalagens',
  'Metal Poços',
  'Tavmac Máquinas Industriais',
  'Hurmez',
  'Hot Air',
  'HP Acessórios',
  'Essencial Elevadores',
  'UP Elevadores',
  'Henri Motors',
  'Santa Casa de São João da Boa Vista',
  'UPA São João da Boa Vista',
  'Unimed São João da Boa Vista',
  'Nacional Gás',
  'Condomínio Prime Acqua',
] as const

export interface Project {
  title: string
  client: string
  place: string
  description: string
  image: string
}

export const projects: Project[] = [
  {
    title: 'Pórtico e linha de vida para lonagem de caminhões',
    client: 'Soufer Industrial',
    place: 'Cambuí-MG',
    description: 'Projeto estrutural, fabricação e ART conforme NBR 16325, NBR 14762 e NBR 8800.',
    image: '/images/linha-de-vida.webp',
  },
  {
    title: 'Projeto estrutural de ponte rolante',
    client: 'GeHfer Industrial',
    place: 'Andradas-MG',
    description: 'Cálculo estrutural e memorial para ponte rolante em unidade fabril.',
    image: '/images/portico.webp',
  },
  {
    title: 'Central de GLP com teste de estanqueidade',
    client: 'Santa Casa e UPA',
    place: 'São João da Boa Vista-SP',
    description: 'Projeto técnico, laudo, ART e teste de estanqueidade da rede de gás.',
    image: '/images/glp.webp',
  },
  {
    title: 'Regularização AVCB/CLCB',
    client: 'Comércios e indústrias da região',
    place: 'São João da Boa Vista-SP',
    description: '15 alvarás do Corpo de Bombeiros obtidos ou renovados para comércios e indústrias.',
    image: '/images/hidrante.webp',
  },
  {
    title: 'Inspeção NR-13 e teste hidrostático',
    client: 'Indústrias da região',
    place: 'São João da Boa Vista e região',
    description: 'Inspeção de vasos de pressão, medição de espessura por ultrassom e teste hidrostático.',
    image: '/images/caldeira.webp',
  },
  {
    title: 'Estrutura metálica de cobertura',
    client: 'Projeto industrial',
    place: 'Região de São João da Boa Vista',
    description: 'Dimensionamento em CYPE Metálicas 3D, detalhamento e acompanhamento da montagem.',
    image: '/images/estrutura-vermelha.webp',
  },
]
