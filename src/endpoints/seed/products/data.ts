import type { Locale } from '@/i18n/config'

/**
 * Product catalogue, taken from the company's 999.md listings.
 *
 * Source ads were written in Romanian and Russian, often only one of the two.
 * Where a language was missing it has been translated from the original;
 * every figure (output, diameter, power, price) is carried across unchanged.
 *
 * Bodies are Markdown and converted to Lexical at seed time, so the content
 * stays readable here instead of being hand-written editor JSON.
 */
export type ProductContent = {
  title: string
  summary: string
  body: string
}

export type Product = {
  /** Shared across locales: one URL per product, prefixed by locale. */
  slug: string
  /** 999.md listing id — also the prefix of its downloaded photos. */
  sourceId: string
  /** Price exactly as listed on 999.md. */
  price: string
  content: Record<Locale, ProductContent>
}

const CONTACT = {
  en: '\n\nPrices are for the machine alone. Call or write and we will send a full specification.',
  ro: '\n\nPrețurile sunt doar pentru utilaj. Sunați sau scrieți-ne și vă trimitem descrierea detaliată.',
  ru: '\n\nЦены указаны только за оборудование. Позвоните или напишите — вышлем подробное описание.',
}

export const products: Product[] = [
  {
    slug: 'nefil-briquetting-presses',
    sourceId: '15536420',
    price: '300 000 MDL',
    content: {
      en: {
        title: 'Nefil briquetting presses',
        summary:
          'Hopper-free mechanical impact presses for biomass briquettes, from 500 to 1,200 kg/h.',
        body: `We build the Nefil range of hopper-free presses for biomass briquettes. They produce large volumes of cheap, high-quality briquettes, and have the highest output and the lowest specific energy consumption in their class.

## Technical characteristics

- **Raw material** — Sawdust, straw, chaff, vine shoots, branches, wood chips, corn stalks, hay
- **Particle size** — Up to 10 mm
- **Moisture content** — Up to 14%
- **Briquette density** — 1.1–1.4 kg/dm³
- **Motor power** — 30, 45 or 75 kW

Other motor powers can be fitted — output depends on it. The Nefil is a mechanical impact press.

## Diameter and output

- **53 mm** — 500–600 kg/h
- **63 mm** — 700–800 kg/h
- **73 mm** — 1,000–1,200 kg/h

## Prices

- **Nefil 35** — 6,600 €
- **Nefil 42** — 10,000 €
- **Nefil 50** — 15,000 €
- **Nefil 60** — 22,500 €
- **Nefil 70** — 30,000 €

Second-hand presses are also available.

The raw material must be shredded and dried first. We build shredders and dryers separately.${CONTACT.en}`,
      },
      ro: {
        title: 'Prese de brichetat Nefil',
        summary:
          'Prese mecanice cu impact, fără buncăr, pentru brichete din biomasă, de la 500 la 1200 kg/oră.',
        body: `Vă oferim prese fără buncăr pentru producerea brichetelor din biomasă Nefil. Presele produc brichete ieftine și de calitate în cantități mari. Presele noastre au cea mai înaltă productivitate din lume și cel mai mic consum specific de energie.

## Caracteristici tehnice

- **Tipul materiei prime** — Rumeguș, paie, pleavă, coarde de viță-de-vie, crengi, tocătură de lemn, tulpini de porumb, fân
- **Dimensiunea particulelor** — Până la 10 mm
- **Umiditatea materiei prime** — Până la 14%
- **Densitatea brichetelor** — 1,1–1,4 kg/dm³
- **Puterea motoarelor electrice** — 30, 45 sau 75 kW

Putem instala motoare de altă putere — productivitatea depinde de aceasta. Presa Nefil este de tip mecanic cu impact.

## Diametru și productivitate

- **53 mm** — 500–600 kg/oră
- **63 mm** — 700–800 kg/oră
- **73 mm** — 1000–1200 kg/oră

## Prețuri

- **Nefil 35** — 6 600 euro
- **Nefil 42** — 10 000 euro
- **Nefil 50** — 15 000 euro
- **Nefil 60** — 22 500 euro
- **Nefil 70** — 30 000 euro

Sunt disponibile și prese second-hand.

Materia primă trebuie neapărat să fie tocată și uscată. În acest scop fabricăm separat tocătoare și uscătoare.${CONTACT.ro}`,
      },
      ru: {
        title: 'Прессы для топливных брикетов Nefil',
        summary:
          'Ударно-механические прессы без бункера для брикетов из биомассы, от 500 до 1200 кг/час.',
        body: `Предлагаем прессы без бункера для производства брикетов из биомассы Nefil. Прессы производят дешёвые и качественные брикеты в больших количествах. Наши прессы имеют самую высокую производительность в мире и самый низкий удельный расход энергии.

## Технические характеристики

- **Сырьё** — Опилки, солома, полова, виноградная лоза, ветки, щепа, стебли кукурузы, сено
- **Размер частиц сырья** — До 10 мм
- **Влажность сырья** — До 14%
- **Плотность брикетов** — 1,1–1,4 кг/дм³
- **Мощность электродвигателей** — 30, 45 или 75 кВт

Можем установить двигатели другой мощности — от этого зависит производительность. Пресс Nefil ударно-механического типа.

## Диаметр и производительность

- **53 мм** — 500–600 кг/час
- **63 мм** — 700–800 кг/час
- **73 мм** — 1000–1200 кг/час

## Цены

- **Nefil 35** — 6 600 евро
- **Nefil 42** — 10 000 евро
- **Nefil 50** — 15 000 евро
- **Nefil 60** — 22 500 евро
- **Nefil 70** — 30 000 евро

Также доступны прессы б/у.

Сырьё обязательно должно быть измельчено и высушено. Для этого мы отдельно изготавливаем дробилки и сушилки.${CONTACT.ru}`,
      },
    },
  },
  {
    slug: 'nefil-60',
    sourceId: '105191001',
    price: '450 000 MDL',
    content: {
      en: {
        title: 'Nefil 60 briquetting press',
        summary: '60 mm briquettes at 600–800 kg/h.',
        body: `The Nefil 60 presses fuel briquettes 60 mm in diameter.

- **Briquette diameter** — 60 mm
- **Output** — 600–800 kg/h
- **Briquette density** — 1.1–1.2 g/cm³

Raw material must be shredded to under 10 mm and dried to below 14% moisture.${CONTACT.en}`,
      },
      ro: {
        title: 'Presă de brichetat Nefil 60',
        summary: 'Brichete de 60 mm, 600–800 kg/oră.',
        body: `Presa Nefil 60 produce brichete de combustibil cu diametrul de 60 mm.

- **Diametrul brichetelor** — 60 mm
- **Capacitate** — 600–800 kg/oră
- **Densitatea brichetei** — 1,1–1,2 g/cm³

Materia primă trebuie tocată sub 10 mm și uscată sub 14% umiditate.${CONTACT.ro}`,
      },
      ru: {
        title: 'Пресс для топливных брикетов Nefil 60',
        summary: 'Брикеты диаметром 60 мм, 600–800 кг/час.',
        body: `Пресс Nefil 60 производит топливные брикеты диаметром 60 мм.

- **Диаметр брикета** — 60 мм
- **Производительность** — 600–800 кг/час
- **Плотность брикета** — 1,1–1,2 г/см³

Сырьё должно быть измельчено до 10 мм и высушено до влажности ниже 14%.${CONTACT.ru}`,
      },
    },
  },
  {
    slug: 'nefil-70',
    sourceId: '82473219',
    price: '650 000 MDL',
    content: {
      en: {
        title: 'Nefil 70 briquetting press',
        summary: '70 mm briquettes at 900–1,200 kg/h. In stock.',
        body: `The largest press in the range, in stock now.

- **Briquette diameter** — 70 mm
- **Real output** — 900–1,200 kg/h at a briquette density of 1.1 g/cm³
- **Main motor power** — 75 kW
- **Availability** — In stock${CONTACT.en}`,
      },
      ro: {
        title: 'Presă de brichetat Nefil 70',
        summary: 'Brichete de 70 mm, 900–1200 kg/oră. În stoc.',
        body: `Cea mai mare presă din gamă, disponibilă în stoc.

- **Diametrul brichetelor** — 70 mm
- **Productivitate reală** — 900–1200 kg/oră la o densitate a brichetelor de 1,1 g/cm³
- **Puterea motorului principal** — 75 kW
- **Disponibilitate** — Presa este în stoc${CONTACT.ro}`,
      },
      ru: {
        title: 'Пресс для топливных брикетов Nefil 70',
        summary: 'Брикеты диаметром 70 мм, 900–1200 кг/час. В наличии.',
        body: `Самый крупный пресс в линейке, в наличии.

- **Диаметр брикета** — 70 мм
- **Реальная производительность** — 900–1200 кг/час при плотности брикета 1,1 г/см³
- **Мощность главного двигателя** — 75 кВт
- **Наличие** — Пресс в наличии${CONTACT.ru}`,
      },
    },
  },
  {
    slug: 'briquetting-line',
    sourceId: '82863659',
    price: '650 000 MDL',
    content: {
      en: {
        title: 'Complete briquetting line',
        summary: 'Shredding, drying and pressing in one installation, 400–600 kg/h.',
        body: `A full nestro-type briquetting line, built to order.

- **Output** — 400–600 kg/h
- **Briquette diameter** — 55 mm, nestro type
- **Raw material** — Wood chips and other shredded loose plant material; straw and hay bales
- **Chip fraction** — No larger than 40 mm
- **Bale diameter** — 1,500 mm
- **Maximum moisture** — 50%
- **Operators** — 2
- **Power consumption** — 59 kW
- **Maintenance and tooling** — 100 lei per tonne of finished briquette
- **Chips used for drying** — Maximum 150 kg per tonne of raw material

## What the line is made of

- Chip hopper
- Hammer mill with a drum for round bales
- Aerodynamic dryer
- Impact crank press

Presses, dryers and shredders are also built separately.${CONTACT.en}`,
      },
      ro: {
        title: 'Linie completă de brichetare',
        summary: 'Tocare, uscare și presare într-o singură instalație, 400–600 kg/oră.',
        body: `Linie completă de brichetare de tip nestro, fabricată la comandă.

- **Productivitate** — 400–600 kg/oră
- **Diametrul brichetei** — 55 mm, tip nestro
- **Materia primă** — Tocătură și alte materiale vegetale mărunțite; baloturi de paie și fân
- **Fracția tocăturii** — Maximum 40 mm
- **Diametrul balotului** — 1500 mm
- **Umiditate maximă** — 50%
- **Număr de operatori** — 2
- **Consum de energie** — 59 kW
- **Întreținere și scule** — 100 lei pe tonă de brichetă finită
- **Tocătură pentru uscare** — Maximum 150 kg pe tonă de materie primă

## Componența liniei

- Buncăr pentru tocătură
- Tocător cu ciocane, cu tambur pentru baloturi rotunde
- Uscător aerodinamic
- Presă cu impact, cu bielă-manivelă

Fabricăm separat și prese, uscătoare și tocătoare.${CONTACT.ro}`,
      },
      ru: {
        title: 'Линия для производства топливных брикетов',
        summary: 'Измельчение, сушка и прессование в одной установке, 400–600 кг/час.',
        body: `Полная линия брикетирования типа «нестро», изготавливаем под заказ.

- **Производительность** — 400–600 кг/час
- **Диаметр брикета** — 55 мм, тип «нестро»
- **Сырьё** — Щепа и другое дроблёное сыпучее растительное сырьё, тюки соломы и сена
- **Размер фракции щепы** — Не более 40 мм
- **Диаметр тюка** — 1500 мм
- **Влажность** — Максимум 50%
- **Количество рабочих** — 2 человека
- **Потребление электроэнергии** — 59 кВт
- **Техобслуживание и замена инструмента** — 100 лей на тонну готового брикета
- **Расход щепы на сушку** — Максимум 150 кг на тонну сырья

## Состав линии

- Бункер для щепы
- Молотковая дробилка с барабаном для круглых тюков
- Сушилка аэродинамическая
- Пресс ударный, кривошипно-шатунный

Изготавливаем отдельно прессы, сушилки и дробилки.${CONTACT.ru}`,
      },
    },
  },
  {
    slug: 'briquetting-equipment',
    sourceId: '31096386',
    price: '300 000 MDL',
    content: {
      en: {
        title: 'Briquetting equipment, complete',
        summary:
          'Everything needed to produce nestro-type briquettes, from 250 to 1,600 kg/h.',
        body: `We supply everything needed to produce nestro-type fuel briquettes from a range of raw materials, at outputs from 250 to 1,600 kg/h.

## What we offer

- Mechanical impact presses — Nefil 40, 50, 60, 70 and 80
- Dryers
- Shredders
- Raw material crushers, stationary or mobile

We have built six production lines, each made up of a shredder, a dryer and a press.

## Track record

Our presses have the lowest electricity consumption per tonne of briquettes in the world. The equipment is currently running at 18 sites in the Republic of Moldova, where 23 presses of our manufacture are in production. Presses built in 2012 are still running faultlessly and earning for their owners.

We can also build other equipment to your technical specification.${CONTACT.en}`,
      },
      ro: {
        title: 'Echipament complet pentru brichetare',
        summary:
          'Tot ce este necesar pentru producerea brichetelor de tip nestro, de la 250 la 1600 kg/oră.',
        body: `Compania noastră oferă toate echipamentele necesare pentru producerea brichetelor de combustibil de tip nestro din diverse materii prime, cu capacități cuprinse între 250 și 1600 kg/oră.

## Oferim

- Prese mecanice cu impact — Nefil 40, 50, 60, 70 și 80
- Uscătoare
- Tocătoare
- Concasoare pentru materie primă, în variantă staționară sau mobilă

Am produs șase linii de fabricație, fiecare compusă dintr-un tocător, un uscător și o presă.

## Experiență

Presele noastre au cel mai scăzut consum de energie electrică din lume pentru producerea unei tone de brichete. Echipamentele noastre sunt în prezent în funcțiune în 18 locații din Republica Moldova. În acest moment, 23 de prese fabricate de compania noastră produc brichete. Presele fabricate în 2012 continuă să funcționeze ireproșabil și să genereze profit pentru proprietarii lor.

De asemenea, putem fabrica și alte echipamente, pe baza specificațiilor dumneavoastră tehnice.${CONTACT.ro}`,
      },
      ru: {
        title: 'Оборудование для производства топливных брикетов',
        summary: 'Всё необходимое для брикетов типа «нестро», от 250 до 1600 кг/час.',
        body: `Предприятие предлагает всё необходимое оборудование для производства топливных брикетов типа «нестро» из разного сырья, производительностью от 250 до 1600 кг в час.

## Мы предлагаем

- Прессы ударно-механические — Nefil 40, 50, 60, 70 и 80
- Сушилки
- Дробилки
- Дробилки для сырья, стационарные и мобильные

Мы изготовили шесть производственных линий, каждая из которых состоит из дробилки, сушилки и пресса.

## Опыт

Наши прессы имеют самый низкий в мире расход электроэнергии на тонну брикетов. Оборудование работает на 18 площадках в Республике Молдова, где 23 изготовленных нами пресса производят брикеты. Прессы, изготовленные в 2012 году, продолжают безотказно работать и приносить прибыль владельцам.

Также можем изготовить другое оборудование по вашему техническому заданию.${CONTACT.ru}`,
      },
    },
  },
  {
    slug: 'hammer-shredder',
    sourceId: '81177577',
    price: '200 000 MDL',
    content: {
      en: {
        title: 'Hammer shredder',
        summary:
          'Rotary hammer mill for chips, straw, branches and vine, 500–2,000 kg/h.',
        body: `A good way to complete a briquetting line. This general-purpose shredder carries 40 to 56 heavy hammers, 12 mm thick.

- **Hammers** — 40–56, 12 mm thick
- **Motor power** — 22–55 kW
- **Output** — 500–2,000 kg/h, depending on screen and motor

## What it handles

Branches up to 100 mm, reed sheaves, hemp bales, sunflower and corn stalks, vine in stooks, wood waste, chips, corn cobs, straw bales and limestone.

## Options

A chip hopper, a feed drum for bales, a feed conveyor and a fan. Fitted with both the hopper and the bale drum, it can shred straw and chips at the same time and deliver a mixture.${CONTACT.en}`,
      },
      ro: {
        title: 'Tocător cu ciocane',
        summary:
          'Tocător rotativ cu ciocane pentru tocătură, paie, crengi și viță-de-vie, 500–2000 kg/oră.',
        body: `O soluție bună pentru completarea unei linii de brichetare. Acest tocător universal are 40–56 de ciocane grele, cu grosimea de 12 mm.

- **Ciocane** — 40–56, grosime 12 mm
- **Puterea motorului** — 22–55 kW
- **Productivitate** — 500–2000 kg/oră, în funcție de sită și de motor

## Ce tocă

Crengi cu diametrul de până la 100 mm, snopi de stuf, baloturi de cânepă, tulpini de floarea-soarelui și de porumb, viță-de-vie în clăi, deșeuri de prelucrare a lemnului, tocătură, știuleți de porumb, baloturi de paie sau calcar.

## Opțiuni

Buncăr pentru tocătură, tambur de alimentare pentru baloturi, transportor de alimentare și ventilator. Echipat simultan cu buncăr și tambur, poate toca în același timp paie și tocătură, obținând un amestec.${CONTACT.ro}`,
      },
      ru: {
        title: 'Молотковая дробилка',
        summary:
          'Роторная молотковая дробилка для щепы, соломы, веток и лозы, 500–2000 кг/час.',
        body: `Хорошее решение для комплектования линии для производства топливных брикетов. Этот универсальный измельчитель имеет 40–56 тяжёлых молотков толщиной 12 мм.

- **Молотки** — 40–56, толщина 12 мм
- **Мощность двигателя** — 22–55 кВт
- **Производительность** — 500–2000 кг/час, зависит от сита и мощности двигателя

## Что дробит

Ветки диаметром до 100 мм, снопы камыша, тюки конопли, стебли подсолнуха и кукурузы, лозу в копнах, отходы деревообработки, щепу, початки кукурузы, тюки соломы и известняк.

## Опции

Бункер для подачи щепы, подающий барабан для тюков, подающий конвейер и вентилятор. С бункером и барабаном одновременно измельчитель дробит и солому, и щепу, получая смесь.${CONTACT.ru}`,
      },
    },
  },
  {
    slug: 'aerodynamic-dryer',
    sourceId: '82662684',
    price: '150 000 MDL',
    content: {
      en: {
        title: 'Aerodynamic dryer',
        summary: '500 kg/h at 40% incoming moisture. Built to order.',
        body: `An aerodynamic dryer, built to order.

- **Output** — 500 kg/h at 40% moisture
- **Assembly** — Furnace, 4 expanders, fan, cyclone

The dryer brings raw material down to the moisture content the presses need.${CONTACT.en}`,
      },
      ro: {
        title: 'Uscător aerodinamic',
        summary: '500 kg/oră la o umiditate de intrare de 40%. Fabricat la comandă.',
        body: `Uscător aerodinamic, fabricat la comandă.

- **Productivitate** — 500 kg/oră la umiditate de 40%
- **Componența** — Cuptor, 4 expandoare, ventilator, ciclon

Uscătorul aduce materia primă la umiditatea necesară preselor.${CONTACT.ro}`,
      },
      ru: {
        title: 'Сушилка аэродинамическая',
        summary: '500 кг/час при влажности сырья 40%. Изготавливаем под заказ.',
        body: `Аэродинамическая сушилка, изготавливаем под заказ.

- **Производительность** — 500 кг в час при влажности 40%
- **Состав** — Печка, 4 расширителя, вентилятор, циклон

Сушилка доводит сырьё до влажности, необходимой прессам.${CONTACT.ru}`,
      },
    },
  },
  {
    slug: 'stone-crusher',
    sourceId: '81957448',
    price: '65 000 MDL',
    content: {
      en: {
        title: 'Combined stone crusher',
        summary: 'Jaw and roller crusher in one, two-stage, 100:1 reduction.',
        body: `The crusher is built from two units — a jaw crusher and a roller crusher — so material is reduced in two stages.

- **Reduction ratio** — 100:1
- **Material** — Stone of medium hardness
- **Stages** — Two — jaw, then roller

The jaw crusher for granite is priced at 65,000 lei.${CONTACT.en}`,
      },
      ro: {
        title: 'Concasor combinat pentru piatră',
        summary: 'Concasor cu fălci și cu valțuri într-unul singur, în două trepte, raport 100:1.',
        body: `Concasorul este compus din două subansambluri — un concasor cu fălci și unul cu valțuri — astfel încât mărunțirea are loc în două trepte.

- **Gradul de mărunțire** — 100:1
- **Material** — Piatră de duritate medie
- **Trepte** — Două — fălci, apoi valțuri

Prețul concasorului cu fălci pentru granit este de 65 000 lei.${CONTACT.ro}`,
      },
      ru: {
        title: 'Дробилка комбинированная для камня',
        summary: 'Щековая и валковая дробилка в одной, двухступенчатое измельчение, степень 100:1.',
        body: `Дробилка состоит из двух узлов — щековой и валковой дробилки. Происходит двухступенчатое измельчение.

- **Степень измельчения** — 100:1
- **Материал** — Камень средней твёрдости
- **Ступени** — Две — щековая, затем валковая

Цена щековой дробилки для гранита — 65 000 лей.${CONTACT.ru}`,
      },
    },
  },
  {
    slug: 'dust-fan-vrp-315',
    sourceId: '105067417',
    price: '16 000 MDL',
    content: {
      en: {
        title: 'VRP 3.15 dust fan with cyclone',
        summary: '315 mm rotor, 4 kW, supplied with a 500 mm cyclone.',
        body: `A dust extraction fan supplied together with its cyclone.

- **Fan rotor diameter** — 315 mm
- **Motor power** — 4 kW at 3,000 rpm
- **Duct diameter** — 150 mm
- **Cyclone diameter** — 500 mm
- **Leg height** — 1,600 mm${CONTACT.en}`,
      },
      ro: {
        title: 'Ventilator de praf VRP 3,15 cu ciclon',
        summary: 'Rotor de 315 mm, 4 kW, livrat cu ciclon de 500 mm.',
        body: `Ventilator pentru extracția prafului, livrat împreună cu ciclonul.

- **Diametrul rotorului** — 315 mm
- **Puterea motorului** — 4 kW la 3000 rot/min
- **Diametrul conductei** — 150 mm
- **Diametrul ciclonului** — 500 mm
- **Înălțimea picioarelor** — 1600 mm${CONTACT.ro}`,
      },
      ru: {
        title: 'Вентилятор пылевой ВРП 3,15 с циклоном',
        summary: 'Ротор 315 мм, 4 кВт, поставляется с циклоном 500 мм.',
        body: `Пылевой вентилятор, поставляется вместе с циклоном.

- **Диаметр ротора вентилятора** — 315 мм
- **Мощность двигателя** — 4 кВт при 3000 об/мин
- **Диаметр трубопровода** — 150 мм
- **Диаметр циклона** — 500 мм
- **Высота ног** — 1600 мм${CONTACT.ru}`,
      },
    },
  },
]
