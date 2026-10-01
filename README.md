# Link Hub

Aplicação web inspirada em plataformas de compartilhamento de links, desenvolvida com React, TypeScript e Vite.

O projeto permite que usuários criem seus próprios perfis e adicionem links personalizados para redes sociais, sites e outros conteúdos, com opções de personalização para cada link.

## Tecnologias

* React
* TypeScript
* Vite
* React Router
* Firebase
* Tailwind CSS
* React Icons
* CSS

## Funcionalidades

* Cadastro de usuários
* Autenticação de usuários
* Criação de perfil
* Adição de links personalizados
* Edição de links
* Remoção de links
* Personalização das cores dos links
* Perfil individual para cada usuário
* Visualização dos links do perfil
* Navegação entre páginas
* Interface responsiva
* Armazenamento dos dados utilizando Firebase

## Firebase

O projeto utiliza o **Firebase** para gerenciamento dos usuários e armazenamento dos dados da aplicação.

O **Firebase Authentication** é utilizado para realizar o cadastro e autenticação dos usuários.

O **Cloud Firestore** é utilizado para armazenar os dados dos perfis e links cadastrados.

## Como executar

### Pré-requisitos

* Node.js
* npm
* Projeto configurado no Firebase

### Instalação

Clone o repositório:

```bash
git clone https://github.com/phmotta9/projeto-link-hub.git
```

Entre na pasta:

```bash
cd projeto-link-hub
```

Instale as dependências:

```bash
npm install
```

Configure as credenciais do Firebase no projeto.

Depois, inicie a aplicação:

```bash
npm run dev
```

A aplicação estará disponível no endereço informado pelo Vite no terminal.

## Estrutura

O projeto utiliza uma estrutura baseada em componentes e páginas, separando as principais responsabilidades da aplicação.

```text
src/
├── components/
├── pages/
├── ...
├── App.tsx
└── main.tsx
```

* `components/` — Componentes reutilizáveis da interface.
* `pages/` — Páginas principais da aplicação.
* `App.tsx` — Componente principal e configuração das rotas.
* `main.tsx` — Ponto de entrada da aplicação.

## Objetivo

Projeto desenvolvido para praticar o desenvolvimento de aplicações web utilizando React, TypeScript, autenticação de usuários, integração com Firebase, gerenciamento de rotas e criação de interfaces personalizadas.

O Link Hub também faz parte do meu portfólio como estudante de Engenharia de Software, representando uma aplicação prática de gerenciamento de perfis e links personalizados.
