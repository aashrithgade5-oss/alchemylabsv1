export type Brief = { name: string; email: string; company: string; service: string; message: string };
export type BriefErrors = Partial<Record<keyof Brief, string>>;

export function validateBrief(b: Brief): BriefErrors {
  const e: BriefErrors = {};
  if (b.name.trim().length < 2) e.name = 'Add your name so we know who to reply to.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim())) e.email = 'That email doesn’t look right.';
  if (b.message.trim().length < 10) e.message = 'A sentence or two on what you’re building.';
  return e;
}
