const form = document.getElementById('form')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('psw').value

  let data = { email, password }

  signIn(data)

  const tk = () => console.log(sessionStorage.getItem('jwtToken'))

  setTimeout(tk, 1000)

  // console.log(`jwt para o chat ${jwt}`)
})

function signIn(data) {
  axios.post('http://localhost:3001/login', data
  ).then((res) => {
    const token = res.data
    // const acessToken = window.sessionStorage.accessToken = res.data // funcionou
    sessionStorage.setItem('jwtToken', token) // funcionou
  }).catch((err) => {
    console.log(err)
  })
}

function goToChat(token) {
  axios.get('http://localhost:3001/chat', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    console.log('Deu certo')
    // window.location.href = 'http://localhost:3001/chat'
  }).catch((err) => {
    console.log('Deu erro')
  })
}