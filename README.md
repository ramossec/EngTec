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

## Deploy — GitHub Pages

O workflow `.github/workflows/deploy.yml` roda testes, build e `npm run check` a cada push em `main`/`master`
e publica `dist/` no GitHub Pages.

1. Crie o repositório no GitHub e envie o código (`git push -u origin main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. **Settings → Secrets and variables → Actions → New repository secret:** `VITE_WEB3FORMS_KEY`.
4. **Settings → Pages → Custom domain:** `www.engtecnsolucoes.com.br` (o arquivo `public/CNAME` já vai no build)
   e marque **Enforce HTTPS** depois que o certificado for emitido.
5. No DNS do domínio (hoje apontado para o Wix):
   - `www` → registro **CNAME** para `<usuario>.github.io`
   - domínio raiz (`engtecnsolucoes.com.br`) → registros **A** para `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153` (o GitHub redireciona o raiz para o `www`).

O site precisa ficar na raiz do domínio: não use o endereço de projeto `<usuario>.github.io/<repo>`, que exige
um caminho base diferente.

**Redirects:** o GitHub Pages não faz 301. Cada URL antiga do Wix vira uma página HTML (`dist/<url-antiga>.html`)
com `meta refresh`, redirecionamento via JS e `canonical` para a nova página — o Google trata como redirecionamento
permanente. As páginas são geradas como `pagina.html` (URLs sem barra final).

### Outras hospedagens

O mesmo `dist/` funciona em qualquer hospedagem estática, com 301 reais:

| Hospedagem | Arquivo |
|---|---|
| Vercel | `vercel.json` (raiz do projeto, `cleanUrls` ativo) |
| Netlify | `dist/_redirects` |
| Apache / cPanel | `dist/.htaccess` |

## Migração

`npm run scrape` baixa texto e imagens do site antigo para `migration/` (imagens ficam fora do git).
`migration/INVENTORY.md` lista as páginas antigas; o teste `src/lib/redirects.test.ts` garante que todas têm redirect.
