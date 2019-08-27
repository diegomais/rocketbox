import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { MdEdit, MdDeleteForever, MdEvent, MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';

import api from '~/services/api';
import history from '~/services/history';

import Spinner from '~/components/Spinner';
import Button from '~/components/Button';

import { Container, Header, Banner, Text, Footer } from './styles';

function Meetup({ match }) {
  const [loading, setLoading] = useState(true);
  const [meetup, setMeetup] = useState(null);

  const { id } = match.params;

  useEffect(() => {
    async function loadMeetup() {
      try {
        setLoading(true);

        const response = await api.get(`hosts/${id}`);

        setMeetup({
          ...response.data,
          formattedDate: format(
            parseISO(response.data.date),
            'EEE, MMM	d, h:mm a'
          ),
        });

        setLoading(false);
      } catch (err) {
        toast.error('There was an error loading your meetup. Try again later.');
      }
    }

    loadMeetup();
  }, [id]);

  function handleEdit() {
    history.push(`/edit/${id}`);
  }

  async function handleCancel() {
    try {
      await api.delete(`meetups/${id}`);

      toast.success('Meetup canceled successfully!');

      history.push('/dashboard');
    } catch (err) {
      toast.error('There was an error canceling yor meetup. Try again later.');
    }
  }

  return !loading ? (
    <Container>
      <Header>
        <h1>{meetup.title}</h1>
        {!meetup.past && (
          <div>
            <Button primary type="button" onClick={handleEdit}>
              <MdEdit size={20} />
              Edit
            </Button>
            <Button type="button" onClick={handleCancel}>
              <MdDeleteForever size={20} />
              Cancel
            </Button>
          </div>
        )}
      </Header>
      <Banner src={meetup.banner.url} alt="meetup.title" />
      <Text>{meetup.description}</Text>
      <Footer>
        <div>
          <MdEvent size={20} />
          {meetup.formattedDate}
        </div>
        <div>
          <MdLocationOn size={20} />
          {meetup.location}
        </div>
      </Footer>
    </Container>
  ) : (
    <Spinner />
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Meetup;
