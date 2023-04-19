import { useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

export function useSyncMap(master, clones) {
    useEffect(() => {
        const flipCoords = (lnglat) => {
            let lat = -lnglat.lat;
            let lng = lnglat.lng + 180;
            return new mapboxgl.LngLat(lng, lat);
        }
    
        const matchZoom = (zoom) => {
            clones.current.setZoom(zoom);
        }

        const handleMove = () => {
            clones.current.setCenter(flipCoords(master.current.getCenter()));
        }

        const handleZoom = () => {
            let curZoom = master.current.getZoom();
            matchZoom(curZoom);
        }
        
        const handleLoad = () => {
            matchZoom(master.current.getZoom());
            clones.current.setCenter(flipCoords(master.current.getCenter()));
        }

        master.current?.on("move", handleMove);
        master.current?.on("zoom", handleZoom);
        master.current?.on("load", handleLoad);

        return () => {
            master.current?.off("move", handleMove);
            master.current?.off("zoom", handleZoom);
            master.current?.off("load", handleLoad);
        }
    }, [master, clones]);
}
