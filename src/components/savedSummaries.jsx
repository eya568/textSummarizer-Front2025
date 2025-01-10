import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSummaries } from "../services/summarizeService";
import Header from "./Header";

const SummaryCard = ({ summary, onDelete }) => {
  const navigate = useNavigate();
  const defaultImage = "https://via.placeholder.com/150?text=No+Image";
  const [showError, setShowError] = useState(false);
  const [showMathModal, setShowMathModal] = useState(false);
  const [mathProblem, setMathProblem] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleViewSummary = () => {
    navigate('/summary', { 
      state: { 
        summaryDetails: summary 
      } 
    });
  };
  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    let question;
    switch(operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2}`;
        break;
      case '-':
        answer = num1 - num2;
        question = `${num1} - ${num2}`;
        break;
      case '*':
        answer = num1 * num2;
        question = `${num1} × ${num2}`;
        break;
    }
    
    return {
      question,
      answer
    };
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    const newMathProblem = generateMathQuestion();
    setMathProblem(newMathProblem);
    setShowMathModal(true);
    setUserAnswer('');
  };

  const handleSubmitAnswer = async () => {
    const userNumberAnswer = Number(userAnswer);
    
    if (userNumberAnswer === mathProblem.answer) {
      setShowSuccess(true);
      setTimeout(async () => {
        try {
          const response = await fetch(`http://localhost:8000/delete-summary/${summary.id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            onDelete(summary.id);
          }
        } catch (error) {
          console.error('Error deleting summary:', error);
        }
        setShowMathModal(false);
        setShowSuccess(false);
      }, 1500);
    } else {
      setShowError(true);
      setShowMathModal(false);
      setTimeout(() => setShowError(false), 3000);
    }
    setUserAnswer('');
  };

  return (
    <>
    <div className="group relative flex items-center gap-6 bg-white rounded-xl px-6 py-4 shadow-sm hover:shadow-md transition-all duration-300 mb-4 border border-slate-100">
    {showError && (
          <div className="absolute top-0 right-0 transform -translate-y-full mb-2 p-2 bg-red-50 text-red-600 rounded-lg text-sm">
            Wrong answer! The summary stays 😄
          </div>
        )}
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
            {summary.time_ago}

          </p>
        </div>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        <button 
          onClick={handleDelete}
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300"
          title="Delete summary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button 
          onClick={handleViewSummary} 
          className="px-6 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium transition-all duration-300 hover:bg-blue-100 hover:text-blue-700"
        >
          View
        </button>
      </div>
    </div>

          {/* Math Challenge Modal */}
          {showMathModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl transform transition-all">
                <div className="text-center">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Math Challenge!</h3>
                    <p className="text-sm text-gray-600">Solve this problem to delete the summary</p>
                  </div>
                  
                  {!showSuccess ? (
                    <>
                      <div className="text-4xl font-bold text-blue-600 my-8">
                        {mathProblem.question} = ?
                      </div>
                      
                      <div className="mb-6">
                        <input
                          type="number"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="w-32 text-center text-2xl font-semibold px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                          placeholder="?"
                          autoFocus
                        />
                      </div>
    
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => setShowMathModal(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmitAnswer}
                          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Check Answer
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-8">
                      <div className="text-green-500 text-4xl mb-4">✨</div>
                      <p className="text-lg font-medium text-gray-900">Correct! Deleting summary...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          </>
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

  const handleDelete = (deletedId) => {
    setSummaries(prevSummaries => prevSummaries.filter(summary => summary.id !== deletedId));
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
     <Header/>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-6 py-8">
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
              <SummaryCard 
                key={summary.id} 
                summary={summary} 
                onDelete={handleDelete}
              />
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