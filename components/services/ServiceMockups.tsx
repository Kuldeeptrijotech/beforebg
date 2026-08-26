import React from "react";

/**
 * 01. SAP Consulting Mockup (Transformation Roadmap)
 */
export function ConsultingMockup() {
  return (
    <div className="relative w-full max-w-[560px] p-2 sm:p-4" data-mock="consulting">
      {/* Glow Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 sm:inset-6 rounded-3xl bg-[radial-gradient(60%_60%_at_70%_30%,rgba(0,143,211,0.25),transparent_70%),radial-gradient(50%_50%_at_20%_80%,rgba(139,124,246,0.22),transparent_70%)] blur-2xl opacity-90"
      />

      {/* Main Glass Console Card */}
      <div className="relative flex flex-col gap-3.5 sm:gap-4 rounded-2xl border border-white/20 bg-gradient-to-br from-[#111C2E] to-[#0A1220] p-4 sm:p-5 shadow-[0_36px_70px_-24px_rgba(4,10,22,0.6)] backdrop-blur-md">
        {/* Header Bar */}
        <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 sm:pb-3.5">
          <span className="h-2 w-2 rounded-full bg-[#008fd3]" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span
            className="ml-2 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            TRANSFORMATION ROADMAP
          </span>
        </div>

        {/* 2-Column KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#008fd3]/40 bg-[#008fd3]/[0.12] p-3.5 sm:p-4">
            <div
              className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.12em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              ROI UPLIFT
            </div>
            <div
              className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              4.4x
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/[0.06] p-3.5 sm:p-4">
            <div
              className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.12em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              FORECAST ACCURACY
            </div>
            <div
              className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              99.4%
            </div>
          </div>
        </div>

        {/* Status Rows */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 sm:py-3">
            <span className="h-5 w-5 shrink-0 rounded-md border border-[#008fd3]/50 bg-[#008fd3]/30" />
            <span
              className="flex-1 text-xs sm:text-[13.5px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Discovery &amp; strategy
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              DONE
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 sm:py-3">
            <span className="h-5 w-5 shrink-0 rounded-md border border-[#8B7CF6]/50 bg-[#8B7CF6]/30" />
            <span
              className="flex-1 text-xs sm:text-[13.5px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Blueprint &amp; architecture
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 sm:py-3">
            <span className="h-5 w-5 shrink-0 rounded-md border border-white/20 bg-white/10" />
            <span
              className="flex-1 text-xs sm:text-[13.5px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Rollout &amp; optimization
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Q3
            </span>
          </div>
        </div>

        {/* Growth Bar Chart in Elegant Blue Spectrum */}
        <div className="flex h-12 sm:h-14 items-end gap-1.5 pt-1">
          <span className="h-[34%] flex-1 rounded-t bg-white/20" />
          <span className="h-[48%] flex-1 rounded-t bg-white/30" />
          <span className="h-[42%] flex-1 rounded-t bg-white/25" />
          <span className="h-[66%] flex-1 rounded-t bg-[#8B7CF6]/60" />
          <span className="h-[78%] flex-1 rounded-t bg-[#38bdf8]/65" />
          <span className="h-[100%] flex-1 rounded-t bg-[#008fd3]" />
        </div>
      </div>
    </div>
  );
}

/**
 * 02. SAP Support & AMS Mockup (AMS Operations Console)
 */
export function SupportMockup() {
  return (
    <div className="relative w-full max-w-[560px] p-2 sm:p-4" data-mock="support">
      {/* Glow Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 sm:inset-6 rounded-3xl bg-[radial-gradient(60%_60%_at_30%_30%,rgba(0,143,211,0.25),transparent_70%)] blur-2xl opacity-90"
      />

      {/* Main Glass Console Card */}
      <div className="relative flex flex-col gap-3.5 sm:gap-4 rounded-2xl border border-white/20 bg-gradient-to-br from-[#0F1A2B] to-[#0B1421] p-4 sm:p-5 shadow-[0_36px_70px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md">
        {/* Header Bar */}
        <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 sm:pb-3.5">
          <span className="h-2 w-2 rounded-full bg-[#008fd3]" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span
            className="ml-2 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            AMS OPERATIONS CONSOLE
          </span>
        </div>

        {/* Availability Banner */}
        <div className="rounded-xl border border-[#008fd3]/40 bg-[#008fd3]/[0.12] p-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div
                className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.12em] text-white"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                LANDSCAPE AVAILABILITY
              </div>
              <div
                className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                99.99%
              </div>
            </div>
            <div className="text-right">
              <div
                className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.12em] text-white"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                COVERAGE
              </div>
              <div
                className="mt-2 text-xl sm:text-2xl font-bold text-white"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                24/7/365
              </div>
            </div>
          </div>
          {/* Progress Bar in Sapphire Blue to Sky Blue */}
          <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <span className="block h-full w-[97%] rounded-full bg-gradient-to-r from-[#008fd3] to-[#38bdf8]" />
          </div>
        </div>

        {/* 2-Column Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/20 bg-white/[0.06] p-3.5">
            <div
              className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.12em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              FIRST RESPONSE
            </div>
            <div
              className="mt-2 text-xl sm:text-2xl font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              &lt;15 min
            </div>
          </div>

          <div className="rounded-xl border border-[#8B7CF6]/40 bg-[#8B7CF6]/15 p-3.5">
            <div
              className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.12em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              SUPPORT TIERS
            </div>
            <div
              className="mt-2 text-xl sm:text-2xl font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              L1 – L3
            </div>
          </div>
        </div>

        {/* Status Rows */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 sm:py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#008fd3]" />
            <span
              className="flex-1 text-xs sm:text-[13.5px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Incident queue
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              04 open
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 sm:py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B7CF6]" />
            <span
              className="flex-1 text-xs sm:text-[13.5px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Release &amp; upgrade window
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Sat 02:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 03. SAP BTP Full Stack Mockup (BTP Application Workspace)
 */
export function BTPMockup() {
  return (
    <div className="relative w-full max-w-[560px] p-2 sm:p-4" data-mock="btp">
      {/* Glow Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 sm:inset-6 rounded-3xl bg-[radial-gradient(60%_60%_at_70%_25%,rgba(139,124,246,0.30),transparent_70%)] blur-2xl opacity-90"
      />

      {/* Main Glass Console Card */}
      <div className="relative flex flex-col gap-3.5 sm:gap-4 rounded-2xl border border-white/20 bg-gradient-to-br from-[#141428] to-[#0B0F1E] p-4 sm:p-5 shadow-[0_36px_70px_-24px_rgba(4,10,22,0.6)] backdrop-blur-md">
        {/* Header Bar */}
        <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 sm:pb-3.5">
          <span className="h-2 w-2 rounded-full bg-[#8B7CF6]" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span
            className="ml-2 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            BTP APPLICATION WORKSPACE
          </span>
        </div>

        {/* Stack Layers */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-lg border border-[#8B7CF6]/40 bg-[#8B7CF6]/[0.16] px-3.5 py-2.5 sm:py-3">
            <span className="h-5 w-5 shrink-0 rounded-md border border-[#8B7CF6]/40 bg-[#8B7CF6]/40" />
            <span
              className="flex-1 text-xs sm:text-[13.5px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Fiori launchpad app
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              LIVE
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 sm:py-3">
            <span className="h-5 w-5 shrink-0 rounded-md border border-[#38BDF8]/40 bg-[#38BDF8]/30" />
            <span
              className="flex-1 text-xs sm:text-[13.5px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              CAP service layer
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              v2.4
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5 sm:py-3">
            <span className="h-5 w-5 shrink-0 rounded-md border border-[#008fd3]/40 bg-[#008fd3]/30" />
            <span
              className="flex-1 text-xs sm:text-[13.5px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Workflow extension
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              PASSING
            </span>
          </div>
        </div>

        {/* 2-Column Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/20 bg-white/[0.06] p-3.5 sm:p-4">
            <div
              className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.12em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              BUILD SUCCESS
            </div>
            <div
              className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              100%
            </div>
          </div>

          <div className="rounded-xl border border-[#8B7CF6]/40 bg-[#8B7CF6]/[0.15] p-3.5 sm:p-4">
            <div
              className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.12em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              TIME TO SHIP
            </div>
            <div
              className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              3x
            </div>
          </div>
        </div>

        {/* Deploy Progress */}
        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] p-3 sm:p-3.5">
          <span
            className="font-mono text-[9.5px] font-bold tracking-[0.12em] text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            DEPLOY
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
            <span className="block h-full w-[82%] rounded-full bg-gradient-to-r from-[#8B7CF6] to-[#008fd3]" />
          </div>
          <span
            className="font-mono text-[11px] font-bold text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            82%
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 04. SAP Data Integration Mockup (Integration Monitor)
 */
export function IntegrationMockup() {
  return (
    <div className="relative w-full max-w-[560px] p-2 sm:p-4" data-mock="integration">
      {/* Glow Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 sm:inset-6 rounded-3xl bg-[radial-gradient(60%_60%_at_40%_30%,rgba(56,189,248,0.24),transparent_70%),radial-gradient(50%_50%_at_80%_80%,rgba(0,143,211,0.22),transparent_70%)] blur-2xl opacity-90"
      />

      {/* Main Glass Console Card */}
      <div className="relative flex flex-col gap-3.5 sm:gap-4 rounded-2xl border border-white/20 bg-gradient-to-br from-[#0E1A2C] to-[#0A1220] p-4 sm:p-5 shadow-[0_36px_70px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md">
        {/* Header Bar */}
        <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 sm:pb-3.5">
          <span className="h-2 w-2 rounded-full bg-[#38BDF8]" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span
            className="ml-2 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            INTEGRATION MONITOR
          </span>
        </div>

        {/* Integration Pipeline Flow */}
        <div className="flex items-stretch gap-2 sm:gap-2.5">
          <div className="flex-1 rounded-xl border border-white/20 bg-white/[0.06] p-3">
            <div
              className="font-mono text-[9px] font-bold tracking-[0.1em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              SOURCE
            </div>
            <div
              className="mt-1.5 text-xs sm:text-[13px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              SAP S/4HANA
            </div>
          </div>
          <div
            className="flex w-6 sm:w-8 items-center justify-center font-mono font-extrabold text-[#38BDF8]"
            style={{ color: "#38BDF8", WebkitTextFillColor: "#38BDF8" }}
          >
            →
          </div>
          <div className="flex-1 rounded-xl border border-[#38BDF8]/40 bg-[#38BDF8]/15 p-3">
            <div
              className="font-mono text-[9px] font-bold tracking-[0.1em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              MIDDLEWARE
            </div>
            <div
              className="mt-1.5 text-xs sm:text-[13px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Cloud Integration
            </div>
          </div>
          <div
            className="flex w-6 sm:w-8 items-center justify-center font-mono font-extrabold text-[#38BDF8]"
            style={{ color: "#38BDF8", WebkitTextFillColor: "#38BDF8" }}
          >
            →
          </div>
          <div className="flex-1 rounded-xl border border-white/20 bg-white/[0.06] p-3">
            <div
              className="font-mono text-[9px] font-bold tracking-[0.1em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              TARGET
            </div>
            <div
              className="mt-1.5 text-xs sm:text-[13px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Non-SAP APIs
            </div>
          </div>
        </div>

        {/* 3-Column Metrics */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-xl border border-[#008fd3]/40 bg-[#008fd3]/[0.12] p-3 sm:p-3.5">
            <div
              className="font-mono text-[9.5px] font-bold tracking-[0.1em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              LATENCY
            </div>
            <div
              className="mt-1.5 text-lg sm:text-2xl font-extrabold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              &lt;100ms
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/[0.06] p-3 sm:p-3.5">
            <div
              className="font-mono text-[9.5px] font-bold tracking-[0.1em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              MSGS/DAY
            </div>
            <div
              className="mt-1.5 text-lg sm:text-2xl font-extrabold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              2.4M
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/[0.06] p-3 sm:p-3.5">
            <div
              className="font-mono text-[9.5px] font-bold tracking-[0.1em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              DELIVERY
            </div>
            <div
              className="mt-1.5 text-lg sm:text-2xl font-extrabold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              100%
            </div>
          </div>
        </div>

        {/* Channel Status */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2">
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              IDOC
            </span>
            <span
              className="flex-1 text-xs font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Order replication
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              OK
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2">
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              REST
            </span>
            <span
              className="flex-1 text-xs font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Partner API gateway
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              OK
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2">
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              EVENT
            </span>
            <span
              className="flex-1 text-xs font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Real-time stream
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              SYNCING
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 05. SAP AI & Data Insight Mockup (Insight Cockpit)
 */
export function AIMockup() {
  return (
    <div className="relative w-full max-w-[560px] p-2 sm:p-4" data-mock="ai">
      {/* Glow Backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 sm:inset-6 rounded-3xl bg-[radial-gradient(55%_55%_at_70%_30%,rgba(0,143,211,0.25),transparent_70%),radial-gradient(50%_50%_at_25%_85%,rgba(139,124,246,0.22),transparent_70%)] blur-2xl opacity-90"
      />

      {/* Main Glass Console Card */}
      <div className="relative flex flex-col gap-3.5 sm:gap-4 rounded-2xl border border-white/20 bg-gradient-to-br from-[#101B2C] to-[#0A1120] p-4 sm:p-5 shadow-[0_36px_70px_-24px_rgba(4,10,22,0.6)] backdrop-blur-md">
        {/* Header Bar */}
        <div className="flex items-center gap-2.5 border-b border-white/15 pb-3 sm:pb-3.5">
          <span className="h-2 w-2 rounded-full bg-[#008fd3]" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span
            className="ml-2 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white"
            style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
          >
            INSIGHT COCKPIT
          </span>
        </div>

        {/* Analytics & KPI Split Grid */}
        <div className="flex items-stretch gap-3">
          {/* Revenue Chart Card */}
          <div className="flex-[1.15] rounded-xl border border-white/20 bg-white/[0.06] p-3.5 sm:p-4">
            <div
              className="font-mono text-[9px] sm:text-[9.5px] font-bold tracking-[0.12em] text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              PREDICTED REVENUE
            </div>
            <div
              className="mt-2 text-2xl sm:text-[26px] font-extrabold tracking-tight text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              $142.8M
            </div>
            {/* Histogram Bars in Sapphire Blue to Sky Blue Spectrum */}
            <div className="mt-3.5 flex h-10 sm:h-12 items-end gap-1.5">
              <span className="h-[40%] flex-1 rounded-t bg-white/20" />
              <span className="h-[56%] flex-1 rounded-t bg-white/30" />
              <span className="h-[48%] flex-1 rounded-t bg-white/25" />
              <span className="h-[70%] flex-1 rounded-t bg-[#8B7CF6]/60" />
              <span className="h-[84%] flex-1 rounded-t bg-[#38bdf8]/65" />
              <span className="h-[100%] flex-1 rounded-t bg-[#008fd3]" />
            </div>
          </div>

          {/* KPI Stack */}
          <div className="flex flex-[0.85] flex-col gap-2.5">
            <div className="rounded-xl border border-[#008fd3]/40 bg-[#008fd3]/[0.12] p-3">
              <div
                className="font-mono text-[9.5px] font-bold tracking-[0.1em] text-white"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                ACCURACY
              </div>
              <div
                className="mt-1.5 text-xl sm:text-2xl font-extrabold text-white"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                98.2%
              </div>
            </div>

            <div className="rounded-xl border border-[#8B7CF6]/40 bg-[#8B7CF6]/15 p-3">
              <div
                className="font-mono text-[9.5px] font-bold tracking-[0.1em] text-white"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                CLOSE CYCLE
              </div>
              <div
                className="mt-1.5 text-xl sm:text-2xl font-extrabold text-white"
                style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
              >
                5 days
              </div>
            </div>
          </div>
        </div>

        {/* AI Copilot & Anomaly Alerts */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5">
            <span className="h-4.5 w-4.5 shrink-0 rounded-md bg-[#008fd3]/30" />
            <span
              className="flex-1 text-xs sm:text-[13px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Margin anomaly detected — EMEA
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              2h
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-3.5 py-2.5">
            <span className="h-4.5 w-4.5 shrink-0 rounded-md bg-[#8B7CF6]/30" />
            <span
              className="flex-1 text-xs sm:text-[13px] font-semibold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              Copilot summarized 42 open items
            </span>
            <span
              className="font-mono text-[10.5px] font-bold text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              6h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ServiceMockupComponents = {
  "sap-consulting": ConsultingMockup,
  "sap-support": SupportMockup,
  "sap-btp-full-stack": BTPMockup,
  "sap-data-integration": IntegrationMockup,
  "sap-ai-ml": AIMockup,
};
