export function deepcopy (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
  }
  return sourceCopy;
}
export function replacePathParams(url='', obj={}) {
  let ret = '' + url
  for(let key in obj){
    ret = ret.replace(`{${key}}`, obj[key])
  }
  return ret
}
// export function 
// export function 
