import type { NestedKeysStripped } from '@payloadcms/translations'

/**
 * Custom translations, in Payload's own i18n format.
 *
 * These are merged into Payload's translations by `i18n.translations` in
 * payload.config.ts, so the same strings are available to the admin panel
 * (`useTranslation`), to anything holding a `req` (`req.t`), and to the
 * frontend through `getI18n()` in `./getI18n`.
 *
 * Keys nest with colons, matching Payload's resolver:
 *   t('prodeprod:nav:openMenu')
 *
 * `{{var}}` placeholders are filled from the options object:
 *   t('prodeprod:posts:showing', { start, end, total })
 *
 * Note this is Payload's *i18n* (the viewer's language), which is a separate
 * axis from *localization* (the language a document is written in). They
 * happen to use the same two codes here, and the frontend drives both from
 * the URL's locale segment.
 */
export const customTranslations = {
  en: {
    prodeprod: {
      nav: {
        languageSwitcher: 'Change language',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        skipToContent: 'Skip to content',
        home: 'Home',
      },
      common: {
        goHome: 'Go home',
        readMore: 'Read more',
        noImage: 'No image',
        loading: 'Loading, please wait…',
      },
      notFound: {
        code: '404',
        description: 'This page could not be found.',
      },
      posts: {
        title: 'News',
        relatedTitle: 'Related posts',
        author: 'Author',
        datePublished: 'Date published',
        noResults: 'No results found.',
        showing: 'Showing {{start}} – {{end}} of {{total}}',
        pageNumber: 'Page {{number}}',
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
        directions: 'Get directions',
        loading: 'Loading map…',
      },
      contact: {
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        hours: 'Opening hours',
      },
    },
  },
  ru: {
    prodeprod: {
      nav: {
        languageSwitcher: 'Сменить язык',
        openMenu: 'Открыть меню',
        closeMenu: 'Закрыть меню',
        skipToContent: 'Перейти к содержимому',
        home: 'Главная',
      },
      common: {
        goHome: 'На главную',
        readMore: 'Подробнее',
        noImage: 'Нет изображения',
        loading: 'Загрузка, пожалуйста подождите…',
      },
      notFound: {
        code: '404',
        description: 'Эта страница не найдена.',
      },
      posts: {
        title: 'Новости',
        relatedTitle: 'Похожие материалы',
        author: 'Автор',
        datePublished: 'Дата публикации',
        noResults: 'Ничего не найдено.',
        // No trailing noun: Russian would need case agreement with {{total}},
        // and Payload's plural buckets do not follow Russian's mod-10 rule.
        showing: 'Показано {{start}} – {{end}} из {{total}}',
        pageNumber: 'Страница {{number}}',
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
        directions: 'Построить маршрут',
        loading: 'Загрузка карты…',
      },
      contact: {
        address: 'Адрес',
        phone: 'Телефон',
        email: 'Эл. почта',
        hours: 'Часы работы',
      },
    },
  },
}

export type CustomTranslationsObject = typeof customTranslations.en.prodeprod
export type CustomTranslationsKeys = NestedKeysStripped<typeof customTranslations.en>
