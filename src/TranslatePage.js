import React, { useState } from 'react';

const TranslatePage = () => {
  const [subtitleText, setSubtitleText] = useState(''); // Assuming you'll pass the subtitle text via state or props

  return (
    <div>
      <h2>Edit Subtitle</h2>
      <textarea
        value={subtitleText}
        onChange={(e) => setSubtitleText(e.target.value)}
      />
    </div>
  );
};

export default TranslatePage;
