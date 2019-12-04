function resolverDepoisDe2Segundos(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x)
    }, 2000)
  })
}

const assincrona = async x => {
  const b = await resolverDepoisDe2Segundos(x)
  return b
}

const start = async () => {
  console.log('iniciando...')
  const c = await assincrona(5)
  console.log('valor: ', c)
}

start()
