# SYNEX ACCESS

**Seu acesso ao futuro.**

Projeto web de acessibilidade em desenvolvimento. A primeira versão apresenta a marca SYNEX ACCESS e uma demonstração de um guia de acessibilidade digital em português.

## Abrir o projeto

1. Acesse o repositório no GitHub.
2. Abra `index.html` para visualizar o código da página.
3. Para testar localmente, baixe o repositório e abra `index.html` em um navegador moderno.
4. O site também pode ser publicado pelo GitHub Pages usando o workflow em `.github/workflows/pages.yml`.

## O que já funciona nesta versão

- Página responsiva em português.
- Navegação por teclado e link para pular ao conteúdo.
- Demonstração de perguntas e respostas sobre acessibilidade.
- Leitura de respostas com a síntese de voz do navegador, quando disponível.
- Entrada de pergunta por voz nos navegadores compatíveis.
- Ajuste de tamanho do texto e modo de alto contraste.
- Preferência por movimento reduzido respeitada no CSS.

## Limites importantes

O chat desta primeira versão usa respostas locais predefinidas. Ele **não está conectado a um modelo de IA**, não analisa imagens e não envia dados de formulário para um servidor. O reconhecimento de fala e a leitura em voz alta dependem dos recursos do navegador e podem variar por dispositivo.

A integração com IA real deve ser feita no backend, sem colocar chaves privadas no JavaScript público. A próxima etapa é conectar a demonstração ao backend do Base44 e implementar armazenamento seguro para a lista de espera.

## Tecnologias

- HTML semântico
- CSS responsivo
- JavaScript sem dependências
- GitHub Pages para hospedagem estática

## Acessibilidade

O projeto busca seguir boas práticas WCAG: estrutura semântica, foco visível, contraste, controles identificados, navegação por teclado e suporte a leitores de tela. Ainda precisa de auditoria e testes com pessoas que usam tecnologias assistivas antes de ser considerado pronto para uso amplo.

## Identidade visual

Tema escuro com detalhes roxos e azuis, inspirado no robô mascote da SYNEX ACCESS.
