import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center shrink-0"
      aria-label="JKV Global Home"
    >
      <Image
        src="/images/jkvlatestlogo.png"
        alt="JKV Global"
        width={150}
        height={75}
        priority
        className="
          w-auto
          h-[75px]
          sm:h-[46px]
          md:h-[75px]
          object-contain
        "
      />
    </Link>
  );
}
