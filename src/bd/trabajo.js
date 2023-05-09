// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Trabajo {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, created_at = null, nombre = null, definicion = null, uf = null, ra = null, fecha_inicio = null, fecha_final = null, modulo = null) {
    this.id = id
    this.created_at = created_at
    this.nombre = nombre
    this.descripcion = definicion
    this.nota = uf
    this.user_id = ra
    this.user_id = fecha_inicio
    this.user_id = fecha_final
    this.user_id = modulo
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: trabajo, error } = await supabase
      .from('trabajos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return trabajos.map(({id, created_at, nombre, definicion, uf, ra, fecha_inicio, fecha_final, modulo}) => {
      return new Trabajo(id, created_at, nombre, definicion, uf, ra, fecha_inicio, fecha_final, modulo)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: trabajo, error } = await supabase
      .from('trabajos')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Trabajo(trabajo.id, trabajo.created_at, trabajo.nombre, trabajo.definicion, trabajo.uf, trabajo.ra, trabajo.fecha_inicio, trabajo.fecha_final, trabajo.modulo)
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId (id) {
    const { data: trabajo, error } = await supabase
      .from('trabajos')
      .select('*')
      .eq('user_id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Proyectos(trabajo.id, trabajo.created_at, trabajo.nombre, trabajo.definicion, trabajo.uf, trabajo.ra, trabajo.fecha_inicio, trabajo.fecha_final, trabajo.modulo)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (notaData) {
    const { error } = await supabase
      .from('trabajos')
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
      .from('trabajos')
      .update({
        proyecto: this.nombre,
        proyecto: this.definicion,
        proyecto: this.uf,
        proyecto: this.ra,
        proyecto: this.fecha_inicio,
        proyecto: this.fecha_final,
        proyecto: this.modulo,
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
      .from('trabajos')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
