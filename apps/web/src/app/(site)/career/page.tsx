import ContainerBig from '@/shared/ui/ContainerBig';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career',
};

const CareerPage = async () => {
  return (
    <>
      <ContainerBig className="mt-25">
        <h2 className="text-titles mb-5 text-6xl font-semibold">Career</h2>
      </ContainerBig>
    </>
  );
};

export default CareerPage;
