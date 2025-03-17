import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiResponse = await fetch(
          `/api/jobs?page=1&category=Software%20Engineering`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_API_KEY || '77556df5d11b91643b0ed92303429d01a7b93e8298b55087dbac0a6ca53ee899'}`
            }
          }
        );

        if (!apiResponse.ok) {
          throw new Error(`HTTP error! status: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        
        if (data.results && data.results.length > 0) {
          const formattedJobs = data.results.map(job => ({
            id: job.id,
            name: job.name,
            company: {
              name: job.company.name
            },
            locations: job.locations.length > 0 ? job.locations : [{ name: 'Remote' }],
            levels: job.levels.length > 0 ? job.levels : [{ name: 'Entry Level' }],
            categories: job.categories,
            refs: {
              landing_page: job.refs.landing_page
            }
          }));

          setJobs(formattedJobs);
          setFilteredJobs(formattedJobs);
          setError(null);
        } else {
          throw new Error('No jobs found in the response');
        }
      } catch (err) {
        console.error("API Error:", err);
        // Fallback data in case of API failure
        const fallbackJobs = [
          {
            id: 1,
            name: "Senior Software Engineer",
            company: { name: "KOD Tech" },
            locations: [{ name: "New York, NY" }],
            levels: [{ name: "Senior Level" }],
            categories: [{ name: "Software Engineering" }],
            refs: { landing_page: "#" }
          },
          {
            id: 2,
            name: "Frontend Developer",
            company: { name: "KOD Solutions" },
            locations: [{ name: "Remote" }],
            levels: [{ name: "Mid Level" }],
            categories: [{ name: "Software Engineering" }],
            refs: { landing_page: "#" }
          },
          {
            id: 3,
            name: "Junior Backend Developer",
            company: { name: "KOD Systems" },
            locations: [{ name: "San Francisco, CA" }],
            levels: [{ name: "Entry Level" }],
            categories: [{ name: "Software Engineering" }],
            refs: { landing_page: "#" }
          }
        ];
        setJobs(fallbackJobs);
        setFilteredJobs(fallbackJobs);
        setError("Unable to load live jobs. Showing sample listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilter = (level) => {
    setActiveFilter(level);
    if (level === 'all') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job => job.levels[0]?.name === level);
      setFilteredJobs(filtered);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center p-6 text-red-600 bg-red-100 rounded-lg">
      {error}
    </div>
  );

  return (
    <div 
      className="min-h-screen p-6 relative"
      style={{
        backgroundImage: 'url("/images/office_interior.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">KOD JOBS</h1>
          <p className="text-white text-xl">Discover Your Next Career Opportunity</p>
        </div>

        {/* Filter buttons */}
        <div className="mb-6 flex flex-wrap gap-3 justify-center">
          {['All Jobs', 'Entry Level', 'Mid Level', 'Senior Level'].map(level => (
            <button
              key={level}
              onClick={() => handleFilter(level === 'All Jobs' ? 'all' : level)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeFilter === (level === 'All Jobs' ? 'all' : level)
                  ? 'bg-stone-800 text-white'
                  : 'bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-black rounded-lg p-6 shadow-lg border border-white/20 h-[250px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 pr-4">
                    <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                      {job.name}
                    </h2>
                    <p className="text-gray-200">{job.company.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    job.levels[0]?.name === 'Entry Level' 
                      ? 'bg-green-400 bg-opacity-20 text-green-400' 
                      : job.levels[0]?.name === 'Mid Level'
                      ? 'bg-blue-400 bg-opacity-20 text-blue-400'
                      : 'bg-purple-400 bg-opacity-20 text-purple-400'
                  }`}>
                    {job.levels[0]?.name}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-gray-200 text-sm mb-2">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {job.locations[0]?.name || 'Remote'}
                  </div>
                  <div className="text-sm text-gray-200">Software Engineering</div>
                </div>
              </div>

              <div className="flex justify-end">
                <a 
                  href={job.refs.landing_page} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Apply Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-10 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg">
            <p className="text-white text-xl font-bold">No jobs found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 