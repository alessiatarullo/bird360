import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import pigeon from "./pigeon.png";

export default function Map() {
  useEffect(() => {
    const map = L.map("map").setView([42.5, 12.5], 5);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    const markers = L.markerClusterGroup();
    const birdIcon = L.icon({ iconUrl: pigeon, iconSize: [30, 30] });
    const opts = {
      method: "GET",
      headers: { "X-eBirdApiToken": "l4qdn11lb4sd" },
    };

    const regions = [
      "IT-21", // Piemonte
      "IT-23", // Valle d'Aosta
      "IT-25", // Lombardia
      "IT-32", // Trentino-Alto Adige
      "IT-34", // Veneto
      "IT-36", // Friuli-Venezia Giulia
      "IT-42", // Liguria
      "IT-45", // Emilia-Romagna
      "IT-52", // Toscana
      "IT-55", // Umbria
      "IT-57", // Marche
      "IT-62", // Lazio
      "IT-65", // Abruzzo
      "IT-67", // Molise
      "IT-72", // Campania
      "IT-75", // Puglia
      "IT-77", // Basilicata
      "IT-78", // Calabria
      "IT-82", // Sicilia
      "IT-88", // Sardegna
    ];

    regions.forEach(reg => {                 
      fetch(`https://api.ebird.org/v2/data/obs/${reg}/recent`, opts)
        .then(r => r.json())
        .then(result => {
          console.log("showResult:", result);
          result.forEach(item => {
            if (!item.lat || !item.lng) return;
            const popupHtml = `<b>${item.comName}</b><br>Data: ${item.obsDt}`;
            L.marker([item.lat, item.lng], { icon: birdIcon })
              .bindPopup(popupHtml)
              .addTo(markers);
          });                             // ← Chiude result.forEach
          map.addLayer(markers);
        })
        .catch(err => console.error("eBird fetch error:", err));
    });                                    // ← Chiude regions.forEach

    return () => map.remove();
  }, []);

  return <div id="map" style={{ height: "400px" }} />;
}