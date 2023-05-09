// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Nota {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, created_at = null, nota = null, proyecto_id = null, user_id = null) {
    this.id = id
    this.created_at = created_at
    this.nota = nota
    this.proyecto_id = proyecto_id
    this.user_id = user_id
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: notas, error } = await supabase
      .from('notas')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return notas.map(({ id, created_at, nota, proyecto_id, user_id }) => {
      return new Nota(id, created_at, nota, proyecto_id, user_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: nota, error } = await supabase
      .from('notas')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Nota(nota.id, nota.created_at, nota.nota, nota.proyecto_id, nota.user_id)
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId (id) {
    const { data: perfil, error } = await supabase
      .from('notas')
      .select('*')
      .eq('user_id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Nota(nota.id, nota.created_at, nota.nota, nota.proyecto_id, perfil.user_id, nota.user_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (notaData) {
    const { error } = await supabase
      .from('notas')
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
      .from('notas')
      .update({
        nota: this.nota,
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
      .from('notas')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
