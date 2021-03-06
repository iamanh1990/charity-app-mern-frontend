import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth';
import { toast } from 'react-toastify';
import { LOGGED_IN_USER } from '../../actions/types';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  //take the email from localStorage if exists
  let email,
    name = '';

  if (localStorage.getItem('happyFund')) {
    const happyFundObj = JSON.parse(localStorage.getItem('happyFund'));
    if (happyFundObj.email) email = happyFundObj.email;
    if (happyFundObj.name) name = happyFundObj.name;
  }

  const onFinish = async (values) => {
    try {
      setLoading(true);
      //save the name, email in localStorage
      let formData = {};
      if (localStorage.getItem('happyFund')) {
        formData = JSON.parse(localStorage.getItem('happyFund'));
      }
      if (values.email) formData['email'] = values.email;
      if (values.name) formData['name'] = values.name;
      localStorage.setItem('happyFund', JSON.stringify(formData));

      //register an account
      const res = await register(values);
      const {
        data: { user },
      } = res.data;

      //save user and token in redux store
      dispatch({
        type: LOGGED_IN_USER,
        payload: user,
      });

      //toastify
      toast.success(
        "Your new account has been created! Please check your email. If it's not in the inbox, please check the promotion/spam section!",
        {
          position: 'top-center',
        }
      );
      setLoading(false);
      //redirect user
      history.push('/');
    } catch (error) {
      console.log('from register-->', error.response);
      //toastify
      toast.error(error.response.data.errorMessage, { position: 'top-center' });
      setLoading(false);
    }
  };

  //form submit failed
  const onFinishFailed = (errorInfo) => {
    //save email in localStorage then user could use it later on without having to re-type it
    let formData = {};
    if (localStorage.getItem('happyFund')) {
      formData = JSON.parse(localStorage.getItem('happyFund'));
    }
    if (errorInfo.values.email) formData['email'] = errorInfo.values.email;
    if (errorInfo.values.name) formData['name'] = errorInfo.values.name;

    localStorage.setItem('happyFund', JSON.stringify(formData));

    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='registerForm'
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        email,
        name,
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        label='Fullname'
        name='name'
        className="form__label"
        rules={[
          {
            required: true,
            message: 'Please input your fullname!',
          },
        ]}
      >
        <Input className="form__label--input" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        label='Email'
        name='email'
        className="form__label"
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
        <Input className="form__label--input" prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        label='Create Password'
        name='password'
        className="form__label"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 6,
            message: 'The password should be at least 6 characters!',
          },
        ]}
        validateTrigger='onBlur'
      >
        <Input.Password prefix={<LockOutlined />} type='password' className="form__label--input" />
      </Form.Item>

      <Form.Item
        label='Confirm Password'
        name='passwordConfirm'
        className="form__label"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
        validateTrigger='onChange'
      >
        <Input.Password prefix={<LockOutlined />} type='password' className="form__label--input" />
      </Form.Item>

      <Form.Item
        name='agreement'
        className="form__check-box--agreement-label"
        valuePropName='checked'
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
      >
        <Checkbox className="form__check-box--agreement-input">
          I have read the <Link to='/agreement'>agreement</Link>
        </Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button
          type='primary'
          htmlType='submit'
          shape="round"
          className="form__btn btn btn--primary"
        >
          {loading ? <LoadingOutlined /> : 'Register'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;