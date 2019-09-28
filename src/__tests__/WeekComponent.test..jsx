import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
import WeekLabel from '../components/WeekDaysLabel'

describe("Weeks Component test", () => {

    it("should appropriate week start day", () => {
        const component = mount(<WeekLabel firstYearDate={{ getDate: () => 5 }} />)
        console.log(component.debug())

    })

})