import React, { useEffect, useState } from 'react';
import Item from './item';
import { useTranslation } from 'react-i18next';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import axios from 'axios';
const { Meta } = Card;

export default function Category({
  changeComponent,
  categories,
  setId,
  getSubCategory,
  loading,
}) {
  //const [categories, setCategories] = useState([]);

  const { t } = useTranslation();
  // const getData = () => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `https://restaurant-dashboard.se01.tech/api/restaurants/${props.id}`,
  //       {
  //         headers: {
  //           'Content-Language':
  //             localStorage.getItem('lang').search('ar') >= 0 ? 'ar' : 'en',
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       if (response.data.status == 'true') {
  //         setCategories(response.data.data.categories);

  //         setLoading(false);
  //       } else {
  //         cogoToast.warn('Something Went Wrong');
  //       }
  //     })
  //     .catch(() => {
  //       console.log('');
  //     });
  // };

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
