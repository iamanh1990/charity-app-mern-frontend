import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { LoadingOutlined, MailOutlined } from '@ant-design/icons';
import { requestNewPassword } from '../../actions/auth';
import { toast } from 'react-toastify';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await requestNewPassword(values.email);
      //toastify
      toast(res.data.message, { position: 'top-center' });
      setLoading(false);
    } catch (error) {
      console.log('From forgot password', error);
      //toastify
      toast.error(error.response.data.errorMessage, { position: 'top-center' });
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      name='loginForm'
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <h2>Forgot Password</h2>
      <p>Forgot your password? Reset your password here!</p>
      <Form.Item
        label='Email Address'
        name='email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
        validateTrigger='onBlur'
      >
        <Input prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button
          type='primary'
          htmlType='submit'
          style={{
            display: 'block',
            width: '100%',
            height: '5rem',
            borderRadius: '10rem',
          }}
        >
          {loading ? <LoadingOutlined /> : 'Reset Password'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
