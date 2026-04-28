import type { Metadata } from "next";
import { getMagazine } from "@/features/magazine/api/getMagazine";
import { MagazinCard } from "@/features/magazine/ui/MagazinCard";
import { Container } from "@/shared/ui/Container";

export const metadata: Metadata = {
  title: "Magazine",
};

const MagazinesPage = async () => {
  const magazines = await getMagazine();

  return (
    <>
      <Container variant="big" className="mt-25">
        <h1 className="text-titles mb-5 text-6xl font-semibold">Magazines</h1>
        <p className="mb-23 text-2xl/normal font-normal">
          Transforming education for global citizenship and sustainable development. We work towards
          transforming education for global citizenship and sustainable.
        </p>
      </Container>

      <section className="bg-background-darker py-16 md:py-24">
        <Container variant="big">
          {magazines?.length ? (
            <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-8 gap-y-12 p-0">
              {magazines.map((magazine) => (
                <li key={magazine._id} className="flex min-w-0 justify-center">
                  <MagazinCard magazin={magazine} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-black/10 bg-white/60 p-8 text-center">
              <p className="text-gray text-base font-medium">No magazines available right now.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default MagazinesPage;
