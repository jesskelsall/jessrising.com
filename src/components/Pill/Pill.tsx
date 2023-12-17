import Link from "next/link";
import { Emoji } from "../../types/emoji";

export type PillProps = {
  emoji?: Emoji;
  href: string;
  title: string;
};

export const Pill = ({ emoji, href, title }: PillProps) => (
  <Link className="pill" href={href}>
    {emoji && <>{emoji}&nbsp;</>}
    {title}
  </Link>
);
