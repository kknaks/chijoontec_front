import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddSubCategoryModal = ({ isOpen, onClose, categoryId, categoryName }) => {
  const [subCategoryName, setSubCategoryName] = useState('');

  const handleAddSubCategory = () => {
    const data = {
      name: subCategoryName,
    };

    axios.post(`${import.meta.env.VITE_CORE_API_BASE_URL}/category/secondary/${categoryId}`, data)
      .then(response => {
        console.log('SubCategory added:', response.data);
        onClose();
      })
      .catch(error => console.error('Error adding subcategory:', error));
  };

  const handleCancel = () => {
    setSubCategoryName('');
    onClose();
  };
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{categoryName} 항목 추가</DialogTitle>
          <DialogDescription>새로운 서브 카테고리를 추가하세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input 
            placeholder="Sub Category Name" 
            value={subCategoryName} 
            onChange={(e) => setSubCategoryName(e.target.value)} 
          />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleAddSubCategory}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubCategoryModal;
