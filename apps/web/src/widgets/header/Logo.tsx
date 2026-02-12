import Image from "next/image";
import Link from "next/link";
import { paths } from "@/shared/config/paths";

export function Logo() {
  return (
    <Link href={paths.home} aria-label="Home" className="relative z-9999 shrink-0 sm:z-auto">
      <Image
        src="/images/logo.svg"
        alt="Global Citizenship Foundation"
        width={400}
        height={200}
        priority
        className="h-[clamp(50px,6vw,100px)] w-auto min-w-25 object-contain"
      />
    </Link>
  );
}
