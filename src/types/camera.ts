export type Device = {
  displayName: string;
  displaySettings?: boolean;
  make?: string;
  model: string;
};

export type Camera = Device & {
  lenses: Device[];
};
