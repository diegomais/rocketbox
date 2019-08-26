import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import Spinner from '~/components/Spinner';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('hosts');

      const data = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(
            parseISO(meetup.date),
            "d MMMM yyyy 'at' HH:mm"
          ),
        };
      });

      setMeetups(data);
      setLoading(false);
    }

    loadMeetups();
  }, []);

  return !loading ? (
    <Container>
      <header>
        <h1>My meetups</h1>
        <Link to="/create">Create new meetup</Link>
      </header>
      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id}>
            <Link to={`/meetup/${meetup.id}`}>
              <strong>{meetup.title}</strong>
              <span>{meetup.formattedDate}</span>
            </Link>
          </Meetup>
        ))}
      </ul>
    </Container>
  ) : (
    <Spinner />
  );
}
