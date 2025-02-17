import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import AddTecModal from './AddTecModal';

const MainPage = () => {
  const [tecList, setTecList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 목데이터 설정
    const mockData = [
      { id: 1, category: 'Database', subCategory: 'SQL', detailCategory: 'RDMS', tec: 'MySQL', tecDescription: 'RDBMS(MySQL), NoSQL DB를 활용한 효율적인 저장구조 설계 및 개발 경험이 있으신 분', source: '당근' },
      { id: 2, category: 'JAVA', subCategory: 'Spring', detailCategory: 'SpringBoot', tec: 'WebSocket', tecDescription: '서버-클라이언트 실시간 통신 서비스 구현', source: '당근' },
      { id: 3, category: 'CI/CD', subCategory: 'CI', detailCategory: 'Deploy', tec: 'Docker', tecDescription: 'Docker 컨테이너를 활용한 배포 서비스 구현', source: '당근' },
    ];
    setTecList(mockData);
  }, []);

  const handleAddTecClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pt-0">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tec List</h1>
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
      
      <p className="text-gray-500 mb-8">Here's a list of technologies!</p>
      
      <div className="flex gap-4 mb-6">
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
        <Button className="ml-auto border border-primary hover:bg-primary/90 hover:shadow-md hover:text-white transition-all" 
            variant="primary"
            onClick={handleAddTecClick}
            >
            Add Tec
            </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="w-20 text-center">Category</TableHead>
              <TableHead className="w-20 text-center">Sub Category</TableHead>
              <TableHead className="w-20 text-center">Detail Category</TableHead>
              <TableHead className="w-20 text-center">Technology</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="w-20 text-center">Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tecList.map((tec) => (
              <TableRow key={tec.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="w-32">{tec.category}</TableCell>
                <TableCell className="w-32">{tec.subCategory}</TableCell>
                <TableCell className="w-32">{tec.detailCategory}</TableCell>
                <TableCell className="w-32">{tec.tec}</TableCell>
                <TableCell>{tec.tecDescription}</TableCell>
                <TableCell>{tec.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">0 of {tecList.length} row(s) selected.</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Rows per page</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-20">
              <SelectValue>10</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">Page 1 of 1</span>
        </div>
      </div>

      <AddTecModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default MainPage;
