import { describe, expect, it } from 'vitest';
import { validateBrief } from './validate';
import { isCalendlyOrigin } from './CalendlyDialog';

const ok = { name: 'Ada', email: 'ada@x.io', company: '', service: '', message: 'A new brand system.' };

describe('contact', () => {
  it('validates briefs', () => {
    expect(validateBrief(ok)).toEqual({});
    expect(Object.keys(validateBrief({ ...ok, name: 'A', email: 'nope', message: 'hi' }))).toEqual(['name', 'email', 'message']);
  });
  it('trusts only calendly origins', () => {
    expect(isCalendlyOrigin('https://calendly.com')).toBe(true);
    expect(isCalendlyOrigin('https://assets.calendly.com')).toBe(true);
    expect(isCalendlyOrigin('https://evilcalendly.com')).toBe(false);
    expect(isCalendlyOrigin('http://calendly.com')).toBe(false);
  });
});
