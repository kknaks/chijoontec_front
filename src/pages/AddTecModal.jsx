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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sub Category" />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id}>{subCategory.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Technology" />
          </div>
          <div className="w-full">
            <DescriptionTextarea />
          </div>
          <Input placeholder="Source" />
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTecModal;
