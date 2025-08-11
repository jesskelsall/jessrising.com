import React from "react";
import { Pill, PillProps } from "./Pill";

export type PillRowProps = {
  pills: PillProps[];
};

export const PillRow = ({ pills }: PillRowProps) => (
  <div className="flex flex-wrap gap-1">
    {pills.map(({ emoji, href, title }) => (
      <React.Fragment key={title}>
        <Pill emoji={emoji} href={href} title={title} />
      </React.Fragment>
    ))}
  </div>
);
