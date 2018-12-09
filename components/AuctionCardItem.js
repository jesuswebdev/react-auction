import React from "react";
import { Card, Button } from "antd";
import Link from 'next/link';

const AuctionCardItem = ({ item }) => {
  return (
    <Card
      cover={<img alt={item.title} src={item.img} />}>
      <Card.Meta title={item.title} description={`${item.views} views`} />
      <p style={{ marginTop: "15px" }}>{`Current Bid: ${item.current_bid ||
        0}$`}</p>
      <Link href={`/auction/${item._id}`} prefetch>
        <Button type="primary">Bid</Button>
      </Link>
    </Card>
  );
};

export default AuctionCardItem;
