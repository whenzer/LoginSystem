const btnLogin = document.getElementById('dboardLogin');
const btnBackLogin = document.getElementById('btnBackLogin');
const btnSignin = document.querySelector('.sign-in-btn');
const btnSignup = document.querySelector('.sign-up-btn');
const errorText = document.getElementById('errorText');
const rErrorText = document.getElementById('rErrorText');

btnLogin?.addEventListener('click', ()=>{
    window.location.href = '/login';
});
btnBackLogin?.addEventListener('click', ()=>{
    window.location.href = '/';
});

btnSignin?.addEventListener('click', (event)=>{
    event.preventDefault();
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    fetch('/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(res =>{
        if(!res.ok){
            return res.json().then(err => {throw err})
        }
        return res.json();
    }).then(data =>{
        console.log('login success!')
        window.location.href = '/';
    }).catch(e =>{
        errorText.textContent = e.error;
    })
});
btnSignup?.addEventListener('click', (event)=>{
    event.preventDefault();
    const username = document.getElementById('rUsername')?.value;
    const password = document.getElementById('rPassword')?.value;
    const confirmPassword = document.getElementById('rCPassword')?.value;
    const email = document.getElementById('rEmail')?.value;
    fetch('/register', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, confirmPassword, email})
    }).then(res =>{
        if(!res.ok){
            return res.json().then(err => {throw err})
        }
        return res.json();
    }).then(data =>{
        console.log('signup success!')
        window.location.href = '/';
    }).catch(e =>{
        rErrorText.textContent = e.error;
    })
});