import React from 'react';
import Item from './item';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from 'antd';
import { Skeleton, Switch, Card, Avatar } from 'antd';
const { Meta } = Card;

export default function Category({
  changeComponent,
  subCategory,
  getMeals,
  loading,
}) {
  const { t } = useTranslation();

  return (
    <div className="categories">
      <Breadcrumb
        style={{ display: 'inline', width: '100%', marginBottom: 20 }}
      >
        <Breadcrumb.Item>
          <a onClick={() => changeComponent('category')}>{t('Categories')}</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{t('Sub-Category')}</Breadcrumb.Item>
      </Breadcrumb>

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
        subCategory.map((i) => (
          <Item
            name={i.name}
            image={i.image}
            onClick={() => {
              changeComponent('meals');
              getMeals(i.id);
            }}
          />
        ))
      )}
    </div>
  );
}
