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
      hoverable
      style={{ width: 240, margin: 10 }}
      onClick={onClick}
      cover={<img alt="example" src={image} />}
    >
      <Meta title={name} />
    </Card>
  );
}
