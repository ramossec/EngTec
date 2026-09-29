# ENGTECN — Novo site institucional (spec de design)

Data: 2026-09-29
Status: aguardando revisão

## 1. Contexto

O site atual (https://www.engtecnsolucoes.com.br/) está no Wix. A ENGTECN Soluções Industriais e Comerciais LTDA (CNPJ 35.948.158/0001-72, Rua Getúlio Vargas, 507, 2º andar, Sala 11, Centro, São João da Boa Vista-SP, CEP 13.870-100, tel./WhatsApp 19 99745-9888) atua em engenharia consultiva: engenharia mecânica, segurança do trabalho (NRs e laudos), prevenção contra incêndio (AVCB/CLCB), hidráulica, estruturas metálicas, treinamentos e eSocial.

### Problemas do site atual

- Cerca de 55 páginas internas com slugs quebrados (`copia-ppra-nr-9`, `cópia-projetos-de-galpões` com acento) e duplicadas (sufixo `-1`). Isso prejudica o SEO.
- Menu com mais de 50 itens (26 só em Segurança do Trabalho). Encontrar um serviço é difícil.
- Não há formulário de orçamento nem CTA claro de WhatsApp. O único CTA é um botão genérico "MAIS".
- Falta uma headline com a proposta de valor, e a prova social (clientes) fica escondida.
- Conteúdo desatualizado: o PPRA foi substituído pelo PGR (NR-1, 2022) e o PCMAT foi absorvido pelo PGR.
- Links de Facebook e LinkedIn quebrados (`facebook.com/`, `linkedin.com/feed/`). Não há e-mail visível nem mapa.
- O logo existe só como JPG de 400px. É um wordmark: "ENG" em grafite e "TECN" em vermelho.
- A página é pesada por causa do JS do Wix, e o LCP no mobile é lento.

## 2. Objetivo e critérios de sucesso

**Objetivo:** credibilidade institucional e geração de leads, com o mesmo peso.

Critérios de sucesso:
- Qualquer serviço fica a no máximo 2 cliques da home.
- Toda página tem um CTA de orçamento: formulário e WhatsApp.
- Lighthouse mobile ≥ 90 em Performance, Acessibilidade, Boas Práticas e SEO.
- Todas as URLs antigas redirecionam com 301 para a página nova equivalente.
- Cada página tem HTML estático indexável, com title, description e canonical sem depender de JS.

## 3. Decisões

| Item | Decisão |
|---|---|
| Stack | Vite + React + TypeScript + Tailwind CSS, com **vite-react-ssg** (HTML estático por rota) |
| Conteúdo | Migrar e reorganizar: consolidar duplicadas, slugs limpos, termos obsoletos atualizados e marcados para revisão do cliente, redirects 301 |
| Marca | Mantém o logo (recriado em SVG) e as cores; moderniza tipografia, grid, ícones e fotografia |
| Leads | Botão flutuante de WhatsApp (mensagem pré-preenchida por serviço) e formulário de orçamento via Web3Forms |
| Deploy | Ainda não definido. Build estático portável, com redirects gerados para Vercel (`vercel.json`), Netlify (`_redirects`) e Apache (`.htaccess`) |
| Visual | **Híbrido técnico**: hero e rodapé grafite escuro com grid "blueprint" sutil; seções de conteúdo claras; vermelho só em CTAs e destaques |

## 4. Arquitetura de informação

```
/                                   Home
/servicos                           Hub com todas as categorias
/servicos/:categoria                Categoria (lista de serviços)
/servicos/:categoria/:servico       Página de serviço (template)
/treinamentos                       Treinamentos (hub; cada curso usa o template de serviço)
/esocial                            eSocial SST
/sobre                              Sobre (missão, valores, equipe/credenciais técnicas)
/clientes                           Clientes e portfólio (junta os atuais /clients e /projects)
/contato                            Contato + formulário de orçamento + mapa
/politica-de-privacidade            LGPD (obrigatória por causa do formulário)
404
```

Categorias propostas. O mapeamento final é confirmado depois da raspagem (etapa 2 da implementação).

1. **Engenharia Mecânica e Industrial**: NR-12, NR-13, refrigeração, ar-condicionado, exaustão e ventilação, tubulação e hidráulica, GLP, elevadores, ruídos e vibrações, gerenciamento de projetos.
2. **Estruturas Metálicas**: galpões, monorail, projeto estrutural CYPE 3D.
3. **Segurança e Saúde do Trabalho**: PGR, LTCAT/PPP, insalubridade, periculosidade, APR, mapa de risco, CIPA, ordens de serviço, perícia judicial trabalhista, instalações elétricas/NR-10, para-raios, ruído externo, acessibilidade, PPR, APT.
4. **Prevenção e Combate a Incêndio**: AVCB/CLCB, brigada de incêndio NR-23, rota de fuga.
5. **Treinamentos**: NR-13 operador de caldeira e outros.

**Menu principal:**
- Serviços: mega-menu com as 5 categorias, 4–5 destaques em cada e link "ver todos".
- Treinamentos, Clientes, Sobre e Contato.
- Botão **"Solicitar orçamento"** em vermelho.
- No mobile: drawer com accordion.

## 5. Design system (tokens Tailwind)

**Cores**
- Grafite: 950 `#0E1012`, 900 `#171A1D`, 800 `#23272B`, 600 `#4A5058`, 400 `#8A919A`, 100 `#EEF0F2`, 50 `#F7F8F9`.
- brand-red `#ED1C24`: uso decorativo, texto grande e logo.
- red-700 `#C4141B`: botões com texto branco e links de texto (contraste ≥ 4.5:1, WCAG AA). O `#ED1C24` sobre branco dá cerca de 4:1 e reprova no AA para texto pequeno.
- Verde WhatsApp: só no botão do WhatsApp.

**Tipografia**
- Space Grotesk 600/700 nos títulos.
- Inter 400/500/600 no texto.
- Escala fluida com `clamp()`: display 56→36, h2 36→28, h3 24→20, corpo 17/16.

**Grid e espaçamento**
- 12 colunas, container máximo de 1200px, base de 8px.
- Espaço entre seções: 96px no desktop, 64px no mobile.

**Motivo visual**
- Grid "blueprint" em SVG repetido, com opacidade de 4–6%.
- "Linhas de cota" técnicas nos divisores de seção.
- Ícones Lucide, em traço.

**Raio e sombras**
- Raio de 6–10px, com cara industrial e não arredondada demais.
- Sombra suave só no hover.

**Movimento**
- Fade/translate de 150–250ms ao rolar a página.
- Respeita `prefers-reduced-motion`.

**Acessibilidade**
- Foco visível: contorno vermelho de 2px com offset.
- Alvos de toque de 44px.
- HTML semântico, skip link, `lang="pt-BR"` e textos alternativos descritivos.

## 6. Páginas

### Home

1. **Hero escuro**
   - Headline, por exemplo: "Engenharia, segurança do trabalho e prevenção de incêndio para a sua indústria em conformidade."
   - Subtítulo com a região atendida (SP/MG).
   - Dois CTAs: "Solicitar orçamento" e "Falar no WhatsApp".
   - Foto com overlay.
   - Faixa de selos de confiança: CREA, anos de experiência e número de projetos, com dados do cliente.
2. Barra de logos de clientes.
3. Grid com os 5 cards de categoria (ícone, descrição curta, número de serviços, link).
4. "Como trabalhamos", em 4 passos: diagnóstico, proposta, execução, documentação/ART.
5. Serviços em destaque: NR-12, AVCB, PGR, LTCAT.
6. Diferenciais e valores: Ética, Comprometimento, Transparência, Confiança, Desenvolvimento Sustentável.
7. Projetos e portfólio (fotos).
8. Faixa de CTA final com formulário curto.
9. Rodapé: contato, endereço completo, link do mapa, CNPJ, redes sociais (corrigidas), links rápidos.

### Template de serviço

- Breadcrumb.
- Cabeçalho escuro com título, resumo e CTA.
- Blocos de conteúdo: "O que é", "Quando é obrigatório" (com a NR aplicável), "O que entregamos", "Como funciona".
- FAQ curto, marcado com schema FAQPage.
- Sidebar de CTA fixa no desktop: formulário e WhatsApp com o nome do serviço já preenchido.
- Serviços relacionados.

### Contato

**Formulário**
- Campos: nome, empresa, e-mail, telefone/WhatsApp, serviço, cidade, mensagem.
- O select de serviço é preenchido a partir dos dados e já vem selecionado quando a URL traz `?servico=`.
- Checkbox de consentimento LGPD e honeypot anti-spam.
- Estados: enviando, sucesso, erro. No erro, oferece o WhatsApp como alternativa.

**Mapa**
- Imagem estática com link para o Google Maps, sem iframe pesado de terceiros.

## 7. Arquitetura de código

```
src/
  content/
    categories.ts      # Category[] tipado
    services/*.ts      # um arquivo por serviço: {slug, category, title, summary, sections, faq, legacyUrls[], needsReview}
    site.ts            # dados da empresa: telefone, endereço, CNPJ, redes, WhatsApp
  components/
    layout/            # Header, MegaMenu, MobileNav, Footer, SkipLink
    ui/                # Button, Container, Section, Card, Badge, Breadcrumb, Accordion
    blocks/            # Hero, CategoryGrid, ProcessSteps, ClientLogos, CtaBand, ServiceSidebar
    forms/QuoteForm.tsx
    WhatsAppFab.tsx
    Seo.tsx            # title/meta/OG/canonical + JSON-LD
  lib/
    whatsapp.ts        # buildWhatsAppUrl(service?) — função pura
    schema.ts          # builders de JSON-LD (ProfessionalService, Service, BreadcrumbList, FAQPage)
    submitQuote.ts     # POST para Web3Forms, chave em VITE_WEB3FORMS_KEY
  pages/               # componentes de rota
  routes.tsx           # rotas geradas a partir de content/ para o vite-react-ssg
scripts/
  scrape-wix.ts        # (uma vez) baixa HTML, texto e imagens do site atual para /migration
  gen-redirects.ts     # legacyUrls -> vercel.json, public/_redirects, public/.htaccess
  gen-sitemap.ts       # sitemap.xml + robots.txt no pós-build
public/images/         # imagens otimizadas em AVIF/WebP (sharp no script de raspagem)
```

Princípios:
- **Conteúdo separado da apresentação.** Adicionar um serviço é criar um arquivo em `content/services/`. Rota, menu, sitemap e redirects saem automaticamente.
- **Revisão do cliente.** `needsReview: true` mostra um aviso só em ambiente de desenvolvimento e gera `migration/REVIEW.md`, a lista de textos técnicos que o cliente precisa validar (PPRA→PGR etc.).

## 8. Tratamento de erros

**Formulário**
- Validação nativa no cliente com mensagens inline acessíveis (`aria-describedby`).
- Se a chamada ao Web3Forms falhar, mostra erro com link de WhatsApp como alternativa.
- O honeypot descarta envios de bots em silêncio.
- Sem a variável `VITE_WEB3FORMS_KEY`, o formulário mostra só o CTA de WhatsApp (degradação segura).

**Rotas e imagens**
- Rota inexistente mostra a página 404 com busca pelas categorias e CTA.
- Imagem que falhar no scraper entra em `migration/REVIEW.md`; o build não quebra.

## 9. Testes e verificação

**`npm run test` (Vitest + Testing Library)**
- `buildWhatsAppUrl`.
- Builders de JSON-LD.
- `gen-redirects`: toda URL legada tem destino e não há loops.
- QuoteForm: validação e estados de sucesso/erro, com fetch mockado.

**`npm run build` + script de checagem**
- Um `index.html` estático por rota: o total bate com o que está em `content/`.
- Title, description e canonical presentes em cada página.

**`npm run preview` + navegação**
- Menu e drawer mobile.
- Formulário com chave de teste.
- WhatsApp com a mensagem certa.

**Qualidade**
- Lighthouse mobile ≥ 90 na Home, em uma página de serviço e no Contato.
- Checador de links internos em `dist/`.
- JSON-LD validado no Rich Results Test.

## 10. Etapas de implementação (resumo)

1. Scaffold: Vite + React + TS + Tailwind + vite-react-ssg + Vitest; tokens; logo em SVG.
2. `scrape-wix.ts`: raspar as ~55 páginas e montar a tabela de URL antiga → categoria/slug novo, com as duplicadas identificadas.
3. Conteúdo em `content/`: reorganizado, com termos obsoletos atualizados e `needsReview` marcado.
4. Layout, componentes, Home, templates de categoria e de serviço, Sobre, Clientes, Contato, Privacidade, 404.
5. Leads: QuoteForm, WhatsAppFab, CTAs com o serviço pré-preenchido.
6. SEO: Seo, JSON-LD, sitemap, robots, redirects, imagens OG.
7. QA: acessibilidade, performance, links.

## 11. Pendências do cliente (não bloqueiam o início)

- Logo em vetor. Se não houver, usamos o SVG recriado.
- E-mail comercial que vai receber o formulário.
- URLs corretas do LinkedIn e do Facebook.
- Número do CREA do engenheiro responsável.
- Autorização para usar logos de clientes.
- Fotos originais em alta resolução.
- Revisão técnica do `migration/REVIEW.md`.

## Fora de escopo

- Blog e CMS com painel. Dá para adicionar depois (por exemplo, Decap CMS sobre os mesmos arquivos de conteúdo).
- Área logada e integrações com eSocial.
- Versão em inglês.
