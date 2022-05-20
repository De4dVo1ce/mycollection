export const areEqual = (obj1: any, obj2: any): boolean => {
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  if (typeof obj1 !== 'object') {
    return obj1 === obj2
  }

  if (obj1?.length !== obj2?.length) {
    return false
  }

  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    if (!Array.isArray(obj1) || !Array.isArray(obj2)) {
      return false
    } else {
      for (let index = 0; index < obj1.length; index++) {
        if (!areEqual(obj1[index], obj2[index])) {
          return false
        }
      }
    }
  }

  for (var prop in obj1) {
    if (!areEqual(obj1[prop], obj2[prop])) {
      return false
    }
  }

  return true
}
