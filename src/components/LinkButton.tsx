import Link from "next/link";
import { PropsWithChildren } from "react";

export const LinkButton = ({
  children,
  href,
}: { href: string } & PropsWithChildren) => (
  <Link
    className="inline-block border-0 bg-rising-600 px-4 py-2 text-mono-900 no-underline visited:text-mono-900 hover:bg-rising-700 active:bg-rising-700"
    href={href}
  >
    {children}
  </Link>
);
