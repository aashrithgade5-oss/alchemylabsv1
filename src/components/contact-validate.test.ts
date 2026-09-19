import { describe, expect, it } from 'vitest';
import { validate } from './Contact';

const ok = { name: 'Aanya Rao', email: 'a@b.co', company: '', service: '', message: 'We need a brand system.' };

describe('contact validate', () => {
  it('accepts a complete brief', () => expect(validate(ok)).toEqual({}));
  it('flags each bad field', () => {
    const e = validate({ ...ok, name: 'A', email: 'nope', message: 'hi' });
    expect(Object.keys(e).sort()).toEqual(['email', 'message', 'name']);
  });
  it('caps message length', () => expect(validate({ ...ok, message: 'x'.repeat(5001) }).message).toBeTruthy());
});
