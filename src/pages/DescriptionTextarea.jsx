import React, { useState } from 'react';

const DescriptionTextarea = () => {
  const [text, setText] = useState('');
  const maxLength = 100;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setText(value);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {text.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default DescriptionTextarea;
