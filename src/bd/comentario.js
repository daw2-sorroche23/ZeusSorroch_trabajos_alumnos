// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Comentario {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, created_at = null, comentario = null, proyecto_id = null, user_id = null) {
    this.id = id
    this.created_at = created_at
    this.nota = comentario
    this.proyecto_id = proyecto_id
    this.user_id = user_id
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: comentarios, error } = await supabase
      .from('notas')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return comentarios.map(({ id, created_at, comentario, proyecto_id, user_id }) => {
      return new Nota(id, created_at, comentario, proyecto_id, user_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: nota, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Comentario(comentario.id, comentario.created_at, comentario.comentario, comentario.proyecto_id, comentario.user_id)
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId (id) {
    const { data: comentario, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('user_id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Comentario(comentario.id, comentario.created_at, comentario.comentario, comentario.proyecto_id, perfil.user_id, comentario.user_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (notaData) {
    const { error } = await supabase
      .from('comentarios')
      .insert(notaData)
      .select()
      // console.log('nuevo perfil ',error);
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('comentarios')
      .update({
        comentario: this.comentario,
      })
      .eq('id', this.id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // borrar
  static async delete (id) {
    const { error } = await supabase
      .from('comentarios')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
