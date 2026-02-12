# Global Citizenship Foundation

[![Netlify Status](https://api.netlify.com/api/v1/badges/2533c2e3-a8eb-474a-abf9-136fc621f4ff/deploy-status?branch=develop)](https://app.netlify.com/projects/global-citizenship-foundation/deploys)

Monorepo z publiczną stroną GCF opartą o Next.js (web) + Sanity Studio (cms) + współdzielone typy TypeScript (types).

Repo jest skonfigurowane jako npm workspaces:

- apps/web - Next.js App Router (@gcf/web)
- apps/cms - Sanity Studio (@gcf/cms)
- packages/types - typy współdzielone (@gcf/types)

---

## Wymagania

- Node.js >= 24.13.0
- pnpm >= 10.29.2
- Git

---

## Struktura

```
.
├─ apps/
│  ├─ web/
│  └─ cms/
├─ packages/
│  └─ types/
├─ scripts/
└─ package.json
```

---

## Instalacja

Z root repo:

npm ci

Jeśli nie masz locka albo jesteś w trybie dev, możesz użyć npm i, ale do powtarzalnych buildów rekomendowane jest npm ci.

---

## Uruchomienie DEV (web + cms)

pnpm -w dev

To uruchamia równolegle:

- @gcf/web (Next.js dev)
- @gcf/cms (Sanity dev)

---

## Testy jakości (CI lokalnie)

Wszystkie kluczowe checki z root:

npm run check:routes
npm run typecheck
npm run lint
npm run build

---

## Build (prod)

Pełny build monorepo:

npm run build

To robi kolejno:

1. @gcf/types (build typów)
2. @gcf/web (Next build)
3. @gcf/cms (Sanity build)

---

## Start (prod)

### Web (Next.js)

npm -w @gcf/web run build
npm -w @gcf/web run start

Domyślnie: http://localhost:3000

Jeśli dostaniesz EADDRINUSE (port 3000 zajęty):

- zamknij proces, który trzyma port 3000, albo
- uruchom na innym porcie:

Linux/macOS:
PORT=3001 npm -w @gcf/web run start

Windows PowerShell:
$env:PORT=3001; npm -w @gcf/web run start

---

## Zmienne środowiskowe (ENV)

### Web (Next.js)

Plik:

- apps/web/.env.local

### CMS (Sanity Studio)

Plik (typowo):

- apps/cms/.env.local

Podczas builda Sanity do bundla wchodzą:

- SANITY_STUDIO_DATASET
- SANITY_STUDIO_PROJECT_ID

Upewnij się, że masz je ustawione w środowisku (lokalnie i na CI/deploy).

---

## Najczęstsze problemy

### 1) Port 3000 zajęty

Objaw: EADDRINUSE
Rozwiązanie: ubij proces albo ustaw PORT=3001 (patrz sekcja Start).

### 2) Next/Image i brak width/height

Jeśli używasz next/image bez fill, musisz podać width i height.
Najprościej:

- użyj fill + rodzic z position: relative i konkretnym rozmiarem, albo
- podaj width i height jawnie.

---

## Komendy w skrócie

DEV:

- npm run dev

CI-check lokalnie:

- npm run check:routes
- npm run typecheck
- npm run lint
- npm run build

Web:

- npm -w @gcf/web run dev
- npm -w @gcf/web run build
- npm -w @gcf/web run start

CMS:

- npm -w @gcf/cms run dev
- npm -w @gcf/cms run build

Types:

- npm -w @gcf/types run typecheck
- npm -w @gcf/types run build
