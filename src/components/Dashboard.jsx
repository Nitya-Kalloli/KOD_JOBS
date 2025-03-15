import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://www.themuse.com/api/public/jobs', {
          params: {
            api_key: '7f68683d31e3bd05f43d0596c8c19f81a26abf357046ffd6ce5747a3eed25492',
            page: 1
          }
        });

        const formattedJobs = response.data.results.map(job => ({
          id: job.id,
          company: job.company.name,
          location: job.locations[0]?.name || 'Remote',
          position: job.name,
          skills: job.categories.map(cat => cat.name) || ['Not Specified'],
          level: job.levels[0]?.name || 'Not Specified',
          posted: new Date(job.publication_date).toLocaleDateString(),
          applyUrl: job.refs.landing_page
        }));

        setJobs(formattedJobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Available Jobs</h1>
          <p className="text-slate-400">Find your next opportunity</p>
        </div>
      </div>

      {/* Job Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div 
              key={job.id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-slate-700">
                        {job.company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{job.company}</h3>
                      <div className="flex items-center text-slate-600 text-sm mt-1">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {job.level}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-slate-900 mb-4 line-clamp-2">
                  {job.position}
                </h2>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map(skill => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm text-slate-500">
                      Posted {job.posted}
                    </span>
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 