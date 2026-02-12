import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { paths as appPaths } from "../src/shared/config/paths";

type RouteMap = Map<string, string[]>;

const exts = [".tsx", ".ts", ".jsx", ".js"] as const;

const exists = (p: string) => fs.existsSync(p);

const findAppDir = () => {
  const candidates = [
    path.resolve("src/app"),
    path.resolve("app"),

    path.resolve("apps/web/src/app"),
    path.resolve("apps/site/src/app"),
    path.resolve("apps/frontend/src/app"),
    path.resolve("apps/website/src/app"),

    path.resolve("apps/web/app"),
    path.resolve("apps/site/app"),
    path.resolve("apps/frontend/app"),
    path.resolve("apps/website/app"),
  ];

  const found = candidates.find(exists);
  if (!found) {
    throw new Error(`Nie znaleziono katalogu app. Sprawdziłem:\n- ${candidates.join("\n- ")}`);
  }
  return found;
};

const isRouteGroup = (name: string) => /^\(.*\)$/.test(name);
const isParallelRoute = (name: string) => name.startsWith("@");

const stripIntercept = (name: string) => name.replace(/^\(\.{1,3}\)/, "");

const toUrlSeg = (dirName: string) => {
  const clean = stripIntercept(dirName);

  if (isRouteGroup(clean) || isParallelRoute(clean)) return null;

  const m = clean.match(/^\[(.+)\]$/);
  if (m) return `:${m[1]}`;

  return clean;
};

const normalizeUrl = (u: string) => {
  if (u === "/") return "/";
  const trimmed = u.trim();
  const noTrailing = trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
  return noTrailing.startsWith("/") ? noTrailing : `/${noTrailing}`;
};

const joinUrl = (base: string, seg: string | null) => {
  if (!seg) return base;
  if (base === "/") return `/${seg}`;
  return `${base}/${seg}`;
};

const listDirs = (p: string) =>
  fs
    .readdirSync(p, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

const hasPageFile = (dir: string) => exts.some((e) => exists(path.join(dir, `page${e}`)));

const walkApp = (appDir: string) => {
  const map: RouteMap = new Map();

  const walk = (absDir: string, urlBase: string) => {
    if (hasPageFile(absDir)) {
      const key = normalizeUrl(urlBase);
      const prev = map.get(key) ?? [];
      map.set(key, [...prev, absDir]);
    }

    for (const child of listDirs(absDir)) {
      const seg = toUrlSeg(child);
      const nextUrl = joinUrl(urlBase, seg);
      walk(path.join(absDir, child), nextUrl);
    }
  };

  walk(appDir, "/");
  return map;
};

const requiredStaticRoutes = () => {
  const vals = Object.values(appPaths).map(normalizeUrl);
  const bad = vals.filter((v) => !v);
  if (bad.length) throw new Error("Wykryto puste ścieżki w paths.");
  return vals;
};

const requiredDynamicRoutes = () => {
  return [
    `${normalizeUrl(appPaths.contributors)}/:slug`,
    `${normalizeUrl(appPaths.events)}/:slug`,
    `${normalizeUrl(appPaths.magazine)}/:slug`,
    `${normalizeUrl(appPaths.partners)}/:slug`,
  ];
};

const main = () => {
  const appDir = findAppDir();
  const discovered = walkApp(appDir);

  const missingStatic: string[] = [];
  const missingDynamic: string[] = [];

  const requiredStatic = requiredStaticRoutes();
  for (const r of requiredStatic) {
    if (!discovered.has(r)) missingStatic.push(r);
  }

  const discoveredDynamic = new Set<string>();
  for (const key of discovered.keys()) {
    discoveredDynamic.add(key);
  }

  for (const r of requiredDynamicRoutes()) {
    if (!discoveredDynamic.has(normalizeUrl(r))) missingDynamic.push(normalizeUrl(r));
  }

  const trailingSlash = Object.entries(appPaths)
    .filter(([, v]) => v !== "/" && v.endsWith("/"))
    .map(([k, v]) => `${k}: "${v}"`);

  const ok =
    missingStatic.length === 0 && missingDynamic.length === 0 && trailingSlash.length === 0;

  if (ok) {
    console.log(`✅ Route check OK. appDir=${appDir}`);
    process.exit(0);
  }

  console.error(`❌ Route check FAILED. appDir=${appDir}\n`);

  if (trailingSlash.length) {
    console.error("Trailing slash w paths (usuń, bo to robi bałagan):");
    for (const t of trailingSlash) console.error(`  - ${t}`);
    console.error("");
  }

  if (missingStatic.length) {
    console.error("Brakuje statycznych stron (paths.*):");
    for (const r of missingStatic) console.error(`  - ${r}`);
    console.error("");
  }

  if (missingDynamic.length) {
    console.error("Brakuje dynamicznych stron ([slug]):");
    for (const r of missingDynamic)
      console.error(`  - ${r}  (np. folder: ${r.replace("/:slug", "/[slug]")})`);
    console.error("");
  }

  console.error("Wykryte routy (dla debug):");
  for (const [k, dirs] of [...discovered.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    console.error(`  ${k}  ->  ${dirs.map((d) => path.relative(process.cwd(), d)).join(", ")}`);
  }

  process.exit(1);
};

main();
