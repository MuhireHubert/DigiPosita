"use client";
import { useState } from "react";
export interface SavedLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  capturedAt: number;
}
export default function LocationCapture({
  label,
  value,
  onChange,
}: {
  label: string;
  value: SavedLocation | null;
  onChange: (value: SavedLocation | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  function locate() {
    setError("");
    if (!navigator.geolocation) {
      setError(
        "Location is unavailable in this browser. Type your address and directions instead.",
      );
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        onChange({
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
          accuracy: p.coords.accuracy,
          capturedAt: Date.now(),
        });
        setBusy(false);
      },
      (e) => {
        setBusy(false);
        setError(
          e.code === 1
            ? "Location permission was declined. You can still type your address and directions."
            : "Could not locate you. Try again outdoors or type your address and directions.",
        );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
  }
  return (
    <fieldset className="rounded-xl border border-green/20 bg-green/5 p-4">
      <legend className="px-1 text-sm font-semibold">
        {label} pin (optional)
      </legend>
      <p className="mb-3 text-xs leading-relaxed text-inkSoft">
        Use your current position only if you are at this location. With your
        permission, this one-time pin will be saved when you submit and shared
        with authorized IPOSITA staff for this booking. No background tracking.
      </p>
      <button
        type="button"
        className="button secondary"
        disabled={busy}
        onClick={locate}
      >
        {busy
          ? "Finding location…"
          : value
            ? "Update current-location pin"
            : "Use my current location"}
      </button>
      {value && (
        <div className="mt-3 text-sm">
          <p>
            {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
          </p>
          <p className="text-xs text-inkSoft">
            Reported accuracy: ±{Math.round(value.accuracy)} m. Check your
            directions if the pin is approximate.
          </p>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="mt-2 text-sm text-stamp"
          >
            Remove pin
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-stamp">
          {error}
        </p>
      )}
    </fieldset>
  );
}
export function LocationDetails({
  label,
  location,
  directions,
}: {
  label: string;
  location?: SavedLocation;
  directions?: string;
}) {
  return (
    <div className="mt-3 text-sm">
      {directions && (
        <p>
          <strong>{label} directions:</strong> {directions}
        </p>
      )}
      {location && (
        <p className="mt-1">
          <strong>{label} pin:</strong> {location.latitude.toFixed(6)},{" "}
          {location.longitude.toFixed(6)} (±{Math.round(location.accuracy)} m){" "}
          <a
            className="font-semibold text-green underline"
            href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps ↗
          </a>
        </p>
      )}
    </div>
  );
}
