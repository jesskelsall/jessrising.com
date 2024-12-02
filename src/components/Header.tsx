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
    title: "Gallery",
    url: "/gallery",
  },
  {
    title: "Trips",
    url: "/trips",
  },
  {
    title: "Blog",
    url: "/blog",
  },
];

export const Header = ({ contentArea }: IHeaderProps) => {
  let breakpoints = "max-w-screen-sm md:max-w-screen-md";
  if (contentArea === "photo") {
    breakpoints = "md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl";
  }
  if (contentArea === "gallery") {
    breakpoints =
      "max-w-grid-1 px-2 grid-2:max-w-grid-2 grid-3:max-w-grid-3 grid-4:max-w-grid-4";
  }

  return (
    <header className="w-full bg-rising-600 text-2xl">
      <ul
        className={`mx-auto flex flex-row items-center gap-4 p-2 ${breakpoints}`}
      >
        <li>
          <Image
            alt="Photo of Jess Rising"
            className="rounded-full"
            src="/avatar.jpeg"
            height="64"
            width="64"
          />
        </li>
        <li className="grow">
          <Link
            className="text-mono-900 no-underline visited:text-mono-900 hover:underline"
            href="/"
          >
            Jess Rising
          </Link>
        </li>
        {HEADER_LINKS.map(({ title, url }) => (
          <li key={url}>
            <Link
              className="text-mono-900 no-underline visited:text-mono-900 hover:underline"
              href={url}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};
