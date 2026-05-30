import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dogAge: '',
    dogIssue: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const activeErrors: { [key: string]: string } = {};
    if (!formData.name) activeErrors.name = 'Name is required';
    if (!formData.email) {
      activeErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      activeErrors.email = 'Email format is invalid';
    }
    if (!formData.phone) activeErrors.phone = 'Phone number is required';
    if (!formData.dogAge) activeErrors.dogAge = 'Dog age is required';
    if (!formData.dogIssue) activeErrors.dogIssue = 'Please specify primary canine issue';
    if (!formData.message) activeErrors.message = 'Please provide brief message description';

    setErrors(activeErrors);
    return Object.keys(activeErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    // Simulate Resend API Gateway backend transmission
    try {
      console.log('Sending message payload to Resend integration backend wrapper...', formData);
      
      // Delay simulating API hop
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Trigger dummy visual success state
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        dogAge: '',
        dogIssue: '',
        message: ''
      });
    } catch (err) {
      console.error('Error dispatching message to Resend connector.', err);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-16 py-12 pb-24 text-left">
      
      {/* Back headers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-700">LET'S START CONVERSATION</span>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-amber-955 sm:text-5xl leading-tight">
            Consultation Inquiry
          </h1>
          <p className="font-sans text-sm text-stone-500 max-w-2xl leading-relaxed">
            Ready to design a custom behavioral plan for your dog? Submit your inquiry details below. We guarantee a thoughtful response from certified behaviorist Sophia within 24 business hours.
          </p>
        </div>
      </section>

      {/* Main Split (Details vs Form) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Column 1: WA Local Coordinates details */}
          <div className="lg:col-span-4 space-y-8 bg-stone-50 rounded-3xl border border-stone-200 p-8 shadow-sm text-left h-fit">
            
            <div className="space-y-4">
              <h3 className="font-sans text-lg font-bold text-stone-900">Direct Contact Coordinates</h3>
              <p className="text-xs text-stone-550 leading-relaxed font-sans">
                Sophia completes in-person assessments and multi-session training direct-to-home within the Seattle, Bellevue, and broader WA coordinates.
              </p>
            </div>

            {/* List */}
            <div className="space-y-5 font-mono text-xs text-stone-600 leading-relaxed">
              <div className="flex items-start space-x-3.5">
                <MapPin className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-850">Service Domain Address</p>
                  <p className="text-stone-450 text-[11px] mt-0.5">42 Moss Ridge Road, Bellevue, WA 98004</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-850">Trainer Support Phone</p>
                  <p className="text-stone-450 text-[11px] mt-0.5">+1 (555) 019-2819 <span className="text-[10px] uppercase text-emerald-805">(WhatsApp Active)</span></p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-850">General Administration Email</p>
                  <p className="text-stone-450 text-[11px] mt-0.5">hello@sophiabindercanine.com</p>
                </div>
              </div>
            </div>

            {/* Warning block */}
            <div className="bg-amber-50 px-4 py-3.5 rounded-xl border border-amber-200/40 text-[11px] leading-relaxed text-amber-950 font-sans">
              <strong>Need emergency boarding or vet advice?</strong>
              <p className="text-amber-900 mt-0.5">We are behavior educators and do not provide 24/7 medical boarding triage. Please refer severely injured situations to local WA hospitals.</p>
            </div>

          </div>

          {/* Column 2: Interactive Contact Form (Resend Ready) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-6 md:p-10 shadow-sm text-left">
            {status === 'success' ? (
              <div className="max-w-md mx-auto py-12 text-center space-y-5 animate-fade-in">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 mx-auto border border-emerald-250">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-sans text-xl font-extrabold text-stone-900">Message Dispatched Successfully!</h3>
                <p className="text-sm text-stone-500 font-sans leading-relaxed">
                  Thank you for sharing your dog’s coordinates. We have received your inquiry payload and prepared the Resend transmission hook. Sophia will review and get back within 24 hours.
                </p>
                <button
                  id="send-another-btn"
                  onClick={() => setStatus('idle')}
                  className="rounded-lg bg-stone-900 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <h3 className="font-sans text-lg font-bold text-stone-900 mb-2">Canine Intake Form</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Human Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-stone-700">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`block w-full rounded-xl border py-3 px-4 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-amber-900 focus:ring-amber-900'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-mono">{errors.name}</p>}
                  </div>

                  {/* Human Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-stone-700">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className={`block w-full rounded-xl border py-3 px-4 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-amber-900 focus:ring-amber-900'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-mono">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-stone-700">Contact Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(206) 555-0192"
                      className={`block w-full rounded-xl border py-3 px-4 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-amber-900 focus:ring-amber-900'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-mono">{errors.phone}</p>}
                  </div>

                  {/* Dog Age */}
                  <div className="space-y-1.5">
                    <label htmlFor="dogAge" className="text-xs font-semibold text-stone-700">Dog Age / Breed</label>
                    <input
                      id="dogAge"
                      name="dogAge"
                      type="text"
                      value={formData.dogAge}
                      onChange={handleInputChange}
                      placeholder="7-month Golden Retriever"
                      className={`block w-full rounded-xl border py-3 px-4 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 ${
                        errors.dogAge ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-amber-900 focus:ring-amber-900'
                      }`}
                    />
                    {errors.dogAge && <p className="text-[10px] text-red-500 font-mono">{errors.dogAge}</p>}
                  </div>
                </div>

                {/* Primary Issue */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="dogIssue" className="text-xs font-semibold text-stone-700">What is the primary concern?</label>
                  <select
                    id="dogIssue"
                    name="dogIssue"
                    value={formData.dogIssue}
                    onChange={handleInputChange}
                    className={`block w-full rounded-xl border py-3 px-4 text-sm bg-white focus:outline-none focus:ring-1 ${
                      errors.dogIssue ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-amber-900 focus:ring-amber-900'
                    }`}
                  >
                    <option value="">-- Choose Category --</option>
                    <option value="Puppy Foundations">Puppy Socialization & Manners</option>
                    <option value="Leash Reactivity">Reactivity (Barking/Lunging on leash)</option>
                    <option value="Separation Anxiety">Separation Panic / Isolation Distress</option>
                    <option value="Recall Obedience">General Obedience / Recall training</option>
                    <option value="Multiple Concerns">Multiple behavioral elements</option>
                  </select>
                  {errors.dogIssue && <p className="text-[10px] text-red-500 font-mono">{errors.dogIssue}</p>}
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="message" className="text-xs font-semibold text-stone-700">Detail Your Dog's Behaviors</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about Baxter's typical day, what patterns trigger them, and what your ultimate household goals are..."
                    className={`block w-full rounded-xl border py-3 px-4 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 ${
                      errors.message ? 'border-red-500 focus:ring-red-500' : 'border-stone-300 focus:border-amber-900 focus:ring-amber-900'
                    }`}
                  ></textarea>
                  {errors.message && <p className="text-[10px] text-red-500 font-mono">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    id="submit-contact-btn"
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-amber-900 py-4 text-sm font-semibold text-white shadow-md hover:bg-amber-950 transition disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <span className="font-mono text-xs animate-pulse">TRANSMITTING VIA RESEND API...</span>
                    ) : (
                      <>
                        <Send className="h-4.5 w-4.5" />
                        <span>Send Intake Packet</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Resend documentation notice */}
                <p className="text-[10px] text-stone-400 font-mono leading-relaxed text-center">
                  * Note: In production, this form triggers a background Node post lambda using <code className="bg-stone-100 rounded px-1 text-rose-700">@resend/node</code> SDK to forward clinical intake data directly to the head trainer's mailbox.
                </p>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
