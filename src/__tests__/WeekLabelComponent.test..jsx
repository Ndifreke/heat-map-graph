import React from 'react'
import WeekLabel from '../components/WeekDaysLabel'
import { shallow } from '../../setupTest'

describe("Weeks Component test", () => {

    it("should dynamically appropriate week start day", () => {
        const wrapper = shallow(<WeekLabel firstYearDate={{ getDay: () => 4 }} />)
        const nodes = wrapper.find("li")
        nodes.forEach((node, i) => {
            switch (i) {
                case 0: expect(node.props().children).toBe("Thu")
                    break;
                case 1: expect(node.props().children).toBe("Fri")
                    break;
                case 2: expect(node.props().children).toBe("Sat")
                    break;
                case 3: expect(node.props().children).toBe("Sun")
                    break;
                case 4: expect(node.props().children).toBe("Mon")
                    break;
                case 5: expect(node.props().children).toBe("Tue")
                    break;
                case 6: expect(node.props().children).toBe("Wed")
                    break;
            }
        })
    })

})