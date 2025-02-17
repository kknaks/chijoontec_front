import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AddTecModal from './AddTecModal';
import AddTecListModal from './AddTecListModal';
import MainTable from './MainTable';
import axios from 'axios';

const MainPage = () => {
  const [tecList, setTecList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTecList = (page, size) => {
    axios.get(`${import.meta.env.VITE_CORE_API_BASE_URL}?page=${page}&size=${size}`)
      .then(response => {
        console.log(response.data);
        setTecList(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => console.error('Error fetching technology list:', error));
  };

  useEffect(() => {
    fetchTecList(page, size);
  }, [page, size]);

  const handleAddTecClick = () => {
    setIsModalOpen(true);
  };

  const handleAddTecListClick = () => {
    setIsListModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchTecList(page, size); // 리스트를 다시 가져옴
  };

  const handleCloseListModal = () => {
    setIsListModalOpen(false);
    fetchTecList(page, size); // 리스트를 다시 가져옴
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setPage(0); // 페이지 크기 변경 시 첫 페이지로 이동
  };

  return (
    <div className="pt-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">채용공고 기술스택 모아보기</h1>
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
      <div className="flex justify-between mb-6">
            {/* 왼쪽 그룹 */}
            <div className="flex gap-4">
                <Input className="max-w-sm" placeholder="Filter technologies..." />
                <Select>
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="From" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="java">JAVA</SelectItem>
                    <SelectItem value="ci-cd">CI/CD</SelectItem>
                </SelectContent>
                </Select>
            </div>
            
            {/* 오른쪽 버튼 그룹 */}
            <div className="flex gap-4">
                <Button 
                className="border border-primary hover:bg-primary/90 hover:shadow-md hover:text-white transition-all" 
                variant="primary"
                onClick={handleAddTecClick}
                >
                Add Tec
                </Button>
                <Button 
                className="border border-primary hover:bg-primary/90 hover:shadow-md hover:text-white transition-all" 
                variant="primary"
                onClick={handleAddTecListClick}
                >
                Add TecList
                </Button>
            </div>
        </div>

      <MainTable tecList={tecList} />

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">0 of {tecList.length} row(s) selected.</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Rows per page</span>
          <Select value={size} onValueChange={handleSizeChange}>
            <SelectTrigger className="w-20">
              <SelectValue>{size}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={10}>10</SelectItem>
              <SelectItem value={20}>20</SelectItem>
              <SelectItem value={50}>50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">Page {page + 1} of {totalPages}</span>
          <Button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</Button>
          <Button onClick={() => handlePageChange(page + 1)} disabled={page + 1 >= totalPages}>Next</Button>
        </div>
      </div>

      <AddTecModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddTecListModal isOpen={isListModalOpen} onClose={handleCloseListModal} />
    </div>
  );
};

export default MainPage;
