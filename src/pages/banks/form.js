import React from 'react';
import { Figure, Form } from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';

export default function BankForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
    <TextInputWithLabel
      placeholder={'Masukan Nama'}
      label={'name'}
      name='name'
      value={form.name}
      type='text'
      onChange={handleChange}
    />

<TextInputWithLabel
      placeholder={'Masukan Rekening Penerima'}
      label={'rek'}
      name='rek'
      value={form.rek}
      type='text'
      onChange={handleChange}
    />

    <TextInputWithLabel
      placeholder={'Masukan Gambar'}
      label={'avatar'}
      name='avatar'
      // value={form.avatar}
      type='file'
      onChange={handleChange}
    />
    {form.avatar !== '' && (
      <div>
        <Figure>
          <Figure.Image
            width={171}
            height={180}
            alt='171x180'
            src={`data:${form.typeImage};base64,${form.dataImage}`}
          />

          <Figure.Caption>Perview image</Figure.Caption>
        </Figure>
      </div>
    )}
    <Button variant='primary' action={handleSubmit} loading={isLoading}>
      {edit ? 'Ubah' : 'Simpan'}
    </Button>
  </Form>
  );
}