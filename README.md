# Pegasus Consultoria

Site institucional desenvolvido para apresentar os serviços da Pegasus Consultoria e facilitar o contato entre potenciais clientes e a empresa.

O projeto combina uma interface web responsiva com uma API REST em Java e Spring Boot, responsável por receber solicitações de contato e encaminhá-las automaticamente por e-mail.

## 🎯 Problema que o projeto busca resolver

Muitas empresas e profissionais precisam de uma presença digital que apresente seus serviços e permita que clientes interessados entrem em contato de maneira simples.

O Pegasus busca solucionar essa necessidade por meio de:

- Apresentação profissional da empresa e de seus serviços.
- Centralização das solicitações de contato.
- Envio automático das mensagens para o e-mail responsável.
- Redução da necessidade de atendimento manual inicial.
- Facilidade para potenciais clientes enviarem suas dúvidas e solicitações.

**Aplicação no mercado:** o projeto pode servir como base para sites institucionais de consultorias, profissionais autônomos, pequenas empresas e prestadores de serviços que desejam captar novos clientes pela internet.

## ✨ Funcionalidades

### Interface web
- Página inicial com apresentação da Pegasus Consultoria.
- Seção institucional sobre a empresa.
- Apresentação de serviços.
- Formulário de contato.
- Layout responsivo para dispositivos móveis.
- Menu de navegação adaptado para telas menores.
- Máscara e validação inicial do telefone.
- Feedback visual após o envio do formulário.

### Backend
- API REST desenvolvida com Spring Boot.
- Endpoint para recebimento de mensagens.
- Validação dos dados utilizando Jakarta Validation.
- Envio automático de e-mails por SMTP.
- Configuração de destinatário e remetente por variáveis de ambiente.
- Configuração de CORS para controlar as origens permitidas.
- Tratamento de envios por meio de um campo honeypot.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Java 17 | Linguagem principal |
| Spring Boot 3.3.2 | Estrutura do backend |
| Spring Web | Desenvolvimento da API REST |
| Spring Mail | Envio de e-mails |
| Jakarta Validation | Validação dos dados |
| Lombok | Suporte ao desenvolvimento Java |
| HTML5 | Estrutura da página |
| CSS3 | Estilização e responsividade |
| JavaScript | Interatividade e comunicação com a API |
| Maven | Gerenciamento de dependências |

## 🏗️ Arquitetura do projeto

O projeto está organizado em uma estrutura que separa as responsabilidades da aplicação.

```text
Pegasus/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── Config/
│   │   │   │   └── CorsConfig.java
│   │   │   ├── Consultory/
│   │   │   │   └── Pegasus/
│   │   │   │       └── PegasusApplication.java
│   │   │   ├── Controller/
│   │   │   │   └── ContactController.java
│   │   │   ├── Service/
│   │   │   │   └── EmailService.java
│   │   │   └── dto/
│   │   │       └── ContactRequest.java
│   │   └── resources/
│   │       ├── application.yaml
│   │       └── static/
│   │           ├── index.html
│   │           └── script.js
│   └── test/
├── pom.xml
└── README.md
```

### Responsabilidades

- **ContactController:** recebe as solicitações HTTP e encaminha os dados para o serviço.
- **EmailService:** prepara e envia as mensagens por e-mail.
- **ContactRequest:** define os dados recebidos e suas regras de validação.
- **CorsConfig:** configura as origens autorizadas a acessar a API.
- **PegasusApplication:** inicializa a aplicação Spring Boot.

## 🔐 Segurança e validação

O projeto implementa algumas medidas para melhorar a segurança e a confiabilidade do formulário:

- **Validação no backend:** verifica campos obrigatórios, formato do e-mail e limites de tamanho.
- **Honeypot:** utiliza um campo oculto para identificar e ignorar alguns envios automatizados.
- **Variáveis de ambiente:** evita deixar as credenciais SMTP diretamente no arquivo de configuração.
- **CORS configurável:** permite definir quais origens podem realizar requisições à API.
- **Limites de entrada:** restringe o tamanho dos campos recebidos para reduzir entradas excessivamente grandes.

### Melhorias de segurança recomendadas

Para uma utilização comercial em produção, ainda é importante implementar:

- Rate limiting para limitar o número de envios por IP.
- CAPTCHA ou outra proteção adicional contra spam.
- Logs e monitoramento de falhas no envio de e-mails.
- Tratamento centralizado de exceções e respostas HTTP.
- Política de privacidade e adequação à LGPD.
- Configuração de HTTPS no ambiente de hospedagem.
- Testes automatizados para validação e envio de mensagens.

## 📡 API REST

### Enviar mensagem de contato

`POST /api/contact`

**Exemplo de requisição:**

```json
{
  "email": "cliente@exemplo.com",
  "phone": "(11) 99999-9999",
  "message": "Gostaria de conhecer melhor os serviços da consultoria.",
  "website": ""
}
```

**Resposta de sucesso:**

```json
{
  "message": "Mensagem enviada com sucesso."
}
```

O endpoint recebe os dados, valida as informações e encaminha a mensagem para o endereço de e-mail configurado.

## ⚙️ Configuração e execução

### Requisitos

- Java 17 ou superior.
- Maven.
- Conta de e-mail com SMTP habilitado.

### 1. Clone o repositório

```bash
git clone https://github.com/kaduzixs/ConsultoryPegasus.git
```

### 2. Entre na pasta

```bash
cd ConsultoryPegasus
```

### 3. Configure as variáveis de ambiente

O projeto utiliza as seguintes variáveis:

| Variável | Descrição |
|---|---|
| `MAIL_USERNAME` | E-mail utilizado para autenticação SMTP |
| `MAIL_PASSWORD` | Credencial SMTP ou senha de aplicativo |
| `MAIL_TO` | E-mail que receberá os contatos |
| `CORS_ALLOWED_ORIGINS` | Origens autorizadas a acessar a API |
| `PORT` | Porta utilizada pelo servidor |

Exemplo para desenvolvimento local:

```bash
export MAIL_USERNAME="seuemail@gmail.com"
export MAIL_PASSWORD="sua_senha_de_aplicativo"
export MAIL_TO="destino@exemplo.com"

export CORS_ALLOWED_ORIGINS="http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000"

export PORT=8080
```

Não compartilhe credenciais reais nem envie arquivos com senhas para o GitHub.

### 4. Execute a aplicação

```bash
./mvnw spring-boot:run
```

No Windows:

```bash
mvnw.cmd spring-boot:run
```

A API ficará disponível, por padrão, em:

```text
http://localhost:8080
```

## 🚀 Possibilidades de evolução

O projeto pode evoluir para uma plataforma mais completa de atendimento e relacionamento com clientes.

Algumas funcionalidades futuras:

- Painel administrativo para visualizar contatos recebidos.
- Armazenamento de mensagens em banco de dados.
- Histórico de solicitações.
- Sistema de autenticação para administradores.
- Gerenciamento de clientes e oportunidades.
- Integração com WhatsApp Business.
- Notificações automáticas.
- Dashboard com indicadores de contatos e conversões.

## 💼 Potencial de aplicação no mercado

O Pegasus representa uma solução inicial para empresas que desejam estabelecer presença digital e facilitar a captação de clientes.

Seu modelo pode ser adaptado para diferentes segmentos, como:

- Consultorias empresariais.
- Escritórios de serviços profissionais.
- Pequenas empresas.
- Profissionais autônomos.
- Prestadores de serviços.

O principal valor comercial está na combinação de apresentação institucional e recebimento automatizado de contatos.

## 👨‍💻 Autor

Desenvolvido por **KaduZixs**.

GitHub: https://github.com/kaduzixs

---

Projeto desenvolvido com Java e Spring Boot, aplicando conceitos de API REST, separação de responsabilidades, validação de dados, integração SMTP e desenvolvimento web responsivo.