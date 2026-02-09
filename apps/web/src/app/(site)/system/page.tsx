import Container from "@/shared/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System",
};

const SystemPage = async () => {
  return (
    <>
      <Container variant="big" className="mt-25">
        <h2 className="text-titles mb-5 text-6xl font-semibold">System</h2>
      </Container>
    </>
  );
};

export default SystemPage;
