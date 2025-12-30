import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function KYCVerification() {
  const [kycStatus, setKycStatus] = useState('pending'); 
  const [documents, setDocuments] = useState({
    aadhaar: null,
    pan: null,
    selfie: null
  });
  const navigate = useNavigate();

  const handleFileUpload = (type, file) => {
    setDocuments({...documents, [type]: file});
  };

  const handleSubmit = () => {
   
    setKycStatus('submitted');
    alert('KYC documents submitted successfully! Verification will take 2-3 business days.');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      case 'submitted': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'verified': return 'Verified';
      case 'rejected': return 'Rejected - Please resubmit';
      case 'submitted': return 'Under Review';
      default: return 'Pending';
    }
  };

  return (
    <div className="pt-24 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">KYC Verification</h2>
        <button
          onClick={() => navigate('/Profile')}
          className="text-pink-500 text-sm"
        >
          ← Back
        </button>
      </div>

      
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <h3 className="font-semibold mb-2">Verification Status</h3>
        <span className={`text-lg font-bold ${getStatusColor(kycStatus)}`}>
          {getStatusText(kycStatus)}
        </span>
      </div>

      {kycStatus === 'pending' && (
        <>
          
          <div className="bg-white p-4 rounded-xl shadow space-y-4">
            <h3 className="font-semibold">Upload Documents</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Card
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload('aadhaar', e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Card
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload('pan', e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selfie with ID
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('selfie', e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          
          <button
            onClick={handleSubmit}
            disabled={!documents.aadhaar || !documents.pan || !documents.selfie}
            className="w-full bg-pink-500 text-white py-3 rounded-xl disabled:bg-gray-300"
          >
            Submit for Verification
          </button>
        </>
      )}

      {kycStatus === 'submitted' && (
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">Documents Submitted</h3>
          <p className="text-yellow-700 text-sm">
            Your documents are being reviewed. You'll receive a notification once verification is complete.
          </p>
        </div>
      )}

      {kycStatus === 'verified' && (
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">✓ KYC Verified</h3>
          <p className="text-green-700 text-sm">
            Your identity has been successfully verified. You can now use all features.
          </p>
        </div>
      )}

      {kycStatus === 'rejected' && (
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <h3 className="font-semibold text-red-800 mb-2">✗ Verification Failed</h3>
          <p className="text-red-700 text-sm mb-3">
            Your documents could not be verified. Please check the documents and resubmit.
          </p>
          <button
            onClick={() => setKycStatus('pending')}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            Resubmit Documents
          </button>
        </div>
      )}
    </div>
  );
}

export default KYCVerification;  