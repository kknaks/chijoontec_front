import React, { useState } from 'react';
import { Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ShoppingCart } from "lucide-react"; // 장바구니 모양 아이콘 추가
import PrintModal from './PrintModal';

const MainCart = ({ cartItems, onRemoveItem }) => {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 px-3">
          <ShoppingCart className="" size={20} />
          <h2 className="text-xl font-bold flex items-center gap-2">Cart({cartItems.length})</h2>
        </div>
        <Button variant="outline" onClick={() => setIsPrintModalOpen(true)}>Print</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32 text-center">Category</TableHead>
            <TableHead className="w-32 text-center">Sub Category</TableHead>
            <TableHead className="w-32 text-center">Technology</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-center">Source</TableHead>
            <TableHead className="text-center">URL</TableHead>
            <TableHead className="text-center">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-32">{item.primaryCategory}</TableCell>
              <TableCell className="w-32">{item.secondaryCategory}</TableCell>
              <TableCell className="w-32">{item.technology}</TableCell>
              <TableCell className="text-left px-20">{item.description}</TableCell>
              <TableCell>{item.jobPosting}</TableCell>
              <TableCell className="text-center">                    
                <a href={item.sourceURL} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center">
                  <FileText className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </a>
              </TableCell>
              <TableCell className="grid place-items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-10 p-0 hover:text-red-500"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PrintModal 
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        cartItems={cartItems}
      />
    </div>
  );
};

export default MainCart;
