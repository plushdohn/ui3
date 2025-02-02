import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import Toaster from '../../src/runtime/components/Toaster.vue'
import Toast, { type ToastProps, type ToastSlots } from '../../src/runtime/components/Toast.vue'
import ComponentRender from '../component-render'
import { ClientOnly } from '#components'
import theme from '#build/ui/toast'

const ToastWrapper = defineComponent({
  components: {
    UToaster: Toaster,
    UToast: Toast,
    ClientOnly
  },
  inheritAttrs: false,
  template: '<UToaster><ClientOnly><UToast v-bind="$attrs" /></ClientOnly></UToaster>'
})

describe('Toast', () => {
  const colors = Object.keys(theme.variants.color) as any

  it.each([
    // Props
    ['with title', { props: { title: 'Toast' } }],
    ['with description', { props: { description: 'This is a toast' } }],
    ['with title & description', { props: { title: 'Toast', description: 'This is a toast' } }],
    ['with icon', { props: { icon: 'i-heroicons-rocket-launch', title: 'Toast' } }],
    ['with avatar', { props: { avatar: { src: 'https://avatars.githubusercontent.com/u/739984?v=4' }, title: 'Toast' } }],
    ['with actions', { props: { title: 'Toast', actions: [{ label: 'Action' }] } }],
    ['with description actions', { props: { title: 'Toast', description: 'This is a toast', actions: [{ label: 'Action' }] } }],
    ['without close', { props: { title: 'Toast', close: null } }],
    ['with type', { props: { type: 'background' as const } }],
    ...colors.map((color: string) => [`with color ${color}`, { props: { color } }]),
    ['with class', { props: { class: 'bg-gray-50 dark:bg-gray-800/50' } }],
    ['with ui', { props: { title: 'Toast', ui: { title: 'font-bold' } } }],
    // Slots
    ['with leading slot', { slots: { title: () => 'Leading slot' } }],
    ['with title slot', { slots: { title: () => 'Title slot' } }],
    ['with description slot', { slots: { description: () => 'Description slot' } }],
    ['with close slot', { slots: { close: () => 'Close slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ToastProps, slots?: Partial<ToastSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, ToastWrapper)
    expect(html).toMatchSnapshot()
  })
})
