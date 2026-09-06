# Como contribuir

Obrigado por considerar uma contribuição para o Salt Web. O projeto está em fase de MVP e prioriza mudanças pequenas, verificáveis e alinhadas ao roadmap.

## Antes de começar

1. Procure uma issue existente para evitar trabalho duplicado.
2. Para mudanças relevantes de produto ou arquitetura, abra primeiro uma proposta.
3. Não inclua dados reais de pessoas, organizações, doadores ou pagamentos.
4. Confirme que você tem permissão para distribuir todo código, texto ou mídia enviado.

Issues marcadas como `good first issue` são o melhor ponto de entrada.

## Desenvolvimento

```bash
npm ci
npm run dev
```

Antes de enviar uma pull request:

```bash
npm run lint
npm test
npm run build
```

## Pull requests

- mantenha a mudança focada em um problema;
- explique o comportamento anterior e o novo comportamento;
- inclua testes para regras ou fluxos alterados;
- atualize a documentação quando a interface pública ou o setup mudar;
- inclua imagens apenas quando houver autorização e atribuição documentadas;
- não faça mudanças cosméticas não relacionadas no mesmo pull request.

Contribuições são licenciadas sob a mesma Apache License 2.0 do projeto.

## Commits

Use mensagens curtas no imperativo, por exemplo:

```text
Add campaign status filter
Fix monthly funding progress
Document local setup
```

## Comunicação e segurança

Ao participar, siga o [Código de Conduta](./CODE_OF_CONDUCT.md). Vulnerabilidades devem ser reportadas conforme [SECURITY.md](./SECURITY.md), sem divulgação pública antecipada.
