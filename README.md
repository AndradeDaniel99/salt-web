# Salt Web

Salt Web é um MVP open source para explorar como pessoas podem descobrir, apoiar e acompanhar campanhas missionárias com mais contexto e transparência.

> [!IMPORTANT]
> Este repositório contém somente uma experiência demonstrativa. Todas as organizações, pessoas, campanhas, valores e atualizações são fictícios. Nenhum pagamento é processado e nenhum dado de cartão é coletado.

## O que já funciona

- catálogo de campanhas e missionários;
- páginas de detalhes e atualizações de campo;
- campanhas pontuais e apoio mensal;
- simulação completa do fluxo de apoio;
- persistência local da confirmação no navegador;
- experiência responsiva em português do Brasil.

## Tecnologias

- React 19 e TypeScript;
- Vinext e Vite;
- Tailwind CSS e componentes Shadcn;
- Cloudflare Workers para o runtime de produção;
- Vitest para testes automatizados.

## Executando localmente

Requisitos:

- Node.js 22.13 ou mais recente;
- npm 10 ou mais recente.

```bash
git clone https://github.com/AndradeDaniel99/salt-web.git
cd salt-web
npm ci
npm run dev
```

O servidor de desenvolvimento informará a URL local no terminal. O projeto não exige variáveis de ambiente para executar o MVP.

## Comandos

```bash
npm run dev        # inicia o ambiente de desenvolvimento
npm run lint       # executa a análise estática
npm test           # executa os testes uma vez
npm run test:watch # executa os testes em modo interativo
npm run build      # gera o build de produção
npm start          # executa localmente o build já gerado
npm run format     # formata os arquivos do projeto
```

## Estrutura

```text
app/          rotas e layouts
components/   telas e componentes de interface
data/         catálogo demonstrativo
lib/          tipos, regras de apresentação e utilitários
public/       imagens e ícones usados pela demonstração
```

O catálogo está em `data/demo-catalog.json`. Relações entre organizações, missionários, campanhas e atualizações são verificadas pelos testes.

## Estado do projeto

Esta é a versão `0.1`: um protótipo navegável para validar experiência, linguagem e modelo de informação. Ainda não existem autenticação, backend persistente, painel administrativo, integração com pagamentos ou verificação real de organizações.

Antes de qualquer uso com doações reais serão necessários, no mínimo, revisão jurídica e de segurança, proteção de dados, prevenção a fraude, conciliação financeira e integração com um provedor de pagamentos.

Consulte o [roadmap](./ROADMAP.md) para os próximos ciclos e o [changelog](./CHANGELOG.md) para o histórico de versões.

## Hospedagem

O build atual produz uma aplicação compatível com Cloudflare Workers. O arquivo `.openai/hosting.json` registra o ambiente da demonstração mantida pelo projeto; ele não contém credenciais.

Forks devem criar e configurar seu próprio ambiente de hospedagem. Não adicione tokens, chaves ou credenciais ao repositório; use variáveis de ambiente locais e os secrets do provedor escolhido.

## Como contribuir

Leia o [guia de contribuição](./CONTRIBUTING.md) antes de abrir uma issue ou pull request. Ao participar, você concorda com o nosso [Código de Conduta](./CODE_OF_CONDUCT.md).

Falhas de segurança devem seguir a [política de segurança](./SECURITY.md), nunca uma issue pública.

## Licença

O código-fonte é disponibilizado sob a [Apache License 2.0](./LICENSE). O nome do projeto, sua identidade e os arquivos de mídia possuem regras adicionais descritas em [ASSETS.md](./ASSETS.md) e [TRADEMARKS.md](./TRADEMARKS.md).
