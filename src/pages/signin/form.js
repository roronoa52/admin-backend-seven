import React from 'react';
import SButton from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import { Form } from 'react-bootstrap';

const SForm = ({ form, handleChange, handleSubmit, isLoading}) => {
    return (
        <Form>
        <TextInputWithLabel
          label='Email address'
          name='email'
          value={form.email}
          type='email'
          placeholder='Enter Email'
          onChange={handleChange}
        />
        
        <TextInputWithLabel
          label='Password'
          name='password'
          value={form.password}
          type='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <SButton
         variant="primary" 
         action={handleSubmit}
         loading = {isLoading}
         disabled = {isLoading}>
          Submit
        </SButton>
      </Form>
    );
}

export default SForm;
