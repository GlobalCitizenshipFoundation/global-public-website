import ContainerBig from '@/components/ContainerBig';
import { getContributors } from '../../../lib/contributors-fetch';
import ContributorFrame from '@/components/Contributors/ContributorFrame';

const ContributorsPage = async () => {
  const contributors = await getContributors();

  return (
    <>
      <ContainerBig className="mt-25">
        <h2 className="text-titles mb-5 text-6xl font-semibold">Our Team Members</h2>
        <p className="mb-23 text-2xl/normal font-normal">
          Transforming education for global citizenship and sustainable development. We work to
          wards transforming education for global citizenship and sustainable.
        </p>
      </ContainerBig>
      <div className="bg-background-darker py-36">
        <ContainerBig>
          <h3 className="mb-3.5 text-[42px] font-semibold">Designer Team</h3>
          <p className="text-font-normal mb-23 text-2xl/normal">
            Transforming education for global citizenship and sustainable The Global Citizen ship
            Foundation continues commitment Preparing young people for a smart future.
          </p>
          <div className="flex flex-wrap gap-[42px]">
            {contributors.map((contributor) => (
              <ContributorFrame contributor={contributor} key={contributor._id} />
            ))}
          </div>
        </ContainerBig>
      </div>
    </>
  );
};

export default ContributorsPage;
