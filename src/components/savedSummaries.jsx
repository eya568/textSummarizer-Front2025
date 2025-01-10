import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSummaries } from "../services/summarizeService";

const SummaryCard = ({ summary }) => {
  const navigate = useNavigate();
  const defaultImage = "https://via.placeholder.com/150?text=No+Image";

  const handleViewSummary = () => {
    navigate('/summary', { 
      state: { 
        summaryDetails: summary 
      } 
    });
  };

  return (
    <div className="group flex items-center gap-6 bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 mb-4 border border-slate-100">
      <div className="flex items-center gap-6 flex-1">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-20 shadow-sm transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${summary.image || defaultImage})` }}
        ></div>
        <div className="flex flex-col justify-center flex-1">
          <p className="text-slate-900 text-lg font-semibold leading-snug mb-1 line-clamp-1">
            {summary.content || "Untitled"}
          </p>
          <p className="text-slate-500 text-sm font-medium leading-relaxed flex items-center gap-2">
            <span className="inline-block w-1 h-1 bg-slate-400 rounded-full"></span>
            1 min read
          </p>
        </div>
      </div>
      <div className="shrink-0">
        <button 
          onClick={handleViewSummary} 
          className="px-6 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium transition-all duration-300 hover:bg-blue-100 hover:text-blue-700"
        >
          View
        </button>
      </div>
    </div>
  );
};

const SavedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummaries = async () => {
    setLoading(true);
    try {
      const data = await getSummaries();
      if (data.summaries) {
        setSummaries(data.summaries);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch summaries.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 text-blue-600">
              <div className="size-5">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="text-slate-800 text-xl font-bold leading-tight tracking-tight">
                Summarize.ai
              </h2>
            </div>
            <div className="flex items-center gap-8">
              <nav className="flex items-center gap-8">
                <a className="text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors" href="#">
                  Dashboard
                </a>
                <a className="text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors" href="#">
                  Explore
                </a>
              </nav>
              <Link 
                to="/" 
                className="flex items-center justify-center px-6 h-10 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
              >
                New Summary
              </Link>
              <div
                className="size-10 rounded-full border-2 border-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                style={{
                  backgroundImage:
                    "url('https://cdn.usegalileo.ai/sdxl10/8a02553d-8f9e-4656-90f4-9f371688330a.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-slate-900 text-4xl font-bold leading-tight">
            Saved Summaries
          </h1>
          <p className="text-slate-500 mt-2">
            Access your previously generated summaries
          </p>
        </div>

        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-slate-500">Loading summaries...</div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          ) : summaries.length > 0 ? (
            summaries.map((summary) => (
              <SummaryCard key={summary.id} summary={summary} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
              <p className="text-slate-500 text-lg">No summaries available yet.</p>
              <Link 
                to="/" 
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create your first summary
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedSummaries;