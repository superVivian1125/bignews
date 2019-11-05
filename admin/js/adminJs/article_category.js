$.ajax({
    url:'http://47.111.184.55:8888/api/v1/admin/category/list',
    type:'get',
    success:function(response) {
        var html=template('cateTpl',{data:response.data})
        $('#tbodyParent').html(html)
    }
})
$("#addCate").on('submit',function() {
    var formdata=$(this).serialize();
    $.ajax({
        url:'http://47.111.184.55:8888/api/v1/admin/category/add',
        type:'post',
        data:formdata,
        success:function(data) {
           location.reload();    
        }
    })
    return false;
})