import React, {CSSProperties} from "react";
import rmpData from "./newrmpdata.json";

const style = {

    backgroundColor: '#D9CAE5',
    width : 'auto',
    display:'block',
    fontSize: '15px',
    padding: '15px',
    marginBottom: '20px'


}


const Recitations = ({data}) => {

    let instructorElements : JSX.Element[] = [];

    for (let j = 0; j <data.instructors.length; j ++ ){
        instructorElements.push(
            <div>
                <strong>{data.instructors[j]}</strong>
            </div>

        );
        const instructorNames = data.instructors[j].split(' ');

        const result = rmpData.find(o => (o.firstName.includes(instructorNames[0]) || instructorNames[0].includes(o.firstName)) && o.lastName.includes(instructorNames[instructorNames.length-1]));

        const resultRating = result?.currentRating ?? 'Not Found';
        // console.log(resultRating);
        const rmpLink = resultRating !== 'Not Found' ? `https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${result?.rmpid}&showMyProfs=true`: '/';

        const ratingColor = (rating) => {

            const ratingFloat =parseFloat(rating);

            if (ratingFloat >= 4) {
                return '#003300';
                // light green
            } else if (ratingFloat >= 3 ) {
                return '#993300';
            } else if (ratingFloat <3) {
                return '#480000 ';
                // light red
            } else if (rating === 'No Rating'){
                return '#585858';
            }else {
                return '#383838';
            }



        }

        const linkStyle : CSSProperties = {
            pointerEvents:  resultRating !== 'Not Found' ? 'auto': 'none',
            color: ratingColor(resultRating),
            fontSize:'15px'
        }
        instructorElements.push(<a  href={rmpLink} >
            <text style = {linkStyle}> RMP: {resultRating} </text>
        </a>);
    }



    const registrationNumber = data.registrationNumber;
    const sectionCode = data.code;
    const type = data.type;
    const status = data.status;
    // const timing = '';
    const campus = data.campus;
    const buildingName = data.location;
    const units = data.maxUnits.toString();
    const notes = data.notes;

    let statusColor;
    switch (status) {
        case 'Closed':
            statusColor   = 'red';
            break;
        case 'Open':
            statusColor   = 'green';
            break;
        case 'WaitList':
            statusColor   = '#ff8c00';
            break;
        default:
            statusColor   = 'black';
            break;
    }




    return(
        <div className='flex-column  align-items-start' style={style}>

            <div className={'row justify-content-between'} style={{fontSize:'20',
                textAlign:'left',
                marginBottom:'20px',
                paddingLeft: '15px',
                paddingRight: '15px',
            }}>
                <div>Recitation <strong>{sectionCode}</strong></div>
                <div>Status:  <strong style={{color:statusColor}}> {status} </strong></div>
            </div>


            <div className='row justify-content-between' style = {{ textAlign: 'left',paddingLeft: '15px',
                paddingRight: '15px',paddingBottom:'25px'}}>
                <div>Instructor  {instructorElements}</div>

                <div className = 'col'>
                    <div>Campus</div>
                    <div style={{fontWeight:'bold'}}>{campus}</div>
                </div>
                <div className = 'col'>
                    <div>Room</div>
                    <div style={{fontWeight:'bold'}}>{buildingName}</div>
                </div>
                <div className = 'col'>
                    <div>Units</div>
                    <div style={{fontWeight:'bold'}}>{units}</div>
                </div>
                <div className = 'col'>
                    <div>Type</div>
                    <div style={{fontWeight:'bold'}}>{type}</div>
                </div>
                <div className = 'col'>
                    <div>Registration #</div>
                    <div style={{fontWeight:'bold'}}>{registrationNumber}</div>
                </div>

                <div className = 'col' >
                    <div> Timing</div>
                    <div style={{fontWeight:'bold'}}> TODO: WRITE TIME PARSING FUNCTION</div>

                </div>

            </div>

            <div className={'justify-contents-start'} style ={
                {textAlign:'justify',
                }
            }>{notes}</div>


        </div>

    );
}

export default Recitations;
