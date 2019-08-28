import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import { MdAddCircleOutline } from 'react-icons/md';
import PropTypes from 'prop-types';

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

function EditMeetup({ match }) {
  const [loading, setLoading] = useState(false);
  const [meetup, setMeetup] = useState(null);

  const { id } = match.params;

  useEffect(() => {
    async function loadMeetup() {
      try {
        setLoading(true);

        const response = await api.get(`hosts/${id}`);

        setMeetup({
          ...response.data,
          date: parseISO(response.data.date),
        });

        setLoading(false);
      } catch (err) {
        toast.error('There was an error loading your meetup. Try again later.');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      setLoading(true);

      const response = await api.put(`meetups/${id}`, data);

      toast.success('Meetup edited successfully!');

      setLoading(false);

      history.push(`/meetup/${response.data.id}`);
    } catch (err) {
      setLoading(false);
      toast.error('There was an error editing your meetup. Try again later.');
    }
  }

  return !loading ? (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
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

EditMeetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EditMeetup;
