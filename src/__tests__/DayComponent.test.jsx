import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import DayComponent, { COLOR_RANGE } from '../components/DayComponent'

describe("Day Component", () => {

    const props = { dailyAmounts: { "2019-03-31": 700 }, peakTransaction: 500, date: "2019-03-31" }
    it("it should render without errors", () => {
        const div = document.createElement('div');
        ReactDOM.render(<DayComponent {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it("it should render appropriate title for a day", () => {
        const daycomponent = shallow(<DayComponent {...props} />)
        const wrapper = daycomponent.find("li")
        expect(wrapper.props().title).toBe(
            new Date(props.date).toDateString()
                .concat(` $${(700).toFixed(2)}`)
        )
    })

    it("should determine the color for lower churn", () => {
        const dailyAmounts = { dailyAmounts: { "2019-03-31": 10 } } 
        const daycomponent = mount(<DayComponent {...Object.assign({}, props, dailyAmounts)} />)
        const dayWrapper = daycomponent.find("li")
        const { style } = dayWrapper.props().children.props
        expect(style.background).toBe(COLOR_RANGE.low.style.background)
    })

    it("should determine the color for midLow churn", () => {
        const dailyAmounts = { dailyAmounts: { "2019-03-31": 249 } } 
        const daycomponent = mount(<DayComponent {...Object.assign({}, props, dailyAmounts)} />)
        const dayWrapper = daycomponent.find("li")
        const { style } = dayWrapper.props().children.props
        expect(style.background).toBe(COLOR_RANGE.midLow.style.background)
    })

    it("should determine the color for midHigh churn", () => {
        const dailyAmounts = { dailyAmounts: { "2019-03-31": 300 } }  
        const daycomponent = mount(<DayComponent {...Object.assign({}, props, dailyAmounts)} />)
        const dayWrapper = daycomponent.find("li")
        const { style } = dayWrapper.props().children.props
        expect(style.background).toBe(COLOR_RANGE.midHigh.style.background)
    })

        it("should determine the color for high churn", () => {
            const dailyAmounts = { dailyAmounts: { "2019-03-31": 450 } }  
            const daycomponent = mount(<DayComponent {...Object.assign({}, props, dailyAmounts)} />)
            const dayWrapper = daycomponent.find("li")
            const { style } = dayWrapper.props().children.props
            expect(style.background).toBe(COLOR_RANGE.high.style.background)
        })
    
})
