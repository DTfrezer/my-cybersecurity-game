import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = ({ settings, updateSettings }) => {
  const navigate = useNavigate();
  const handleBack = () => navigate('/level3');
  const handleSettingChange = (key, value) => updateSettings({ [key]: value });
  const handleToolUseChange = (tool, value) => updateSettings({ toolUses: { ...settings.toolUses, [tool]: parseInt(value, 10) } });
  const handleScanAccuracyChange = (scanType, value) => updateSettings({ scanAccuracy: { ...settings.scanAccuracy, [scanType]: parseFloat(value) } });
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Settings</h1>
        <div className="setting-group space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Game Settings</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><label htmlFor="gridSize">Grid Size:</label><select id="gridSize" value={settings.gridSize} onChange={(e) => handleSettingChange('gridSize', parseInt(e.target.value, 10))} className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1"><option value="6">6x6</option><option value="8">8x8</option><option value="10">10x10</option></select></div>
              <div className="flex justify-between items-center"><label htmlFor="difficulty">Difficulty:</label><select id="difficulty" value={settings.difficulty} onChange={(e) => handleSettingChange('difficulty', e.target.value)} className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1"><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></div>
              <div className="flex justify-between items-center"><label htmlFor="malwareSpread">Malware Spread:</label><input type="checkbox" id="malwareSpread" checked={settings.malwareSpread} onChange={(e) => handleSettingChange('malwareSpread', e.target.checked)} className="w-5 h-5" /></div>
              <div className="flex justify-between items-center"><label htmlFor="reducedMotion">Reduced Motion:</label><input type="checkbox" id="reducedMotion" checked={settings.reducedMotion} onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)} className="w-5 h-5" /></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Tool Uses</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><label htmlFor="quickScan">Quick Scan:</label><input type="number" id="quickScan" min="0" max="20" value={settings.toolUses.quickScan} onChange={(e) => handleToolUseChange('quickScan', e.target.value)} className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-20" /></div>
              <div className="flex justify-between items-center"><label htmlFor="deepScan">Deep Scan:</label><input type="number" id="deepScan" min="0" max="20" value={settings.toolUses.deepScan} onChange={(e) => handleToolUseChange('deepScan', e.target.value)} className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-20" /></div>
              <div className="flex justify-between items-center"><label htmlFor="quarantine">Quarantine:</label><input type="number" id="quarantine" min="0" max="20" value={settings.toolUses.quarantine} onChange={(e) => handleToolUseChange('quarantine', e.target.value)} className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-20" /></div>
              <div className="flex justify-between items-center"><label htmlFor="restoreBackup">Restore Backup:</label><input type="number" id="restoreBackup" min="0" max="20" value={settings.toolUses.restoreBackup} onChange={(e) => handleToolUseChange('restoreBackup', e.target.value)} className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 w-20" /></div>
            </div>
          </div>
        </div>
        <div className="settings-actions mt-8 flex justify-center"><button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300" onClick={handleBack}>Back to Game</button></div>
      </div>
    </div>
  );
};

export default Settings;
