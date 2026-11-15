# JARVIS

**Tecnologia para ampliar possibilidades.**

Projeto web em desenvolvimento. A página inicial apresenta o JARVIS e suas categorias. A categoria **Acessibilidade** abre uma página própria com recursos iniciais de voz e leitura para apoiar pessoas cegas e com baixa visão.

## Estrutura
- `index.html`: página inicial e categorias.
- `acessibilidade.html`: página dedicada à acessibilidade.
- `acessibilidade.js`: leitura em voz alta e ditado por voz no navegador.
- `styles.css`: identidade visual e estilos responsivos.

## O que funciona nesta versão
- Site responsivo e navegação por teclado.
- Categoria Acessibilidade com página independente.
- Leitura de texto em voz alta em navegadores compatíveis.
- Ditado por voz quando o navegador oferece reconhecimento de fala.

## Limites desta versão
O projeto ainda não faz descrição automática de imagens, não está conectado a um modelo de IA e não substitui leitores de tela ou outras tecnologias assistivas. A compatibilidade de voz varia conforme navegador e dispositivo. A próxima etapa é integrar, com segurança, um serviço de IA para descrição de imagens e leitura de conteúdo visual.

## Publicação
O repositório contém um workflow de GitHub Pages em `.github/workflows/pages.yml`. É necessário habilitar GitHub Pages nas configurações do repositório para publicar o site.
