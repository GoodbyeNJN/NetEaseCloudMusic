const pageStatus = {
    curMainNavIndex: 0,
    curSubNavIndex: 0,
    playerIsLocked: true,
    playerIsHide: false,
    playerIsHover: false,
    curPlayMode: 1
};
const changeString = {
    playerIsLocked: {
        // 播放器锁定状态
        true: {
            // 播放器按钮是否处于hover状态
            true: { "background-position": "-100px -400px" },
            false: { "background-position": "-100px -380px" }
        },
        false: {
            true: { "background-position": "-80px -400px" },
            false: { "background-position": "-80px -380px" }
        }
    },

    // playMode: {
    //     1: "loop",
    //     2: "shuffle",
    //     3: "repeat"
    // },
    playMode: {
        1: {
            text: "循环",
            html: { title: "循环" },
            css: {
                // 播放模式按钮是否处于hover状态
                true: { "background-position": "-33px -344px" },
                false: { "background-position": "-3px -344px" }
            }
        },
        2: {
            text: "随机",
            html: { title: "随机" },
            css: {
                true: { "background-position": "-93px -248px" },
                false: { "background-position": "-66px -248px" }
            }
        },
        3: {
            text: "单曲循环",
            html: { title: "单曲循环" },
            css: {
                true: { "background-position": "-93px -344px" },
                false: { "background-position": "-66px -344px" }
            }
        }
    }
};

$(() => {
    // 一级导航栏事件
    $("#main-nav .nav-list li").hover(
        function() {
            // if (this.localName !== "li") {
            //     $(this.parentNode).addClass("chosen");
            // } else {
            //     $(this).addClass("chosen");
            // }
            $(this).addClass("chosen");
        },
        function() {
            $("#main-nav .nav-list li").removeClass("chosen");
            $("#main-nav .nav-list li")
                .eq(pageStatus.curMainNavIndex)
                .addClass("chosen");
        }
    );
    // 搜索框事件
    $("#srch input").focus(function() {
        if ($(this).val() === "音乐/视频/电台/用户") {
            $(this).val("");
            $(this).attr("class", "not-empty");
        } else if ($(this).val() !== "") {
            $("#srch-menu").show();
        }
    });
    $("#srch input").blur(function() {
        if ($(this).val() === "") {
            $(this).val("音乐/视频/电台/用户");
            $(this).attr("class", "empty");
        }
        $("#srch-menu").hide();
    });
    $("#srch input").on("input", function() {
        $("#srch-menu").show();
        $("#srch-menu .note span").text($("#srch input").val());
        $("#srch-menu ul span").text($("#srch input").val());
        if ($("#srch input").val() === "") {
            $("#srch-menu").hide();
        }
    });
    // 登录框事件
    $("#login").hover(
        function() {
            $("#login-menu").show();
        },
        function() {
            $("#login-menu").hide();
        }
    );

    // 二级导航栏事件
    $("#sub-nav .nav-list li").hover(
        function() {
            // if (this.localName !== "li") {
            //     $(this.parentNode).addClass("chosen");
            // } else {
            //     $(this).addClass("chosen");
            // }
            $(this).addClass("chosen");
        },
        function() {
            $("#sub-nav .nav-list li").removeClass("chosen");
            $("#sub-nav .nav-list li")
                .eq(pageStatus.curMainNavIndex)
                .addClass("chosen");
        }
    );

    // 播放器事件
    /**
     * 播放器隐藏函数
     */
    function hidePlayer() {
        if (pageStatus.playerIsHide === true) {
            return;
        }
        pageStatus.playerIsHide = true;
        $("#player").animate(
            {
                top: "-7px"
            },
            400
        );
    }
    /**
     * 播放器显示函数
     */
    function showPlayer() {
        if (pageStatus.playerIsHide === false) {
            return;
        }
        pageStatus.playerIsHide = false;
        $("#player").animate(
            {
                top: "-53px"
            },
            80
        );
    }

    // 载入后自动隐藏
    (function() {
        if (pageStatus.playerIsLocked === true) {
            return;
        }
        setTimeout(() => {
            if (pageStatus.playerIsHover === true) {
                return;
            }
            hidePlayer();
        }, 1800);
    })();
    // 隐藏与显示
    $("#player").mouseenter(function() {
        if (pageStatus.playerIsLocked === true) {
            return;
        }
        pageStatus.playerIsHover = true;
        showPlayer();
    });
    $("#player").mouseleave(function() {
        if (pageStatus.playerIsLocked === true) {
            return;
        }
        pageStatus.playerIsHover = false;
        setTimeout(() => {
            if (pageStatus.playerIsHover === true) {
                return;
            }
            hidePlayer();
        }, 600);
    });

    // 锁定按钮事件
    /**
     * 锁定图标切换函数
     */
    function swLockIcon(lockBtnIsHover) {
        const playerIsLocked = pageStatus.playerIsLocked;
        const style = changeString.playerIsLocked;
        $("#lock-btn a").css(style[playerIsLocked][lockBtnIsHover]);
    }
    // 载入后自动切换图标
    (function() {
        swLockIcon(false);
    })();
    // 切换锁定图标
    $("#lock-btn a").click(function() {
        pageStatus.playerIsLocked = !pageStatus.playerIsLocked;
        swLockIcon(true);
    });
    $("#lock-btn a").hover(
        function() {
            swLockIcon(true);
        },
        function() {
            swLockIcon(false);
        }
    );

    // 播放模式按钮事件
    /**
     * 播放模式图标切换函数
     */
    function swPlayModeICon(playModeIsHover) {
        const curPlayMode = pageStatus.curPlayMode;
        const playMode = changeString.playMode;
        $("#controls #mode").attr(playMode[curPlayMode].html);
        $("#controls .playlist > .tip").text(playMode[curPlayMode].text);
        $("#controls #mode").css(playMode[curPlayMode].css[playModeIsHover]);
    }
    /**
     * 显示播放模式切换提示
     */
    function showPlayModeTip() {
        if ($("#controls .playlist > .tip").is(":visible")) {
            return;
        }
        $("#controls .playlist > .tip").show();
    }
    /**
     * 隐藏播放模式切换提示
     */
    function hidePlayerModeTip() {
        if (!$("#controls .playlist > .tip").is(":visible")) {
            return;
        }
        $("#controls .playlist > .tip").hide();
    }
    // 载入后自动切换图标
    (function() {
        swPlayModeICon(false);
    });
    // 切换播放模式图标
    $("#controls #mode").click(function() {
        if (pageStatus.curPlayMode < 3) {
            pageStatus.curPlayMode++;
        } else {
            pageStatus.curPlayMode = 1;
        }
        swPlayModeICon(true);
        showPlayModeTip();
        setTimeout(() => {
            hidePlayerModeTip();
        }, 1500);
    });
    $("#controls #mode").hover(
        function() {
            swPlayModeICon(true);
        },
        function() {
            swPlayModeICon(false);
        }
    );
});
// playMode: {
//     1: {
//         text: "循环",
//         html: { title: "循环" },
//         css: {
//             // 播放模式按钮是否处于hover状态
//             true: { "background-position": "-33px -344px" },
//             false: { "background-position": "-3px -344px" }
//         }
//     },
//     2: {
//         text: "随机",
//         html: { title: "随机" },
//         css: {
//             true: { "background-position": "-93px -248px" },
//             false: { "background-position": "-66px -248px" }
//         }
//     },
//     3: {
//         text: "单曲循环",
//         html: { title: "单曲循环" },
//         css: {
//             true: { "background-position": "-93px -344px" },
//             false: { "background-position": "-66px -344px" }
//         }
//     }
// }
