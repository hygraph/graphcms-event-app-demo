import React, { Component } from 'react';

export default class Map extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (this.storedNode) {
      this.createGMaps();
    }
  }

  // Use refs to create Google Maps
  createGMaps() {
    const gmap = new google.maps.Map(this.storedNode, {
      zoom: 4,
      center: this.props.event.location
    });

    new google.maps.Marker({
      position: this.props.event.location,
      map: gmap
    });
  }

  render() {
    return (
      <div className="responsive-map">
        <div className="map" ref={domNode => (this.storedNode = domNode)} />
      </div>
    );
  }
}
