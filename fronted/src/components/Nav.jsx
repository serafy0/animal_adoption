import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { StyledLink} from "baseui/link";
import {Link} from "react-router-dom";
const Nav = () => {
    return (

    <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
            <NavigationItem>Animal Adoption</NavigationItem>
        </NavigationList>
        <NavigationList $align={ALIGN.center}>
            <NavigationItem>
                <StyledLink $as={Link} to="/about"to="/">Home</StyledLink>
            </NavigationItem>
            <NavigationItem>
                <StyledLink $as={Link} to="/about" to="/sign-up">Sign up</StyledLink>
            </NavigationItem>
            <NavigationItem>
                <StyledLink $as={Link} to="/about" to="/sign-in">sign in</StyledLink>
            </NavigationItem>
        </NavigationList>

    </HeaderNavigation>
    )
}
export default Nav;
