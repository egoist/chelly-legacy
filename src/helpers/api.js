const url = (segment) => {
  if (location.href.indexOf('index.hot.html') > -1) {
    return 'http://localhost:3003/api/' + segment
  }
  return 'https://chelly.avosapps.com/api/' + segment
}

export default {
  url
}
