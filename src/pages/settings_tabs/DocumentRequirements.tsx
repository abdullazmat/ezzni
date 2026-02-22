import { Eye, Edit2, Trash2 } from 'lucide-react';

export const DocumentRequirements = () => {
    const documentTypes = [
        { name: 'National ID (CIN)', description: 'Moroccan National Identity Card', types: ['Driver', 'Rider'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Driving License', description: 'Valid Moroccan driving license', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Vehicle Registration (Carte Grise)', description: 'Vehicle registration document', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Vehicle Insurance', description: 'Valid vehicle insurance certificate', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Criminal Background Check', description: 'Clean criminal record certificate', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Medical Certificate', description: 'Medical fitness certificate for drivers', types: ['Driver'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
        { name: 'Medical Certificate', description: 'Medical fitness certificate for drivers', types: ['Rental Co.'], limits: 'Max: 5MB', formats: 'JPG, PNG, PDF' },
    ];

    return (
    <div className="vp-documents-container">
      <style>{`
        .vp-documents-container {
            animation: fadeIn 0.4s ease-out;
        }

        .vp-documents-header {
            margin-bottom: 2.5rem;
        }

        .vp-documents-header h2 {
            font-size: 1.75rem;
            font-weight: 900;
            color: #1e293b;
            margin: 0;
            letter-spacing: -0.025em;
        }

        .vp-documents-header p {
            color: #64748b;
            margin: 0.5rem 0 0 0;
            font-size: 1.1rem;
            font-weight: 500;
        }

        .vp-table-card {
            background: white;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }

        .vp-table-scroll {
            overflow-x: auto;
        }

        .vp-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
        }

        .vp-table th {
            background: #f8fafc;
            padding: 1.25rem 1.5rem;
            text-align: left;
            font-size: 0.875rem;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid #e2e8f0;
        }

        .vp-table td {
            padding: 1.5rem;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
        }

        .vp-doc-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .vp-doc-name {
            font-weight: 800;
            font-size: 1.05rem;
            color: #1e293b;
        }

        .vp-doc-desc {
            font-size: 0.85rem;
            color: #64748b;
            font-weight: 500;
        }

        .vp-badge-group {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .vp-type-badge {
            background: #f1f5f9;
            color: #475569;
            padding: 0.4rem 1rem;
            border-radius: 100px;
            font-size: 0.75rem;
            font-weight: 700;
            border: 1px solid #e2e8f0;
        }

        .vp-limit-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .vp-limit-main {
            font-weight: 800;
            font-size: 0.9rem;
            color: #1e293b;
        }

        .vp-limit-sub {
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 600;
        }

        .vp-action-group {
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
        }

        .vp-action-btn {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
            color: #64748b;
        }

        .vp-action-btn.view {
            padding: 0 1.25rem;
            gap: 0.5rem;
            font-weight: 700;
            font-size: 0.85rem;
        }

        .vp-action-btn.view:hover {
            border-color: #38AC57;
            color: #38AC57;
            background: #f0fdf4;
        }

        .vp-action-btn.edit {
            width: 40px;
        }

        .vp-action-btn.edit:hover {
            border-color: #38AC57;
            color: #38AC57;
            background: #f0fdf4;
        }

        .vp-action-btn.delete {
            width: 40px;
        }

        .vp-action-btn.delete:hover {
            border-color: #ef4444;
            color: #ef4444;
            background: #fef2f2;
        }

        @media (max-width: 768px) {
            .vp-table-card {
                border-radius: 20px;
            }
        }
      `}</style>

      <div className="vp-documents-header">
        <h2>Document Requirements</h2>
        <p>Configure required documents and validation rules for different user types</p>
      </div>

      <div className="vp-table-card">
        <div className="vp-table-scroll">
          <table className="vp-table">
            <thead>
              <tr>
                <th>Document Type</th>
                <th>User Types</th>
                <th>Requirements</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documentTypes.map((doc, index) => (
                <tr key={index}>
                  <td>
                    <div className="vp-doc-info">
                      <span className="vp-doc-name">{doc.name}</span>
                      <span className="vp-doc-desc">{doc.description}</span>
                    </div>
                  </td>
                  <td>
                    <div className="vp-badge-group">
                      {doc.types.map((type, i) => (
                        <span key={i} className="vp-type-badge">{type}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="vp-limit-info">
                      <span className="vp-limit-main">{doc.limits}</span>
                      <span className="vp-limit-sub">{doc.formats}</span>
                    </div>
                  </td>
                  <td>
                    <div className="vp-action-group">
                      <button className="vp-action-btn view" onClick={() => alert(`Viewing ${doc.name}...`)}>
                        <Eye size={18} /> View
                      </button>
                      <button className="vp-action-btn edit" onClick={() => alert(`Editing ${doc.name}...`)}>
                        <Edit2 size={18} />
                      </button>
                      <button className="vp-action-btn delete" onClick={() => alert(`Deleting ${doc.name}...`)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

