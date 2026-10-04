import type { Locale } from '@/i18n/config'

/**
 * Home page and site chrome.
 *
 * Every claim here comes from the company's own 999.md listings: the Nefil
 * range and its outputs, 23 presses across 18 sites in Moldova, machines from
 * 2012 still running, and the offer to press a customer's sample before they
 * buy. Nothing is invented — in particular there is no street address or
 * phone number, because the listings publish neither.
 */
export type HomeContent = {
  /** Hero headline and standfirst. */
  heroHeading: string
  heroLead: string
  ctaEquipment: string
  ctaContact: string
  /** Three columns under the hero. */
  columns: { heading: string; body: string }[]
  /** The trust section. */
  recordHeading: string
  recordBody: string
  galleryHeading: string
  closingHeading: string
  closingBody: string
  closingAction: string
}

export const home: Record<Locale, HomeContent> = {
  en: {
    heroHeading: 'Turn wood waste into fuel you can sell',
    heroLead:
      'Hydraulic briquetting presses and complete lines for sawdust, shavings, straw and metal chips. Built in Bălți, running in plants across Moldova.',
    ctaEquipment: 'See the equipment',
    ctaContact: 'Request a quote',
    columns: [
      {
        heading: 'Presses',
        body: 'The Nefil range, from 35 to 70, pressing 500 to 1,200 kg of briquettes an hour. Hopper-free, mechanical impact, 30 to 75 kW.',
      },
      {
        heading: 'Complete lines',
        body: 'Shredding, drying and pressing delivered and commissioned as one installation. Two operators, 400 to 600 kg an hour.',
      },
      {
        heading: 'Service and parts',
        body: 'We build every machine ourselves, so wear parts come from the people who made them. On-site service across Moldova.',
      },
    ],
    recordHeading: 'Machines that are still earning',
    recordBody:
      'Twenty-three of our presses are in production across eighteen sites in Moldova. The ones we built in 2012 are still running, and still making money for the people who bought them.\n\nWe have delivered six complete lines, each a shredder, a dryer and a press working together.',
    galleryHeading: 'From the workshop',
    closingHeading: 'Send us your material',
    closingBody:
      'Every material presses differently. Send us a sample and we will run it before you buy, so the throughput figure you plan around is yours and not a brochure average.',
    closingAction: 'Get in touch',
  },
  ro: {
    heroHeading: 'Transformați deșeurile lemnoase în combustibil vandabil',
    heroLead:
      'Prese hidraulice de brichetat și linii complete pentru rumeguș, așchii, paie și șpan metalic. Fabricate la Bălți, în funcțiune în fabrici din toată Moldova.',
    ctaEquipment: 'Vedeți utilajele',
    ctaContact: 'Cereți o ofertă',
    columns: [
      {
        heading: 'Prese',
        body: 'Gama Nefil, de la 35 la 70, cu o productivitate între 500 și 1200 kg de brichete pe oră. Fără buncăr, mecanice cu impact, 30–75 kW.',
      },
      {
        heading: 'Linii complete',
        body: 'Tocare, uscare și presare, livrate și puse în funcțiune ca o singură instalație. Doi operatori, 400–600 kg pe oră.',
      },
      {
        heading: 'Service și piese',
        body: 'Fabricăm fiecare utilaj la noi, așa că piesele de uzură vin de la cei care l-au construit. Service la fața locului în toată Moldova.',
      },
    ],
    recordHeading: 'Utilaje care încă produc',
    recordBody:
      'Douăzeci și trei dintre presele noastre produc brichete în optsprezece locații din Moldova. Cele fabricate în 2012 funcționează și astăzi și aduc în continuare profit proprietarilor.\n\nAm livrat șase linii complete, fiecare cu tocător, uscător și presă lucrând împreună.',
    galleryHeading: 'Din atelier',
    closingHeading: 'Trimiteți-ne materia primă',
    closingBody:
      'Fiecare material se presează diferit. Trimiteți-ne o mostră și o presăm înainte să cumpărați, astfel încât productivitatea pe care vă bazați să fie a dumneavoastră, nu o medie din broșură.',
    closingAction: 'Contactați-ne',
  },
  ru: {
    heroHeading: 'Превратите древесные отходы в топливо, которое продаётся',
    heroLead:
      'Гидравлические прессы для брикетов и комплектные линии для опилок, стружки, соломы и металлической стружки. Изготовлены в Бельцах, работают на предприятиях по всей Молдове.',
    ctaEquipment: 'Посмотреть оборудование',
    ctaContact: 'Запросить цену',
    columns: [
      {
        heading: 'Прессы',
        body: 'Линейка Nefil от 35 до 70, производительность от 500 до 1200 кг брикетов в час. Без бункера, ударно-механические, 30–75 кВт.',
      },
      {
        heading: 'Комплектные линии',
        body: 'Измельчение, сушка и прессование, поставляемые и запускаемые как одна установка. Два оператора, 400–600 кг в час.',
      },
      {
        heading: 'Сервис и запчасти',
        body: 'Мы изготавливаем каждую машину сами, поэтому детали износа приходят от тех, кто её построил. Выездной сервис по всей Молдове.',
      },
    ],
    recordHeading: 'Машины, которые до сих пор зарабатывают',
    recordBody:
      'Двадцать три наших пресса работают на восемнадцати площадках в Молдове. Те, что мы изготовили в 2012 году, работают до сих пор и продолжают приносить прибыль владельцам.\n\nМы поставили шесть комплектных линий — в каждой дробилка, сушилка и пресс работают вместе.',
    galleryHeading: 'Из цеха',
    closingHeading: 'Пришлите нам своё сырьё',
    closingBody:
      'Каждое сырьё прессуется по-своему. Пришлите образец, и мы спрессуем его до покупки, чтобы производительность, на которую вы рассчитываете, была вашей, а не средней по брошюре.',
    closingAction: 'Связаться с нами',
  },
}

/** Header and footer, which are empty on the live site. */
export const chrome: Record<Locale, { equipment: string; contact: string; tagline: string }> = {
  en: {
    equipment: 'Equipment',
    contact: 'Contact',
    tagline: 'Briquetting presses and complete lines, built in Bălți.',
  },
  ro: {
    equipment: 'Utilaje',
    contact: 'Contact',
    tagline: 'Prese de brichetat și linii complete, fabricate la Bălți.',
  },
  ru: {
    equipment: 'Оборудование',
    contact: 'Контакты',
    tagline: 'Прессы для брикетов и комплектные линии, изготовленные в Бельцах.',
  },
}

/**
 * Contact details, taken from the listings. The 999.md profile hides the phone
 * number behind a click, so there is none here rather than an invented one.
 */
export const contactDetails = {
  address: 'Bălți, Moldova',
  email: 'sainenco1@gmail.com',
}

/** Photographs for the hero and the workshop gallery, by filename. */
export const heroImage = '82473219-1.jpg'
export const galleryImages = [
  '15536420-1.jpg',
  '82863659-1.jpg',
  '31096386-1.jpg',
  '81177577-1.jpg',
  '82662684-1.jpg',
  '105191001-1.jpg',
]
