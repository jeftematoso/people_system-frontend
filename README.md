# People System - Backend (SaaS Multi-Tenant)

Este é o ecossistema de backend do **People System**, uma plataforma SaaS especializada na gestão, acompanhamento pedagógico e compliance para programas de **Jovens Aprendizes**. O sistema conta com uma arquitetura robusta de isolamento de dados (Multi-Tenant) e integração automatizada de cobranças via API do Asaas.

## 🚀 Tecnologias Utilizadas

* **Runtime:** Node.js com TypeScript
* **Framework Web:** Express.js
* **Banco de Dados & ORM:** PostgreSQL com Prisma ORM
* **Integração Financeira:** API V3 do Asaas (Sandbox/Production)

---

## 🔒 Arquitetura e Segurança (Isolamento Multi-Tenant)

O sistema foi desenhado sob o conceito de **Silos de Dados por Tenant**. Um usuário ou empresa parceira jamais conseguirá visualizar, alterar ou interceptar informações de outra organização.

* **Barreira de Inquilinos:** Controlada rigorosamente na camada de roteamento pelo `tenantMiddleware`.
* **Injeção de Contexto:** O middleware intercepta o cabeçalho `x-tenant-id` nas requisições HTTP e injeta a propriedade de forma segura em `req.tenantId`.
* **Garantia no Banco:** Todas as consultas e mutações realizadas via Prisma Client filtram os registros utilizando obrigatoriamente o ID isolado do Tenant ativo.

---

## 📂 Estrutura de Módulos (src/modules)

O backend é modularizado para facilitar a escalabilidade e a manutenção do código:

* **`finance`**: Centraliza o core financeiro do SaaS. Contém o `AsaasProvider` (comunicação direta com a API), emissão de assinaturas recorrentes e controle de faturamento dos Tenants (`statusPagamento`).
* **`classroom` & `lesson`**: Gerenciamento de turmas, abertura de diários de classe e cronogramas de disciplinas.
* **`lessonAttendance` & `companyAttendance`**: Controle de frequência dupla do jovem aprendiz (presença em sala de aula teórica e controle de ponto na empresa parceira).
* **`pedagogicalNote` & `evaluation`**: Módulo de acompanhamento pedagógico focado em evolução comportamental, técnica e registros de ocorrências.
* **`alerts` & `compliance`**: Motores de varredura automática para geração de alertas preventivos de conformidade trabalhista e pedagógica.
* **`enrollment`**: Vínculo formal de matrículas dos aprendizes nas respectivas turmas.

---

## ⚙️ Configuração do Ambiente (`.env`)

Para rodar o projeto localmente, certifique-se de configurar as seguintes variáveis de ambiente:

```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/people_system?schema=public"

# Integração Asaas
ASAAS_API_KEY="sua_api_key_de_sandbox_aqui"
ASAAS_API_URL="[https://sandbox.asaas.com/api/v3](https://sandbox.asaas.com/api/v3)"

## 🛣️ Endpoints da API (Documentação das Rotas)

Todas as rotas (exceto autenticação pública, se houver) exigem obrigatoriamente o cabeçalho de isolamento:
`x-tenant-id: <ID_DO_TENANT>`

### 💰 Módulo Financeiro & SaaS (Asaas)
* `POST /finance/activate` - Inicializa o cadastro do Tenant no Asaas e gera a assinatura recorrente.
* `POST /finance/webhook` - Endpoint público para o Asaas notificar o sistema sobre pagamentos e atrasos.

### 🏫 Módulo Pedagógico & Diário de Classe
* `POST /classroom` - Cadastra uma nova turma (Curso, data de início/fim).
* `GET /classroom` - Lista as turmas cadastradas no Tenant ativo.
* `POST /enrollment` - Matricula um Jovem Aprendiz em uma turma específica.

### 📝 Controle de Frequência Dupla (Compliance)
* `POST /lesson-attendance` - Registra a presença/falta do aprendiz na aula teórica.
* `POST /company-attendance` - Registra o ponto ou justificativa de falta do aprendiz na empresa parceira.

### 📊 Desempenho, Ocorrências e Dashboards
* `POST /pedagogical-note` - Cria uma evolução pedagógica ou advertência para o aprendiz (Com `title`, `description` e `createdBy`).
* `POST /evaluation` - Registra a avaliação técnica/comportamental (Comunicação, comportamento, assiduidade e entregas).
* `GET /pedagogical-dashboard` - Retorna os gráficos e métricas consolidadas de desempenho do Tenant.