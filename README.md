# GCF Frontend (Next.js + Sanity)

## Wymagania

- Node >= 20
- Sanity project + dataset

## Start

1. Skopiuj ENV:

````bash
cp .env.example .env.local

##Uzupełnij wartości:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID

NEXT_PUBLIC_SANITY_DATASET

SANITY_API_READ_TOKEN (wymagany dla draft mode)
````

##Instalacja i dev:

```cmd
npm i
npm run dev
```
