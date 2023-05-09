// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Trabajo_usuario {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, created_at = null, user_id = null, trabajo_id = null) {
    this.id = id
    this.created_at = created_at
    this.nombre = user_id
    this.apellidos = trabajo_id

  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: trabajo_usuario, error } = await supabase
      .from('trabajos_usuarios')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return trabajos_usuarios.map(({id, created_at, user_id, trabajo_id}) => {
      return new Trabajo_usuario(id, created_at, user_id, trabajo_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: trabajo_usuario, error } = await supabase
      .from('trabajos_usuarios')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Trabajo_usuario(trabajo_usuario.id, trabajo_usuario.created_at, trabajo_usuario.user_id, trabajo_usuario.trabajo_id)
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId (id) {
    const { data: trabajo_usuario, error } = await supabase
      .from('trabajos_usuarios')
      .select('*')
      .eq('user_id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Trabajo_usuario(trabajo_usuario.id, trabajo_usuario.created_at, trabajo_usuario.user_id, trabajo_usuario.trabajo_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (perfilData) {
    const { error } = await supabase
      .from('trabajos_usuarios')
      .insert(perfilData)
      .select()
      // console.log('nuevo perfil ',error);
    if (error) {
      throw new Error(error.message)
    }
    return true
  }


  // borrar
  static async delete (id) {
    const { error } = await supabase
      .from('perfiles')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
