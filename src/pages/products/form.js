import React from 'react';
import { Figure, Form } from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';

export default function SpeakersForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={'Masukan nama meja'}
        label={'Nama'}
        name='name'
        value={form.name}
        type='text'
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={'Masukan harga per meja'}
        label={'Price'}
        name='price'
        value={form.price}
        type='text'
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={'Masukan Gambar'}
        label={'Avatar'}
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

            <Figure.Caption>Perview image gambar</Figure.Caption>
          </Figure>
        </div>
      )}
      <Button variant='primary' action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </Button>
    </Form>
  );
}