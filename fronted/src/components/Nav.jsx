import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { StyledLink} from "baseui/link";
import {Link} from "react-router-dom";
import {Button} from "baseui/button";
const Nav = (props) => {
    return (

    <HeaderNavigation>
        <NavigationList $align={ALIGN.left}>
            <NavigationItem>Animal Adoption</NavigationItem>
        </NavigationList>
        {(props.user && !props.user.id)?
        <NavigationList $align={ALIGN.center}>
            <NavigationItem>
                <StyledLink $as={Link}  to="/sign-up">Sign up</StyledLink>
            </NavigationItem>
            <NavigationItem>
                <StyledLink $as={Link} to="/sign-in">sign in</StyledLink>
            </NavigationItem>
        </NavigationList>:
            <NavigationList $align={ALIGN.right} >
                <NavigationItem>
                    <StyledLink $as={Link} to="/">Home</StyledLink>
                </NavigationItem>

                <NavigationItem>

                    <Button
                        onClick={() => {
                            localStorage.setItem("token", "");
                            props.setUserData({})
                            }
                        }
                    >logout</Button>
                </NavigationItem>

            </NavigationList>

        }

    </HeaderNavigation>
    )
}
export default Nav;
