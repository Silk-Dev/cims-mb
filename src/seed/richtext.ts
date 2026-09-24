/**
 * Minimal helpers to build Lexical rich-text JSON for seeding.
 * Lines starting with "## " become headings, "- " become bullet lists.
 */
import type { Service } from '../payload-types'

type Node = Record<string, unknown>
type RichTextValue = NonNullable<Service['description']>

const text = (value: string): Node => ({
  type: 'text',
  text: value,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const base = (direction: 'ltr' | 'rtl') => ({ format: '', indent: 0, version: 1, direction })

export function richText(blocks: string[], direction: 'ltr' | 'rtl' = 'ltr'): RichTextValue {
  const children: Node[] = []
  let list: Node | null = null

  for (const block of blocks) {
    if (block.startsWith('- ')) {
      if (!list) {
        list = {
          ...base(direction),
          type: 'list',
          listType: 'bullet',
          start: 1,
          tag: 'ul',
          children: [],
        }
        children.push(list)
      }
      ;(list.children as Node[]).push({
        ...base(direction),
        type: 'listitem',
        value: (list.children as Node[]).length + 1,
        children: [text(block.slice(2))],
      })
      continue
    }
    list = null
    if (block.startsWith('## ')) {
      children.push({
        ...base(direction),
        type: 'heading',
        tag: 'h3',
        children: [text(block.slice(3))],
      })
    } else {
      children.push({
        ...base(direction),
        type: 'paragraph',
        textFormat: 0,
        children: [text(block)],
      })
    }
  }

  return { root: { ...base(direction), type: 'root', children } } as unknown as RichTextValue
}
