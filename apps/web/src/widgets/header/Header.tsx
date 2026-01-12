import Link from 'next/link';
import Image from 'next/image';
import ContainerNav from '@/shared/ui/ContainerNav';

import DesktopNav from '@/widgets/header/DesktopNav';
import MobileMenu from '@/widgets/header/MobileMenu';
import { paths } from '@/shared/config/paths';

const Header = () => {
  return (
    <header>
      <ContainerNav>
        <nav aria-label="Primary" className="flex items-center justify-between py-6 lg:py-9">
          {/* Logo (SSR) */}
          <Link
            href={paths.home}
            aria-label="Home"
            className="relative block h-12 w-[220px] shrink-0 sm:h-14 sm:w-[260px] lg:h-16 lg:w-[300px]"
          >
            <Image
              src="/images/logo.png"
              alt="Global Citizenship Foundation"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 300px"
            />
          </Link>

          <DesktopNav />

          <MobileMenu />
        </nav>
      </ContainerNav>
    </header>
  );
};

export default Header;
