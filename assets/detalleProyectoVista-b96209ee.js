import { s as supabase, P as Perfil } from "./main-fb627027.js";
import { P as Proyecto } from "./proyecto-e3f995b4.js";
class Comentario {
  // Mapping de propiedades de la tabla perfiles
  constructor(id = null, created_at = null, comentario2 = null, proyecto_id = null, user_id = null) {
    this.id = id;
    this.created_at = created_at;
    this.nota = comentario2;
    this.proyecto_id = proyecto_id;
    this.user_id = user_id;
  }
  // leer todos en orden descendiente a como se han creado
  static async getAll() {
    const { data: comentarios, error } = await supabase.from("notas").select("*").order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return comentarios.map(({ id, created_at, comentario: comentario2, proyecto_id, user_id }) => {
      return new Nota(id, created_at, comentario2, proyecto_id, user_id);
    });
  }
  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById(id) {
    const { data: nota, error } = await supabase.from("comentarios").select("*").eq("id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Comentario(comentario.id, comentario.created_at, comentario.comentario, comentario.proyecto_id, comentario.user_id);
  }
  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId(id) {
    const { data: comentario2, error } = await supabase.from("comentarios").select("*").eq("user_id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Comentario(comentario2.id, comentario2.created_at, comentario2.comentario, comentario2.proyecto_id, perfil.user_id, comentario2.user_id);
  }
  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create(notaData) {
    const { error } = await supabase.from("comentarios").insert(notaData).select();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  // actualizar
  async update() {
    const { error } = await supabase.from("comentarios").update({
      comentario: this.comentario
    }).eq("id", this.id).single();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  // borrar
  static async delete(id) {
    const { error } = await supabase.from("comentarios").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
}
const detalleProyectoVista = {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <a href="#/proyectos" class="btn btn-outline-secondary btn-sm">< Proyectos</a>
      <h1 id="nombre_proyecto" class="w-100 text-center p-2"></h1>
      <div class="d-flex justify-content-center m-5">
       <h1 id="titulo"></h1> 
      </div>
    </div>
    <!-- DAtos proyecto -->
    <div class="col-12 col-md-4 mt-2">
      <h5> Información general: </h5>
      <p>Autor: <span id="autor_proyecto" class="text-center p-2"></span></p>
      <p>Enlace: <a id="enlace_proyecto" class="text-center p-2" target="_black">Link a mi proyecto</a></p>
      <h5>Descripción:</h5>
      <p id="descripcion_proyecto"></p>
    </div>
    <!-- Valoracion   -->
    <div class="col-12 col-md-8">
      <div class="row">
        <div class="col-12 col-xl-6 mt-2">
        <div class="d-flex justify-content-between">
          <h5>Valoración alumnos:</h5>
          <input title="Enviar nota" id="notaMedia" class=" w-25 ms-auto me-2 text-center fw-bold btn-sm mb-2" value="6.0"></input>
          <button title="Enviar nota" id="notaMedia" class="btn btn-warning text-dark fw-bold btn-sm mb-2" >Enviar nota</button>
        </div>  
        

          <div id="valoracion">
            <!-- Aqui van los criterios y las estrellas -->
          </div>
          
        </div>
        <div class="col-12 col-xl-6 mt-3 ">
          <h5>Tu valoración:</h5>
          <div id="valoracionPersonal">
            <!-- Aqui van los criterios y las estrellas -->
            
          </div> 
        </div>
      </div>
    </div>
    <!-- Comentarios -->
    <div class="col-12">
      <h3>Comentarios:</h3>
      
      <form id="formComentario">
        <div class="comentario d-flex flex-wrap align-item-top bg-dark p-3">
          
            <div class="w-100 d-flex">
              <img id="imgPerfilLogueado" src="./img/avatar.svg" alt="us" class="border me-3 mt-1" style="width:50px;height:50px;">
              <textarea id="nuevoComentario" class="m-1 form-control h-75" placeholder="Escribe un comentario..." required></textarea>
            </div>
            
            <button id="btnEnviarComentario" type="submit" class="btn btn-success btn-small  ms-auto">Enviar comentario</button>
          
        </div>
      </form>
      

      <div id="comentarios">
        
    </div>
  </div>
</div>
    `,
  script: async (id) => {
    const proyecto = await Proyecto.getById(id);
    const titulo = document.querySelector("#titulo");
    const autor = document.querySelector("#autor_proyecto");
    const enlace = document.querySelector("#enlace_proyecto");
    const descripcion = document.querySelector("#descripcion_proyecto");
    const nombreAutor = await Proyecto.buscarAutor(proyecto.user_id);
    console.log(nombreAutor);
    titulo.innerHTML = proyecto.nombre;
    enlace.innerHTML = proyecto.enlace;
    descripcion.innerHTML = proyecto.descripcion;
    autor.innerHTML = nombreAutor[0].nombre_usuario;
    const boton = document.querySelector("#btnEnviarComentario");
    const comentarios = await Comentario.getAllByProjectId(proyecto.id);
    let divComentarios = '<div id="divComentario" class="comentario d-flex flex-wrap align-item-top bg-dark">';
    for (const comentario2 of comentarios) {
      const autor2 = await Perfil.getById(comentario2.id);
      console.log(comentario2);
      divComentarios += `
      <div class="w-100 d-flex mb-2 p-3 bg-dark">
        <div class="w-100">          
          <div class="comentario text-white"><h3>${comentario2.comentario}</h3></div>

          <p class="text-end small text-white "><h5>${autor2.nombre}</h5></p>
        </div>
      </div>
        `;
    }
    divComentarios += "</div>";
    const opiniones = document.querySelector("#comentarios");
    opiniones.innerHTML = divComentarios;
    boton.addEventListener("click", async function(e) {
      e.preventDefault();
      const comentario2 = {
        comentario: document.querySelector("#nuevoComentario").value,
        proyecto_id: proyecto.id
      };
      Comentario.create(comentario2);
    });
  }
};
export {
  detalleProyectoVista as default
};
