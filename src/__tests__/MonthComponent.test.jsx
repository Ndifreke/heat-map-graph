import React from 'react'
import MonthComponent from '../components/MonthComponent'
import { shallow } from '../../setupTest'

describe("Month Component", () => {
    it("should render a month with with matching month name", () => {
        const wrapper = shallow(<MonthComponent transaction={5} monthId={5} />)
        expect(wrapper.containsMatchingElement(<div className="month-label">Jun</div>)).toBeTruthy()
    })
})
