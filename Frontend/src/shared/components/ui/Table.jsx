import React from 'react';
import EmptyState from './EmptyState';
import Spinner from './Spinner';

const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = 'No data found',
  emptyDescription = '',
  emptyAction,
  rowKey = '_id',
  onRowClick,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#e5e7eb]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase tracking-wide whitespace-nowrap"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row[rowKey] || idx}
              onClick={() => onRowClick?.(row)}
              className={[
                'border-b border-[#e5e7eb] transition-colors duration-150',
                onRowClick ? 'cursor-pointer hover:bg-[#f9fafb]' : 'hover:bg-[#f9fafb]',
              ].join(' ')}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-[#111111] whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
