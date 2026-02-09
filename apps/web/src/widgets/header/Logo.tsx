import { paths } from "@/shared/config/paths";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href={paths.home} aria-label="Home" className="relative z-[9999] shrink-0 sm:z-auto">
      <Image
        src="/images/logo.png"
        alt="Global Citizenship Foundation"
        width={400}
        height={200}
        priority
        className="h-[clamp(50px,6vw,100px)] w-auto min-w-25 object-contain"
      />
    </Link>
  );
}
