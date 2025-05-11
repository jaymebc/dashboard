# Políticas de Segurança 🔒

A segurança do *Dashboard Web Personalizável* é uma prioridade. Agradecemos à comunidade por ajudar a manter este projeto seguro. Este documento descreve como relatar vulnerabilidades e nossas práticas de segurança.

---

## Português 🇧🇷

### 📋 Sobre o Projeto

O *Dashboard Web Personalizável* é uma aplicação web estática (HTML, CSS, JavaScript, YAML) para organizar links, com relógio, calendário e temas personalizáveis. Ele roda localmente via servidor HTTP (ex.: `python3 -m http.server`) e não inclui backend ou banco de dados.

### 🔍 Escopo

Estas políticas cobrem:

- Arquivos principais: `index.html`, `styles.css`, `script.js`, `services.yaml`.
- Dependências: `js-yaml` (via CDN), fontes Poppins (Google Fonts).
- Funcionalidades: Sidebar, relógio, calendário, barra de pesquisa Google, seleção de fundos, cards de serviços.

Excluem:

- Servidores locais (ex.: Python HTTP server).
- Imagens em `backgrounds/` ou `icons/`.
- Sites externos vinculados em `services.yaml`.

### 📩 Como Relatar Vulnerabilidades

Se encontrar uma vulnerabilidade, por favor, siga estas etapas:

1. **Não crie issues públicas**: Evite divulgar detalhes da vulnerabilidade publicamente até que seja corrigida.
2. **Entre em contato diretamente**:
   - Envie um e-mail para jaymebc@gmail.com com:
     - Descrição da vulnerabilidade.
     - Passos para reproduzir.
     - Impacto potencial (ex.: XSS, acesso a arquivos).
   - Ou use o recurso de *Advisory* no GitHub:
     1. Acesse https://github.com/jaymebc/dashboard/security/advisories.
     2. Crie um *Security Advisory* privado com detalhes.
3. **Forneça detalhes**:
   - Inclua versão do dashboard (ex.: 1.00).
   - Descreva o ambiente (navegador, sistema operacional).
   - Anexe capturas de tela ou logs, se aplicável.

### ⏳ Processo de Resposta

- **Confirmação**: Responderei em até **7 dias** confirmando o recebimento do relatório.
- **Validação**: Verificarei a vulnerabilidade em até **14 dias**.
- **Correção**: Se válida, trabalharei em uma correção, priorizando impactos graves (ex.: XSS).
- **Divulgação**: Após a correção, publicarei um *Advisory* no GitHub com créditos ao relator (se desejar).
- **Atualização**: Uma nova versão (ex.: 3.12) será lançada com a correção.

### 🛠️ Boas Práticas para Usuários

Para usar o dashboard com segurança:

- **Atualize dependências**: Verifique atualizações de `js-yaml` (CDN: https://cdn.jsdelivr.net/npm/js-yaml).
- **Valide** `services.yaml`: Use YAML Validator para evitar erros de sintaxe.
- **Use imagens confiáveis**: Adicione fundos e ícones de fontes seguras (ex.: Unsplash, Placeholder).
- **Limpe o cache**: Após atualizações, limpe o cache do navegador (`Ctrl+Shift+Delete`).
- **Evite URLs maliciosas**: Configure `services.yaml` apenas com URLs confiáveis.

### 🙏 Agradecimentos

Agradecemos a todos que reportarem vulnerabilidades de forma responsável. Seu apoio fortalece a segurança do projeto!

### 📜 Licença

As políticas seguem a licença MIT © 2025 Jayme Castilho, conforme o arquivo `LICENSE`.

---

## English 🇬🇧

### 📋 About the Project

The *Customizable Web Dashboard* is a static web application (HTML, CSS, JavaScript, YAML) for organizing links, featuring a clock, calendar, and customizable themes. It runs locally via an HTTP server (e.g., `python3 -m http.server`) and does not include a backend or database.

### 🔍 Scope

These policies cover:

- Core files: `index.html`, `styles.css`, `script.js`, `services.yaml`.
- Dependencies: `js-yaml` (via CDN), Poppins fonts (Google Fonts).
- Features: Sidebar, clock, calendar, Google search bar, background selection, service cards.

Exclusions:

- Local servers (e.g., Python HTTP server).
- Images in `backgrounds/` or `icons/`.
- External websites linked in `services.yaml`.

### 📩 Reporting Vulnerabilities

If you discover a vulnerability, please follow these steps:

1. **Do not create public issues**: Avoid disclosing vulnerability details publicly until resolved.
2. **Contact directly**:
   - Send an email to jaymebc@gmail.com with:
     - Description of the vulnerability.
     - Steps to reproduce.
     - Potential impact (e.g., XSS, file access).
   - Or use GitHub's *Advisory* feature:
     1. Visit https://github.com/jaymebc/dashboard/security/advisories.
     2. Create a private *Security Advisory* with details.
3. **Provide details**:
   - Include the dashboard version (e.g., 1.00).
   - Describe the environment (browser, operating system).
   - Attach screenshots or logs, if applicable.

### ⏳ Response Process

- **Acknowledgment**: I will confirm receipt within **7 days**.
- **Validation**: I will verify the vulnerability within **14 days**.
- **Resolution**: If valid, I will work on a fix, prioritizing severe issues (e.g., XSS).
- **Disclosure**: After resolution, I will publish a GitHub *Advisory* with credits to the reporter (if desired).
- **Update**: A new version (e.g., 3.12) will be released with the fix.

### 🛠️ Best Practices for Users

To use the dashboard securely:

- **Update dependencies**: Check for updates to `js-yaml` (CDN: https://cdn.jsdelivr.net/npm/js-yaml).
- **Validate** `services.yaml`: Use YAML Validator to avoid syntax errors.
- **Use trusted images**: Source backgrounds and icons from safe platforms (e.g., Unsplash, Placeholder).
- **Clear cache**: After updates, clear the browser cache (`Ctrl+Shift+Delete`).
- **Avoid malicious URLs**: Configure `services.yaml` with trusted URLs only.

### 🙏 Acknowledgments

Thank you to everyone who responsibly reports vulnerabilities. Your support strengthens the project's security!

### 📜 License

These policies follow the MIT License © 2025 Jayme Castilho, as outlined in the `LICENSE` file.

---

**Desenvolvido por Jayme Castilho.**