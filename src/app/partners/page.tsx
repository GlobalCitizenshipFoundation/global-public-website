import ContainerBig from "@/components/ContainerBig";
import ContributorFrame from "@/components/Contributors/ContributorFrame";
import { getPartners } from "../../../lib/partners-fetch";
import Link from "next/link";
import PartnersLogo from "@/components/Partners/PartnersLogo";

const PartnersPage = async () => {
  const partners = await getPartners();
    console.log(partners)
  return (
    <>
      <ContainerBig className="mt-25">
        <h2 className="font-semibold text-6xl text-titles mb-5">Partners</h2>
        <p className="font-normal text-2xl/normal mb-23">Transforming education for global citizenship and sustainable development. We work to wards transforming education for global citizenship and sustainable.</p>
      </ContainerBig>
        <div className="bg-background-darker py-36">
          <ContainerBig>
            <div className="w-full flex flex-wrap gap-[85px]">
              {partners.map((partner) => (
                <Link href={`/partners/${partner.slug.current}`} key={partner.slug.current} className="hover:scale-120 duration-300 transition-all">
                    <PartnersLogo partner={partner}/>
                </Link>
              ))}
            </div>
          </ContainerBig>
        </div>
    </>
  );
};

export default PartnersPage;