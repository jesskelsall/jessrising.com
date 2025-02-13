interface ITableProps {
  children: React.ReactNode;
}

export const BlogTable = ({ children }: ITableProps) => (
  <table className="my-4">{children}</table>
);

export const BlogTHead = ({ children }: ITableProps) => (
  <thead className="bg-mono-800 text-rising-700 dark:bg-mono-100 dark:text-rising-600">
    {children}
  </thead>
);

export const BlogTD = ({ children }: ITableProps) => (
  <td className="border-2 border-mono-800 px-4 py-1 dark:border-mono-100 [&:not(:first-child)]:text-right">
    {children}
  </td>
);

export const BlogTH = ({ children }: ITableProps) => (
  <th className="border-2 border-mono-900 px-4 py-1 dark:border-mono-50 [&:not(:first-child)]:text-right">
    {children}
  </th>
);
