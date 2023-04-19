// Dependencies
import React, { useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useSyncMap } from "./hooks/useSyncMap";

// Styles
import "./styles/style.scss";

// Components
import Button from "./components/Button";
import PageHeader from "./components/PageHeader";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import FilterWidget, { SidebarItem } from "./components/FilterWidget";
import IcoEye from "./assets/IcoEye";
import IcoTimeLine from "./assets/IcoTimeline";
import IcoGlobe from "./assets/IcoGlobe";
import IcoPlus from "./assets/IcoPlus";
import IcoArrowDown from "./assets/IcoArrowDown";

const settings = {
    mapStyle: "mapbox://styles/kenzilian13/clc00vjyb000214p39wvteqj3/draft",
    accessToken: "pk.eyJ1Ijoia2VuemlsaWFuMTMiLCJhIjoiY2wwODBna2FhMDBiaTNkb2Ixb2g5bWJ1dyJ9.kk1S4Fgd5GWc-yASL0eoJg",
    projection: {
        view2D: "mercator",
        view3D: "globe",
    },
    is3D: true,
    showData: true,
    showToolbar: true,
    ShowRuler: false,
    camera: {
        isAtStart: true,
        start: {
            center: [-94.010448, 37.577386],
            zoom: 4.5,
            pitch: 2.5,
            bearing: 0,
        },
        end: {
            center: [133.395314, 39.291774],
            zoom: 3,
            bearing: 0,
            pitch: 0,
        },
    },
};

const dataLayers = [
    {
        id: 1,
        key: "IEP",
    },
    {
        id: 2,
        key: "military",
    },
];

export default function App() {
    const fgMap = useRef(null);
    const fgMapContainer = useRef(null);
    const bgMap = useRef(null);
    const bgMapContainer = useRef(null);
    mapboxgl.accessToken = settings.accessToken;

    const toggleCamera = () => {
        const target = settings.camera.isAtStart ? settings.camera.end : settings.camera.start;
        settings.camera.isAtStart = !settings.camera.isAtStart;

        fgMap.current.flyTo({
            ...target,
            duration: 7000,
            essential: true,
        });
    }

    useEffect(() => {
        fgMap.current = new mapboxgl.Map({
            container: fgMapContainer.current,
            projection: settings.projection.view3D,
            style: settings.mapStyle,
            ...settings.camera.start,
        });

        bgMap.current = new mapboxgl.Map({
            container: bgMapContainer.current,
            projection: settings.projection.view3D,
            style: settings.mapStyle,
            ...settings.camera.start,
        });

        const handleClickFgMap = (e) => {
            let cord = null;
            let locTitle = null;
            let locLocation = null;
            let locURL = null;
            const features = fgMap.current.queryRenderedFeatures(e.point, {
                layers: ["IEP", "military"],
            });
            if (!features.length) return;
            const feature = features[0];

            if (feature.layer.id === "military") {
                cord = JSON.parse(feature.properties.geo_point_2d).reverse();
                locTitle = feature.properties.site_name;
                locLocation = feature.properties.state_terr;
                locURL = feature.properties.oper_stat;
            } else {
                cord = feature.geometry.coordinates;
                locTitle = feature.properties.ixpname;
                locLocation = feature.properties.city;
                locURL = feature.properties.url ? feature.properties.url : "N/A";
            }

            console.log(feature);
            console.log(cord);

            const popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(cord)
                .setHTML(
                    `<h3 class="title">${locTitle}</h3>
                    <p class="address">${locLocation}</p>
                    <p class="address">${locURL}</p>`
                )
                .addTo(fgMap.current);
        }

        fgMap.current.on("click", handleClickFgMap);

        return () => fgMap.current.off("click", handleClickFgMap);
    }, [settings]);

    useSyncMap(fgMap, bgMap);

    return (
        <div className="layout">
            <Header />
            <TabBar />
            <PageHeader>
                <Button leadingIcon={<IcoEye />} value="Switch Camera" onClick={toggleCamera} />
                <Button leadingIcon={<IcoEye />} value="View Playbook" />
                <Button leadingIcon={<IcoTimeLine />} value="View Timeline" />
                <Button leadingIcon={<IcoPlus />} value="Create Plan" />
                <Button leadingIcon={<IcoGlobe />} traillingIcon={<IcoArrowDown />} value="Communicate" />
            </PageHeader>
            <main className="main">
                <FilterWidget>
                    {dataLayers.map((item) => {
                        return (
                            <SidebarItem
                                id={item.key}
                                key={item.key}
                                label={item.key}
                                onClick={(e) => {
                                    fgMap.current.setLayoutProperty(`${item.key}`, "visibility", e.target.checked ? "visible" : "none");
                                    bgMap.current.setLayoutProperty(`${item.key}`, "visibility", e.target.checked ? "visible" : "none");
                                }}
                                checked={"true"}
                            />
                        );
                    })}
                </FilterWidget>
                <div id="mapA" ref={fgMapContainer} />
                <div id="mapB" ref={bgMapContainer} />
            </main>
        </div>
    );
}
