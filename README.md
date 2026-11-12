# MARLENE RIBEIRO ROSA — site institucional

Site de comércio varejista em geral, com foco em papelaria e produtos de uso diário. Desenvolvido com React, Vite, TypeScript, Tailwind CSS, React Router e Lucide. Sem backend, carrinho, pagamentos, formulários ou ferramentas de análise de audiência.

## Executar

Requer Node.js 22.12+ e npm.

```sh
npm install
npm run dev
```

## Dados e conteúdo

Os dados reais da empresa estão em `src/config/company.ts`. Preserve sua correspondência com o registro empresarial. O campo `state` usa UF de duas letras; `whatsapp` usa 55 + DDD + número, somente dígitos.

`retailFocus`, no mesmo arquivo, define a apresentação ampla de papelaria, uso diário e comércio varejista em geral. O site não anuncia produtos específicos, preços ou disponibilidade. Consulte a empresa pelos canais de atendimento.

Os textos da página inicial, da Política de Privacidade e dos Termos de Uso ficam em `src/App.tsx`. A ilustração de papelaria fica em `public/images/papelaria.svg`.

O campo `hostingPrivacyNotice` pode detalhar o provedor e as condições reais de registros técnicos e retenção quando a hospedagem for definida. A política apresenta o funcionamento da aplicação e o contato de privacidade. Revise-a sempre que forem adicionados formulários, analytics, cookies ou integrações.

## Domínio e compilação

`siteUrl` pode permanecer vazio durante a preparação do site. Quando o domínio estiver definido, preencha sua origem HTTPS sem caminhos. Não use um endereço fictício.

```sh
npm run lint
npm run build
npm run preview
```

O build verifica os dados obrigatórios e gera `dist/`, incluindo HTML para as rotas `/`, `/politica-de-privacidade` e `/termos-de-uso`. A aplicação renderiza o conteúdo no navegador; não utiliza SSR.

Sem `siteUrl`, o site funciona com sua apresentação institucional completa, mas mantém `noindex`, robots bloqueado e sitemap sem URLs. Ao preencher um domínio HTTPS válido e executar o build novamente, a indexação é liberada e os arquivos recebem canonical, Open Graph absoluto e sitemap com o domínio real.

`npm run build:preview` também está disponível para uma compilação local com indexação sempre desabilitada. Não há avisos visuais de site de teste em nenhum desses modos.

O build verifica formatos básicos; não comprova a autenticidade do cadastro ou garante aprovação empresarial pela Meta.

## Hospedagem

Na Vercel, importe como projeto Vite, use `npm run build` e saída `dist`. O arquivo `vercel.json` prepara o acesso direto às rotas.

No Cloudflare Pages, use `npm run build`, saída `dist` e Node.js 22.12+ (`NODE_VERSION=22`). O arquivo `public/_redirects` suporta o acesso direto às rotas.

Configure o domínio próprio e os registros DNS no provedor escolhido. Verifique HTTPS, canais de contato e as três rotas após a publicação. Nenhuma publicação automática é realizada pelos comandos deste projeto.
