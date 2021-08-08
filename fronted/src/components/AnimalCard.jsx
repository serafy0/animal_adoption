import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Button} from 'baseui/button';
import {useStyletron} from "baseui";
import {Accordion, Panel} from "baseui/accordion";
const Inner = ({children}) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '.24rem',

            })}
        >
            {children}
        </div>
    );

}
function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
const AnimalCard = (props) => {
    const animal =props.animal

    const image = animal.animal_img?'data:image/jpeg;base64,' + hexToBase64(animal.animal_img):null;
    return (
        <Inner>
        <Card
            overrides={{Root: {style: {width: '328px'}}}}
            title={animal.name}
            headerImage={`http://localhost:3001/image/${animal.id}`}
        >
            <StyledBody>
                {animal.description}
            </StyledBody>
            <Accordion
                onChange={({ expanded }) => console.log(expanded)}
            >
                <Panel title="more">
                    <StyledBody>
                        age: {animal.age}
                    </StyledBody>
                    <StyledBody>
                        type: {animal.type}
                    </StyledBody>
                    <StyledBody>
                        address: {animal.address}
                    </StyledBody>
                </Panel>
            </Accordion>
            <StyledAction>
                <Button overrides={{BaseButton: {style: {width: '100%'}}}}>
                    adopt me
                </Button>
            </StyledAction>
        </Card>
        </Inner>
    )
}

export default AnimalCard;
