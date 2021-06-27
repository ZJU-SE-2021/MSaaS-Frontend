import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Polygon, GeoJSON, Tooltip } from 'react-leaflet';
import geo from '../data/world.geo.json/countries.geo.json';

export default function Map({ layers }) {
    function parseGeoJson(geometry) {
        const handleCoords = (polygon) => [polygon[0].map(coord => [coord[1], coord[0]])];
        switch (geometry.type) {
            case "Polygon":
                return handleCoords(geometry.coordinates);
            case "MultiPolygon":
                return geometry.coordinates.map(coord => handleCoords(coord));
            default:
                throw new Error(`Unsupported type: ${geometry.type}`)
        }
    }

    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%' }}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>

                {
                    layers.map(
                        layer => (
                            <LayersControl.Overlay checked={layer.checked} key={layer.name} name={layer.name}>
                                <FeatureGroup>
                                    {
                                        geo.features.map(
                                            feature => (
                                                <Polygon key={feature.properties.name} pathOptions={layer.polygonStyle(feature)} positions={parseGeoJson(feature.geometry)}>
                                                    {layer.polygonChild && layer.polygonChild(feature)}
                                                </Polygon>
                                            )
                                        )
                                    }
                                </FeatureGroup>

                            </LayersControl.Overlay>
                        )
                    )
                }

            </LayersControl>
        </MapContainer>
    );
}
