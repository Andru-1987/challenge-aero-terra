export const displayTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
    const buenosAiresTime = new Date(utc + (3600000 * -3))
    
    let hours = buenosAiresTime.getHours();
    let minutes = buenosAiresTime.getMinutes()

    minutes = (minutes < 10 ? '0' : '') + minutes
  
    return `Horario de ultima actualizacion: ${hours}:${minutes} hrs`
  }
  