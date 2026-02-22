import type { Metadata } from "next";
import { getPartners } from "@/features/partners/api/getPartners";
import PartnersLogo from "@/features/partners/ui/PartnersLogo";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";

export const metadata: Metadata = {
  title: "Partners",
};

const PartnersPage = async () => {
  const partners = await getPartners();

  return (
    <>
      <Container variant="big" className="mt-25">
        <Heading as="h1" className="text-titles mb-5 text-6xl font-semibold">
          Partners
        </Heading>
        <p className="mb-23 text-2xl/normal font-normal">
          Transforming education for global citizenship and sustainable development. We work to
          wards transforming education for global citizenship and sustainable.
        </p>
      </Container>

      <div className="bg-background-darker py-36">
        <Container variant="big">
          <div
            className={[
              "grid w-full",
              "gap-[clamp(24px,4vw,85px)]",
              // 2/3/4/5 kolumn zależnie od szerokości
              "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
            ].join(" ")}
          >
            {partners.map((partner) => (
              <div key={partner.slug.current} className="@container aspect-square w-full">
                <div className="h-full w-full rounded-md p-[clamp(10px,4cqw,16px)]">
                  <PartnersLogo partner={partner} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default PartnersPage;
