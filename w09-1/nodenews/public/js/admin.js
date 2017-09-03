// admin.js
$(document).ready(function() {
	refreshNewsList();
	// 添加新闻
	$('#btn_submit').click(function(event) {
		event.preventDefault();
		// 输入校验
		if($('#newstitle_input').val()==='' || $('#newsimg_inout').val()==='' 
			|| $('#newstime_input').val()==='' || $('#newssrc_input').val()===''){
			if ($('#newstitle_input').val()==='') {
				$('#newstitle_input').parent().addClass('has-error');
			} else {
				$('#newstitle_input').parent().removeClass('has-error');
			}
			if ($('#newsimg_inout').val()==='') {
				$('#newsimg_inout').parent().addClass('has-error');
			} else {
				$('#newsimg_inout').parent().removeClass('has-error');
			}
			if ($('#newstime_input').val()==='') {
				$('#newstime_input').parent().addClass('has-error');
			} else {
				$('#newstime_input').parent().removeClass('has-error');
			}
			if ($('#newssrc_input').val()==='') {
				$('#newssrc_input').parent().addClass('has-error');
			} else {
				$('#newssrc_input').parent().removeClass('has-error');
			}
		} else {
			var jsonnews = {
				'newstype' : $('#newstye_input').val(),
				'newstitle' : $('#newstitle_input').val(),
				'newsimg' : $('#newsimg_inout').val(),
				'newstime' : $('#newstime_input').val(),
				'newssrc' : $('#newssrc_input').val()
			}
			$.ajax({
				url: '/admin/insertnews',
				type: 'post',
				dataType: 'json',
				data: jsonnews,
			})
			.done(function(data) {
				console.log("success");
				refreshNewsList();
				$('#newstye_input').val('推荐');
				$('#newstitle_input').val('');
				$('#newsimg_inout').val('');
				$('#newstime_input').val('');
				$('#newssrc_input').val('');
			})
			.fail(function(data) {
				console.log(data);
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}
	});
	// 删除新闻
	var delId = null;
	$('#news_lists').on('click', '.btn_del', function(event) {
		$('#delModal').modal('show');
		delId = $(this).parent().prevAll().eq(4).html();
	});
	// 删除按钮
	$('#delModal #confirmDel').click(function(event) {
		if (delId!=null) {
			console.log(delId);
			$.ajax({
				url: '/admin/delnews',
				type: 'post',
				dataType: 'json',
				data: {'delId': delId},
			})
			.done(function(data) {
				console.log(data);
				delId = null;
				$('#delModal').modal('hide');
				refreshNewsList();
			})
			.fail(function(data) {
				console.log(data);
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			
		}
	});
	// 编辑新闻
	var updateId = null;
	$('#news_lists').on('click', '.btn_edit', function(event) {
		$('#updateModal').modal('show');
		updateId = $(this).parent().prevAll().eq(4).html();
		$.ajax({
			url: '/admin/currentnews',
			type: 'post',
			dataType: 'json',
			data: {'updateId': updateId},
		})
		.done(function(data) {
			console.log(data);
			$('#unewstye_input').val(data[0].newstype);
			$('#unewstitle_input').val(data[0].newstitle);
			$('#unewsimg_inout').val(data[0].newsimg);
			$('#unewstime_input').val(data[0].newstime.split('T')[0]);
			$('#unewssrc_input').val(data[0].newssrc);
		})
		.fail(function(data) {
			console.log(data);
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
	// 保存按钮
	$('#updateModal #confirmUpdate').click(function(event) {
		$.ajax({
			url: '/admin/updatenews',
			type: 'post',
			dataType: 'json',
			data: {
				'updateId' : updateId,
				'newstype' : $('#unewstye_input').val(),
				'newstitle' : $('#unewstitle_input').val(),
				'newsimg' : $('#unewsimg_inout').val(),
				'newstime' : $('#unewstime_input').val(),
				'newssrc' : $('#unewssrc_input').val()
			},
		})
		.done(function(data) {
				console.log(data);
				updateId = null;
				$('#updateModal').modal('hide');
				refreshNewsList();
			})
		.fail(function(data) {
			console.log(data);
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
});

function refreshNewsList() {
	var $lists = $('#news_lists tbody');
    $lists.empty();
    $.ajax({
            url: '/admin/getnews',
            type: 'get',
            dataType: 'json',
            data: {'newstype': ''},
        })
        .done(function(data) {
            console.log(data);
            data.forEach( function(element, index) {
            	var $td_id = $('<td></td>').html(element.id);
            	var $td_type = $('<td></td>').html(element.newstype);
            	var $td_title = $('<td></td>').html(element.newstitle);
            	var $td_time = $('<td></td>').html(element.newstime.split('T')[0]);
            	var $td_src = $('<td></td>').html(element.newssrc);
            	var $td_op = $('<td></td>');
            	var $btn_edit = $('<button></button>').addClass('btn btn-primary btn-xs btn_edit').html('编辑');
            	var $btn_del = $('<button></button>').addClass('btn btn-danger btn-xs btn_del').html('删除');
            	$td_op.append($btn_edit, $btn_del);
            	var $tr = $('<tr></tr>');
            	$tr.append($td_id, $td_type, $td_title, $td_time, $td_src, $td_op);
            	$lists.append($tr);
            });
        })
        .fail(function(data) {
        	console.log(data);
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
	
}