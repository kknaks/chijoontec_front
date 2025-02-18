import React from 'react';
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react"; // 문서 모양 아이콘 추가
import { ShoppingCart } from "lucide-react"; // 장바구니 모양 아이콘 추가

const MainTable = ({ tecList, onCartChange, cartItems }) => {
  const handleCartClick = (tec) => {
    const newCartItems = cartItems.find(item => item.id === tec.id)
      ? cartItems.filter(item => item.id !== tec.id)
      : [...cartItems, tec];
    onCartChange(newCartItems);
  };

  return (
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
            <TableHead className="text-center">Cart</TableHead>
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
              <TableCell className="grid place-items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-6 w-10 p-0 ${cartItems.find(item => item.id === tec.id) ? 'bg-gray-300' : ''}`}
                  onClick={() => handleCartClick(tec)}
                >
                  <ShoppingCart size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MainTable;
