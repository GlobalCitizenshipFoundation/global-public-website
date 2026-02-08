const assertSlug = (slug: string) => {
  const s = slug.trim();
  if (!s) throw new Error('Slug cannot be empty');
  return encodeURIComponent(s);
};

export const paths = {
  home: '/',

  about: '/about',
  governance: '/governance',
  networks: '/networks',
  initiatives: '/initiatives',

  event: '/event',
  events: '/events',
  magazine: '/magazine',
  partners: '/partners',
  contributors: '/contributors',

  contact: '/contact',

  secretariat: '/secretariat',
  community: '/community',
  education: '/education',
  newsletter: '/newsletter',

  help: '/help',
  system: '/system',
  career: '/career',
  proposal: '/proposal',
  support: '/support',

  impressum: '/impressum',
  privacy: '/privacy',
  cookie: '/cookie',
  policies: '/policies',
  terms: '/terms',
} as const;

export const path = {
  contributor: (slug: string) => `${paths.contributors}/${assertSlug(slug)}`,
  event: (slug: string) => `${paths.event}/${assertSlug(slug)}`,
  magazinePost: (slug: string) => `${paths.magazine}/${assertSlug(slug)}`,
  partner: (slug: string) => `${paths.partners}/${assertSlug(slug)}`,
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];
