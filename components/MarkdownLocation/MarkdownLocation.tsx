interface IMarkdownLocationProps {
  location: string[];
}

export const MarkdownLocation = ({ location }: IMarkdownLocationProps) => (
  <li>Location: {location.join(", ")}</li>
);
