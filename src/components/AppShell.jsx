import React from "react";
import { Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <main className="page-frame">
      <section className="phone-screen" aria-label="PopX mobile interface">
        <Outlet />
      </section>
    </main>
  );
}
