import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';

import api from '~/services/api';

import Spinner from '~/components/Spinner';
import Button from '~/components/Button';

import { Container, Header, Meetup, Text } from './styles';
import history from '~/services/history';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      try {
        setLoading(true);

        const response = await api.get('hosts');

        const data = response.data.map(meetup => {
          return {
            ...meetup,
            formattedDate: format(parseISO(meetup.date), 'EEE, MMM d, h:mm a'),
          };
        });

        setMeetups(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        const { data } = err.response || false;

        toast.error(
          data && data.error
            ? data.error
            : 'There was an error loading your meetups. Try again later.'
        );
      }
    }

    loadMeetups();
  }, []);

  function handleCreate() {
    history.push('/create');
  }

  return !loading ? (
    <Container>
      <Header>
        <h1>My meetups</h1>
        <Button type="button" onClick={handleCreate}>
          <MdAddCircleOutline size={20} />
          New meetup
        </Button>
      </Header>
      {meetups.length ? (
        <ul>
          {meetups.map(meetup => (
            <Meetup key={meetup.id}>
              <Link to={`/meetup/${meetup.id}`}>
                <strong>{meetup.title}</strong>
                <div>
                  <span>{meetup.formattedDate}</span>
                  <MdKeyboardArrowRight size={24} color="#fff" />
                </div>
              </Link>
            </Meetup>
          ))}
        </ul>
      ) : (
        <Text>You don&apos;t have meetups yet.</Text>
      )}
    </Container>
  ) : (
    <Spinner />
  );
}
