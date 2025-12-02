import Layout from './components/Layout';
import Hero from './components/Hero';
import TextInput from './components/TextInput';
import AnalysisResults from './components/AnalysisResults';
import { useState } from 'react';

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <Hero />
        <TextInput onAnalysisComplete={handleAnalysisComplete} />
        {analysisData && <AnalysisResults data={analysisData} />}
      </div>
    </Layout>
  );
}

export default App;
