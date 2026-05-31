'use client';

import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Send, CheckCircle2, AlertCircle} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {submitLead, type LeadPayload} from '@/lib/lead';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_RE = /\S+@\S+\.\S+/;

// Unified contact intake form. Rendered both on the /contact page and inside
// the lead dialog. Submits through submitLead() (currently a stub).
export default function LeadForm({onSuccess}: {onSuccess?: () => void}) {
  const {t} = useTranslation();
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
    if (!data.message.trim()) next.message = t('contact.fields.detailBehaviors');
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await submitLead(data);
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
        <h3 className="font-sans text-lg font-bold text-stone-900">{t('contact.successTitle')}</h3>
        <p className="max-w-sm text-sm text-stone-500">{t('contact.successText')}</p>
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
        {status === 'loading' ? t('contact.fields.transmitting') : t('contact.fields.sendButton')}
        {status !== 'loading' && <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
}
