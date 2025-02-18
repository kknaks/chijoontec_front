import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DescriptionTextarea from './DescriptionTextarea';
import AddSubCategoryModal from './AddSubCategoryModal';

const AddTecModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [technology, setTechnology] = useState('');
  const [jobPosting, setJobPosting] = useState('');
  const [sourceURL, setSourceURL] = useState('');
  const [description, setDescription] = useState('');
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (selectedCategoryId) {
      axios.get(`${import.meta.env.VITE_CORE_API_BASE_URL}/category/secondary/${selectedCategoryId}`)
        .then(response => {
          console.log(response);
          const data = Array.isArray(response.data) ? response.data : [];
          setSubCategories(data);
        })
        .catch(error => console.error('Error fetching secondary categories:', error));
    }
  }, [selectedCategoryId]);

  const handleAdd = () => {
    const newErrors = {};
    if (!selectedCategoryId) newErrors.selectedCategoryId = true;
    if (!selectedSubCategoryId) newErrors.selectedSubCategoryId = true;
    if (!technology) newErrors.technology = true;
    if (!jobPosting) newErrors.jobPosting = true;
    if (!sourceURL) newErrors.sourceURL = true;
    if (!description) newErrors.description = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      categoryId: selectedCategoryId,
      subCategoryId: selectedSubCategoryId,
      technology,
      jobPosting,
      sourceURL,
      description,
    };

    axios.post(`${import.meta.env.VITE_CORE_API_BASE_URL}`, data)
      .then(response => {
        console.log('Technology added:', response.data);
        handleClose();
      })
      .catch(error => console.error('Error adding technology:', error));
  };

  const handleOpenSubCategoryModal = () => {
    setIsSubCategoryModalOpen(true);
  };

  const handleCloseSubCategoryModal = () => {
    setIsSubCategoryModalOpen(false);
    // 서브 카테고리 추가 후 다시 불러오기
    if (selectedCategoryId) {
      axios.get(`${import.meta.env.VITE_CORE_API_BASE_URL}/category/secondary/${selectedCategoryId}`)
        .then(response => {
          console.log(response);
          const data = Array.isArray(response.data) ? response.data : [];
          setSubCategories(data);
        })
        .catch(error => console.error('Error fetching secondary categories:', error));
    }
  };

  const handleClose = () => {
    setSelectedCategoryId('');
    setSelectedCategoryName('');
    setSelectedSubCategoryId('');
    setTechnology('');
    setJobPosting('');
    setSourceURL('');
    setDescription('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => open ? null : handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Technology</DialogTitle>
          <DialogDescription>Fill in the details below to add a new technology.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Select onValueChange={(value) => {
              setSelectedCategoryId(value);
              const selectedCategory = categories.find(category => category.id === value);
              setSelectedCategoryName(selectedCategory ? selectedCategory.name : '');
              setErrors({ ...errors, selectedCategoryId: false });
            }}>
              <SelectTrigger className={errors.selectedCategoryId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => {
              setSelectedSubCategoryId(value);
              setErrors({ ...errors, selectedSubCategoryId: false });
            }}>
              <SelectTrigger className={errors.selectedSubCategoryId ? 'border-red-500' : ''}>
                <SelectValue placeholder="Sub Category" />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id}>{subCategory.name}</SelectItem>
                ))}
                {selectedCategoryId && (
                  <div className="py-2">
                    <Button 
                    variant="link" 
                    className="text-gray-500 text-sm font-normal flex items-center gap-1 p-1 h-auto"
                    onClick={handleOpenSubCategoryModal}>+ 추가하기</Button>
                  </div>
                )}
              </SelectContent>
            </Select>
            <Input 
              placeholder="Technology" 
              value={technology} 
              onChange={(e) => {
                setTechnology(e.target.value);
                setErrors({ ...errors, technology: false });
              }} 
              className={errors.technology ? 'border-red-500' : ''}
            />
          </div>
          <div className="w-full">
            <DescriptionTextarea 
              value={description} 
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: false });
              }} 
              className={errors.description ? 'border-red-500' : ''}
            />
          </div>
          <Input 
            placeholder="Job Posting" 
            value={jobPosting} 
            onChange={(e) => {
              setJobPosting(e.target.value);
              setErrors({ ...errors, jobPosting: false });
            }} 
            className={errors.jobPosting ? 'border-red-500' : ''}
          />
          <Input 
            placeholder="SourceURL" 
            value={sourceURL} 
            onChange={(e) => {
              setSourceURL(e.target.value);
              setErrors({ ...errors, sourceURL: false });
            }} 
            className={errors.sourceURL ? 'border-red-500' : ''}
          />
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

export default AddTecModal;
