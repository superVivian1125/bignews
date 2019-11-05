
$('#articleAllParent').on('click', '.delete', function () {
    var id = $(this).attr("data-id")
    $.ajax({
        type:'delete',
        url:'http://47.111.184.55:8888/api/v1/admin/article/delete',
        data:{
            id:id
        },
        success:function(response){
            location.reload();
        }
    })
})

$('#articleAllParent').on('click', '.edit', function () {
    var id = $(this).attr("data-id")
    $.ajax({
        type:'post',
        url:'http://47.111.184.55:8888/api/v1/admin/article/edit',
        data:{
            id:id
        },
        success:function(response){
            location.reload();
        }
    })
})

getData(1)


var $pagination = $('#pagination-demo')
var myTotalPage = 10

var defaultOpts = {
  totalPages: myTotalPage,
  visiblePages: 7,
  first: '首页',
  last: '末页',
  prev: '上一页',
  next: '下一页',
  onPageClick: function (event, page) {
    getData(page)
  }
}

$pagination.twbsPagination(defaultOpts);


$('#pagination-demo').twbsPagination();
function getData(myPage) {
    $.ajax({
      type: 'get',
      url: 'http://47.111.184.55:8888/api/v1/admin/article/query',
      data: {
        page: myPage, // 当前第几页
        perpage: 5    // 每页展示条数
      },
      success: function (backData) {
        console.log(backData)
        var resHtml = template('articleAll', backData)
        $('#articleAllParent').html(resHtml)

        var totalPages = backData.data.totalPage

        if (myTotalPage != totalPages) {
          myTotalPage = totalPages

          $pagination.twbsPagination('destroy')
          $pagination.twbsPagination($.extend({}, defaultOpts, {
            startPage: 1,
            totalPages: totalPages
          }))
        }
      }
    })
  }