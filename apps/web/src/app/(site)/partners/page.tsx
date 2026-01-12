import ContainerBig from '@/shared/ui/ContainerBig';
import { getPartners } from '@/features/partners/api/getPartners';
import PartnersLogo from '@/features/partners/ui/PartnersLogo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners',
};

const PartnersPage = async () => {
  const partners = await getPartners();
  return (
    <>
      <ContainerBig className="mt-25">
        <h2 className="text-titles mb-5 text-6xl font-semibold">Partners</h2>
        <p className="mb-23 text-2xl/normal font-normal">
          Transforming education for global citizenship and sustainable development. We work to
          wards transforming education for global citizenship and sustainable.
        </p>
      </ContainerBig>
      <div className="bg-background-darker py-36">
        <ContainerBig>
          <div className="flex w-full flex-wrap gap-21.25">
            {partners.map((partner) => (
              <PartnersLogo key={partner.slug.current} partner={partner} />
            ))}
          </div>
        </ContainerBig>
      </div>
    </>
  );
};

export default PartnersPage;
