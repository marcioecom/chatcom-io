const socket = io();

const sendMessage = document.querySelector("#send_message_button")
const screen = document.querySelector(".container")
const text = document.getElementById("message_user");

function createMessage(msg) {
  const name = 'Márcio'

  let messageItem = document.createElement('div')
  messageItem.innerHTML += `<div class="user_right">
    <div class="user_sender">
      <span class="name">${name}</span>
      <span class="sender message">
        ${msg}
        <!-- <label class="date">{{date}}</label> -->
      </span>
    </div>
  </div>`

  screen.appendChild(messageItem)
}

sendMessage.addEventListener("click", (event) => {
  socket.emit('chat message', text.value)
  text.value = ''
});

socket.on('chat message', (msg) => {
  createMessage(msg)

  window.scrollTo(0, document.body.scrollHeight)
})

socket.on('entrou', () => {
  console.log('usuario entrou')

  let item = document.createElement('li')
  item.textContent = 'usuario entrou'
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

// socket.on("client_list_all_messages", messages => {

//   var template_sender = document.getElementById('sender-template').innerHTML
//   var template_receiver = document.getElementById('receiver-template').innerHTML

//   messages.forEach(message => {
//     const rendered = Mustache.render(template_sender, {
//       message: message.text,
//       email
//     })

//     // document.getElementById('messages').innerHTML += rendered
//     // const rendered = Mustache.render(template_receiver, {
//     //   message_admin: message.text
//     // })

//     document.getElementById('messages').innerHTML += rendered
//   });

// })
