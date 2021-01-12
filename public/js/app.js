const weatherform = document.querySelector('form')
const search  = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

//msg1.textContent = 'From JS'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = search.value
    msg1.textContent ='Loading...'
    msg2.textContent = ''

    if(!loc){
        msg2.textContent = 'Enter the location'
    }
    else{
        const url ='/weather?address='+loc
        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    msg2.textContent = data.error
                }
                else{
                    //console.log(data)
                    msg1.textContent = data.Location
                    msg2.textContent = data.Data
                }
            
            })
        })
    }

})
 