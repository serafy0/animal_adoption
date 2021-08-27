import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Button} from 'baseui/button';
import {useStyletron} from "baseui";
import {Accordion, Panel} from "baseui/accordion";
import AnimalForm from "./AnimalForm";
import {useState} from "react";
import {Check} from "baseui/icon";

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

const requestAdoption= async(id,en)=>{
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    try {
        const fetchResponse = await fetch(
            `http://localhost:3001/request-adoption/${id}`,
            settings
        );
        if(fetchResponse.ok){
            en({
                message: "adoption request sent!",
                startEnhancer: ({size}) => <Check size={size} />,

            })
        }
    } catch (e) {

         console.log(e)
    }

}
const editAnimal= async(id,new_animal)=>{
    const formData = new FormData()
    for(let property in new_animal){
        formData.append(property, new_animal[property]);
        console.error(property)
    }

        const settings = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
            body: formData

        };
    try {
         const fetchResponse = await fetch(
            `http://localhost:3001/animal/${id}`,
            settings
        );
         return fetchResponse
    } catch (e) {

         console.log(e)
    }

}

const AnimalCard = (props) => {
    const animal =props.animal

    const [new_animal, setAnimal] = useState({
        name:animal.name,
        description: animal.address,
        age: animal.age,
        type:animal.address,
        breed: animal.address,
        address: animal.address,
        animal_img:animal.animal_img,
        adopted:animal.adopted

    })

    const [cardAnimal, updateCard] = useState(animal)
        const handleChange = (e) => {
        setAnimal({ ...new_animal, [e.target.name]: e.target.value });
    };
    const uploadFile = (e) => {
        setAnimal({ ...new_animal, ["animal_img"]: e[0] });
        console.log(e)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await editAnimal(animal.id,new_animal)
        props.en({
            message: "animal was edited",
            startEnhancer: ({size}) => <Check size={size} />,

        })

        updateCard(new_animal)

    };




    return (
        <div>
        <Inner>
        <Card
            overrides={{Root: {style: {width: '328px'}}}}
            title={cardAnimal.name}
            headerImage={`http://localhost:3001/image/${animal.id}`}
        >
            <StyledBody>
                {cardAnimal.description}
            </StyledBody>
            <Accordion
                onChange={({ expanded }) => console.log(expanded)}
            >
                <Panel title="more">
                    <StyledBody>
                        age: {cardAnimal.age}
                    </StyledBody>
                    <StyledBody>
                        type: {cardAnimal.type}
                    </StyledBody>
                    <StyledBody>
                        address: {cardAnimal.address}
                    </StyledBody>
                </Panel>
            </Accordion>
            <StyledAction>
                {props.user.id == animal.postedById ?
                    <Accordion onChange={({ expanded }) => console.log(expanded)}>
                        <Panel title="edit">
                        <AnimalForm upload={uploadFile} handleSubmit={handleSubmit} handleChange={handleChange}  animal={new_animal}/>
                    </Panel>

                    </Accordion>
                    :
                    <Button
                        onClick={() => requestAdoption(animal.id,props.en)}
                        overrides={{BaseButton: {style: {width: '100%'}}}}
                        disabled={animal.adopted}
                    >
                        {animal.adopted? "adopted":"adopt me"}
                    </Button>

                }
            </StyledAction>

        </Card>
        </Inner>
        </div>
    )
}

export default AnimalCard;
