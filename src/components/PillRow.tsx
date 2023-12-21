import React from "react";
import { Pill, PillProps } from "./Pill";

export type PillRowProps = {
  pills: PillProps[];
};

export const PillRow = ({ pills }: PillRowProps) => (
  <>
    {pills.map(({ emoji, href, title }, index) => (
      <React.Fragment key={title}>
        {index > 0 && <> </>}
        <Pill emoji={emoji} href={href} title={title} />
      </React.Fragment>
    ))}
  </>
);
