import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const AddTecListModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [tecList, setTecList] = useState([{ technology: '', jobPosting: '', sourceURL: '', description: '', categoryId: '', subCategoryId: '', subCategories: [] }]);

  useEffect(() => {
    if (isOpen) {
      axios.get(`${import.meta.env.VITE_CORE_API_BASE_URL}/category/primary`)
        .then(response => {
          console.log(response);
          const data = Array.isArray(response.data) ? response.data : [];
          setCategories(data);
        })
        .catch(error => console.error('Error fetching primary categories:', error));
    }
  }, [isOpen]);

  useEffect(() => {
    tecList.forEach((tec, index) => {
      if (tec.categoryId) {
        axios.get(`${import.meta.env.VITE_CORE_API_BASE_URL}/category/secondary/${tec.categoryId}`)
          .then(response => {
            console.log(response);
            const data = Array.isArray(response.data) ? response.data : [];
            handleSubCategoriesChange(index, data);
          })
          .catch(error => console.error('Error fetching secondary categories:', error));
      }
    });
  }, [tecList.map(tec => tec.categoryId).join()]);

  const handleAddTec = () => {
    setTecList([...tecList, { technology: '', jobPosting: '', sourceURL: '', description: '', categoryId: '', subCategoryId: '', subCategories: [] }]);
  };

  const handleRemoveTec = (index) => {
    const newTecList = tecList.filter((_, i) => i !== index);
    setTecList(newTecList);
  };

  const handleChange = (index, field, value) => {
    const newTecList = tecList.map((tec, i) => i === index ? { ...tec, [field]: value } : tec);
    setTecList(newTecList);
  };

  const handleSubCategoriesChange = (index, subCategories) => {
    const newTecList = tecList.map((tec, i) => i === index ? { ...tec, subCategories } : tec);
    setTecList(newTecList);
  };

  const handleAdd = () => {
    console.log('Adding technologies:', tecList);
    axios.post(`${import.meta.env.VITE_CORE_API_BASE_URL}/bulk`, tecList)
      .then(response => {
        console.log('Technologies added:', response.data);
        onClose();
      })
      .catch(error => console.error('Error adding technologies:', error));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add New Technologies</DialogTitle>
          <DialogDescription>Fill in the details below to add new technologies.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          {tecList.map((tec, index) => (
            <div key={index} className="flex space-x-4 items-center border-b pb-4">
              <Select onValueChange={(value) => handleChange(index, 'categoryId', value)}>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleChange(index, 'subCategoryId', value)}>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="SubCategory" />
                </SelectTrigger>
                <SelectContent>
                  {tec.subCategories.map((subCategory) => (
                    <SelectItem key={subCategory.id} value={subCategory.id}>{subCategory.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input className="w-32" placeholder="Technology" value={tec.technology} onChange={(e) => handleChange(index, 'technology', e.target.value)} />
              <Input placeholder="Description" value={tec.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
              <Input className="w-32" placeholder="Job Posting" value={tec.jobPosting} onChange={(e) => handleChange(index, 'jobPosting', e.target.value)} />
              <Input className="w-32" placeholder="SourceURL" value={tec.sourceURL} onChange={(e) => handleChange(index, 'sourceURL', e.target.value)} />
              <Button variant="secondary" onClick={() => handleRemoveTec(index)}>Remove</Button>
            </div>
          ))}
          <Button variant="secondary" onClick={handleAddTec}>Add Another Technology</Button>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTecListModal;
