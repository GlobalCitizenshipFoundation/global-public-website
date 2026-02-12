import type { Metadata } from "next";
import { getMagazine } from "@/features/magazine/api/getMagazine";
import { MagazinCard } from "@/features/magazine/ui/MagazinCard";
import { Container } from "@/shared/ui/Container";

export const metadata: Metadata = {
  title: "Magazine",
};

const MagazinesPage = async () => {
  const magazins = await getMagazine();

  return (
    <>
      <Container variant="big" className="mt-25">
        <h1 className="text-titles mb-5 text-6xl font-semibold">Magazines</h1>
        <p className="mb-23 text-2xl/normal font-normal">
          Transforming education for global citizenship and sustainable development. We work towards
          transforming education for global citizenship and sustainable.
        </p>
      </Container>

      <div className="bg-background-darker py-16 md:py-24">
        <Container variant="big">
          {magazins?.length ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {magazins.map((magazin) => (
                <MagazinCard key={magazin._id} magazin={magazin} />
              ))}
            </div>
          ) : (
            <p className="text-borders text-base">No magazines available right now.</p>
          )}
        </Container>
      </div>
    </>
  );
};

export default MagazinesPage;
