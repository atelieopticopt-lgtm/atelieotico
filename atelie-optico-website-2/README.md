# Ateliê Ótico Website 2

Projeto Astro importado diretamente da versão portuguesa estática existente no
diretório principal. As 160 páginas, rotas portuguesas, estrutura HTML, imagens,
CSS e JavaScript são preservados sem tradução ou redesign durante a importação.

## Executar localmente

Requer Node.js 22.12 ou superior.

```powershell
npm install
npm run dev
```

Abra `http://localhost:4321/`.

Se o PowerShell bloquear `npm.ps1`, use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
```

## Importar e gerar novamente

```powershell
npm run regen
```

Esse comando volta a importar os 160 ficheiros-fonte portugueses, copia os recursos
originais, emite as rotas Astro correspondentes e cria `dist/`.

## Estrutura

```text
public/                  Cópia dos recursos da versão portuguesa
src/content/*.page       Cópias integrais das páginas-fonte portuguesas
src/pages/               Rotas Astro com os mesmos caminhos portugueses
tools/                   Importador e verificador da conversão
dist/                    Website estático pronto para publicação
```

## Limitações

O resultado preserva a apresentação e o comportamento no navegador, mas continua
a ser um website estático. Funcionalidades que exigem WordPress ou WooCommerce —
como autenticação, checkout, conta, pesquisa AJAX e submissão de formulários —
necessitam de um backend separado.
