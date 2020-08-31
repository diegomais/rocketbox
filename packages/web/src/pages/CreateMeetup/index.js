import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';
import Button from '~/components/Button';
import Spinner from '~/components/Spinner';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  description: Yup.string().required('Description is required.'),
  date: Yup.date().required('Date is required.'),
  location: Yup.string().required('Location is required.'),
  file_id: Yup.string().required('Image is required.'),
});

export default function CreateMeetup() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(payload) {
    try {
      setLoading(true);

      const response = await api.post('meetups', payload);

      toast.success('Meetup created successfully!');

      setLoading(false);

      history.push(`/meetup/${response.data.id}`);
    } catch (err) {
      setLoading(false);

      const { data } = err.response || false;

      toast.error(
        data && data.error
          ? data.error
          : 'There was an error creating your meetup. Try again later.'
      );

      history.push('/');
    }
  }

  return !loading ? (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="file_id" />

        <Input name="title" placeholder="Meetup title" />
        <Input multiline name="description" placeholder="Description" />
        <DatePicker name="date" placeholder="Date of meetup" />
        <Input name="location" placeholder="Location of meetup" />
        <Button type="submit">
          <MdAddCircleOutline size={20} />
          Save meetup
        </Button>
      </Form>
    </Container>
  ) : (
    <Spinner />
  );
}
