# ENGTECN — site institucional

Site estático da ENGTECN Soluções Industriais e Comerciais LTDA, que substitui o antigo site em Wix.
Vite + React 18 + TypeScript + Tailwind CSS 4, pré-renderizado com `vite-react-ssg` (um HTML por rota, SEO sem depender de JS).

## Comandos

```bash
npm install
npm run dev        # desenvolvimento (http://localhost:5173)
npm test           # testes (Vitest)
npm run typecheck  # TypeScript
npm run build      # gera dist/ + sitemap, robots, 404 e redirects
npm run check      # valida dist/: HTML por rota, title/description/canonical, links internos
npm run preview    # serve dist/ localmente
```

## Configuração

Copie `.env.example` para `.env` e preencha `VITE_WEB3FORMS_KEY` (gratuita em https://web3forms.com, cadastrada com o
e-mail que vai receber os orçamentos). Sem a chave, os formulários mostram apenas o botão de WhatsApp.

Dados da empresa (telefone, e-mail, endereço, redes sociais, clientes, projetos): `src/content/site.ts`.
Redes sociais ficam ocultas enquanto a URL estiver vazia.

## Conteúdo

- Categorias: `src/content/categories.ts`
- Serviços: `src/content/services/<categoria>.ts` — adicionar um serviço ali cria automaticamente rota, menu,
  sitemap, opção no formulário e redirects das URLs antigas (`legacyUrls`).
- `needsReview` marca textos atualizados na migração; o build gera `migration/REVIEW.md` para o cliente validar.

## Deploy

O build é estático (`dist/`) e funciona em qualquer hospedagem. Os redirects 301 das URLs do Wix são gerados para:

| Hospedagem | Arquivo |
|---|---|
| Vercel | `vercel.json` (raiz do projeto) |
| Netlify | `dist/_redirects` |
| Apache / cPanel | `dist/.htaccess` |

Defina `VITE_WEB3FORMS_KEY` nas variáveis de ambiente da hospedagem antes do build.

## Migração

`npm run scrape` baixa texto e imagens do site antigo para `migration/` (imagens ficam fora do git).
`migration/INVENTORY.md` lista as páginas antigas; o teste `src/lib/redirects.test.ts` garante que todas têm redirect.
