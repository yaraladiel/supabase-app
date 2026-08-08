import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mmxwgshfhecrswmytwds.supabase.co'
const SUPABASE_KEY = 'sb_publishable_7iVJUqXjWvPP870lGVh5LQ_Qr-5TWVt'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const btnMostrar = document.querySelector('.btn')
const thead = document.querySelector('.thead')
const tbody = document.querySelector('.tbody')

const TABLA = 'Productos'

async function obtenerYMostrarDatos() {
  tbody.innerHTML = '<tr><td colspan="4">Cargando datos...</td></tr>'

  const { data, error } = await supabase
    .from(TABLA)
    .select('*')

  if (error) {
    console.error('Error al consultar Supabase:', error.message)
    tbody.innerHTML = `<tr><td colspan="4">Error al obtener datos: ${error.message}</td></tr>`
    return
  }

  thead.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Precio</th>
      <th>Descripción</th>
    </tr>
  `

  if (!data || data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">No hay datos para mostrar.</td></tr>'
    return
  }

  tbody.innerHTML = data.map(item => {
    const nombre = item.name ?? item.nombre ?? '-'
    const precio = item.price ?? item.precio ?? 0
    const descripcion = item.descripcion ?? item.description ?? '-'

    return `
      <tr>
        <td>${item.id}</td>
        <td>${nombre}</td>
        <td>$${Number(precio).toFixed(2)}</td>
        <td>${descripcion}</td>
      </tr>
    `
  }).join('')
}

btnMostrar.addEventListener('click', obtenerYMostrarDatos)