import React from "react";
import { Card, Button } from "antd";
import Link from 'next/link';

const AuctionCardItem = ({ item }) => {
  const currentBid = (item.current_bid || {}).amount || 0;
  return (
    <Card
      cover={<img alt={item.title} src={item.img} />}>
      <Card.Meta title={item.title} description={`${item.views} views`} />
      <p style={{ marginTop: "15px" }}>{currentBid ? `Current Bid: $${currentBid}` : `Minimun Bid: $${item.minimun_bid}`}</p>
      <Link href={`/auction/${item._id}`} passHref prefetch>
        <Button type="primary">Bid</Button>
      </Link>
    </Card>
  );
};

export default AuctionCardItem;
