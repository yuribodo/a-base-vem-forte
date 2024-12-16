# **EcoFood**
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/yuribodo/a-base-vem-forte/blob/main/LICENSE)

**EcoFood** é uma solução inovadora para enfrentar o problema do descarte excessivo de alimentos em supermercados e restaurantes. O sistema monitora os prazos de validade dos produtos, sugere formas de reaproveitamento ou doação, ajudando a reduzir o desperdício e promovendo sustentabilidade.

---

## Índice

- [Introdução](#introdução)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Documentação](#documentação)
- [Instalação](#instalação)
- [Executando a Aplicação](#executando-a-aplicação)
- [Como Contribuir](#como-contribuir)
- [Contato](#contato)

---

## Introdução

Supermercados e restaurantes enfrentam grandes desafios na gestão de estoques de alimentos, resultando em desperdício significativo por causa de prazos de validade expirados. Isso não apenas gera impactos financeiros, mas também contribui para problemas ambientais, como o aumento do lixo orgânico.

**EcoFood** foi projetado para mitigar esses problemas, fornecendo uma plataforma que automatiza o monitoramento dos estoques, promovendo eficiência operacional, sustentabilidade e responsabilidade social.

---

## Tecnologias Utilizadas

### **Frontend**

- **React**: Biblioteca JavaScript para construção de interfaces de usuário reutilizáveis e interativas.
- **TypeScript**: Superset do JavaScript que oferece segurança de tipos e recursos avançados do ECMAScript.
- **TailwindCSS**: Framework CSS focado em utilidades, fornecendo classes pré-definidas para estilização ágil.

### **Backend**

#### **Funcionalidades Principais**

- **Registro de Usuário**: Cadastro de novos usuários.
- **Login de Usuário**: Autenticação segura para acesso às funcionalidades.
- **Gerenciamento de Produtos**: CRUD para monitorar produtos em estoque, incluindo informações de validade.
- **Controle de Atividades (Logs)**: Registro detalhado de ações realizadas no sistema.

#### **Tecnologias**

- **Linguagem**: Python
- **Framework**: Django e Django Rest Framework
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Baseada em token (ex.: Simple JWT)

---

## Documentação

A documentação completa da API é gerada com Swagger, utilizando o **DRF Spectacular**. Inclui detalhes de endpoints, exemplos de uso e respostas esperadas.

**Acesse a documentação aqui**: [EcoFood API Docs](http://127.0.0.1:8000/api/ecofood/docs/)

---

## Instalação

### **Pré-requisitos**
Certifique-se de que você tenha instalado:
- `node` e `npm`
- `Python 3.8+`
- Banco de dados PostgreSQL configurado

### **Passos**

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/yuribodo/a-base-vem-forte.git
    ```

2. **Navegue para o repositório:**:

   ```bash
   cd a-base-vem-forte
   ```

3. **Instale as dependências:**:

   - For Frontend:
   
     ```bash
     cd Front
     npm install
     ```

   - For Backend:

     ```bash
     cd Backend
     python -m venv venv # Cria o ambiente virtual
     source venv/bin/activate  # Linux/Mac # Acessa o ambiente virtual
     venv\Scripts\activate  # Windows # # Acessa o ambiente virtual
     pip install -r requirements.txt
     ```
    
4. Configure o banco de dados:
      - Edite o arquivo settings.py do Django com suas credenciais do banco de dados PostgreSQL.
5. Realize as migrações:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
6. Inicie o servidor Backend:
  ```bash
  python manage.py runserver
  ```

## Executando a Aplicação

- **Para executar o Frontend**:
1. Navegue até o diretório do Frontend
  ```bash
  cd Front
  ```
2. Inicie o servidor React
   ```bash
   npm run dev
   ```
3. Acesse o frontend no navegador em: http://localhost:3000

- **Para executar o Backend**:
1. Certifique-se de que o ambiente virtual está ativado
2. Inicie o servidor Django:
  ```bash
  python manage.py runserver
  ```
3. Acesse o backend no navegador em: http://localhost:8000
  

## Como contribuir
1. **Fork esse repositório.**
2. **Crie uma branch para a sua mudança:**
   ```bash
   git checkout -b sua-branch
   ```
3. **Faça suas alterações e envie um pull request:**
   ```bash
     git add .
     git commit -m "Descrição da mudança"
     git push origin sua-branch
   ```
---

## Contato
- Developers: Duanne Moraes, Mario Mota, Gabriel Melo e Vadilson Brito
- LinkedIn:
- [Duanne Moraes](https://www.linkedin.com/in/duanne-moraes-7a0376278/)
- [Mario Mota](https://www.linkedin.com/in/mario-yuri-mota-lara-1a801b272/)
- [Gabriel Melo](https://www.linkedin.com/in/gabrielmelo7/)
- [Vandilson](https://www.linkedin.com/in/vandilson-brito-desenvolvedor-frontend/)
