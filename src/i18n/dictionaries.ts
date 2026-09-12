import type { Locale } from './config'

/**
 * UI strings that live in code rather than in the CMS.
 *
 * Everything an editor writes (page copy, nav labels, SEO) is a localized
 * Payload field instead — this covers only chrome: buttons, empty states,
 * labels the templates render themselves.
 */
export type Dictionary = {
  nav: {
    languageSwitcher: string
    openMenu: string
    closeMenu: string
    skipToContent: string
  }
  common: {
    goHome: string
    readMore: string
    noImage: string
    loading: string
    backToTop: string
  }
  notFound: {
    title: string
    description: string
  }
  posts: {
    title: string
    relatedTitle: string
    author: string
    datePublished: string
    noResults: string
    showing: (args: { start: number; end: number; total: number; label: string }) => string
    singular: string
    plural: string
  }
  pagination: {
    previous: string
    next: string
    morePages: string
    label: string
  }
  form: {
    submitting: string
    error: string
  }
  map: {
    title: string
    openInMaps: string
    directions: string
    loading: string
  }
  contact: {
    address: string
    phone: string
    email: string
    hours: string
  }
}

const en: Dictionary = {
  nav: {
    languageSwitcher: 'Change language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
  },
  common: {
    goHome: 'Go home',
    readMore: 'Read more',
    noImage: 'No image',
    loading: 'Loading, please wait…',
    backToTop: 'Back to top',
  },
  notFound: {
    title: '404',
    description: 'This page could not be found.',
  },
  posts: {
    title: 'News',
    relatedTitle: 'Related posts',
    author: 'Author',
    datePublished: 'Date published',
    noResults: 'No results found.',
    showing: ({ start, end, total, label }) => `Showing ${start} – ${end} of ${total} ${label}`,
    singular: 'post',
    plural: 'posts',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
    morePages: 'More pages',
    label: 'Pagination',
  },
  form: {
    submitting: 'Sending, please wait…',
    error: 'The message could not be sent. Check the fields above and try again.',
  },
  map: {
    title: 'Find us',
    openInMaps: 'Open in maps',
    directions: 'Get directions',
    loading: 'Loading map…',
  },
  contact: {
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Opening hours',
  },
}

const ru: Dictionary = {
  nav: {
    languageSwitcher: 'Сменить язык',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    skipToContent: 'Перейти к содержимому',
  },
  common: {
    goHome: 'На главную',
    readMore: 'Подробнее',
    noImage: 'Нет изображения',
    loading: 'Загрузка, пожалуйста подождите…',
    backToTop: 'Наверх',
  },
  notFound: {
    title: '404',
    description: 'Эта страница не найдена.',
  },
  posts: {
    title: 'Новости',
    relatedTitle: 'Похожие материалы',
    author: 'Автор',
    datePublished: 'Дата публикации',
    noResults: 'Ничего не найдено.',
    showing: ({ start, end, total, label }) => `Показано ${start} – ${end} из ${total} ${label}`,
    singular: 'материал',
    plural: 'материалов',
  },
  pagination: {
    previous: 'Назад',
    next: 'Вперёд',
    morePages: 'Ещё страницы',
    label: 'Постраничная навигация',
  },
  form: {
    submitting: 'Отправка, пожалуйста подождите…',
    error: 'Сообщение не отправлено. Проверьте поля выше и попробуйте ещё раз.',
  },
  map: {
    title: 'Как нас найти',
    openInMaps: 'Открыть на карте',
    directions: 'Построить маршрут',
    loading: 'Загрузка карты…',
  },
  contact: {
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Эл. почта',
    hours: 'Часы работы',
  },
}

const dictionaries: Record<Locale, Dictionary> = { en, ru }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale] ?? dictionaries.en
