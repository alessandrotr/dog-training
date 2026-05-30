import React, { useState } from 'react';
import { CalendarRange, Sparkles, CheckCircle, Clock, Video, User, AlertCircle, Copy, Check } from 'lucide-react';

export default function Booking() {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [copiedEmbedCode, setCopiedEmbedCode] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const days = [
    { name: 'Monday', date: 'Jun 1' },
    { name: 'Tuesday', date: 'Jun 2' },
    { name: 'Wednesday', date: 'Jun 3' },
    { name: 'Thursday', date: 'Jun 4' },
    { name: 'Friday', date: 'Jun 5' },
  ];

  const times = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
  ];

  const embedCodeSample = `<!-- Calendly Inline Widget Embed Code -->
<div class="calendly-inline-widget" data-url="https://calendly.com/your-sophiabinder-handle" style="min-width:320px;height:700px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCodeSample);
    setCopiedEmbedCode(true);
    setTimeout(() => setCopiedEmbedCode(false), 2000);
  };

  const handleBookSlot = () => {
    if (!selectedTime) return;
    setIsBooked(true);
  };

  return (
    <div className="space-y-16 py-12 pb-24 text-left">
      
      {/* Page Headers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">ONLINE SCHEDULING PORTAL</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-955 sm:text-5xl leading-tight">
            Schedule Free Consult
          </h1>
          <p className="font-sans text-sm text-stone-500 max-w-2xl leading-relaxed">
            Select an active coordinate slot below for your initial, zero-obligation, 15-minute alignment phone call. We'll chat about your dog, their physical environment, and check matching timelines.
          </p>
        </div>
      </section>

      {/* Grid: Calendly Embed Instruction vs Interactive Calendar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* LEFT: Interactive scheduling widget, simulating Calendly UI */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm text-left space-y-6">
            
            {isBooked ? (
              <div className="py-16 text-center space-y-5 animate-fade-in max-w-md mx-auto">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-250 mx-auto">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="font-sans text-xl font-extrabold text-stone-900">Your Consult is Arranged!</h3>
                <p className="text-sm text-stone-500 leading-relaxed font-sans">
                  Success! We have provisioned {selectedDay} at <b>{selectedTime}</b> (15-min call duration). Sophia will phone you directly at your specified coordinate.
                </p>
                <div className="rounded-xl bg-stone-100 p-4 font-mono text-[11px] text-stone-605 max-w-sm mx-auto text-left leading-normal space-y-1.5">
                  <p>• Type: Behavioral Assessment Call</p>
                  <p>• Host: Sophia Binder (CCPDT-KA)</p>
                  <p>• Date: {selectedDay}, June 2026</p>
                </div>
                <button
                  id="reset-booking-btn"
                  onClick={() => {
                    setIsBooked(false);
                    setSelectedTime(null);
                  }}
                  className="rounded-lg bg-stone-900 text-white font-mono text-[11px] uppercase tracking-wider font-bold px-4 py-2"
                >
                  Schedule Another Appointment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-500 pb-4 border-b border-stone-105">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="h-4 w-4 text-amber-800" />
                    <span>Duration: 15 minutes</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Video className="h-4 w-4 text-amber-800" />
                    <span>Direct Phone / Zoom Optional</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <User className="h-4 w-4 text-amber-800" />
                    <span>Host: Sophia B.</span>
                  </div>
                </div>

                <h3 className="font-sans text-base font-bold text-stone-900">1. Choose Date</h3>
                {/* Days list row */}
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {days.map((day) => {
                    const isSelected = selectedDay === day.name;
                    return (
                      <button
                        key={day.name}
                        id={`day-select-${day.name.toLowerCase()}`}
                        onClick={() => setSelectedDay(day.name)}
                        className={`rounded-xl py-3 border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-950 text-white border-amber-955'
                            : 'bg-white text-stone-750 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-mono font-bold">{day.name.slice(0,3)}</p>
                        <p className="text-sm font-sans tracking-tight font-extrabold mt-0.5">{day.date}</p>
                      </button>
                    );
                  })}
                </div>

                <h3 className="font-sans text-base font-bold text-stone-900 pt-2">2. Choose Time</h3>
                {/* Times list Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {times.map((t) => {
                    const isSelected = selectedTime === t;
                    return (
                      <button
                        key={t}
                        id={`time-select-${t.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-xl py-3 border text-center font-mono text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-900 text-white border-amber-900'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                {/* Confirm section */}
                {selectedTime && (
                  <div className="pt-4 border-t border-stone-105 flex items-center justify-between gap-4 flex-col sm:flex-row">
                    <p className="text-xs font-mono text-stone-500 text-left">
                      Selected Appointment: <b>{selectedDay}, {selectedTime}</b> (WA timezone coordinates).
                    </p>
                    <button
                      id="book-appointment-btn"
                      onClick={handleBookSlot}
                      className="rounded-xl bg-stone-900 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md hover:bg-black w-full sm:w-auto"
                    >
                      Confirm Booking Slot
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* RIGHT: Live Calendly Integration setup for developers */}
          <div className="lg:col-span-4 bg-stone-50 rounded-3xl border border-stone-205 p-8 text-left space-y-6 h-fit">
            
            <div className="space-y-4">
              <h3 className="font-sans text-base font-bold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-amber-700 animate-pulse" />
                <span>Calendly Wiring Guide</span>
              </h3>
              <p className="text-xs text-stone-550 leading-relaxed font-sans">
                In a real-world production build, you can instantly replace this custom React schedule module with a fully synchronous <b>Calendly Inline Widget</b>.
              </p>
            </div>

            {/* Embedded mockup code block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Embed Code Source</span>
                <button
                  id="copy-embed-code-btn"
                  onClick={handleCopyCode}
                  className="hover:text-stone-900 flex items-center gap-1"
                >
                  {copiedEmbedCode ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedEmbedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="p-3.5 bg-stone-950 text-stone-200 rounded-xl text-[9px] font-mono overflow-auto leading-normal">
                {embedCodeSample}
              </pre>
            </div>

            {/* Warning notes */}
            <div className="bg-emerald-50 rounded-xl border border-emerald-250 p-4 text-[11px] leading-relaxed text-emerald-950 flex gap-2">
              <AlertCircle className="h-4.5 w-4.5 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <strong>SimplyBook Ready</strong>
                <p className="text-emerald-900 mt-1">This site configuration is fully customized to hold standard external iframes cleanly without breaking mobile-viewport responsive scales.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
