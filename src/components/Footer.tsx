import { DateTime } from "luxon";
import Link from "next/link";
import { APP_AUTHOR, APP_AUTHOR_EMAIL } from "../consts/app";

export const Footer = () => {
  const copyrightFrom = DateTime.fromObject({ year: 2022 }).year.toString();
  const copyrightTo = DateTime.now().year.toString();
  const copyrightRange =
    copyrightFrom + (copyrightTo !== copyrightFrom ? `-${copyrightTo}` : "");

  return (
    <footer className="mt-14 flex justify-center">
      <p className="mt-0 text-center italic">
        All content of this website &copy; {APP_AUTHOR} {copyrightRange} unless
        otherwise stated.
        <br />
        Get in touch:{" "}
        <Link href={`mailto:${APP_AUTHOR_EMAIL}`}>{APP_AUTHOR_EMAIL}</Link>
      </p>
    </footer>
  );
};
