const socket = io();

var messages = document.getElementById('messages')
var form = document.getElementById('form')
var input = document.getElementById('input')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})

socket.on('chat message', (msg) => {
  let item = document.createElement('li')
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})

socket.on('saiu', () => {
  console.log('usuario saiu')

  let item = document.createElement('li')
  item.textContent = 'usuario saiu'
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})

socket.on('entrou', () => {
  console.log('usuario entrou')

  let item = document.createElement('li')
  item.textContent = 'usuario entrou'
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})

socket.on("client_list_all_messages", messages => {

  var template_sender = document.getElementById('sender-template').innerHTML
  var template_receiver = document.getElementById('receiver-template').innerHTML

  messages.forEach(message => {
    const rendered = Mustache.render(template_sender, {
      message: message.text,
      email
    })

    // document.getElementById('messages').innerHTML += rendered
    // const rendered = Mustache.render(template_receiver, {
    //   message_admin: message.text
    // })

    document.getElementById('messages').innerHTML += rendered
  });

})
