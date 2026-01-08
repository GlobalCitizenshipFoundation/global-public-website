import ContainerBig from '@/components/ContainerBig';
import { getMagazin } from '../../lib/magazinSingle-fetch';
import RelatedMagazin from '@/components/Magazin/RelatedMagazin';

const MagazinesPage = async () => {
  const magazins = await getMagazin();
  return (
    <>
      <ContainerBig className="mt-25">
        <h2 className="text-titles mb-5 text-6xl font-semibold">Magazines</h2>
        <p className="mb-23 text-2xl/normal font-normal">
          Transforming education for global citizenship and sustainable development. We work to
          wards transforming education for global citizenship and sustainable.
        </p>
      </ContainerBig>
      <div className="bg-background-darker py-36">
        <ContainerBig>
          <div className="flex w-full flex-wrap gap-[85px]">
            {magazins.map((magazin) => (
              <RelatedMagazin key={magazin._id} magazin={magazin} />
            ))}
          </div>
        </ContainerBig>
      </div>
    </>
  );
};

export default MagazinesPage;
