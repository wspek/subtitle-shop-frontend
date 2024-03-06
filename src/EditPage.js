import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const EditPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access the location object
  // Initialize state with the subtitle passed through navigation state or localStorage
  const [subtitle, setEditedSubtitle] = useState(
    location.state?.subtitle || localStorage.getItem('subtitle') || ''
  );

  // Define navigateToTranslatePage inside EditPage so it has access to navigate and subtitle
  const navigateToTranslatePage = () => {
    localStorage.setItem('subtitle', subtitle);
    navigate('/translate', { state: { subtitle: subtitle } });
  };

  // Handler function to update the state with the new subtitle text
  const handleSubtitleChange = (event) => {
    const newSubtitle = event.target.value;
    localStorage.setItem('subtitle', newSubtitle); // Update localStorage
    setEditedSubtitle(newSubtitle); // Update state
  };

  return (
    <div>
      <h2>Edit Subtitle</h2>
      <div className="buttons-container">
        <button onClick={navigateToTranslatePage}>Translate Subtitle</button>
      </div>
      <textarea value={subtitle} className="subtitle-display" onChange={handleSubtitleChange} />
    </div>
  );
};

export default EditPage;
