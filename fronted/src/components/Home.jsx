import { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import AnimalForm from "./AnimalForm";
import {Grid, Cell} from 'baseui/layout-grid';
import {
  useSnackbar,
} from 'baseui/snackbar';
import {Check} from "baseui/icon";
import {Block} from "baseui/block";
import {H1, H3} from "baseui/typography";
const Home = (userData) => {
  const {enqueue} = useSnackbar();
  const [animal, setAnimal] = useState({
    name: "",
    description: "",
    age: 0,
    type:"",
    breed: "",
    address: "",
    animal_img:null,
    postedById:{}

  });
  const [animals, setAnimals] = useState(null);
  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };
  const uploadFile = (e) => {
    setAnimal({ ...animal, ["animal_img"]: e[0] });
    console.log(e)
  };


  useEffect(() => {

    const fetchAnimals= async () => {
      const data = await fetch("http://localhost:3001/animals", {
      });
      const animals = await data.json();
      setAnimals(animals);
    };
    fetchAnimals();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    for(let property in animal){
      formData.append(property, animal[property]);
      console.error(property)
    }
    console.error("-----",animal)
    const settings = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    };
    try {
      const fetchResponse = await fetch(
        `http://localhost:3001/add-animal`,
        settings
      );
      enqueue({
        message: 'announcement added',
        startEnhancer: ({size}) => <Check size={size} />,
      })

      const data = await fetchResponse.json();
      animals.push(data)
      setAnimal({ ...animal, [e.target.name]: e.target.value }); // i have no idea why it works

      return data;
    } catch (e) {
      return e;
    }
  };
  console.log(animals)
  return (

      <div>
      {userData.firstName ? (
        <div>
          <H1>Welcome {userData.firstName}</H1>
          {animals ? (
            <div>
              <H3>All Animals</H3>
              <Grid
              >
              {animals.map((animal) => (
                    <Cell span={[4]}>
                      <AnimalCard user={userData} animal={animal}
                      en={enqueue}
                      >

                      </AnimalCard>
                    </Cell>


                ))}
              </Grid>


            </div>
          ) : (
            <H3>no animals to show</H3>
          )}

          <Block/>
          <Grid >

            <Cell >
            </Cell>
            <Cell  span={6}>
           <AnimalForm upload={uploadFile} handleSubmit={handleSubmit} handleChange={handleChange} animal={animal}  ></AnimalForm>
            </Cell>
            <Cell>
            </Cell>

          </Grid>
        </div>
      ) : (
        <H1>Please sign in</H1>
      )}
    </div>

  );
};
export default Home;
