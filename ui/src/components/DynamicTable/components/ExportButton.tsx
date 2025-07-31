import React from 'react';
import { convertToCSV, downloadCSV, generateCsvFilename } from '../../../utils/csvExport';

interface ExportButtonProps {
  data: any[];
  columns: string[];
  filename?: string;
  onExport?: () => void;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  columns,
  filename,
  onExport
}) => {
  const handleExport = () => {
    // Call optional callback (for analytics, paywall checks, etc.)
    onExport?.();
    
    const csvData = convertToCSV(data, columns);
    const exportFilename = filename || generateCsvFilename('table-data');
    downloadCSV(csvData, exportFilename);
  };

  return (
    <button
      onClick={handleExport}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#0056b3';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#007bff';
      }}
      title='Export table data to CSV'
    >
      Export CSV
    </button>
  );
}; 