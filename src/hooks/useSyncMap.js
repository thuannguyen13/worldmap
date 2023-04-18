import { useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

export function useSyncMap(master, clones) {
    useEffect(() => {
        master.current.on("move", function () {
            clones.current.setCenter(flipCoords(master.current.getCenter()));
        });

        master.current.on("zoom", function () {
            let curZoom = master.current.getZoom();
            matchZoom(curZoom);
        });

        master.current.on("load", () => {
            matchZoom(master.current.getZoom());
            clones.current.setCenter(flipCoords(master.current.getCenter()));
        });

        console.log("text");
    });

    function flipCoords(lnglat) {
        let lat = -lnglat.lat;
        let lng = lnglat.lng + 180;
        return new mapboxgl.LngLat(lng, lat);
    }

    function matchZoom(zoom) {
        clones.current.setZoom(zoom);
    }
}
