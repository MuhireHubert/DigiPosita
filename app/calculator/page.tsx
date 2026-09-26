"use client";

import { useState } from "react";

const SIZE_MULTIPLIER: Record<string, number> = { small: 1, medium: 1.4, large: 2.1 };
const ZONE_BASE: Record<string, number> = { kigali: 1200, province: 2600, eac: 6500 };

export default function CalculatorPage() {
  const [weight, setWeight] = useState(2);
  const [size, setSize] = useState("medium");
  const [zone, setZone] = useState("province");
  const [fee, setFee] = useState<number | null>(null);

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    const raw = (ZONE_BASE[zone] + weight * 350) * SIZE_MULTIPLIER[size];
    setFee(Math.round(raw / 10) * 10);
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-2xl font-semibold">Delivery fee calculator</h1>
      <form onSubmit={calculate} className="mt-8 space-y-4">
        <label className="block text-sm text-inkSoft">
          Weight (kg)
          <input type="number" min="0.1" step="0.1" className="input mt-1" value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} />
        </label>
        <label className="block text-sm text-inkSoft">
          Package size
          <select className="input mt-1" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="small">Small (envelope / documents)</option>
            <option value="medium">Medium (parcel)</option>
            <option value="large">Large (box)</option>
          </select>
        </label>
        <label className="block text-sm text-inkSoft">
          Destination
          <select className="input mt-1" value={zone} onChange={(e) => setZone(e.target.value)}>
            <option value="kigali">Within Kigali</option>
            <option value="province">Another province</option>
            <option value="eac">Cross-border (EAC)</option>
          </select>
        </label>
        <button type="submit" className="rounded bg-ink px-5 py-2.5 text-white hover:bg-green">
          Calculate fee
        </button>
      </form>
      {fee !== null && (
        <div className="mt-6 border-l-2 border-goldDeep bg-paper2 p-4 text-sm">
          Estimated fee: <span className="font-semibold">RWF {fee.toLocaleString("en-US")}</span>
        </div>
      )}
    </main>
  );
}
