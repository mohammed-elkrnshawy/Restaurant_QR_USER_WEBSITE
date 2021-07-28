import React, { useEffect, useState } from 'react';
import Item from './item';
import { useTranslation } from 'react-i18next';
import { Skeleton, Switch, Card, Avatar } from 'antd';
const { Meta } = Card;

export default function Category({
  changeComponent,
  categories,
  setId,
  getSubCategory,
  loading,
}) {
  const { t } = useTranslation();

  return (
    <div className="categories">
      <h4>{t('Categories')}</h4>

      {loading ? (
        <>
          {' '}
          <Card
            style={{ width: 400, margin: 16, display: 'inline-block' }}
            loading={true}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
            />
          </Card>
          <Card
            style={{ width: 400, margin: 16, display: 'inline-block' }}
            loading={true}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
            />
          </Card>
          <Card
            style={{ width: 400, margin: 16, display: 'inline-block' }}
            loading={true}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
            />
          </Card>
          <Card
            style={{ width: 400, margin: 16, display: 'inline-block' }}
            loading={true}
          >
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
            />
          </Card>
        </>
      ) : (
        categories.map((i) => (
          <Item
            name={i.name}
            image={i.image}
            onClick={() => {
              changeComponent('subCategory');
              setId(i.id);
              getSubCategory(i.id);
            }}
          />
        ))
      )}
    </div>
  );
}
