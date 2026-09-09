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
        src="/images/jkv-global-logo.png"
        alt="JKV Global"
        width={150}
        height={52}
        priority
        className="
          w-auto
          h-[42px]
          sm:h-[46px]
          md:h-[52px]
          object-contain
        "
      />
    </Link>
  );
}
