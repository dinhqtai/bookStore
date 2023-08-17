'use client'
import * as React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { IOrigin, IProduct } from '../page';
import { addProducts } from '../api/project';
const { TextArea } = Input;
export interface IAppProps {
}

export default function AddProduct() {
    const onFinish = async (values: IProduct) => {
        await addProducts(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="add"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item<IProduct>
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm !' },]}
            >
                <Input />
            </Form.Item>

            <Form.Item<IProduct>
                label="Giá"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm !' },]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item<IProduct>
                label="Mô tả"
                name="description"
                rules={[
                    { required: true, message: 'Vui lòng nhập mô tả !' },
                    { min: 5, message: "Mô tả ít nhất 5 kí tự" }
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item<IProduct>
                label="Xuất xứ"
                name="origin"
                rules={[{ required: true, message: 'Vui lòng nhập xuất xứ !' }]}
            >
                <Select
                    defaultValue={"Xuất xứ"}
                    style={{ width: 200 }}
                    options={Object.keys(IOrigin).map(key => ({ value: IOrigin[key], label: IOrigin[key] }))}>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
