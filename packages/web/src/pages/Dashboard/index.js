import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
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
    }

    loadMeetups();
  }, []);

  return (
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
  );
}
