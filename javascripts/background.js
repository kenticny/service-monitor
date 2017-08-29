(function() {
  pushItem({a:1,b:2})
  listItem().then(res => {
    console.log(res)
  })
})()