import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MapBlockComponent } from '@/blocks/Map/Component'
import { GalleryBlockComponent } from '@/blocks/Gallery/Component'
import { defaultLocale } from '@/i18n/config'
import { getTranslate } from '@/i18n/getI18n'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  mapBlock: MapBlockComponent,
  gallery: GalleryBlockComponent,
}

/** Blocks that render their own chrome in the active language. */
const localeAwareBlocks = new Set(['mapBlock', 'archive', 'formBlock'])

export const RenderBlocks = async (props: { blocks: Page['layout'][0][]; locale?: Locale }) => {
  const { blocks, locale = defaultLocale } = props
  const t = await getTranslate(locale)

  // The form block renders its own status text on the client, so its strings
  // are resolved here and handed over as props.
  const formLabels = {
    submitting: t('prodeprod:form:submitting'),
    error: t('prodeprod:form:error'),
  }

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const localeProps = localeAwareBlocks.has(blockType)
                ? blockType === 'formBlock'
                  ? { labels: formLabels, locale }
                  : { locale }
                : {}

              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} {...localeProps} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
