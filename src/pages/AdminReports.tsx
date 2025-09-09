import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, X } from 'lucide-react';

interface Report {
  id: string;
  artworkId: string;
  artworkTitle: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

const AdminReports: React.FC = () => {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      artworkId: '1',
      artworkTitle: 'Sample Artwork',
      reportedBy: 'John Doe',
      reason: 'Inappropriate content',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ]);

  const handleResolve = (reportId: string) => {
    // Implement resolve logic
    console.log('Resolving report:', reportId);
  };

  const handleDismiss = (reportId: string) => {
    // Implement dismiss logic
    console.log('Dismissing report:', reportId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Reports</h1>
          <p className="text-gray-600 mt-2">Review and manage reported content</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artwork
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {report.artworkTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.reportedBy}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{report.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : report.status === 'reviewed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleResolve(report.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDismiss(report.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {reports.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No reports found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;