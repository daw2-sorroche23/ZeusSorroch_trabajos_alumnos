 import { formEditarPerfil } from './formEditarPerfil.js'
 import { User } from '../bd/user.js'
 import { Perfil } from '../bd/perfil.js'
 import { menuSuperior } from './menuSuperio.js'
 import { menuUsuario } from './menuUsuario.js'

export const header = {
  template: `
  
<!-- Navbar  -->
<nav class="navbar navbar-expand-sm bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="#/home">
      <img
        src="../assets/logo.svg"
        alt="Logo"
        width="30"
        height="30"
        class="d-inline-block align-text-top me-2"
      />
      <span class=""></span>
      Vanilla Games
    </a>
    
    <button
      class="navbar-toggler ms-auto
      "
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
    <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Menú superior -->
    ${menuSuperior.template}
    <!-- Menu usuario -->
    ${menuUsuario.template}
  </div>
</nav>

//Modals
${formEditarPerfil.template}
  `,
  script: async () => {
    try {
      // Capturamos los datos del usuario logueado
      const usuarioLogueado = await User.getUser()
      if (usuarioLogueado) {
        const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
        // cargamos el menú superior y usuario para su rol
        menuSuperior.script(perfilLogueado)
        menuUsuario.script(perfilLogueado)
      } else {
        menuSuperior.script('anonimo')
        menuUsuario.script('anonimo')
      }
    } catch (error) {
      console.log(error)
      //alert('No he podido cargar el usuario logueado')
    }
      // Gestionamos click en editar perfil
      document.querySelector('#editarPerfil').addEventListener('click', (e) => {
        e.preventDefault()
        formEditarUsuario.script()
      })
  }
}