$(document).ready(function() {
    // 监听菜单展开事件
    $('.nav-header >ul').on('show.bs.collapse', function() {
        // 更换为展开状态的图标
        var $control_icon = $(this).siblings('[data-toggle="collapse"]').find('.sidebar-icon.inner-icon');
        $control_icon.html('&#xe804;');
        //使其他下拉的菜单项折叠起来
        var $sidebar = $("#accordion");
        var $show_menus = $sidebar.find('ul[id^="collapse"]').not('#' + $(this).attr("id"));
        $show_menus.collapse('hide');
    });

    // 监听菜单折叠事件
    $('.nav-header >ul').on('hide.bs.collapse', function() {
      // 更换为折叠状态的图标
        var $control_icon = $(this).siblings('[data-toggle="collapse"]').find('.sidebar-icon.inner-icon');
        $control_icon.html('&#xe803;');
    });

    var cur_path = window.location.pathname;
    var $sidebar = $("#accordion")
    // 找出当前页面对应的菜单项，高亮菜单项
    var $cur_link = $sidebar.find('a[href="' + cur_path + '"]');
    $cur_link.addClass("active-page");
    // 展开菜单
    $cur_link.parents('ul[id^="collapse"]').collapse('show');

	// 隐藏无子菜单的主菜单项
	$('.nav-header >ul').each(function () {
		if (!$(this).children().length) {
			$(this).parent().hide();
		};
	});
});
