import type { PortableTextBlock } from '../sanity/portableText';
import type { SanityImage } from '../sanity/image';

export interface MagazinSingleType {
  _id: string;
  title: string;
  slug?: { _type: 'slug'; current: string };

  issue: number;
  magazinImage?: SanityImage;

  introText?: PortableTextBlock[];
  shortIntro?: string;

  date: string;
  downloadPdf: string;
  downloadEpub: string;

  mastheadHeading: string;
}

export type RelatedMagazinType = Pick<MagazinSingleType, '_id' | 'slug' | 'magazinImage' | 'date'>;
