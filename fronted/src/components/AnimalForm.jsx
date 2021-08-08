import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {Button} from 'baseui/button';
import {FileUploader} from "baseui/file-uploader";


const AnimalForm = (props) => {
const animal= props.animal
    return (

        <form onSubmit={props.handleSubmit}>
            <FormControl label="name">
                <Input
                    type="text"
                    name="name"
                    required
                    value={animal.name}
                    onChange={props.handleChange}
                />
            </FormControl>
            <FormControl label="description" >
                <Input
                    type="text"
                    name="description"
                    required
                    value={animal.description}
                    onChange={props.handleChange}
                />
            </FormControl>
            <FormControl label="age" >
                <Input
                    type="number"
                    name="age"
                    value={animal.age}
                    onChange={props.handleChange}
                />
            </FormControl>
            <FormControl label="address">
                <Input
                    value={animal.address}
                    name="address"
                    onChange={props.handleChange}
                />
            </FormControl>
            <FormControl label="type">
                <Input
                    name="type"
                    value={animal.type}
                    onChange={props.handleChange}
                />
            </FormControl>
            <FormControl label="breed" >
                <Input
                    name="breed"
                    value={animal.breed}
                    onChange={props.handleChange}
                />
            </FormControl>
            <FormControl label="image" >
                <FileUploader
                    onDrop={(acceptedFiles, rejectedFiles)=>props.upload(acceptedFiles)}


                />

            </FormControl>



            <Button type="submit">Add Animal</Button>
        </form>

    );
};

export default AnimalForm;
