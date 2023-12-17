import { Pill, PillProps } from "../Pill/Pill";

export type PillRowProps = {
  pills: PillProps[];
};

export const PillRow = ({ pills }: PillRowProps) => (
  <div className="pill-row">
    {pills.map(({ emoji, href, title }) => (
      <Pill emoji={emoji} href={href} key={title} title={title} />
    ))}
  </div>
);
