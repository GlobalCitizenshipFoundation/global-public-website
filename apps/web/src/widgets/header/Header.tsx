import ContainerNav from '@/shared/ui/ContainerNav';

import DesktopNav from '@/widgets/header/DesktopNav';
import MobileMenu from '@/widgets/header/MobileMenu';
import Logo from './Logo';

const Header = () => {
  return (
    <header>
      <ContainerNav>
        <nav
          aria-label="Primary"
          className="flex items-center justify-between gap-10 py-7.5 lg:py-9"
        >
          <Logo />

          <DesktopNav />

          <MobileMenu />
        </nav>
      </ContainerNav>
    </header>
  );
};

export default Header;
