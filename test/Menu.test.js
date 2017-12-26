import Vuex from 'vuex'
import { shallow, createLocalVue } from 'vue-test-utils'
import Menu from '@/components/Menu'

const localVue = createLocalVue()
localVue.use(Vuex)

const state = {
  user: {name: null, token: null, isAuth: false}
}

describe('Menu.vue', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({state})
  })

  it('should have render corretely', () => {
    const wrapper = shallow(Menu, {
      propsData: {
        isOpen: false
      },
      store,
      localVue
    })
    expect(wrapper.findAll('.menu-button')).toHaveLength(1)
  })

  it('should have call toggle menu on button click', () => {
    const propsData = {isOpen: false}
    const wrapper = shallow(Menu, {propsData, store, localVue})
    expect(wrapper.props()).toEqual(propsData)
    wrapper.find('.menu-button').trigger('click')
    expect(wrapper.vm.isOpen).toEqual(true)
  })

  it('should have call logout action', () => {
    const methods = {logout: jest.fn()}
    const wrapper = shallow(Menu, {store, localVue, methods})
    wrapper.find('.btn.-second').trigger('click')
    expect(methods.logout).toHaveBeenCalled()
  })
})
