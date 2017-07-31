import React, { Component } from 'react';
import { client } from '../apolloClient';
import gql from 'graphql-tag';

import Map from './Map';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    // Fetch GraphQL data and set to this.state.events
    client
      .query({
        query: gql`
          query EventApp {
            allEvents {
              id
              title
              description
              location
              images {
                id
                url
              }
            }
          }
        `
      })
      .then(res => {
        this.setState({
          events: res.data.allEvents
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    // Loop through each event, constructing the markup
    const eventList = this.state.events.map(event => {
      return (
        <div className="event" key={event.id}>
          <h2 className="title">
            {event.title}
          </h2>

          <div dangerouslySetInnerHTML={{ __html: event.description }} />

          <Map event={event} />

          {event.images.length > 0 &&
            <div className="gallery">
              {event.images.map(image =>
                <a
                  key={image.id}
                  href={image.url}
                  target="_blank"
                  className="image"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
              )}
            </div>}
        </div>
      );
    });

    // Render those puppies
    return (
      <div className="events">
        {eventList}
      </div>
    );
  }
}
