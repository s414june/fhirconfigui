// @ts-nocheck
let vh = window.innerHeight * 0.01;

function VerifyUser() {
    const testAccount = "etatung";
    const testPassword = "123456";
    let Account = localStorage.getItem("Account");
    let Password = localStorage.getItem("Password");
    if (Account == testAccount && Password == testPassword) {
        return;
    } else {
        alert("請登入");
        location.assign("./login.html");
    }
}

function Logout() {
    if (confirm("你確定要登出？")) {
        alert("已登出系統！");
        localStorage.removeItem("Account");
        localStorage.removeItem("Password");
        location.assign("./login.html");
    }
}

function collapseMenu() {
    $("#menu").addClass("collapsed");
    $(".menu-holder").addClass("collapsed");
    $(".hide-when-collapsed").removeClass("show").addClass("hide");
    $("#TableOutside").addClass("collapsed");
    let w = $(window).width() < 576 ? "0px" : "45px";
    $("html").css("--menu-width", w);
}

function openCollapsedMenu() {
    if ($("#menu").hasClass("collapsed")) {
        $(".hide-when-collapsed").animate({
            opacity: 0
        }, 400, () => {
            $(".hide-when-collapsed").removeClass("hide").addClass("show");
            $(".hide-when-collapsed").animate({
                opacity: 1
            }, 200)
        })
        $("#menu").removeClass("collapsed");
        $(".menu-holder").removeClass("collapsed");
        $("#TableOutside").removeClass("collapsed");
        $("html").css("--menu-width", "350px");
    }
}

$(window).resize(() => {
    //保持特定尺寸預設menu開合(大裝置開，小裝置關)
    $(window).width() < 991 ? collapseMenu() : openCollapsedMenu();
    //手機版menu設定(預設關閉menu)
    if ($(window).width() < 575)
        $("#mobileMenu").addClass("collapsed")
    vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})

$(window).scroll(() => {
    //預設menu開合(小裝置關)
    if ($(window).width() < 991) {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        collapseMenu();
        if ($(window).width() < 575) {
            $("#mobileMenu").addClass("collapsed");
        }
    }
})

function query() {

}