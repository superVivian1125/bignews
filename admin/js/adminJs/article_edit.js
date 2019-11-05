// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');

// 当前管理员是在做修改文章操作
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}
console.log(id);

$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:8888/api/v1/admin/article/search',
    data: {
        id: id
    },
    success: function (data) {
        $.ajax({
            type: 'get',
            url: 'http://47.111.184.55:8888/api/v1/admin/category/list',
            success: function (response) {
                data.response = response
                var html = template('modifyArticle', data)
                $('#modifyArticleParent').html(html)



            }
        })
    }
})
$("#modifyArticleParent").on('change', '#exampleInputFile', function () {
    var files = this.files[0]
    // 获取路径
    var url = URL.createObjectURL(files)
    // 图片预览
    $('#coverImg').attr('src', url)
    // 路径存储至隐藏域
    $('#example').val(url)
   

})
$('#modifyArticleParent').on('click', '#jojo', function () {
    // 获取表单数据
    var formData = new FormData($('#submission')[0]);
    formData.append('id', id)
    formData.delete('cover')
    formData.append('cover', $('#example').val())
    // formData.append('cover','')

    // 发送ajax请求
    $.ajax({
        url: 'http://47.111.184.55:8888/api/v1/admin/article/edit',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            // 跳转页面
            console.log(data);
            console.log('修改橙红');

        }
    })
    return false
})