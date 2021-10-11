import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { toast } from 'react-toastify';
import CategoryForm from '../../component/form/CategoryForm';
import DashboardHorizontalNav from '../../component/nav/DashboardNav';
import CategoryList from '../../component/category/CategoryList';
import { getCategories, deleteCategory } from '../../actions/category';

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategoryList(res.data.data.categories);
      setLoading(false);
    } catch (error) {
      console.log('From loadCategories--->', error);
      setLoading(false);
    }
  };

  const handleRemove = async (slug) => {
    try {
      setLoading(true);
      await deleteCategory(slug);
      toast.success('One category removed!');
      setLoading(false);
      loadCategories();
    } catch (error) {
      console.log('From delete category--->', error);
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <DashboardHorizontalNav />
      <Row gutter={16}>
        <Col span='10'>
          <CategoryForm
            title='Create Category'
            buttonText='Create'
            loading={loading}
            setLoading={setLoading}
            loadCategories={loadCategories}
          />
        </Col>
        <Col span='14'>
          <CategoryList
            loading={loading}
            categoryList={categoryList}
            handleRemove={handleRemove}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Category;