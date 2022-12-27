import Link from "next/link";

interface HeaderLink {
  title: string;
  url: string;
}

const HEADER_LINKS: HeaderLink[] = [
  {
    title: "Blog",
    url: "/blog",
  },
];

export const Header = () => (
  <header>
    <ul>
      <li>
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
