<p align="center">
  <img src="logo.svg"/>
</p>

<p align="center">
  <img src="web/src/assets/logo.svg"/>
</p>

# Ecoleta ♻️
Esta pasta é referente ao Ecoleta, projeto desenvolvido na primeira edição do evento Next Level Week, da Rocketseat.

# Proposta 🔥
Este projeto é uma intervenção tecnológica no meio ambiente, o qual tem o objetivo de conectar pessoas a pontos de coleta para
reciclagem. Tais pontos também são cadastrados pelos próprios usuários, informando os devidos dados para contato e localização
do respectivo ponto.

# Tecnologias Utilizadas 🚀
Typescript 🦕 </br>
NodeJS ⚛️ <br />
Express 🚂 <br />
Knex ⚡ <br />
Cors 🛡️ <br />
SQLite 🐦 <br />
Entre outras...

# Estrutura de Pastas 🗃️

    ├── src
        ├── controllers    # Controllers das entidades da aplicação
        └── database       # Arquivos que atuam na camada do banco de dados.

Para a pasta database, há a pasta de migrations e seeds.
                 
     ├── database
            ├── migrations  # "Controle de versão do banco de dados", responsável por mantê─lo atualizado entre o time.
            └── seeds       # Arquivos que têm a responsabilidade de popular o banco de dados em na primeira inicialização.

# Rotas 🛣️
<code>post/points</code>: Criação de um novo ponto de coleta. Recebe "name", "email", "whatsapp", "latitude", "longitude",
"city", "uf", "itens" no corpo da requisição. <br />
<code>get/itens</code>: Lista todos os tipos de itens disponíveis para reciclagem; <br />
<code>get/points</code>: Lista todos os pontos de coleta dado um filtro. Recebe "city", "uf" e "item" como query params.<br />
<code>get/points/:id</code>: Lista um ponto de coleta específico, recebe o id do ponto como route param.<br />

<br />
Obs: "itens" refere─se aos itens para reciclagem e são números, conforme consta na migration de criação de itens <br />

# Como obter esse repositório 🤔
Backend:
  1. Clone esse repositório utilizando <code>git clone</code>.
  2. Navegue até a pasta 'backend'.
  3. Rode o comando <code> yarn </code> na raíz da pasta para baixar as dependências.
  4. Rode o comando <code> yarn dev:server</code> para inicializar o servidor.
  5. Happy Hacking! 🚀

# Como Contribuir? 😍
**Faça um fork deste repositório**

```bash
# Clone o seu fork
$ git clone url-do-seu-fork && cd Ecoleta

# Crie uma branch com sua feature ou correção de bugs
$ git checkout -b minha-branch

# Faça o commit das suas alterações
$ git commit -m 'minhas alterações'

# Faça o push para a sua branch
$ git push origin minha-branch
```

Delete sua branch, se quiser, quando o merge da sua pull request for feito. <br />

Feito com 💜 por <a href="https://www.linkedin.com/in/andrecampll/" target="blank">andrecampll</a>.
