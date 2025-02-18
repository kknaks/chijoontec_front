import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AddSubCategoryModal from './AddSubCategoryModal';

const AddTecListModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [tecList, setTecList] = useState([{ technology: '', jobPosting: '', sourceURL: '', description: '', categoryId: '', subCategoryId: '', subCategories: [] }]);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [activeRowIndex, setActiveRowIndex] = useState(null);

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

  // 모달 관련 핸들러 추가
  const handleOpenSubCategoryModal = (index) => {
    const tec = tecList[index];
    const selectedCategory = categories.find(category => category.id === tec.categoryId);
    setSelectedCategoryId(tec.categoryId);
    setSelectedCategoryName(selectedCategory ? selectedCategory.name : '');
    setActiveRowIndex(index);
    setIsSubCategoryModalOpen(true);
  };

  const handleCloseSubCategoryModal = () => {
    setIsSubCategoryModalOpen(false);
    // 서브 카테고리 추가 후 해당 행의 서브카테고리 목록 다시 불러오기
    if (selectedCategoryId && activeRowIndex !== null) {
      axios.get(`${import.meta.env.VITE_CORE_API_BASE_URL}/category/secondary/${selectedCategoryId}`)
        .then(response => {
          const data = Array.isArray(response.data) ? response.data : [];
          handleSubCategoriesChange(activeRowIndex, data);
        })
        .catch(error => console.error('Error fetching secondary categories:', error));
    }
  };

  const handleClose = () => {
    setTecList([{ technology: '', jobPosting: '', sourceURL: '', description: '', categoryId: '', subCategoryId: '', subCategories: [] }]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => open ? null : handleClose()}>
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
                    <SelectItem key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                  {tec.categoryId && (
                    <div className="py-2">
                      <Button 
                        variant="link" 
                        className="text-gray-500 text-sm font-normal flex items-center gap-1 p-1 h-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenSubCategoryModal(index);
                        }}
                      >
                        + 추가하기
                      </Button>
                    </div>
                  )}
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
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
      <AddSubCategoryModal 
        isOpen={isSubCategoryModalOpen}
        onClose={handleCloseSubCategoryModal}
        categoryId={selectedCategoryId}
        categoryName={selectedCategoryName}
      />
    </Dialog>
  );
};

export default AddTecListModal;
