import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EditPage = () => {
  const location = useLocation();
  // Initialize state with the subtitle passed through navigation state
  const [editedSubtitle, setEditedSubtitle] = useState(location.state?.subtitle || localStorage.getItem('subtitle') || '');

  // Handler function to update the state with the new subtitle text
  const handleSubtitleChange = (event) => {
    const newSubtitle = event.target.value;
    localStorage.setItem('subtitle', newSubtitle);
    setEditedSubtitle(newSubtitle);
  };

  return (
    <div>
      <h2>Edit Subtitle</h2>
      <textarea value={editedSubtitle} className="subtitle-display" onChange={handleSubtitleChange} />
    </div>
  );
};

export default EditPage;