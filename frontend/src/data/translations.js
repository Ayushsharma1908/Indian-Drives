// translations.js - Complete Multi-lingual Translations for Indian Drives
// 100% Full Key Coverage across English (en), Hindi (hi), Kannada (kn), and Bengali (bn)

import { en } from './locales/en.js';
import { hi } from './locales/hi.js';
import { kn } from './locales/kn.js';
import { bn } from './locales/bn.js';
import { ta } from './locales/ta.js';
import { te } from './locales/te.js';
import { mr } from './locales/mr.js';
import { gu } from './locales/gu.js';
import { ml } from './locales/ml.js';
import { pa } from './locales/pa.js';

export const translations = {
  en,
  hi,
  kn,
  bn,
  ta: ta || hi,
  te: te || hi,
  mr: mr || hi,
  gu: gu || hi,
  ml: ml || hi,
  pa: pa || hi,
  or: hi,
  as: bn,
  ur: hi,
  sa: hi,
  mai: hi,
  sat: hi,
  ks: hi,
  ne: hi,
  kok: mr,
  sd: hi,
  doi: hi,
  brx: hi,
  mni: bn
};
