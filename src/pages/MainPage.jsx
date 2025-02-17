import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";

const MainPage = () => {
  const [tecList, setTecList] = useState([]);

  useEffect(() => {
    // 목데이터 설정
    const mockData = [
      { id: 1, tec: 'React', tecDescription: 'A JavaScript library for building user interfaces', tecFrom: 'Facebook' },
      { id: 2, tec: 'Vue', tecDescription: 'The Progressive JavaScript Framework', tecFrom: 'Evan You' },
      { id: 3, tec: 'Angular', tecDescription: 'One framework. Mobile & desktop.', tecFrom: 'Google' },
    ];
    setTecList(mockData);
  }, []);

  return (
    <div className="p-8">
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
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="evan-you">Evan You</SelectItem>
            <SelectItem value="google">Google</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="w-48">ID</TableHead>
              <TableHead className="w-96">Technology</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>From</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tecList.map((tec) => (
              <TableRow key={tec.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{tec.id}</span>
                    <Badge variant="outline">{tec.tec}</Badge>
                  </div>
                </TableCell>
                <TableCell>{tec.tecDescription}</TableCell>
                <TableCell>
                  <Badge variant="outline">{tec.tecFrom}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
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
    </div>
  );
};

export default MainPage;
