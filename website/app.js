/* Global Variables */
let apiKey = '&appid=c5ad668ce83996097be03bea8d61d985' // Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

//Create a new data instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element
const generate = document.querySelector('#generate');

generate.addEventListener('click', performAction);

/* Function called by event listener */

function performAction(e) {
    e.preventDefault();

    //get user inputs
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    
    getApiData(baseURL, zipCode, apiKey)
        .then(function(ApiTemp) {
            // add data to POST request
            postData('/addWeatherData', { temp: ApiTemp.main.temp, date: newDate, content: content });
        }).then(function() {
            // call updateUI to update browser content
            updateUI()
        })

}

/* Function to GET Web API Data*/
const getApiData = async(baseURL , zipCode , apiKey) =>{
    const res = await fetch(baseURL+zipCode+apiKey+'&units=metric');
    try{
        const apiTemp = await res.json();
        return apiTemp
    }catch(error){
        console.log('error' , error);
    }
}


/* Function to POST data */
const postData = async ( url = '', data = {}) =>{
    console.log(data); //test
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content
        }), //body data type must match 'Content-type' header
    });

    try{
        const newData = await response.json();
        console.log(newData)
        return newData;
    }catch(error){
        console.log('error' , error);
    }
};


/* Function to GET Project Data */
//Include in the async function to retrieve that app's data on the client side
/* update UI */

const updateUI = async() =>{
    const req = await fetch('/all')
    try{
        const allData = await req.json();

        document.querySelector('#date').innerHTML = `Date:  ${allData.date}`;
        document.querySelector('#temp').innerHTML = `Temprature:  ${allData.temp} C`;
        document.querySelector('#content').innerHTML = `Feelings:  ${allData.content}`;
    }catch(error){
        console.log('error' , error)
    }
}

// Function To Convert Temp From Kelvin To Celsius == units=metric

// const convertKelvinToCelsius = (kelvin) =>{
//     if(kelvin < (0)){
//         return '(0 k)'
//     }else{
//         return (kelvin - 273.15).toFixed();
//     }
// }