import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DescriptionTextarea from './DescriptionTextarea';

const AddTecModal = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [detailCategories, setDetailCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [technology, setTechnology] = useState('');
  const [jobPosting, setJobPosting] = useState('');
  const [sourceURL, setSourceURL] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:8090/category/primary')
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
      axios.get(`http://localhost:8090/category/secondary/${selectedCategoryId}`)
        .then(response => {
          console.log(response);
          const data = Array.isArray(response.data) ? response.data : [];
          setSubCategories(data);
        })
        .catch(error => console.error('Error fetching secondary categories:', error));
    }
  }, [selectedCategoryId]);

  const handleAdd = () => {
    const data = {
      categoryId: selectedCategoryId,
      subCategoryId: selectedSubCategoryId,
      technology,
      jobPosting,
      sourceURL,
      description,
    };

    axios.post('http://localhost:8090', data)
      .then(response => {
        console.log('Technology added:', response.data);
        onClose();
      })
      .catch(error => console.error('Error adding technology:', error));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Technology</DialogTitle>
          <DialogDescription>Fill in the details below to add a new technology.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Select onValueChange={(value) => setSelectedCategoryId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedSubCategoryId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sub Category" />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id}>{subCategory.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Technology" value={technology} onChange={(e) => setTechnology(e.target.value)} />
          </div>
          <div className="w-full">
            <DescriptionTextarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <Input placeholder="Job Posting" value={jobPosting} onChange={(e) => setJobPosting(e.target.value)} />
          <Input placeholder="SourceURL" value={sourceURL} onChange={(e) => setSourceURL(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTecModal;
