import Container from '@/shared/ui/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

const ContactPage = async () => {
  return (
    <>
      <Container variant="big" className="mt-25">
        <h2 className="text-titles mb-5 text-6xl font-semibold">Contact</h2>
        <p className="mb-23 text-2xl/normal font-normal">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam delectus mollitia
          asperiores esse accusantium consequatur alias rem quia voluptate ratione tempore id eum,
          molestias explicabo repudiandae est harum aliquid minus!
        </p>
      </Container>
    </>
  );
};

export default ContactPage;
