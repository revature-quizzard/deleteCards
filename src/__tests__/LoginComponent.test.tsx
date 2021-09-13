import { Typography } from '@material-ui/core';
import {shallow, mount} from 'enzyme';
import LoginComponent from "../components/LoginComponent";
import ErrorMessageComponent from '../components/ErrorMessageComponent';

// Jest's describe function creates a test suite for grouping any number of test cases (optional)
describe('LoginComponent Test Suite', () => {

    // Jest's beforeAll method is a function that runs once before all test cases in this suite have ran
    // Jest's afterAll method is a function that runs once after all test cases in this suite have ran
    // Jest's beforeEach method is a function that runs before each test case in this suite runs
    // Jest's afterEach method is a function that runs after each test case in this suite runs

    afterEach(() => {
        jest.resetAllMocks();
    });

    // Jest's test function (alternative: it function) takes a description string and a function that will be our test case

    it('LoginComponent renders successfully', () => {

        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        // Use Enzyme's shallow function to render only the specified component (not any of its children)
        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn} />);

        // Jest's expect function is similar to the Assert class and its methods from JUnit.
        expect(wrapper).toBeTruthy;
    })

    it('Renders the login header', () => {
        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn} />);

        // Verify that given tsx is rendered
        // Note: This is from the Bookstore UI, so obv it will not be rendered unless Login is changed
        const expectedHeader = <Typography align='center' variant='h4'>Log In</Typography>

        // Using the wrapper instance, in conjunction with Jest's expect function, we can check that certain
        // aspects of our component were rendered properly
        expect(wrapper.contains(expectedHeader)).toEqual(true);
    })

    it('Username and password fields start empty', () => {
        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        const wrapper = shallow(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn} />);

        console.log(wrapper)

        // The ShallowWrapper instance exposes a find method that can be used to query the rendered component 
        // It returns another instance of ShallowWrapper, containing the selected DOM element
        let usernameInputWrapper = wrapper.find('#username-input');
        let passwordInputWrapper = wrapper.find('#password-input');

        // For debugging purposes, it's useful to see what the wrapper objects contain.
        // For this, we use ShallowWrappper's debug method
        console.log(usernameInputWrapper.debug());
        console.log(usernameInputWrapper.getElement);
        console.log(usernameInputWrapper.debug());

        expect(usernameInputWrapper.getElement).toBe('');
        expect(passwordInputWrapper.text()).toBe('');
    });

    it('Clicking login button with missing form field values displays error message', () => {
        // Mock up the props
        let mockUser = undefined;
        let mockSetUserFn = jest.fn();

        // We need to use Enzyme's mount function so that child components are rendered
        const wrapper = mount(<LoginComponent currentUser={mockUser} setCurrentUser={mockSetUserFn} />);

        let loginButtonWrapper = wrapper.find('#login-btn').at(0);

        console.log(loginButtonWrapper.debug());

        loginButtonWrapper.simulate('click');

        let expectedErrorComponent = <ErrorMessageComponent errorMessage={'You must provide a username and a password!'}/>;
        
        expect(wrapper.contains(expectedErrorComponent)).toBe(true);
    })

})