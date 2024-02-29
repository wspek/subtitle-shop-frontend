import React, { useState } from 'react';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';
import './SubtitleGenerator.css';


const SubtitleGenerator = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

//   const handleGenerateSubtitle = async () => {
//     setLoading(true);
//     try {
//       // Update the URL to match your Django backend's actual URL and endpoint
//       const response = await axios.post('http://localhost:8000/api/pipeline/get-subtitle/', {
//         youtube_url: videoUrl // Changed from { videoUrl } to { youtube_url: videoUrl }
//       });
//     } catch (error) {
//       console.error('There was an error generating the subtitle:', error);
//       alert('Failed to generate subtitle. Please check the console for more information.');
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleGenerateSubtitle = async () => {
    setLoading(true);
    setError(''); // Reset error message
    try {
      const response = await axios.post('http://localhost:8000/api/pipeline/get-subtitle/', {
        youtube_url: videoUrl,
      });
      checkTaskStatus(response.data.task_id);
    } catch (error) {
      console.error('There was an error generating the subtitle:', error);
      setError('Failed to generate subtitle. Please try again later.');
    }
  };
  
  const checkTaskStatus = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/pipeline/tasks/status/${taskId}/`);
      if (response.data.status === 'SUCCESS') {
        fetchSubtitles(response.data.result);
      } else {
        // Re-check the status after a delay if the task is not yet complete
        setTimeout(() => checkTaskStatus(taskId), 2000); // Adjust delay as needed
      }
    } catch (error) {
      console.error('There was an error checking the task status:', error);
      setError('Failed to check task status. Please try again later.');
      setLoading(false);
    }
  };

  const fetchSubtitles = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/pipeline/subtitles/${taskId}/`);
      setSubtitle(response.data.subtitles); // Update state with fetched subtitles
    } catch (error) {
      console.error('There was an error fetching the subtitles:', error);
      setError('Failed to fetch subtitles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const downloadSubtitles = () => {
    const blob = new Blob([subtitle], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "subtitles.txt"; // or "subtitles.srt" depending on your format
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL"
      />
      <button onClick={handleGenerateSubtitle} disabled={loading}>
        {loading ? 'Generating...' : 'Get Subtitle'}
      </button>
      {error && <div className="error-message">{error}</div>}
      {loading && (
        <div>
            <Hourglass color="#00BFFF" height={30} width={30}/>
        </div>
      )}
      {subtitle && (
        <div className="subtitle-container">
          <h3>Generated Subtitles:</h3>
          <div className="buttons-container">
            <button onClick={() => navigator.clipboard.writeText(subtitle)}>Copy to Clipboard</button>
            <button onClick={downloadSubtitles}>Download Subtitles</button>
          </div>
          <textarea value={subtitle} readOnly className="subtitle-display"></textarea>
        </div>
      )}
    </div>
  );
};

export default SubtitleGenerator;
