import { formatColumnHeader } from './tableUtils';

/**
 * Escapes a value for CSV format
 * @param value - The value to escape
 * @returns escaped CSV value
 */
export const escapeCsvValue = (value: any): string => {
  if (value === null || value === undefined) return '';
  
  let stringValue = String(value);
  
  // If value contains comma, newline, or quote, wrap in quotes and escape quotes
  if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
    stringValue = '"' + stringValue.replace(/"/g, '""') + '"';
  }
  
  return stringValue;
};

/**
 * Converts table data to CSV format
 * @param data - The processed table data
 * @param columns - The column keys to include
 * @returns CSV string
 */
export const convertToCSV = (data: any[], columns: string[]): string => {
  // Create header row with formatted column names
  const headers = columns.map(formatColumnHeader);
  const csvRows = [headers.map(escapeCsvValue).join(',')];
  
  // Add data rows
  data.forEach(item => {
    const row = columns.map(column => {
      const value = item.flattened[column];
      
      // Handle arrays by converting to JSON string
      if (Array.isArray(value)) {
        return escapeCsvValue(JSON.stringify(value));
      }
      
      return escapeCsvValue(value);
    });
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
};

/**
 * Downloads CSV data as a file
 * @param csvData - The CSV string data
 * @param filename - The filename for the download
 */
export const downloadCSV = (csvData: string, filename: string = 'table-data.csv'): void => {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Generates a timestamped filename for CSV export
 * @param prefix - Filename prefix
 * @returns timestamped filename
 */
export const generateCsvFilename = (prefix: string = 'table-data'): string => {
  const timestamp = new Date().toISOString().split('T')[0];
  return `${prefix}-${timestamp}.csv`;
}; 