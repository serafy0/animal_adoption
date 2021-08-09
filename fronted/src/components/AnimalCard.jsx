import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Button} from 'baseui/button';
import {useStyletron} from "baseui";
import {Accordion, Panel} from "baseui/accordion";
import AnimalForm from "./AnimalForm";
import {useState} from "react";

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

const requestAdoption= async(id)=>{
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

    console.error(JSON.stringify(new_animal))
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
        animal_img:animal.animal_img

    })
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
        props.en({})
    };




    return (
        <div>
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
                {props.user.id == animal.postedById ?
                    <Accordion onChange={({ expanded }) => console.log(expanded)}>
                        <Panel title="edit">
                        <AnimalForm upload={uploadFile} handleSubmit={handleSubmit} handleChange={handleChange}  animal={new_animal}/>
                    </Panel>

                    </Accordion>
                    :
                    <Button
                        onClick={() => requestAdoption(animal.id)}
                        overrides={{BaseButton: {style: {width: '100%'}}}}>
                        adopt me
                    </Button>
                }
            </StyledAction>
        </Card>
        </Inner>
        </div>
    )
}

export default AnimalCard;
