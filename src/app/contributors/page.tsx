import ContainerBig from "@/components/ContainerBig";
import { getContributors } from "../../../lib/contributors-fetch";
import ContributorFrame from "@/components/Contributors/ContributorFrame";

const ContributorsPage = async () => {
  const contributors = await getContributors();

  return (
    <>
      <ContainerBig className="mt-25">
        <h2 className="font-semibold text-6xl text-titles mb-5">Our Team Members</h2>
        <p className="font-normal text-2xl/normal mb-23">Transforming education for global citizenship and sustainable development. We work to wards transforming education for global citizenship and sustainable.</p>
      </ContainerBig>
        <div className="bg-background-darker py-36">
          <ContainerBig>
            <h3 className="text-[42px] font-semibold mb-3.5">Designer Team</h3>
            <p className="text-font-normal text-2xl/normal mb-23">Transforming education for global citizenship and sustainable The Global Citizen ship Foundation continues commitment Preparing young people for a smart future.</p>
            <div className="flex flex-wrap gap-[42px]">
              {contributors.map((contributor) => (
                <ContributorFrame contributor={contributor} key={contributor._id}/>
              ))}
            </div>
          </ContainerBig>
        </div>
    </>
  );
};

export default ContributorsPage;