import React, { useState, useMemo } from 'react';
import { Search, Plus, FileSpreadsheet, Printer, ChevronLeft, ChevronRight, Database, Filter, ArrowUpDown } from 'lucide-react';

interface DataTableProps<T> {
  data: T[];
  columns: string[];
  renderRow: (item: T) => React.ReactNode;
  title: string;
  onAdd?: () => void;
}

function DataTable<T>({ data, columns, renderRow, title, onAdd }: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return data.filter(item =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, filteredData.length);

  const exportToCSV = () => {
    if (filteredData.length === 0) return;
    const headers = Object.keys(filteredData[0] as any).join(',');
    const rows = filteredData.map(obj => Object.values(obj as any).map(val => `"${val}"`).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-in print:p-0">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center print:hidden">
        <div className="flex items-center gap-5">
          <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Database size={22} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-display text-gray-900 tracking-tight leading-none">{title}</h3>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">
              {filteredData.length} {filteredData.length > 1 ? 'éléments' : 'élément'}
              {search && <span className="text-primary ml-2">· filtrés</span>}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={16} />
            <input
              className="h-12 pl-11 pr-5 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl outline-none font-bold text-sm w-56 transition-all placeholder:text-slate-300"
              placeholder="Rechercher..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
          <button onClick={exportToCSV} title="Exporter CSV" className="size-12 bg-slate-50 text-slate-400 hover:bg-green-50 hover:text-green-600 rounded-xl flex items-center justify-center transition-all">
            <FileSpreadsheet size={18} />
          </button>
          <button onClick={() => window.print()} title="Imprimer" className="size-12 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl flex items-center justify-center transition-all">
            <Printer size={18} />
          </button>
          {onAdd && (
            <>
              <div className="h-8 w-px bg-slate-100 hidden md:block"></div>
              <button onClick={onAdd} className="h-12 px-7 bg-primary text-white rounded-xl font-extrabold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:bg-primary-dark transition-all flex items-center gap-2.5">
                <Plus size={16} strokeWidth={3} /> Ajouter
              </button>
            </>
          )}
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80">
                {columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      {col}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.map((item) => renderRow(item))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-16 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center">
                        <Database size={28} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-400">Aucune donnée</p>
                        <p className="text-[11px] text-slate-300 font-medium mt-1">
                          {search ? 'Essayez un autre terme de recherche' : 'La liste est vide pour le moment'}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
            <div className="flex items-center gap-4">
              <select
                className="h-9 px-3 bg-white border border-slate-100 rounded-lg font-bold text-[11px] outline-none cursor-pointer text-slate-500"
                value={rowsPerPage}
                onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                <option value={10}>10 / page</option>
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
              </select>
              <span className="text-[11px] font-bold text-slate-400">
                {startRow}–{endRow} sur {filteredData.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="size-9 bg-white border border-slate-100 text-slate-400 rounded-lg flex items-center justify-center hover:border-primary/20 hover:text-primary disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-400 transition-all text-[10px] font-extrabold"
              >
                1
              </button>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="size-9 bg-white border border-slate-100 text-slate-400 rounded-lg flex items-center justify-center hover:border-primary/20 hover:text-primary disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-400 transition-all"
              >
                <ChevronLeft size={16} />
              </button>

              {totalPages <= 7 ? (
                [...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`size-9 rounded-lg font-extrabold text-[11px] transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-md shadow-primary/25' : 'bg-white border border-slate-100 text-slate-500 hover:border-primary/20 hover:text-primary'}`}
                  >
                    {i + 1}
                  </button>
                ))
              ) : (
                <>
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    const showPage = page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1);
                    const showEllipsis = page === currentPage - 2 || page === currentPage + 2;
                    if (showPage) return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(page)}
                        className={`size-9 rounded-lg font-extrabold text-[11px] transition-all ${currentPage === page ? 'bg-primary text-white shadow-md shadow-primary/25' : 'bg-white border border-slate-100 text-slate-500 hover:border-primary/20 hover:text-primary'}`}
                      >
                        {page}
                      </button>
                    );
                    if (showEllipsis) return <span key={i} className="text-slate-300 text-xs px-1">···</span>;
                    return null;
                  })}
                </>
              )}

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="size-9 bg-white border border-slate-100 text-slate-400 rounded-lg flex items-center justify-center hover:border-primary/20 hover:text-primary disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-400 transition-all"
              >
                <ChevronRight size={16} />
              </button>
              {totalPages > 1 && (
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="size-9 bg-white border border-slate-100 text-slate-400 rounded-lg flex items-center justify-center hover:border-primary/20 hover:text-primary disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-400 transition-all text-[10px] font-extrabold"
                >
                  {totalPages}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTable;
