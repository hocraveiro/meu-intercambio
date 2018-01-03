import {shallow} from 'vue-test-utils'
import Card from '@/components/Card'

describe('Card.vue', () => {
  it('should have render correctly', () => {
    const item = 'Oh My God!'
    const wrapper = shallow(Card, {
      propsData: {item}
    })
    // console.log(wrapper.find('textarea'))
    expect(wrapper.find('textarea').element.value).toEqual(item)
  })
})
