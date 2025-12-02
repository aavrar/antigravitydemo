import Layout from './components/Layout';
import Hero from './components/Hero';
import TextInput from './components/TextInput';
import AnalysisResults from './components/AnalysisResults';
import SkeletonResults from './components/SkeletonResults';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsRef = useRef(null);

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisData(null);
  };

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (analysisData && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [analysisData]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <Hero />
        <TextInput
          onAnalysisStart={handleAnalysisStart}
          onAnalysisComplete={handleAnalysisComplete}
          isAnalyzing={isAnalyzing}
        />
        <div ref={resultsRef} className="w-full">
          {isAnalyzing && <SkeletonResults />}
          {analysisData && !isAnalyzing && <AnalysisResults data={analysisData} />}
        </div>
      </div>
    </Layout>
  );
}

export default App;
