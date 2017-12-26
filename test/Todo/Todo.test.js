import jest from 'jest'
import { shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

import Item from '@/components/Todo/Item'

describe('Todo/Item.vue', () => {
  const todo = {status: true, desc: 'Teste 1', id: 1}
  it('renders todo for from props.todo', () => {
    const wrapper = shallow(Item, {
      propsData: { todo }
    })
    expect(wrapper.findAll('p')).toHaveLength(1)
  })

  it('render new todo from', () => {
    const wrapper = shallow(Item, {
      propsData: {
        todo: {
          status: true,
          desc: null
        }
      }
    })
    expect(wrapper.findAll('input')).toHaveLength(1)
  })

  it('matches snapshot', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Item, {
      propsData: { todo }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
