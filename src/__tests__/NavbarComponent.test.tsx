import {shallow, mount} from 'enzyme';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { NavbarComponent } from '../components/NavbarComponent';

describe('NavbarComponent Test Suite', () => {


    afterEach(() => {
        jest.resetAllMocks();
    });

    it('NavbarComponent renders successfully', () => {
        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<NavbarComponent currentUser={mockUser} setCurrentUser={mockSetUserFn} />);

        expect(wrapper).toBeTruthy;
    });

    it('Navbar renders home and logout if logged in', () => {
        // Mock up the props
        let mockUser = {
            id: 'valid',
            username: 'valid',
            token: 'valid'
        };
        let mockSetUserFn = jest.fn();

        const wrapper = mount(<Router><NavbarComponent currentUser={mockUser} setCurrentUser={mockSetUserFn} /></Router>);

        expect(wrapper.find('#home')).toBeTruthy;
        expect(wrapper.find('#logout')).toBeTruthy;
        expect(wrapper.find('#login')).toBeFalsy;
        expect(wrapper.find('#register')).toBeFalsy;

    });

    it('Navbar renders login and register if logged out', () => {
        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = mount(<Router><NavbarComponent currentUser={mockUser} setCurrentUser={mockSetUserFn} /></Router>);

        expect(wrapper.find('#home')).toBeFalsy;
        expect(wrapper.find('#logout')).toBeFalsy;
        expect(wrapper.find('#login')).toBeTruthy;
        expect(wrapper.find('#register')).toBeTruthy;
    });
})