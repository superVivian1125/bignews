$(function () {
  // 10. 文章发布
  // 获取分类
  $.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/category/list',
    success: function (response) {
      var html = template('categoriesTpl', response)
      $('#article_category').html(html)
    }
  })

  // 为文章封面表单绑定change事件
  $('#exampleInputFile').on('change', function () {
    // 获取文件
    var files = this.files[0]
    // 获取路径
    var url = URL.createObjectURL(files)
    // 图片预览
    $('#coverImg').attr('src', url)
    
    $('#example').val(url)
  })

  // 为发布文章表单创建提交事件
  $('.btn-release').on('click', function (e) {
    // 阻止默认提交
    e.preventDefault()

    // 获取表单值
    var formData = new FormData($('#articleForm')[0])
    formData.append('content', tinyMCE.activeEditor.getContent())
    formData.append('state', '已发布')
    // formData.delete('cover')
    // formData.append('cover', $('#example').val())

    $.ajax({
      type: 'post',
      url: 'http://47.111.184.55:8888/api/v1/admin/article/publish',
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.code == 200) {
          alert('发布成功')
        }

      }
    })

  })

})