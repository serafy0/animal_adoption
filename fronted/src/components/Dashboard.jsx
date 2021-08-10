import React, {useEffect, useState} from 'react';
import {Button} from 'baseui/button';
import ChevronDown from 'baseui/icon/chevron-down';
import ChevronRight from 'baseui/icon/chevron-right';
import {withStyle, useStyletron} from 'baseui';
import {
    StyledTable,
    StyledHeadCell,
    StyledBodyCell,
} from 'baseui/table-grid';

const settings = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
};

const confirmAdoption= async (animal_id,user_id)=>{
    const data = await fetch(`http://localhost:3001/adopt/${animal_id}/${user_id}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }
    );

    if(data.ok) {
        console.log("adoption done with",animal_id,user_id)
    }
}
const fetchAnimalsAddedByUser = async (setAnimals)=>{
    const data = await fetch("http://localhost:3001/my-animals", settings
    );
    if(data.ok) {
        const animals_added = await data.json()
        console.log("animals_added",animals_added)
        const animals_array =[]
        animals_added.forEach((animal)=>{
            console.log("animal_in_map",animal)
            animals_array.push([animal.name,animal.description,animal.type,animal.age,animal.address,(animal.adopted?"adopted":"not adopted"),animal.applicants,animal.id])
        })
        console.log("animals_array",animals_added)

        setAnimals(animals_array)
        console.log(animals_added)
    }

}

function Applicants(props) {
    const [css] = useStyletron();
    return (
        <div
            className={css({
                gridColumn: 'span 5',
                padding: '32px 24px',
            })}
        >
            <StyledTable
                role="grid"
                $gridTemplateColumns="max-content auto auto auto"
            >
                <div role="row" className={css({display: 'contents'})}>
                    <StyledHeadCell $sticky={false}>first name</StyledHeadCell>
                    <StyledHeadCell $sticky={false}>last name</StyledHeadCell>
                    <StyledHeadCell $sticky={false}>email</StyledHeadCell>
                    <StyledHeadCell $sticky={false}>adopt</StyledHeadCell>
                </div>
                {props.applicants.map((applicant, index) => {
                    console.log("task",applicant)
                    return (
                        <div role="row" className={css({display: 'contents'})}>
                            <StyledBodyCell>
                                {applicant.firstName}

                            </StyledBodyCell>
                            <StyledBodyCell>
                                {applicant.lastName}

                            </StyledBodyCell>
                            <StyledBodyCell>
                                {applicant.email}
                            </StyledBodyCell>
                            <StyledBodyCell>
                                {(!props.adopted)?
                                    <Button
                                        onClick={confirmAdoption(props.animal_id,applicant.id)}
                                    >
                                        accept adoption
                                    </Button>: null
                                }
                            </StyledBodyCell>
                        </div>
                    );
                })}
            </StyledTable>
        </div>
    );
}
const CenteredBodyCell = withStyle(StyledBodyCell, {
    display: 'flex',
    alignItems: 'center',
});
function Row({striped, row}) {
    const [css] = useStyletron();
    const [expanded, setExpanded] = useState(false);

    return (
        <div role="row" className={css({display: 'contents'})}>
            <CenteredBodyCell $striped={striped}>
                <Button
                    size="compact"
                    kind="minimal"
                    onClick={() => setExpanded(!expanded)}
                    shape="square"
                >
                    {expanded ? (
                        <ChevronDown size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </Button>
                {row[0]}
            </CenteredBodyCell>
            <CenteredBodyCell $striped={striped}>
                {row[4]}
            </CenteredBodyCell>
            <CenteredBodyCell $striped={striped}>
                {row[1]}
            </CenteredBodyCell>

            <CenteredBodyCell $striped={striped}>
                {row[2]}
            </CenteredBodyCell>
            <CenteredBodyCell $striped={striped}>

                {row[5]}
            </CenteredBodyCell>
            {expanded && <Applicants applicants={row[6]} adopted={row[5]} animal_id={row[7]} />}
        </div>
    );
}
export default function Example() {
    const [css] = useStyletron();
    const [animals, setAnimals] = useState([]);
    useEffect( () => {

        fetchAnimalsAddedByUser(setAnimals);
    }, []);
    console.log("animls",animals)

    return (
        <div className={css({height: '600px'})}>
            <StyledTable
                role="grid"
                $gridTemplateColumns="max-content min-content minmax(300px, max-content) max-content auto"
            >
                <div role="row" className={css({display: 'contents'})}>
                    <StyledHeadCell>name</StyledHeadCell>
                    <StyledHeadCell>address</StyledHeadCell>
                    <StyledHeadCell>desc</StyledHeadCell>
                    <StyledHeadCell>type</StyledHeadCell>
                    <StyledHeadCell>status</StyledHeadCell>
                    {/*animals_array.push([animal.name,animal.description,animal.breed,animal.age,animal.address,(animal.adopted?"adopted":"not adopted"),animal.applicants,animal.id])*/}

                </div>
                {animals.map((row, index) => {
                    console.log("row",index,row)
                    const striped = index % 2 === 0;
                    return <Row key={index} row={row} striped={striped} />;
                })}
            </StyledTable>
        </div>
    );
}
