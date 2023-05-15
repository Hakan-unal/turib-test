
import React, { useEffect, useState } from "react";
import { Row, Popover, Table, Button, Space, Drawer, Form, Input, Select, Tag, DatePicker, Tooltip } from "antd"
import { showNotification } from "./components/general/notification";
import useLocalStorage from "./hooks/useLocalStorage";
import useWindowSize from "./hooks/useWindowSize";
import { PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { BiTrashAlt } from "react-icons/bi";

// test yazılacak

const deletePopoverContent = (
  <div>
    <p>Silmek için tıklayınız</p>
  </div>
);

const editPopoverContent = (
  <div>
    <p>Düzenlemek için tıklayınız</p>
  </div>
);




type FormValues = {
  name: string,
  type: string,
  desciption: string,
  key: number
}


const App = () => {
  const [data, setData] = useState<object[]>([])
  const [LSTableData, setLSTableData] = useLocalStorage("LSTableData", [])
  const [open, setOpen] = useState<boolean>(false);

  const size = useWindowSize()
  const [form] = Form.useForm();


  const columns: any = [
    {
      title: 'Ad',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: 'Tür',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: 'Aşı',
          value: 'health',
        },
        {
          text: 'Mama',
          value: 'food',
        },
        {
          text: 'Kum',
          value: 'soil',
        },
        {
          text: 'Diğer',
          value: 'other',
        },
      ],
      onFilter: (value: string, record: any) => record.type.value === value,
      render: (type: any) => (<Tag color={"green"} key={type.label}>
        {type.label}
      </Tag>
      ),
    },

    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (description: string) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: 'Aksiyon',
      key: 'action',
      render: (obj: any) => (
        <Space size="middle">
          <Popover content={deletePopoverContent} >
            <Button onClick={() => handleDelete(obj)} icon={<BiTrashAlt size={15} color="red" />} />
          </Popover>
        </Space>
      ),
    },
  ];



  const handleDelete = (obj: any) => {
    const tempArr = data.filter((o: any) => o.key !== obj.key)
    setData(tempArr)
    setLSTableData(tempArr)
    showNotification("success", "Bilgilendirme", obj.key + " ID'li kayıt başarıyla silindi", null)
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const submit = () => {
    form.submit()
  }

  const onFinish = (values: FormValues) => {
    const tempArr = [...data];
    const key = Math.round(Math.random() * 100000000)
    tempArr.push({ ...values, key: key })

    setData(tempArr)
    setLSTableData(tempArr)
    showNotification("success", "Bilgilendirme", "Kayıt Başarılı", null)
    form.resetFields()
    onClose()
  };

  const onFinishFailed = () => {
    showNotification("error", "Uyarı", "Hop hemşerim nereye formda eksik alanlar var", null)
  };

  useEffect(() => {
    setData(LSTableData)
  }, [])

  return (<Row>
    <Space direction="vertical">
      <Button onClick={showDrawer} icon={<PlusOutlined />} block>Kayıt Ekle</Button>
      <Table
        size="small"
        getPopupContainer={() => document.body}
        style={{ width: size.width / 1.1, margin: 50 }}
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </Space>




    <Drawer
      title="Bilgi Formu"
      width={400}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={submit} type="primary">
            Kaydet
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Ad"
          rules={[{ required: true, message: 'Alan boş bırakılamaz' }]}
        >
          <Input allowClear showCount placeholder="Lütfen ad giriniz" />
        </Form.Item>
        <Form.Item
          name="type"
          label="Tür"
          rules={[{ required: true, message: 'Alan boş bırakılamaz' }]}
        >
          <Select
            labelInValue
            allowClear
            placeholder="Lütfen tür seçiniz"
            options={[
              { value: 'soil', label: 'Kum' },
              { value: 'health', label: 'Aşı' },
              { value: 'food', label: 'Mama' },
              { value: 'other', label: 'Diğer' },
            ]}
          />
        </Form.Item>




        <Form.Item
          name="description"
          label="Açıklama"
        >
          <TextArea
            allowClear
            showCount
            rows={4}
            placeholder="Lütfen açıklama giriniz"
          />
        </Form.Item>
      </Form>
    </Drawer>

  </Row>
  )
}


export default App;