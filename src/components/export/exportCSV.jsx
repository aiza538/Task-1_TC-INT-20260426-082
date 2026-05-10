import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download } from 'lucide-react';

const ExportCSV = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const buttonRef = useRef(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect(rect);
    }
  }, [isOpen]);

  const exportToCSV = (dataset, filename) => {
    if (!dataset || dataset.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(dataset[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of dataset) {
      const values = headers.map(header => {
        const value = row[header] || '';
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsOpen(false);
  };

  const exportOptions = [
    { key: 'revenueData', label: '📈 Revenue & Orders Data', filename: 'revenue_trends' },
    { key: 'featureUsage', label: '📊 Feature Usage Data', filename: 'feature_usage' },
    { key: 'userSegmentation', label: '👥 User Segmentation', filename: 'user_segmentation' },
    { key: 'geographicData', label: '🌍 Geographic Distribution', filename: 'geographic_data' },
  ];

  const availableOptions = exportOptions.filter(opt => data[opt.key] && data[opt.key].length > 0);

  if (availableOptions.length === 0) return null;

  const bgColor = isDark ? '#1f2937' : '#ffffff';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#d1d5db' : '#374151';
  const hoverBg = isDark ? '#374151' : '#f3f4f6';
  const headerTextColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-md"
      >
        <Download className="w-4 h-4" />
        Export CSV
      </button>
      
      {isOpen && buttonRect && createPortal(
        <div
          style={{
            position: 'fixed',
            top: buttonRect.bottom + 5,
            right: window.innerWidth - buttonRect.right,
            width: '260px',
            backgroundColor: bgColor,
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            border: `1px solid ${borderColor}`,
            zIndex: 999999,
            transition: 'all 0.2s ease',
          }}
        >
          <div className="py-2">
            <div
              style={{
                padding: '8px 16px',
                fontSize: '11px',
                fontWeight: '600',
                color: headerTextColor,
                borderBottom: `1px solid ${borderColor}`,
              }}
            >
              Export Dataset As CSV
            </div>
            {availableOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => exportToCSV(data[opt.key], opt.filename)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 16px',
                  fontSize: '13px',
                  color: textColor,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ExportCSV;