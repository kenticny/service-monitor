(function() {
  pushItem({
    name: '测试信息',
    url: 'https://weapp-service.high-together.com/',
    check_format: '.*?',
    status: 'running'
  })
  listItem().then(res => {
    console.log(res)
  })
})()