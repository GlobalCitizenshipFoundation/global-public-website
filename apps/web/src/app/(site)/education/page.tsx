import type { Metadata } from "next";
import { Container } from "@/shared/ui/Container";

export const metadata: Metadata = {
  title: "Education",
};

const EducationPage = async () => {
  return (
    <Container variant="big" className="mt-25">
      <h2 className="text-titles mb-5 text-6xl font-semibold">Education</h2>
    </Container>
  );
};

export default EducationPage;
