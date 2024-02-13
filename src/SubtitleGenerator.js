import React, { useState } from 'react';
import axios from 'axios';

const SubtitleGenerator = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateSubtitle = async () => {
    setLoading(true);
    try {
      // Update the URL to match your Django backend's actual URL and endpoint
      const response = await axios.post('http://localhost:8000/api/pipeline/get-subtitle/', {
        youtube_url: videoUrl // Changed from { videoUrl } to { youtube_url: videoUrl }
      });
    } catch (error) {
      console.error('There was an error generating the subtitle:', error);
      alert('Failed to generate subtitle. Please check the console for more information.');
    } finally {
      setLoading(false);
    }
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
      {subtitle && <div><h3>Subtitle:</h3><p>{subtitle}</p></div>}
    </div>
  );
};

export default SubtitleGenerator;
