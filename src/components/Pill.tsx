import Link from "next/link";
import { Emoji } from "../types/emoji";

export type PillProps = {
  emoji?: Emoji;
  href: string;
  title: string;
};

export const Pill = ({ emoji, href, title }: PillProps) => (
  <Link
    className="inline-block rounded-full border border-rising-600 px-2 no-underline visited:border-rising-900 dark:border-rising-500 dark:visited:border-rising-200"
    href={href}
  >
    {emoji && <>{emoji}&nbsp;</>}
    {title}
  </Link>
);
