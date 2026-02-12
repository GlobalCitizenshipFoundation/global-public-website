import { Container } from "@/shared/ui/Container";
import { DesktopNav } from "@/widgets/header/DesktopNav";
import { MobileMenu } from "@/widgets/header/MobileMenu";
import { Logo } from "./Logo";

export default function Header() {
  return (
    <Container variant="header">
      <nav aria-label="Primary" className="flex items-center justify-between gap-10 py-7.5 lg:py-9">
        <Logo />

        <DesktopNav />

        <MobileMenu />
      </nav>
    </Container>
  );
}
