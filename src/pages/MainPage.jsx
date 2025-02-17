import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, FileText } from "lucide-react"; // 문서 모양 아이콘 추가
import AddTecModal from './AddTecModal';
import axios from 'axios';

const MainPage = () => {
  const [tecList, setTecList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTecList = () => {
    axios.get('http://localhost:8090')
      .then(response => {
        console.log(response.data);
        setTecList(response.data);
      })
      .catch(error => console.error('Error fetching technology list:', error));
  };

  useEffect(() => {
    fetchTecList();
  }, []);

  const handleAddTecClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchTecList(); // 리스트를 다시 가져옴
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
              {/* <TableHead className="w-20 text-center">Detail Category</TableHead> */}
              <TableHead className="w-20 text-center">Technology</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-center">Source</TableHead>
              <TableHead className="text-center">URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tecList.map((tec) => (
              <TableRow key={tec.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="w-32">{tec.primaryCategory}</TableCell>
                <TableCell className="w-32">{tec.secondaryCategory}</TableCell>
                {/* <TableCell className="w-32">{tec.detailCategory}</TableCell> */}
                <TableCell className="w-32">{tec.technology}</TableCell>
                <TableCell className="text-left px-20">{tec.description}</TableCell>
                <TableCell>{tec.jobPosting}</TableCell>
                <TableCell className="text-center">                    
                <a href={tec.sourceURL} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center">
                    <FileText className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </a>
                </TableCell>
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
