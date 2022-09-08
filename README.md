# **Sistema de Cadastro de Clientes para Escritório de Advocacia**

## Descrição:

  ##### É um sistema para cadastro de clientes em escritórios de advocacia que possuem os processos dos clientes em papel. Por segurança e privacidade dos dados dos clientes, a migração dos dados para o ambiente digital é indispensável, pois assim, há garantia que os dados não serão perdidos, roubados ou até mesmo queimados em caso de incêndio. Além disso, fica muito mais fácil cada advogado acessar o sistema e verificar os clientes e seus respectivos processos judiciais.
  
## Requisitos:

- Node.js
- Mongoose
- Express
- Json Web Token (jwt)
- Bcrypt
- Dotenv
- Nodemon
- Postman

## Instalação

### Instalar o Node.js

  **Windows 64-bit**
  
   https://nodejs.org/en/
   
   Obs: Instalar a versão 16.17.0 LTS.
   
### Acessar a pasta do projeto

É necessário acessar a pasta do projeto pelo terminal antes de instalar os requisitos via NPM. Exemplo:
```
cd users/fulanodasilva/Documents/projetoAPI
```
   
### Instalar os outros requisitos

Para instalar o Mongoose, Express, JWT, Bcrypt e Dotenv, pode usar um comando via NPM dentro da pasta do projeto via terminal:
```
npm install mongoose express jsonwebtoken bcrypt dotenv
```

Instalar o Nodemon
```
npm install --save-dev nodemon
```

### Instalar o Postman
 
 **Windows 64-bit**
 
 https://www.postman.com/downloads/

## Rodando o Server

Comando para rodar o server:
```
node nomedoarquivo.js
```
Obs: Deve ser executado o arquivo que possui a conexão com o banco de dados, nesse caso o mongoose.

## Utilizando as rotas

### Criar um Usuário:
  
  Criar um método POST no Postman e inserir a URL:
  ```
  http://localhost:3000/users/auth/register
  ```
  **Body:**
 ```   
  {
    "name": "teste da silva",
    "email": "teste@gmail.com",
    "oab": 123456,
    "password": "teste",
    "confirmpassword": "teste"
}
```

### Fazer Login com Usuário:

  ```
  http://localhost:3000/users/auth/login
  ```
   **Body:**
 ```   
  {
    "email": "teste@gmail.com",
    "password": "teste",
}
```
  **TOKEN:**
    Utilizar o Token gerado no login para utilizar as rotas consulta, atualização e exclusão.

### Consultar Lista de Usuários
  
  Criar um método GET no Postman e inserir a URL:
  ```
  http://localhost:3000/users
  ```
  **Authorization:**
  
  No campo "Type", selecionar "Bearer Token" e inserir o token gerado no login.
  
  ### Atualizar um Usuário:
  
  Criar um método PUT no Postman e inserir a URL:
  ```
  http://localhost:3000/users/{id}
  ```
  **Body:**
 ```   
  {
    "name": "teste da silva",
    "email": "teste@gmail.com"
}
```
  Obs: Na URL, substituir o "id" pelo número do id do usuário que deseja atualizar.
  
 **Authorization:**
  
  No campo "Type", selecionar "Bearer Token" e inserir o token gerado no login.
 
 
 
### Excluir um Usuário:
  
  Criar um método DELETE no Postman e inserir a URL:
  ```
  http://localhost:3000/users/{id}
  ```
  Obs: Na URL, substituir o "id" pelo número do id do usuário que deseja atualizar.
  
  **Authorization:**
  
  No campo "Type", selecionar "Bearer Token" e inserir o token gerado no login.
  
 
 
