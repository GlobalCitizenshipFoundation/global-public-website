# Global Citizenship Foundation

[![Netlify Status](https://api.netlify.com/api/v1/badges/2533c2e3-a8eb-474a-abf9-136fc621f4ff/deploy-status?branch=main)](https://app.netlify.com/projects/global-citizenship-foundation/deploys)

To jest **monorepo** - czyli jedno repozytorium zawiera kilka projektów:

- `apps/web` - publiczna strona (Next.js)
- `apps/cms` - panel do zarządzania treścią (Sanity Studio)
- `packages/types` - wspólne typy TypeScript dla web i cms

---

## Wymagania

- Node.js `24.13.0` (zalecane, zgodne z .nvmrc/.node-version)
- pnpm `10.29.2`
- Git

Szybkie sprawdzenie:

```bash
node -v
pnpm -v
```

---

## Struktura

```
.
├─ apps/
│  ├─ web/
│  └─ cms/
├─ packages/
│  └─ types/
└─ package.json
```

---

## Pobieranie

### 1) Pobierz repozytorium. (Wybierz jedno)

- `<org>` - Nazwa organizacji/konta na GitHub.
- `<repo>` - Nazwa repozytorium.

### HTTPS (najprostsze - polecane dla początkujących)

- GitHub Docs: Klonowanie repozytorium (HTTPS/SSH)  
  https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
- GitHub Docs: Czym jest uwierzytelnianie HTTPS / tokeny (jeśli Git poprosi o logowanie)  
  https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github

```bash
git clone https://github.com/<org>/<repo>.git
```

### SSH (wygodne dla devów - wymaga kluczy SSH)

- GitHub Docs: O SSH
  https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh

- GitHub Docs: Konfiguracja SSH do GitHuba (krok po kroku)
  https://docs.github.com/en/authentication/connecting-to-github-with-ssh

```bash
git clone git@github.com:<org>/<repo>.git
```

### GitHub CLI (proste, jeśli masz gh - logowanie raz i spokój)

- GitHub Docs: GitHub CLI
  https://docs.github.com/en/github-cli/github-cli/about-github-cli

- GitHub Docs: Instalacja GitHub CLI
  https://docs.github.com/en/github-cli/github-cli/installation

- GitHub Docs: gh repo clone
  https://cli.github.com/manual/gh_repo_clone

```bash
gh repo clone <org>/<repo>
```

### 2) Przejdź do folderu.

```bash
cd <repo>
```

---

## Node i nvm

### Co to jest nvm?

nvm (Node Version Manager) to narzędzie do instalowania i przełączania wersji Node.js. W tym repo używamy Node `24.13.0`, więc nvm pozwala ustawić to jednym poleceniem.

### Instalacja nvm (linki)

> **macOS / Linux (nvm):**

- GitHub: https://github.com/nvm-sh/nvm#installing-and-updating

> **Windows (nvm-windows):**

- GitHub (repo): https://github.com/coreybutler/nvm-windows
- Pobieranie instalatora (Releases): https://github.com/coreybutler/nvm-windows/releases

### Ustawienie Node 24.13.0 przez nvm

W katalogu repozytorium:

```bash
nvm install
nvm use
node -v
```

Powinno pokazać `24.13.0`.

Uwaga dla Windows: w `nvm-windows` często używa się jawnej wersji, jeśli `.nvmrc` nie jest obsługiwane tak samo jak na macOS/Linux:

```bash
nvm install 24.13.0
nvm use 24.13.0
node -v
```

---

## Instalacja

### 1) Sprawdź Node.

```bash
node -v
```

> ### Jeśli wersja Node.js = `v24.13.0` pomiń krok 2.

### 2) Zmień wersje Node.js za pomocą nvm.

```bash
nvm install
nvm use
node -v
```

### 3) Włącz Corepack i aktywuj pnpm. To "pobiera" pnpm i aktywuje go bez globalnej instalacji.

```bash
corepack enable
corepack prepare pnpm@10.29.2 --activate
pnpm -v
```

### 4) Instalacja zależności.

```bash
pnpm install --frozen-lockfile
```

---

## Zmienne środowiskowe (ENV)

Skopiuj zmienne i uzupełnij odpowiednimi wartościami:

> **macOS / Linux / Git Bash:**

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env.local
```

> **Windows PowerShell:**

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
Copy-Item apps/cms/.env.example apps/cms/.env.local
```

---

## Uruchomienie

```bash
pnpm dev
```

To uruchamia równolegle:

- @gcf/web (Next.js dev)
- @gcf/cms (Sanity dev)

## Build (prod)

Pełny build monorepo:

```bash
pnpm build
```

To robi kolejno:

1. @gcf/types (build typów)
2. @gcf/web (Next build)
3. @gcf/cms (Sanity build)

---

## Start (prod)

### WEB (Next.js)

```bash
pnpm -C apps/web build
pnpm -C apps/web start
```

Domyślnie: http://localhost:3000

---

### CMS (Sanity Studio)

```bash
pnpm -C apps/cms build
pnpm -C apps/cms start
```

Domyślnie: http://localhost:3333

---

## Komendy w skrócie

DEV:

- pnpm dev

Web:

- pnpm -C apps/web dev
- pnpm -C apps/web build
- pnpm -C apps/web start

CMS:

- pnpm -C apps/cms dev
- pnpm -C apps/cms build
- pnpm -C apps/cms start

Types:

- pnpm -C packages/types typecheck
- pnpm -C packages/types build
