import Container from "@/shared/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposal",
};

const ProposalPage = async () => {
  return (
    <>
      <Container variant="big" className="mt-25">
        <h2 className="text-titles mb-5 text-6xl font-semibold">Proposal</h2>
      </Container>
    </>
  );
};

export default ProposalPage;
