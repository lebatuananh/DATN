﻿var AnnouncementController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
    }

    function registerEvents() {

        $("#ddl-show-page").on('change', function () {
            core.configs.pageSize = $(this).val();
            core.configs.pageIndex = 1;
            loadData(true);
        });

        $('body').on('click', '.btn-read', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "POST",
                url: "/Admin/Announcement/MarkAsRead",
                data: { id: that },
                beforeSend: function () {
                    core.startLoading();
                },
                success: function () {
                    loadData();
                    core.loadAnnouncement();
                    core.notify('Đã đọc', 'success');
                    core.stopLoading();
                },
                error: function () {
                    core.notify('Có lỗi xảy ra', 'error');
                    core.stopLoading();
                }
            });
        });

        $('#btn-read-all').on('click', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: "POST",
                url: "/Admin/Announcement/ReadAll",
                data: { id: that },
                beforeSend: function () {
                    core.startLoading();
                },
                success: function () {
                    loadData();
                    core.loadAnnouncement();
                    core.notify('Đã đọc tất cả', 'success');
                    core.stopLoading();
                },
                error: function () {
                    core.notify('Có lỗi xảy ra', 'error');
                    core.stopLoading();
                }
            });
        });

        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            core.confirm('Bạn có chắc chắn muốn xoá?', function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Announcement/Delete",
                    data: { id: that },
                    beforeSend: function () {
                        core.startLoading();
                    },
                    success: function () {
                        core.loadAnnouncement();
                        loadData();
                        core.notify('Xoá thành công', 'success');
                        core.stopLoading();
                        $('#paginationUL').twbsPagination('destroy');
                    },
                    error: function () {
                        core.notify('Xoá thất bại', 'error');
                        core.stopLoading();
                    }
                });
            });
        });
    };

    function loadData(isPageChanged) {
        $.ajax({
            type: "GET",
            url: "/admin/Announcement/GetAllPaging",
            data: {
                page: core.configs.pageIndex,
                pageSize: core.configs.pageSize
            },
            dataType: "json",
            beforeSend: function () {
                core.startLoading();
            },
            success: function (response) {
                var template = $('#table-template').html();
                var render = "";
                if (response.RowCount > 0) {
                    $.each(response.Results, function (i, item) {
                        render += Mustache.render(template, {
                            Id: item.Id,
                            Title: item.Title,
                            Content: item.Content,
                            DateCreated: core.dateFormatSubStr(item.DateCreated)
                        });
                    });
                    $("#lbl-total-records").text(response.RowCount);
                    if (render != undefined) {
                        $('#tbl-content').html(render);

                    }
                    wrapPaging(response.RowCount, function () {
                        loadData();
                    }, isPageChanged);


                }
                else {
                    $('#tbl-content').html('');
                }
                core.stopLoading();
            },
            error: function (status) {
                console.log(status);
            }
        });
    };

    function wrapPaging(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / core.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationUL a').length === 0 || changePageSize === true) {
            $('#paginationUL').empty();
            $('#paginationUL').removeData("twbs-pagination");
            $('#paginationUL').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationUL').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'Đầu',
            prev: 'Trước',
            next: 'Sau',
            last: 'Cuối',
            onPageClick: function (event, p) {
                if (core.configs.pageIndex != p) {
                    core.configs.pageIndex = p;
                    setTimeout(callBack(), 200);
                }
            }
        });
    }
}