import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import DayComponent, { COLOR_RANGE } from '../components/DayComponent'

describe("Day Component", () => {

    const props = { credit: 3, debit: 1, date: new Date() }
    it("it should render without errors", () => {
        const div = document.createElement('div');
        ReactDOM.render(<DayComponent {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it("it should render appropriate title for a day", () => {
        const daycomponent = shallow(<DayComponent {...props} />)
        const wrapper = daycomponent.find("li")
        expect(wrapper.props().title).toBe(
            props.date.toDateString()
                .concat(` $${(props.credit + props.debit).toFixed(2)}`)
        )
    })

    it("should determine the color for lower churn", () => {
        // const daycomponent = mount(<DayComponent {...props} />)
        // const wrapper = daycomponent.find("li")
        // const { style } = wrapper.props().children.props
        // expect(style.background).toBe(COLOR_RANGE.low.style.background) 
    })

    it("should determine the color for average churn", () => {
        // const props =  Object.assign(props, {})
        // const daycomponent = mount(<DayComponent {...props} />)
        // const wrapper = daycomponent.find("li")
        // const { style } = wrapper.props().children.props
        // expect(style.background).toBe("#A52A2A")
    })

    it("should determine the color for Higher churn", () => {
        // const props =  Object.assign(props, {})
        // const daycomponent = mount(<DayComponent {...props} />)
        // const wrapper = daycomponent.find("li")
        // const { style } = wrapper.props().children.props
        // expect(style.background).toBe("#A52A2A")
    })
})
