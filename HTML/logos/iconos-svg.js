/**
 * Catálogo de Logos, Iconos SVG de 24 Emociones, 40+ Posturas/Acciones y Vista Previa de Ojos
 * Todos los SVGs están diseñados en vista limpia 48x48 (emociones) y 64x64 (posturas).
 */

const EMOTION_MASKS = [
  {
    id: 'Sonriente', short: 'Sonriente', color: 'amber',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/><circle cx="18" cy="21" r="2.4" fill="#78350F"/><circle cx="30" cy="21" r="2.4" fill="#78350F"/><path d="M15 16.5C16.5 15 19.5 15 21 16.5" stroke="#B45309" stroke-width="2" stroke-linecap="round"/><path d="M27 16.5C28.5 15 31.5 15 33 16.5" stroke="#B45309" stroke-width="2" stroke-linecap="round"/><path d="M16.5 29.5C18.5 33 29.5 33 31.5 29.5" stroke="#B45309" stroke-width="2.6" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Alegre', short: 'Alegre', color: 'emerald',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#D1FAE5" stroke="#059669" stroke-width="2.5"/><path d="M15 21C16.5 18 19.5 18 21 21" stroke="#065F46" stroke-width="2.5" stroke-linecap="round"/><path d="M27 21C28.5 18 31.5 18 33 21" stroke="#065F46" stroke-width="2.5" stroke-linecap="round"/><path d="M16 28H32C31.5 33.5 28 36 24 36C20 36 16.5 33.5 16 28Z" fill="#059669" stroke="#065F46" stroke-width="2" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Riéndose a carcajadas', short: 'Carcajadas', color: 'lime',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#ECFCCB" stroke="#65A30D" stroke-width="2.5"/><path d="M14.5 19L20.5 21.5L14.5 23.5" stroke="#365314" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M33.5 19L27.5 21.5L33.5 23.5" stroke="#365314" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 27.5H33C32.5 34.5 28.5 37.5 24 37.5C19.5 37.5 15.5 34.5 15 27.5Z" fill="#EF4444" stroke="#7F1D1D" stroke-width="1.8"/><path d="M17 28H31V30.5H17V28Z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'Entusiasmado', short: 'Entusiasmado', color: 'yellow',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FEF9C3" stroke="#CA8A04" stroke-width="2.5"/><path d="M18 17L19.4 20L22.5 20.5L20 22.6L20.6 25.5L18 24L15.4 25.5L16 22.6L13.5 20.5L16.6 20L18 17Z" fill="#CA8A04"/><path d="M30 17L31.4 20L34.5 20.5L32 22.6L32.6 25.5L30 24L27.4 25.5L28 22.6L25.5 20.5L28.6 20L30 17Z" fill="#CA8A04"/><path d="M16 28.5C18.5 35 29.5 35 32 28.5H16Z" fill="#EA580C" stroke="#9A3412" stroke-width="1.8" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Enamorado / Tierno', short: 'Tierno', color: 'pink',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FCE7F3" stroke="#DB2777" stroke-width="2.5"/><path d="M18 24.5C18 24.5 14 21.8 14 19.2C14 17.8 15.1 17 16.2 17C17 17 17.6 17.4 18 18C18.4 17.4 19 17 19.8 17C20.9 17 22 17.8 22 19.2C22 21.8 18 24.5 18 24.5Z" fill="#EC4899"/><path d="M30 24.5C30 24.5 26 21.8 26 19.2C26 17.8 27.1 17 28.2 17C29 17 29.6 17.4 30 18C30.4 17.4 31 17 31.8 17C32.9 17 34 17.8 34 19.2C34 21.8 30 24.5 30 24.5Z" fill="#EC4899"/><path d="M17.5 30C20 33.5 28 33.5 30.5 30" stroke="#BE185D" stroke-width="2.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Orgulloso', short: 'Orgulloso', color: 'teal',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#CCFBF1" stroke="#0D9488" stroke-width="2.5"/><path d="M15 21.5C16.8 20 19.2 20 21 21.5" stroke="#115E59" stroke-width="2.4" stroke-linecap="round"/><path d="M27 21.5C28.8 20 31.2 20 33 21.5" stroke="#115E59" stroke-width="2.4" stroke-linecap="round"/><path d="M15 16L21 15" stroke="#0F766E" stroke-width="2.2" stroke-linecap="round"/><path d="M27 15L33 16" stroke="#0F766E" stroke-width="2.2" stroke-linecap="round"/><path d="M17.5 30.5C21 33 27 33 30.5 29.5" stroke="#0F766E" stroke-width="2.6" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Confiado', short: 'Confiado', color: 'cyan',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.5"/><circle cx="18" cy="21.5" r="2.3" fill="#164E63"/><circle cx="30" cy="21.5" r="2.3" fill="#164E63"/><path d="M14.5 17L21 16" stroke="#0E7490" stroke-width="2.3" stroke-linecap="round"/><path d="M27 15.5L33.5 14.5" stroke="#0E7490" stroke-width="2.3" stroke-linecap="round"/><path d="M18 31.5C22 33 27.5 32 31.5 28.5" stroke="#0E7490" stroke-width="2.6" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Inspirado', short: 'Inspirado', color: 'amber',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2.5"/><circle cx="18" cy="20" r="2.8" fill="#78350F"/><circle cx="19" cy="19" r="1" fill="#FFFFFF"/><circle cx="30" cy="20" r="2.8" fill="#78350F"/><circle cx="31" cy="19" r="1" fill="#FFFFFF"/><path d="M24 9V12M20 11L21.5 12.5M28 11L26.5 12.5" stroke="#D97706" stroke-width="2" stroke-linecap="round"/><path d="M17.5 29.5C20 33 28 33 30.5 29.5" stroke="#B45309" stroke-width="2.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Relajado / En paz', short: 'En paz', color: 'emerald',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#DCFCE7" stroke="#16A34A" stroke-width="2.5"/><path d="M15 21C16.8 23.5 19.5 23.5 21.2 21" stroke="#166534" stroke-width="2.4" stroke-linecap="round"/><path d="M26.8 21C28.5 23.5 31.2 23.5 33 21" stroke="#166534" stroke-width="2.4" stroke-linecap="round"/><path d="M18.5 30.5C20.5 32.8 27.5 32.8 29.5 30.5" stroke="#15803D" stroke-width="2.4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Curioso', short: 'Curioso', color: 'sky',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5"/><circle cx="18" cy="22" r="2.3" fill="#0C4A6E"/><circle cx="30" cy="21" r="2.9" fill="#0C4A6E"/><path d="M15 17.5H21" stroke="#0369A1" stroke-width="2" stroke-linecap="round"/><path d="M27 15C28.8 13.3 31.8 13.3 33.5 15.5" stroke="#0369A1" stroke-width="2.2" stroke-linecap="round"/><path d="M18 31.5C21 30 25 32.5 29.5 29.5" stroke="#0369A1" stroke-width="2.4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Pensativo', short: 'Pensativo', color: 'indigo',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2.5"/><circle cx="19.5" cy="21" r="2.3" fill="#312E81"/><circle cx="31.5" cy="21" r="2.3" fill="#312E81"/><path d="M14.5 16.5L21.5 17.5" stroke="#4338CA" stroke-width="2.2" stroke-linecap="round"/><path d="M26.5 15.5L33.5 17" stroke="#4338CA" stroke-width="2.2" stroke-linecap="round"/><path d="M19 31.5H27.5" stroke="#4338CA" stroke-width="2.4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Concentrado', short: 'Concentrado', color: 'violet',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#EDE9FE" stroke="#7C3AED" stroke-width="2.5"/><circle cx="18" cy="22.5" r="2.3" fill="#4C1D95"/><circle cx="30" cy="22.5" r="2.3" fill="#4C1D95"/><path d="M14.5 17L21.5 19" stroke="#5B21B6" stroke-width="2.4" stroke-linecap="round"/><path d="M33.5 17L26.5 19" stroke="#5B21B6" stroke-width="2.4" stroke-linecap="round"/><path d="M18.5 31H29.5" stroke="#5B21B6" stroke-width="2.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Determinado', short: 'Determinado', color: 'orange',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FFEDD5" stroke="#EA580C" stroke-width="2.5"/><circle cx="18" cy="22.5" r="2.3" fill="#7C2D12"/><circle cx="30" cy="22.5" r="2.3" fill="#7C2D12"/><path d="M14 16.5L22 19.5" stroke="#C2410C" stroke-width="2.8" stroke-linecap="round"/><path d="M34 16.5L26 19.5" stroke="#C2410C" stroke-width="2.8" stroke-linecap="round"/><path d="M17.5 31.5H30.5" stroke="#C2410C" stroke-width="2.8" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Travieso / Pícaro', short: 'Travieso', color: 'fuchsia',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FAE8FF" stroke="#C026D3" stroke-width="2.5"/><circle cx="18" cy="21" r="2.5" fill="#701A75"/><path d="M27 21C28.5 18.5 31.5 18.5 33 21" stroke="#701A75" stroke-width="2.5" stroke-linecap="round"/><path d="M17 30C20 33.5 27.5 33 31 28.5" stroke="#A21CAF" stroke-width="2.5" stroke-linecap="round"/><path d="M24 32.5C24 35 26 36.2 27.5 35.2C28.8 34.3 28.5 32 28.5 31.2" fill="#FB7185" stroke="#BE123C" stroke-width="1.4"/></svg>`
  },
  {
    id: 'Sorprendido', short: 'Sorprendido', color: 'rose',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FFE4E6" stroke="#E11D48" stroke-width="2.5"/><circle cx="18" cy="21" r="3" fill="#881337"/><circle cx="30" cy="21" r="3" fill="#881337"/><path d="M15 15C16.5 13.5 19.5 13.5 21 15" stroke="#BE123C" stroke-width="2.2" stroke-linecap="round"/><path d="M27 15C28.5 13.5 31.5 13.5 33 15" stroke="#BE123C" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="24" cy="31.5" rx="4" ry="5" fill="#E11D48"/></svg>`
  },
  {
    id: 'Asombrado', short: 'Asombrado', color: 'amber',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/><circle cx="18" cy="20.5" r="3.4" fill="#FFFFFF" stroke="#92400E" stroke-width="2"/><circle cx="18" cy="20.5" r="1.4" fill="#78350F"/><circle cx="30" cy="20.5" r="3.4" fill="#FFFFFF" stroke="#92400E" stroke-width="2"/><circle cx="30" cy="20.5" r="1.4" fill="#78350F"/><path d="M14.5 14C16.5 12 19.5 12 21.5 14" stroke="#B45309" stroke-width="2" stroke-linecap="round"/><path d="M26.5 14C28.5 12 31.5 12 33.5 14" stroke="#B45309" stroke-width="2" stroke-linecap="round"/><ellipse cx="24" cy="32" rx="4.5" ry="5.5" fill="#D97706"/></svg>`
  },
  {
    id: 'Confundido', short: 'Confundido', color: 'indigo',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#EEF2FF" stroke="#6366F1" stroke-width="2.5"/><circle cx="18" cy="22" r="2.2" fill="#312E81"/><circle cx="30" cy="21" r="2.8" fill="#312E81"/><path d="M14.5 18L21 16.5" stroke="#4338CA" stroke-width="2.2" stroke-linecap="round"/><path d="M27 14.5C29 13 32 13.5 33.5 15.5" stroke="#4338CA" stroke-width="2.2" stroke-linecap="round"/><path d="M17.5 32C19.5 30 22 33 24.5 31C27 29 29 31.5 30.5 30" stroke="#4338CA" stroke-width="2.4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Avergonzado / Tímido', short: 'Tímido', color: 'rose',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FFF1F2" stroke="#FB7185" stroke-width="2.5"/><ellipse cx="14.5" cy="26.5" rx="3.5" ry="2" fill="#FDA4AF"/><ellipse cx="33.5" cy="26.5" rx="3.5" ry="2" fill="#FDA4AF"/><circle cx="18.5" cy="21.5" r="2.2" fill="#881337"/><circle cx="29.5" cy="21.5" r="2.2" fill="#881337"/><path d="M15 17L20.5 15.5" stroke="#E11D48" stroke-width="2" stroke-linecap="round"/><path d="M33 17L27.5 15.5" stroke="#E11D48" stroke-width="2" stroke-linecap="round"/><path d="M20.5 31C22 32.8 26 32.8 27.5 31" stroke="#E11D48" stroke-width="2.2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Nervioso', short: 'Nervioso', color: 'sky',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5"/><circle cx="18" cy="21.5" r="2.3" fill="#0C4A6E"/><circle cx="30" cy="21.5" r="2.3" fill="#0C4A6E"/><path d="M14.5 17.5L21 15.5" stroke="#0369A1" stroke-width="2.2" stroke-linecap="round"/><path d="M33.5 17.5L27 15.5" stroke="#0369A1" stroke-width="2.2" stroke-linecap="round"/><path d="M16.5 31.5L19.5 29.5L22.5 31.5L25.5 29.5L28.5 31.5L31.5 29.5" stroke="#0369A1" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 14C36 15.5 35 16.5 34 16.5C33 16.5 32 15.5 32 14C32 12.8 34 10.5 34 10.5C34 10.5 36 12.8 36 14Z" fill="#38BDF8"/></svg>`
  },
  {
    id: 'Cansado / Aburrido', short: 'Cansado', color: 'slate',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#F1F5F9" stroke="#64748B" stroke-width="2.5"/><path d="M14.5 20.5H21.5" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/><path d="M26.5 20.5H33.5" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/><circle cx="18" cy="23" r="1.7" fill="#334155"/><circle cx="30" cy="23" r="1.7" fill="#334155"/><path d="M18.5 32C21 31 27 31 29.5 32" stroke="#475569" stroke-width="2.4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Serio', short: 'Serio', color: 'slate',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#F1F5F9" stroke="#475569" stroke-width="2.5"/><circle cx="18" cy="22" r="2.3" fill="#0F172A"/><circle cx="30" cy="22" r="2.3" fill="#0F172A"/><path d="M14.5 17.5H21.5" stroke="#334155" stroke-width="2.4" stroke-linecap="round"/><path d="M26.5 17.5H33.5" stroke="#334155" stroke-width="2.4" stroke-linecap="round"/><path d="M18 31.5H30" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Triste', short: 'Triste', color: 'blue',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#DBEAFE" stroke="#2563EB" stroke-width="2.5"/><circle cx="18" cy="22" r="2.3" fill="#1E3A8A"/><circle cx="30" cy="22" r="2.3" fill="#1E3A8A"/><path d="M14.5 18.5L21 16" stroke="#1D4ED8" stroke-width="2.2" stroke-linecap="round"/><path d="M33.5 18.5L27 16" stroke="#1D4ED8" stroke-width="2.2" stroke-linecap="round"/><path d="M17.5 33C19.5 29.5 28.5 29.5 30.5 33" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round"/><path d="M33 25.5C33 27 32 28 31 28C30 28 29 27 29 25.5C29 24.3 31 22.5 31 22.5C31 22.5 33 24.3 33 25.5Z" fill="#3B82F6"/></svg>`
  },
  {
    id: 'Llorando', short: 'Llorando', color: 'blue',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#BFDBFE" stroke="#1D4ED8" stroke-width="2.5"/><path d="M15 21.5L21 19.5" stroke="#1E3A8A" stroke-width="2.4" stroke-linecap="round"/><path d="M33 21.5L27 19.5" stroke="#1E3A8A" stroke-width="2.4" stroke-linecap="round"/><rect x="16" y="23" width="3.5" height="9" rx="1.75" fill="#38BDF8"/><rect x="28.5" y="23" width="3.5" height="9" rx="1.75" fill="#38BDF8"/><path d="M18 34C20 30 28 30 30 34" stroke="#1E40AF" stroke-width="2.5" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Enojado', short: 'Enojado', color: 'red',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5"/><circle cx="18" cy="22.5" r="2.3" fill="#7F1D1D"/><circle cx="30" cy="22.5" r="2.3" fill="#7F1D1D"/><path d="M14 16L22 19.5" stroke="#B91C1C" stroke-width="2.6" stroke-linecap="round"/><path d="M34 16L26 19.5" stroke="#B91C1C" stroke-width="2.6" stroke-linecap="round"/><path d="M17.5 33C20 30 28 30 30.5 33" stroke="#B91C1C" stroke-width="2.6" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Asustado', short: 'Asustado', color: 'purple',
    svg: `<svg viewBox="0 0 48 48" class="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12C9 8.7 11.7 6 15 6H33C36.3 6 39 8.7 39 12V25C39 34.4 32.3 42 24 42C15.7 42 9 34.4 9 25V12Z" fill="#F3E8FF" stroke="#9333EA" stroke-width="2.5"/><circle cx="18" cy="21" r="3.2" fill="#FFFFFF" stroke="#581C87" stroke-width="1.8"/><circle cx="18" cy="21" r="1.3" fill="#581C87"/><circle cx="30" cy="21" r="3.2" fill="#FFFFFF" stroke="#581C87" stroke-width="1.8"/><circle cx="30" cy="21" r="1.3" fill="#581C87"/><path d="M14.5 16L21 14" stroke="#7E22CE" stroke-width="2.2" stroke-linecap="round"/><path d="M33.5 16L27 14" stroke="#7E22CE" stroke-width="2.2" stroke-linecap="round"/><path d="M17 32C19 29.5 21 33.5 24 31C27 28.5 29 33.5 31 31" stroke="#7E22CE" stroke-width="2.4" stroke-linecap="round"/></svg>`
  }
];

const ACCION_CATS = ['Todas', 'Básicas', 'Expresivas', 'Movimiento', 'Estudio', 'Arte y Música', 'Vida diaria'];
const ACCION_NO_OBJ_CATS = ['Todas', 'Básicas', 'Expresivas', 'Movimiento'];
const ACCION_OBJ_CATS = ['Todas', 'Estudio', 'Arte y Música', 'Vida diaria'];

const ACCION_CARDS = [
  // =========================================================================
  // SIN OBJETOS — BÁSICAS
  // =========================================================================
  {
    id: 'De pie mirando al frente', short: 'De pie', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="7" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 25C24 23.3 25.3 22 27 22H37C38.7 22 40 23.3 40 25V40H24V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 24L17 39M41 24L47 39M28 40V56M36 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Sentado', short: 'Sentado', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27" cy="15" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M21 24H33V39H21V24Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M33 27L42 36M29 39H43V53" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 42H35M18 42V54M33 42V54" stroke="#94A3B8" stroke-width="2.4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Sentado en el suelo / Meditando', short: 'Meditando', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 25H40V41H24V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 28L15 39L22 43M41 28L49 39L42 43" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 41C16 44 16 51 28 51H36C48 51 48 44 40 41" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Arrodillado', short: 'Arrodillado', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="16" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M23 25H37V40H23V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 28L18 39M37 28L44 37M26 40V51H17M34 40H44V52" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Agachado observando', short: 'Agachado', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="21" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M23 29L36 30L33 43H20L23 29Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M35 32L45 38M22 43L18 54H27M31 43L37 54H45" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Acostado descansando', short: 'Acostado', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="36" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M22 33H40V44H22V33Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M40 37L55 37M40 42L53 45M26 33L19 26" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M8 48H56" stroke="#94A3B8" stroke-width="2.4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Brazos cruzados', short: 'Brazos cruz.', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="7" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M23 24H41V40H23V24Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M21 26L41 34M43 26L23 34M28 40V56M36 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Manos en la cintura', short: 'En cintura', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="7" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 23H40V40H24V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 25L14 32L23 38M41 25L50 32L41 38M28 40V56M36 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Manos detrás de la espalda', short: 'Manos atrás', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="7" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 23H40V40H24V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 26L18 35L25 39M41 26L46 35L39 39M28 40V56M36 40V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 0"/></svg>`
  },
  {
    id: 'Mirando hacia arriba / Soñando', short: 'Mirando arriba', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="17" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M23 26H37V41H23V26Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M22 28L17 40M38 28L43 40M27 41V56M33 41V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round"/><path d="M44 9L46 13L50 13.5L47 16L48 20L44 18L40 20L41 16L38 13.5L42 13L44 9Z" fill="#F59E0B"/></svg>`
  },
  {
    id: 'Mirando por encima del hombro', short: 'Sobre hombro', cat: 'Básicas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="14" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 23H38V40H24V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 26L18 40M39 26L44 39M28 40V56M34 40V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round"/><path d="M44 13H53M49 9L53 13L49 17" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },

  // =========================================================================
  // SIN OBJETOS — EXPRESIVAS
  // =========================================================================
  {
    id: 'Saludando con la mano', short: 'Saludando', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="14" r="7" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M22 25C22 23.3 23.3 22 25 22H35C36.7 22 38 23.3 38 25V40H22V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M21 24L16 39M39 24L49 14M26 40V56M34 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M51 9C53 10.5 54 12.5 54 15" stroke="#10B981" stroke-width="2.2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Saludando con ambas manos', short: 'Saludo doble', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="15" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 24H40V40H24V24Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 25L13 14M41 25L51 14M28 40V56M36 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M10 10C8.5 11.5 8 13.5 8.5 15.5M54 10C55.5 11.5 56 13.5 55.5 15.5" stroke="#10B981" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Haciendo señal de paz (V)', short: 'Señal paz (V)', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="29" cy="15" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M21 24H37V40H21V24Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M20 27L15 39M38 26L46 21M25 40V56M33 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M46 21L44 12M46 21L51 13" stroke="#10B981" stroke-width="2.4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Haciendo pulgar arriba / OK', short: 'Pulgar arriba', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="15" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M21 24H35V40H21V24Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M20 27L15 39M36 27L46 25V18M25 40V56M32 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="48" cy="17" r="3" fill="#10B981"/></svg>`
  },
  {
    id: 'Señalando hacia un lado', short: 'Señalando', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27" cy="14" r="7" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M19 25C19 23.3 20.3 22 22 22H32C33.7 22 35 23.3 35 25V40H19V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M18 25L14 39M36 26H52M23 40V56M31 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M49 22L54 26L49 30" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Señalando hacia arriba', short: 'Apunt. arriba', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="17" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M22 26H38V41H22V26Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M21 28L16 40M39 27L44 10M26 41V56M34 41V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M40 12L44 7L48 12" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Levantando la mano', short: 'Mano arriba', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="16" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M22 25H38V40H22V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M21 27L16 40M39 26V8M26 40V56M34 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><circle cx="39" cy="6" r="2.2" fill="#10B981"/></svg>`
  },
  {
    id: 'Aplaudiendo', short: 'Aplaudiendo', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 23H40V39H24V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 26L18 33L29 31M41 26L46 33L35 31M28 39V56M36 39V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 24V21M28 25L26 22M36 25L38 22" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Manos en el pecho (agradecido)', short: 'En el pecho', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 23H40V40H24V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 26L19 33L30 30M41 26L45 33L34 30M28 40V56M36 40V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 34C32 34 28.5 31.8 28.5 29.8C28.5 28.8 29.4 28 30.3 28C31 28 31.6 28.4 32 29C32.4 28.4 33 28 33.7 28C34.6 28 35.5 28.8 35.5 29.8C35.5 31.8 32 34 32 34Z" fill="#EC4899"/></svg>`
  },
  {
    id: 'Corazón con los brazos arriba', short: 'Corazón arriba', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="20" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M25 28H39V42H25V28Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M24 29C14 21 18 8 32 11C46 8 50 21 40 29M28 42V56M36 42V56" stroke="#EC4899" stroke-width="2.8" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Brazos abiertos', short: 'Brazos abiertos', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 23H40V40H24V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 26L10 22M41 26L54 22M28 40V56M36 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Abrazando', short: 'Abrazando', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 23H40V40H24V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 25C13 28 16 37 26 35M41 25C51 28 48 37 38 35M28 40V56M36 40V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M32 28C32 28 28.5 25.8 28.5 23.8C28.5 22.8 29.4 22 30.3 22C31 22 31.6 22.4 32 23C32.4 22.4 33 22 33.7 22C34.6 22 35.5 22.8 35.5 23.8C35.5 25.8 32 28 32 28Z" fill="#EC4899"/></svg>`
  },
  {
    id: 'Pensando con la mano en el mentón', short: 'Pensando', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="15" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M22 24H38V40H22V24Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M21 27L17 39M39 27L42 33L33 21M26 40V56M34 40V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="46" cy="11" r="2" fill="#6366F1"/><circle cx="51" cy="7" r="3" fill="#A5B4FC"/></svg>`
  },
  {
    id: 'Manos en la cabeza (asombrado)', short: 'Manos cabeza', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 25H40V40H24V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 26L15 21L24 14M41 26L49 21L40 14M28 40V56M36 40V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 5V8M26 7L27.5 9M38 7L36.5 9" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Cubriéndose la boca', short: 'Boca tapada', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="15" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 24H40V40H24V24Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 27L21 31L29 20M41 27L43 31L35 20M28 40V56M36 40V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Encogiéndose de hombros', short: 'Hombros arriba', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 24H40V40H24V24Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 24L16 32L11 28M41 24L48 32L53 28M28 40V56M36 40V56" stroke="#0891B2" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><text x="48" y="16" fill="#6366F1" font-size="11" font-weight="800">?</text></svg>`
  },
  {
    id: 'Celebrando con ambos brazos arriba', short: 'Celebrando', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 25H40V41H24V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 26L13 11M41 26L51 11M28 41V56M36 41V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M20 7L22 10M44 7L42 10M32 5V8" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Haciendo reverencia / Saludando con respeto', short: 'Reverencia', cat: 'Expresivas', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="42" cy="21" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M22 30L38 25L36 37L21 40L22 30Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M24 40V56M31 39V56M34 32L37 44" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/></svg>`
  },

  // =========================================================================
  // SIN OBJETOS — MOVIMIENTO
  // =========================================================================
  {
    id: 'Caminando', short: 'Caminando', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="33" cy="13" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M27 22H37L39 38H26L27 22Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M27 25L18 35M37 25L46 34M29 38L21 55M36 38L44 54" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'De perfil caminando', short: 'Perfil paso', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="34" cy="13" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M28 22H37V38H27L28 22Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M35 25L45 32M29 25L20 34M31 38L23 55M34 38L44 55" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M46 13H54M51 10L54 13L51 16" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Corriendo', short: 'Corriendo', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="37" cy="13" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M29 22L39 23L36 37H26L29 22Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M29 24L18 28M38 25L49 21M28 37L17 48M35 37L46 47L41 55" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Saltando alegre', short: 'Saltando', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="12" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M25 21H39V35H25V21Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M24 23L14 14M40 23L50 14M28 35L20 48M36 35L44 48" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M22 55H42" stroke="#10B981" stroke-width="2" stroke-dasharray="3 3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Bailando', short: 'Bailando', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="33" cy="13" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M26 22L38 23L35 38H24L26 22Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M26 24L15 17M38 25L49 32M27 38L20 53M34 38L44 48L39 56" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M48 11V17M48 11L53 10V15" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Estirándose', short: 'Estirándose', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="18" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M25 27H39V42H25V27Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M25 27L21 9M39 27L43 9M28 42V56M36 42V56" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'De puntillas alcanzando algo', short: 'De puntillas', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="16" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M25 25H39V40H25V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M24 27L18 38M40 25L45 7M29 40L28 55M35 40L36 55" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M41 9L45 5L49 9" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Equilibrio en un pie', short: 'En un pie', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M25 23H39V39H25V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M24 25L10 23M40 25L54 23M30 39V56M36 39L45 45L42 52" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Pose de yoga (árbol)', short: 'Yoga árbol', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="18" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M25 26H39V40H25V26Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M24 26L18 14L32 7L46 14L40 26M31 40V56M35 40L44 46L32 49" stroke="#10B981" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Pose de superhéroe', short: 'Superhéroe', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 24L11 47L24 41M42 24L53 47L40 41" fill="#FECDD3" stroke="#E11D48" stroke-width="2" stroke-linejoin="round"/><circle cx="32" cy="14" r="6.5" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 23H40V40H24V23Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M23 25L16 32L23 37M41 25L48 32L41 37M27 40L22 56M37 40L42 56" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Haciendo sentadillas / Ejercicio', short: 'Sentadillas', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="17" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M25 25H39V39H25V25Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M24 27L13 27M40 27L51 27M27 39L19 47L24 56M37 39L45 47L40 56" stroke="#0891B2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Volando / Flotando', short: 'Volando', cat: 'Movimiento', hasObj: false,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="44" cy="19" r="6" fill="#CFFAFE" stroke="#0891B2" stroke-width="2.4"/><path d="M24 27L38 23L35 35L21 38L24 27Z" fill="#A5F3FC" stroke="#0891B2" stroke-width="2.2"/><path d="M36 24L53 16M23 35L10 43M27 37L14 48" stroke="#0891B2" stroke-width="3" stroke-linecap="round"/><path d="M12 53H48" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4 3" stroke-linecap="round"/></svg>`
  },

  // =========================================================================
  // CON OBJETOS (MODELO 3D COMPLETO INCLUIDO) — ESTUDIO
  // =========================================================================
  {
    id: 'Leyendo', short: 'Leyendo', cat: 'Estudio', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="13" r="6.5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M24 22H40V38H24V22Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M23 25L19 34L27 36M41 25L45 34L37 36M28 38V55M36 38V55" stroke="#D97706" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 33L32 37L43 33V43L32 47L21 43V33Z" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/></svg>`
  },
  {
    id: 'Escribiendo', short: 'Escribiendo', cat: 'Estudio', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="26" cy="15" r="6.5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M19 24H33L36 39H18L19 24Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M33 27L43 35M20 39V54M32 39V54" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/><path d="M39 39H54M43 35L49 30" stroke="#2563EB" stroke-width="2.6" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Sentado estudiando', short: 'Estudiando', cat: 'Estudio', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="15" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M18 24H31V39H18V24Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M31 27L41 34M26 39H38V53" stroke="#D97706" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 37H54M45 37V53" stroke="#78350F" stroke-width="2.4" stroke-linecap="round"/><path d="M40 33H51V37H40V33Z" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.8"/></svg>`
  },
  {
    id: 'Trabajando en laptop', short: 'En laptop', cat: 'Estudio', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="23" cy="15" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M17 24H30V39H17V24Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M30 28L39 35M25 39H38V53" stroke="#D97706" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 36H52L55 24H43L38 36Z" fill="#E0E7FF" stroke="#4F46E5" stroke-width="2" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'Explicando frente a la clase', short: 'En pizarra', cat: 'Estudio', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="38" y="10" width="20" height="16" rx="2" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/><circle cx="24" cy="15" r="6.5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M17 24H31V40H17V24Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M16 26L11 38M32 26L44 19M21 40V56M28 40V56" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Explorando con lupa', short: 'Con lupa', cat: 'Estudio', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="26" cy="15" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M19 24H32V39H19V24Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M32 27L42 24M22 39V55M29 39V55" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/><circle cx="48" cy="20" r="6" fill="#E0F2FE" stroke="#2563EB" stroke-width="2.4"/><path d="M43 24L39 28" stroke="#78350F" stroke-width="2.6" stroke-linecap="round"/></svg>`
  },

  // =========================================================================
  // CON OBJETOS (MODELO 3D COMPLETO INCLUIDO) — ARTE Y MÚSICA
  // =========================================================================
  {
    id: 'Pintando / Dibujando', short: 'Pintando', cat: 'Arte y Música', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="14" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M18 23H30V39H18V23Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M30 26L42 23M21 39V55M27 39V55" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/><rect x="40" y="14" width="14" height="19" rx="2" fill="#FFFFFF" stroke="#6366F1" stroke-width="2"/><path d="M43 33L40 52M51 33L54 52" stroke="#92400E" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Tomando una foto', short: 'Con cámara', cat: 'Arte y Música', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M24 23H40V40H24V23Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M23 26L20 20L27 20M41 26L44 20L37 20M28 40V56M36 40V56" stroke="#D97706" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><rect x="26" y="16" width="12" height="8" rx="2" fill="#334155"/><circle cx="32" cy="20" r="2.2" fill="#38BDF8"/></svg>`
  },
  {
    id: 'Tocando un instrumento', short: 'Con guitarra', cat: 'Arte y Música', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="29" cy="14" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M22 23H36V40H22V23Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M26 40V56M33 40V56" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/><ellipse cx="26" cy="34" rx="7" ry="5" fill="#F59E0B" stroke="#92400E" stroke-width="2"/><path d="M32 32L47 23" stroke="#78350F" stroke-width="3" stroke-linecap="round"/><path d="M49 12V18M49 12L54 11V16" stroke="#EC4899" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Cantando con micrófono', short: 'Micrófono', cat: 'Arte y Música', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="15" r="6.5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M23 24H37V40H23V24Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M22 27L16 39M38 27L44 21M26 40V56M34 40V56" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/><circle cx="46" cy="18" r="3.2" fill="#6366F1"/><path d="M44 20L41 25" stroke="#334155" stroke-width="2.2" stroke-linecap="round"/></svg>`
  },

  // =========================================================================
  // CON OBJETOS (MODELO 3D COMPLETO INCLUIDO) — VIDA DIARIA
  // =========================================================================
  {
    id: 'Cocinando / Preparando algo', short: 'Cocinando', cat: 'Vida diaria', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="26" cy="16" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M19 25H33V40H19V25Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M33 28L43 32M22 40V55M30 40V55" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/><path d="M40 34H54V41C54 42.5 52.5 44 51 44H43C41.5 44 40 42.5 40 41V34Z" fill="#475569" stroke="#1E293B" stroke-width="2"/><path d="M44 27C44 29 45.5 29 45.5 31M49 26C49 28 50.5 28 50.5 30" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Regando plantas / Jardinería', short: 'Regando', cat: 'Vida diaria', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="15" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M18 24H30V39H18V24Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M30 27L40 31M21 39V55M27 39V55" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/><path d="M48 44V54M48 48C44 48 43 44 46 43M48 46C52 46 53 42 50 41" stroke="#16A34A" stroke-width="2.4" stroke-linecap="round"/><path d="M42 32L46 37" stroke="#38BDF8" stroke-width="2" stroke-dasharray="2 2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Haciendo deporte con pesas', short: 'Con pesas', cat: 'Vida diaria', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="14" r="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M25 23H39V38H25V23Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M24 26L14 19M40 26L50 19M27 38L19 48L24 56M37 38L45 48L40 56" stroke="#D97706" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="14" width="8" height="6" rx="1.5" fill="#334155"/><rect x="48" y="14" width="8" height="6" rx="1.5" fill="#334155"/></svg>`
  },
  {
    id: 'Usando teléfono celular', short: 'Con celular', cat: 'Vida diaria', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="14" r="6.5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M23 23H37V40H23V23Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M22 27L26 35M38 27L42 33L35 33M26 40V56M34 40V56" stroke="#D97706" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="33" y="25" width="7" height="11" rx="1.5" fill="#38BDF8" stroke="#1E293B" stroke-width="1.8"/></svg>`
  },
  {
    id: 'Llevando una taza caliente', short: 'Con taza', cat: 'Vida diaria', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="28" cy="14" r="6.5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.4"/><path d="M21 23H35V40H21V23Z" fill="#FDE68A" stroke="#D97706" stroke-width="2.2"/><path d="M20 27L16 39M36 27L43 32M24 40V56M32 40V56" stroke="#D97706" stroke-width="2.8" stroke-linecap="round"/><rect x="42" y="28" width="9" height="9" rx="2" fill="#FFFFFF" stroke="#E11D48" stroke-width="2"/><path d="M45 22C45 24 47 24 47 26" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/></svg>`
  },
  {
    id: 'Sosteniendo un paraguas', short: 'Con paraguas', cat: 'Vida diaria', hasObj: true,
    svg: `<svg viewBox="0 0 64 64" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 20C18 11 46 11 46 20H18Z" fill="#6366F1" stroke="#312E81" stroke-width="2"/><path d="M32 20V35" stroke="#334155" stroke-width="2.2" stroke-linecap="round"/><circle cx="28" cy="27" r="5" fill="#FEF3C7" stroke="#D97706" stroke-width="2.2"/><path d="M22 34H34V46H22V34Z" fill="#FDE68A" stroke="#D97706" stroke-width="2"/><path d="M34 36L38 33M25 46V57M31 46V57" stroke="#D97706" stroke-width="2.6" stroke-linecap="round"/></svg>`
  }
];

function renderEyeIconSVG(hexColor) {
  const iris = esc(hexColor || '#0F172A');
  return `
    <svg viewBox="0 0 64 40" class="w-11 h-7 shrink-0 drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Vista previa color de ojos">
      <path d="M4 20C11 9 21 5 32 5C43 5 53 9 60 20C53 31 43 35 32 35C21 35 11 31 4 20Z" fill="#FFFFFF" stroke="#334155" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="32" cy="20" r="10.5" fill="${iris}" stroke="#1E293B" stroke-width="1.4"/>
      <circle cx="32" cy="20" r="4.8" fill="#0F172A"/>
      <circle cx="35.5" cy="16.5" r="2.4" fill="#FFFFFF"/>
      <circle cx="29" cy="23" r="1.1" fill="#FFFFFF" opacity="0.7"/>
    </svg>
  `;
}
