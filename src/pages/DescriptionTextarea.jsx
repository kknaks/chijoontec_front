import React from 'react';

const DescriptionTextarea = ({ value, onChange }) => {
  const maxLength = 100;

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      onChange(e);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default DescriptionTextarea;
