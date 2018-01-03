import { shallow, createLocalVue } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vuex from 'vuex'
import Item from '@/components/Todo/Item'

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  addTodo: jest.fn()
}

const store = new Vuex.Store({actions})

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

  it('should validate if the name is blank', () => {
    const wrapper = shallow(Item, {
      propsData: {
        todo: {
          status: true,
          desc: null
        }
      },
      store,
      localVue
    })
    const input = wrapper.find('input')
    input.trigger('blur')
    expect(actions.addTodo).not.toHaveBeenCalled()
  })

  it('should call the method addTodo', () => {
    const wrapper = shallow(Item, {
      propsData: {
        todo: {
          status: true,
          desc: null
        }
      },
      store,
      localVue
    })
    const input = wrapper.find('input')
    wrapper.setData({todo: {desc: 'Meu teste'}})
    input.trigger('blur')
    expect(actions.addTodo).toHaveBeenCalled()
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
