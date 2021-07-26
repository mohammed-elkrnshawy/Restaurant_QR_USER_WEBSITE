import React from 'react';
import Item from './item';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from 'antd';

export default function Category({ changeComponent, subCategory, getMeals }) {
  const { t } = useTranslation();

  return (
    <div className="categories">
   <Breadcrumb style={{display:'inline',width:'100%',marginBottom:20}}>
    <Breadcrumb.Item>
      <a onClick={()=>changeComponent('category')}>{t('Category')}</a>
    
    </Breadcrumb.Item>
    <Breadcrumb.Item>
     {t('Sub-Category')}
    </Breadcrumb.Item>
   
  </Breadcrumb>
      
      {subCategory.map((i) => (
        <Item
          name={i.name}
          onClick={() => {
            changeComponent('meals');
            getMeals(i.id);
          }}
        />
      ))}
    </div>
  );
}
