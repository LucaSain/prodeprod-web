import type { Locale } from '@/i18n/config'

/** Copy for the catalogue landing page that links to every product. */
export const productsIndex: Record<Locale, { title: string; summary: string; intro: string }> = {
  en: {
    title: 'Equipment',
    summary:
      'Briquetting presses, complete lines, shredders, dryers and crushers, built in Bălți.',
    intro: `We build the whole chain: shredding, drying and pressing. Twenty-three of our presses are in production across 18 sites in Moldova, and machines built in 2012 are still running.

Every price below is for the machine alone. Send us a sample of your material and we will press it before you buy.`,
  },
  ro: {
    title: 'Utilaje',
    summary:
      'Prese de brichetat, linii complete, tocătoare, uscătoare și concasoare, fabricate la Bălți.',
    intro: `Fabricăm întregul lanț: tocare, uscare și presare. Douăzeci și trei dintre presele noastre produc brichete în 18 locații din Moldova, iar utilajele fabricate în 2012 funcționează și astăzi.

Fiecare preț de mai jos este doar pentru utilaj. Trimiteți-ne o mostră din materia dumneavoastră și o presăm înainte să cumpărați.`,
  },
  ru: {
    title: 'Оборудование',
    summary:
      'Прессы для брикетов, комплектные линии, дробилки, сушилки и измельчители, изготовленные в Бельцах.',
    intro: `Мы изготавливаем всю цепочку: измельчение, сушку и прессование. Двадцать три наших пресса работают на 18 площадках в Молдове, а машины 2012 года выпуска работают до сих пор.

Каждая цена ниже — только за оборудование. Пришлите образец своего сырья, и мы спрессуем его до покупки.`,
  },
}
