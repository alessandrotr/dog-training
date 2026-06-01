'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useTranslation} from 'react-i18next';
import {Send, CheckCircle2, AlertCircle, X, Sparkles, PawPrint} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Heading, Text} from '@/components/ui';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useInquiryCart} from '@/components/InquiryCartProvider';
import {submitLead, type LeadPayload} from '@/lib/lead';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_RE = /\S+@\S+\.\S+/;

// Unified contact intake form. Rendered both on the /contact page and inside
// the lead dialog. Submits through submitLead() (currently a stub).
export default function LeadForm({onSuccess, available = true}: {onSuccess?: () => void; available?: boolean}) {
  const {t, i18n} = useTranslation();
  const cart = useInquiryCart();
  const de = i18n.language === 'de';
  const waitlist = !available; // fully booked → frame the form as a waitlist join
  const [data, setData] = useState<LeadPayload>({
    name: '',
    email: '',
    phone: '',
    dogInfo: '',
    concern: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function set<K extends keyof LeadPayload>(key: K, value: string) {
    setData((d) => ({...d, [key]: value}));
    if (key in errors) setErrors((e) => ({...e, [key]: undefined}));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!data.name.trim()) next.name = t('contact.fields.fullName');
    if (!EMAIL_RE.test(data.email)) next.email = t('contact.fields.emailAddress');
    // A message is required unless services were added to the inquiry.
    if (!data.message.trim() && cart.items.length === 0) next.message = t('contact.fields.detailBehaviors');
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const prefix = de ? 'Interessiert an: ' : 'Interested in: ';
      const services = cart.items.map((i) => i.title);
      const waitlistNote = waitlist ? (de ? '⏳ Wartelisten-Anfrage' : '⏳ Waitlist request') : '';
      const message = [waitlistNote, services.length ? `${prefix}${services.join(', ')}` : '', data.message.trim()]
        .filter(Boolean)
        .join('\n\n');
      await submitLead({...data, message});
      cart.clear();
      setStatus('success');
      onSuccess?.();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <Heading level={3} size="card">
          {waitlist ? (de ? 'Du bist auf der Warteliste!' : "You're on the waitlist!") : t('contact.successTitle')}
        </Heading>
        <Text className="max-w-sm">
          {waitlist
            ? de
              ? 'Sophia meldet sich, sobald ein Platz frei wird.'
              : 'Sophia will reach out as soon as a spot opens up.'
            : t('contact.successText')}
        </Text>
        <Button
          variant="outline"
          onClick={() => {
            setData({name: '', email: '', phone: '', dogInfo: '', concern: '', message: ''});
            setStatus('idle');
          }}
        >
          {t('contact.sendAnother')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {waitlist && (
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50 p-3.5 text-[13px] leading-relaxed text-amber-900">
          <span className="font-bold">{de ? 'Aktuell ausgebucht.' : 'Currently fully booked.'}</span>{' '}
          {de
            ? 'Trag dich in die Warteliste ein – Sophia meldet sich, sobald ein Platz frei wird.'
            : 'Join the waitlist and Sophia will reach out as soon as a spot opens up.'}
        </div>
      )}
      {cart.items.length > 0 && (
        <div className="rounded-2xl border border-amber-200/60 bg-linear-to-br from-amber-50 to-white p-3.5 shadow-sm">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-800">
              <Sparkles className="h-3.5 w-3.5" />
              {i18n.language === 'de' ? 'Anfrage zu' : 'Inquiring about'}
            </p>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800">
              {cart.items.length}
            </span>
          </div>
          <ul className="space-y-2">
            {cart.items.map((item) => (
              <li
                key={item.slug}
                className="group flex items-center gap-3 rounded-xl border border-amber-200/50 bg-white p-2 shadow-xs transition-colors hover:border-amber-300/70"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-amber-100">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-amber-700">
                      <PawPrint className="h-5 w-5" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate font-sans text-sm font-bold text-stone-900">{item.title}</p>
                    {item.price && (
                      <span className="shrink-0 font-sans text-sm font-extrabold text-amber-950">{item.price}</span>
                    )}
                  </div>
                  {item.shortDescription && (
                    <p className="mt-0.5 truncate text-xs leading-relaxed text-stone-500">{item.shortDescription}</p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${item.title}`}
                  onClick={() => cart.remove(item.slug)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-amber-700/50 transition-colors hover:bg-amber-100 hover:text-amber-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="lead-name">{t('contact.fields.fullName')}</Label>
          <Input id="lead-name" value={data.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} />
          {errors.name && <p className="font-mono text-[10px] text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-email">{t('contact.fields.emailAddress')}</Label>
          <Input id="lead-email" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} />
          {errors.email && <p className="font-mono text-[10px] text-red-500">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-phone">{t('contact.fields.contactNumber')}</Label>
          <Input id="lead-phone" value={data.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-dog">{t('contact.fields.dogAgeBreed')}</Label>
          <Input id="lead-dog" value={data.dogInfo} onChange={(e) => set('dogInfo', e.target.value)} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-concern">{t('contact.fields.primaryConcern')}</Label>
        <select
          id="lead-concern"
          value={data.concern}
          onChange={(e) => set('concern', e.target.value)}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="">{t('contact.fields.choose')}</option>
          <option value="puppy">{t('contact.fields.concernPuppy')}</option>
          <option value="reactive">{t('contact.fields.concernReactive')}</option>
          <option value="anxiety">{t('contact.fields.concernAnxiety')}</option>
          <option value="recall">{t('contact.fields.concernRecall')}</option>
          <option value="multiple">{t('contact.fields.concernMultiple')}</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-message">{t('contact.fields.detailBehaviors')}</Label>
        <Textarea
          id="lead-message"
          rows={4}
          value={data.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder={t('contact.fields.detailPlaceholder')}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="font-mono text-[10px] text-red-500">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="flex items-center gap-1.5 font-mono text-xs text-red-500">
          <AlertCircle className="h-4 w-4" /> {t('contact.fields.sendButton')} — try again.
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading'
          ? t('contact.fields.transmitting')
          : waitlist
            ? de
              ? 'Auf die Warteliste'
              : 'Join the waitlist'
            : t('contact.fields.sendButton')}
        {status !== 'loading' && <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
}
