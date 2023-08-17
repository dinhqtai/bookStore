'use client'
import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { deleteProducts, getProducts } from './api/project';
import Link from 'next/link';
export interface IProduct {
  id?: number;
  name: string;
  price: number;
  description: string;
  origin: IOrigin
}
export enum IOrigin {
  "Việt Nam" = "Việt Nam",
  "Trung Quốc" = "Trung Quốc",
  "Thái Lan" = "Thái Lan"
}
const App: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>()
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProducts()
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <Table columns={columns} dataSource={products} />
  )
}
const onFinish = async (id: number) => {
  try {
    await deleteProducts(id).then(() => { })
  } catch (error) {
    console.log(error)
  }
};
const columns: ColumnsType<IProduct> = [
  {
    title: 'STT',
    key: "stt",
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Xuất xứ',
    key: 'origin',
    dataIndex: 'origin',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/update/${record.id}`}>Sửa</Link>
        <Button onClick={() => onFinish(record?.id)}>Xoa</Button>
      </Space>
    ),
  },
];
export default App;