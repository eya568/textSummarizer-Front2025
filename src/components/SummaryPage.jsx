import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { summaryDetails } = location.state || {};

  if (!summaryDetails) {
    navigate('/Saved');
    return null;
  }

  const defaultImage = "https://via.placeholder.com/400?text=No+Image";
  const createdDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const createdTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="relative flex flex-col bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <header className="sticky top-0 backdrop-blur-md bg-white/80 border-b border-slate-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => navigate('/Saved')} 
              className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-all duration-200"
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Saved</span>
            </button>
            
            <button className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200">
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div 
            className="w-full h-[480px] bg-center bg-cover transition-transform duration-700 hover:scale-105"
            style={{ 
              backgroundImage: `url(${summaryDetails.image || defaultImage})`,
            }}
          />
          
          <div className="p-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {summaryDetails.title || 'Untitled Summary'}
            </h1>

            <div className="flex items-center gap-6 mb-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{createdDate}</span>
              </div>
              
            </div>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-slate-700">
                {summaryDetails.content || 'No summary content available.'}
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default SummaryPage;