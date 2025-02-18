import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from 'axios';

const PrintModal = ({ isOpen, onClose, cartItems }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);

      console.log('cartItems:', cartItems);
      console.log('Request body:', JSON.stringify(cartItems, null, 2));
      
      axios.post(`${import.meta.env.VITE_CORE_API_BASE_URL}/aiAnswer/print`, cartItems)
        .then(response => {
          try {
            // 백틱과 'json' 텍스트를 제거하고 파싱
            const cleanData = response.data
              .replace(/```json\n/, '')  // 시작 부분의 ```json 제거
              .replace(/```$/, '')       // 끝 부분의 ``` 제거
              .trim();                   // 앞뒤 공백 제거
            
            const parsedData = JSON.parse(cleanData);
            setResponse(parsedData);
          } catch (parseError) {
            console.error('JSON 파싱 에러:', parseError);
            console.log('받은 데이터:', response.data);
            setError('데이터 파싱 중 오류가 발생했습니다.');
          }
        })
        .catch(error => {
          setError('Failed to process data');
          console.error('Error:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, cartItems]);

  const renderTechnologyDetails = (details) => {
    if (Array.isArray(details)) {
      return (
        <ul className="list-disc ml-6">
          {details.map((item, index) => (
            <li key={index}>{item.replace(/^- /, '')}</li>
          ))}
        </ul>
      );
    }
    return <p>{details}</p>;
  };

  const renderTechnologySection = (technology, details) => (
    <div key={technology} className="ml-8 mb-4">
      <h4 className="font-semibold text-lg text-blue-600">{technology}</h4>
      <div className="ml-4">
        {details.기술스택 && (
          <p><span className="font-medium">기술스택: </span>{details.기술스택}</p>
        )}
        {details.적용내용 && (
          <div>
            <span className="font-medium">적용내용:</span>
            <ul className="list-disc ml-6">
              {details.적용내용.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {details.description && (
          <div>
            <span className="font-medium">Description: </span>
            {renderTechnologyDetails(details.description)}
          </div>
        )}
      </div>
    </div>
  );

  const renderCategorySection = (category, technologies) => (
    <div key={category} className="mb-6">
      <h3 className="font-bold text-xl text-gray-800 mb-3 bg-gray-100 p-2 rounded">
        {category}
      </h3>
      {Object.entries(technologies).map(([tech, details]) => 
        renderTechnologySection(tech, details)
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>기술 스택 정리</DialogTitle>
        </DialogHeader>
        <div className="bg-gray-50 p-6 rounded-lg">
          {isLoading ? (
            <div className="text-center py-4">GPT답변 생성 중...</div>
          ) : error ? (
            <div className="text-red-500 py-4">{error}</div>
          ) : response ? (
            <div className="space-y-6">
              {Object.entries(response).map(([category, technologies]) => 
                renderCategorySection(category, technologies)
              )}
            </div>
          ) : null}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>닫기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrintModal;
