import Image from "next/image";
import Link from "next/link";

export type TContentArea = "blog" | "gallery" | "photo";

interface IHeaderProps {
  contentArea?: TContentArea;
}

interface HeaderLink {
  title: string;
  url: string;
}

const HEADER_LINKS: HeaderLink[] = [
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Gallery",
    url: "/gallery",
  },
];

export const Header = ({ contentArea }: IHeaderProps) => (
  <header>
    <ul className={`content-area ${contentArea || "blog"}`}>
      <li className="website">
        <Image
          alt="Photo of Jess Rising"
          src="/avatar.jpeg"
          height="64"
          width="64"
        />
        <Link href="/">Jess Rising</Link>
      </li>
      {HEADER_LINKS.map(({ title, url }) => (
        <li key={url}>
          <Link href={url}>{title}</Link>
        </li>
      ))}
    </ul>
  </header>
);
