import type { Metadata } from "next";
import { Container } from "@/shared/ui/Container";

export const metadata: Metadata = {
  title: "Career",
};

const CareerPage = async () => {
  return (
    <Container variant="big" className="mt-25">
      <h2 className="text-titles mb-5 text-6xl font-semibold">Career</h2>
    </Container>
  );
};

export default CareerPage;
