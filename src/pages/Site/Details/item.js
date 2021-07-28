import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Card } from 'antd';

const { Meta } = Card;

const useStyles = makeStyles({
  root: {
    Width: 400,
    margin: 20,
    alignContent: 'center',
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ onClick, name, image }) {
  const classes = useStyles();

  return (
    <Card
      style={{ width: 151, height: 188, margin: 6 }}
      onClick={onClick}
      cover={
        <img
          alt="example"
          src={image}
          style={{
            width: '100%',
            height: 157,
            alignContent: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        />
      }
    >
      <Meta
        title={name}
        style={{
          paddingTop: 9,
          paddingBottom: 9,
          alignContent: 'center',
          font: 'normal normal medium 13px/16px Montserrat',
        }}
      />
    </Card>
  );
}
