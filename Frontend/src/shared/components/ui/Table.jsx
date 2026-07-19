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
          <tr className="border-b border-white/5 bg-[#0e0e11]/40">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4.5 py-3 text-left text-[9px] font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap"
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
                'border-b border-white/5 transition-colors duration-200',
                onRowClick ? 'cursor-pointer hover:bg-white/[0.02]' : 'hover:bg-white/[0.01]',
              ].join(' ')}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4.5 py-3.5 text-[13px] text-zinc-200 whitespace-nowrap">
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
