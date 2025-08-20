import React from 'react';
import { convertToCSV, downloadCSV, generateCsvFilename } from '../../../utils/csvExport';
import { useAuth } from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

interface ExportButtonProps {
  data: any[];
  columns: string[];
  filename?: string;
  onExport?: () => void;
  requireAuth?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  columns,
  filename,
  onExport,
  requireAuth = false,
}) => {
  const { user } = useAuth();
  const isDisabled = requireAuth && !user;

  const handleExport = () => {
    // If access is denied, do nothing (button should be disabled)
    if (isDisabled) {
      return;
    }

    // Call optional callback (for analytics, paywall checks, etc.)
    onExport?.();
    
    const csvData = convertToCSV(data, columns);
    const exportFilename = filename || generateCsvFilename('table-data');
    downloadCSV(csvData, exportFilename);
  };

  return (
    <button
      onClick={handleExport}
      className="secondary-button"
      title={isDisabled ? 'Sign in to export data' : 'Export table data to CSV'}
      data-tooltip={isDisabled ? 'Please sign in to access this feature' : undefined}
      disabled={isDisabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        position: 'relative'
      }}
    >
      {isDisabled && (
        <FontAwesomeIcon icon={faLock} size="sm" />
      )}
      <span>Export CSV</span>
    </button>
  );
}; 