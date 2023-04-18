// Dependencies
import React, { useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

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

export default function App() {
    const fgMap = useRef(null);
    const fgMapContainer = useRef(null);
    const bgMap = useRef(null);
    const bgMapContainer = useRef(null);
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    });

    const mapADiv = document.getElementById("mapA");
    const ruler = document.getElementById("ruler");

    let settings = {
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

    let dataLayers = [
        {
            id: 1,
            key: "IEP",
        },
        {
            id: 2,
            key: "military",
        },
    ];

    mapboxgl.accessToken = settings.accessToken;

    useEffect(() => {
        if (fgMap.current && bgMap.current) return;

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
            ...settings.camera,
        });

        fgMap.current.on("move", function () {
            bgMap.current.setCenter(flipCoords(fgMap.current.getCenter()));
        });

        fgMap.current.on("zoom", function () {
            let curZoom = fgMap.current.getZoom();
            matchZoom(curZoom);
        });

        fgMap.current.on("load", () => {
            matchZoom(fgMap.current.getZoom());
            console.log(fgMap.current.getStyle());
            bgMap.current.setCenter(flipCoords(fgMap.current.getCenter()));
        });

        fgMap.current.on("mouseenter", "places", (e) => {
            // Change the cursor style as a UI indicator.
            fgMap.getCanvas().style.cursor = "pointer";

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(fgMap);
        });

        fgMap.current.on("mouseleave", "places", () => {
            fgMap.getCanvas().style.cursor = "";
            popup.remove();
        });
    });

    function flipCoords(lnglat) {
        let lat = -lnglat.lat;
        let lng = lnglat.lng + 180;
        return new mapboxgl.LngLat(lng, lat);
    }

    function matchZoom(zoom) {
        bgMap.current.setZoom(zoom);
    }

    function toggleCaptureGuide() {
        settings.ShowRuler ? ruler.classList.add("hidden") : ruler.classList.remove("hidden");
        settings.ShowRuler = !settings.ShowRuler;
    }

    function toggleProjection() {
        if (settings.is3D) {
            fgMap.current.setProjection({
                name: settings.projection.view2D,
            });
            mapADiv.style.opacity = 1;
        } else {
            fgMap.current.setProjection({
                name: settings.projection.view3D,
            });
            fgMap.current.style.opacity = 0.9;
        }

        settings.is3D = !settings.is3D;
    }

    function toggleCamera() {
        const target = settings.camera.isAtStart ? settings.camera.end : settings.camera.start;
        settings.camera.isAtStart = !settings.camera.isAtStart;

        fgMap.current.flyTo({
            ...target,
            duration: 7000,
            essential: true,
        });
    }

    // function toggleUI() {
    //     settings.showToolbar ? toolbar.classList.add("hidden") : toolbar.classList.remove("hidden");
    //     settings.showToolbar = !settings.showToolbar;
    // }

    // function loadShorcuts() {
    //     document.addEventListener("keypress", (event) => {
    //         let code = event.code;
    //         if (code === "KeyK") toggleCamera();
    //         if (code === "KeyJ") toggleUI();
    //     });
    // }

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
