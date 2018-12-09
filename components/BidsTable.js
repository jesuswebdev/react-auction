import React from "react";
import { Table } from "antd";

const columns = [
  { title: "User", dataIndex: "user.name" },
  { title: "Bid", dataIndex: "amount" },
  { title: "Date", dataIndex: "createdAt" }
];

const BidsTable = ({ bids }) => {
  return (
    <Table
      dataSource={bids}
      columns={columns}
      rowKey={item => item._id}
      pagination={false}
    />
  );
};

export default BidsTable;
