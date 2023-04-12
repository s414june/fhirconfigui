// @ts-nocheck
let menuDatas = {
    "MenuRoots": [{
            "Name": "",
            "DisplayName": "總覽 - 首頁",
            "Url": "./index.html",
            "Type": "A",
            "Ul": null
        },
        {
            "Name": "",
            "DisplayName": "系統管理",
            "Url": "#",
            "Type": "A",
            "Ul": null
        },
        {
            "Name": "",
            "DisplayName": "連線設定",
            "Url": "./dbData.html",
            "Type": "A",
            "Ul": null
        },
        {
            "Name": "",
            "DisplayName": "資料集對應",
            "Url": "./sourceData.html",
            "Type": "M",
            "Ul": [{
                    "Name": "",
                    "DisplayName": "所有資料",
                    "Url": "./sourceData.html",
                    "Type": "A",
                    "Ul": null
                },
                {
                    "Name": "",
                    "DisplayName": "已對應資料",
                    "Url": "./sourceData.html",
                    "Type": "A",
                    "Ul": null
                },
                {
                    "Name": "",
                    "DisplayName": "未對應資料",
                    "Url": "./sourceData.html",
                    "Type": "A",
                    "Ul": null
                },
                {
                    "Name": "",
                    "DisplayName": "對應中資料",
                    "Url": "#",
                    "Type": "A",
                    "Ul": null
                }
            ]
        },
        {
            "Name": "",
            "DisplayName": "欄位代碼對應",
            "Url": "./codeData.html",
            "Type": "M",
            "Ul": [{
                    "Name": "",
                    "DisplayName": "所有資料",
                    "Url": "./codeData.html",
                    "Type": "A",
                    "Ul": null
                },
                {
                    "Name": "",
                    "DisplayName": "已對應資料",
                    "Url": "./codeData.html",
                    "Type": "A",
                    "Ul": null
                },
                {
                    "Name": "",
                    "DisplayName": "對應中資料",
                    "Url": "#",
                    "Type": "A",
                    "Ul": null
                }
            ]
        }
    ]
};

function getMenutree() {
    $(menuDatas["MenuRoots"]).each((i, v) => {
        let noArrowClass = v["Type"] == "A" ?
            "no-arrow" : "";
        let parent = `
        <div class="accordion-item ${noArrowClass}">
            <h2 class="accordion-header" id="accordionHeading0_${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseNowArrow0_${i}" aria-expanded="false"
                aria-controls="collapseNowArrow0_${i}">
                    <a href="${v["Url"]}" class="goto-url">
                        ${v["DisplayName"]}
                    </a>
                </button>
            </h2>`;

        if (v["Ul"] != null) {
            let child = getChild(v["Ul"], i, 0, "#menu-tree");
            parent += child;
        }
        parent += "</div>";

        $("#menu-tree").append(parent);
    });

    function getChild(datas, index, floor, parentselector) {
        let collapseNowArrowId = "collapseNowArrow" + floor + "_" + index;
        let child =
            `<div id="${collapseNowArrowId}" class="accordion-collapse collapse"
             aria-labelledby="accordionHeading${floor}_${index}"
                    data-bs-parent="${parentselector}">
            <ul>
            `;
        floor++;
        let listyle = "padding:10px 20px 10px " + (floor + 1) * 20 + "px;";
        $(datas).each((i, v) => {
            if (v["Ul"] == null) {
                child += ` <li style="${listyle}"><a href="${v["Url"]}">
                    ${v["DisplayName"]}
                </a></li>`;
            } else {
                child += `
                <li>
                <button class="accordion-button collapsed" style="${listyle}" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseNowArrow${floor}_${i}" aria-expanded="false" aria-controls="collapseNowArrow${floor}_${i}">
                    <a href="${v["Url"]}" class="goto-url">
                        ${v["DisplayName"]}
                    </a>
                </button>
                `;
                child += getChild(v["Ul"], i, floor, "#" + collapseNowArrowId);
            }
        });
        child += "</li></ul></div>";
        return child;
    }
}

function gotoHrefUrl(url) {
    this.stopPropagation();
    location.assign(url);
}

function afterGetHeader() {
    VerifyUser();
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    let dropdownAccountEl = document.querySelector('#account .dropdown-toggle');
    let dropdownAccount = new bootstrap.Dropdown(dropdownAccountEl);

    //預設menu開合(小裝置關)
    if ($(window).width() < 991) {
        collapseMenu();
        // $(dropdownAccountEl).attr("data-bs-toggle","");
    }
    $("#desktopMenuBtn").click((e) => {
        //如果在這裡阻止冒泡，會造成收合時按.menu-btn打不開，所以在打開狀態下才阻止冒泡
        if (!$("#menu").hasClass("collapsed")) {
            //會跟#menu-header的click事件同時發生而抵銷，因此阻止冒泡(阻止#menu-header的click事件)
            e.stopPropagation();
            collapseMenu();
        }
    })
    $("#menu-header").click((e) => {
        openCollapsedMenu();
    })
    $("#mobileMenu").click((e) => {
        $("#menu").hasClass("collapsed") ? openCollapsedMenu() : collapseMenu();
        $("#mobileMenu").toggleClass("collapsed");
    })
    $("#menu-header").mouseover((e) => {
        //單純UI效果
        if ($(window).width() > 576) {
            if ($("#menu").hasClass("collapsed")) {
                $("#menu").addClass("bigger");
                $(".menu-holder").addClass("bigger");
            }
        }
    })
    $("#menu-header").mouseout((e) => {
        //單純UI效果
        if ($(window).width() > 576) {
            $("#menu").removeClass("bigger");
            $(".menu-holder").removeClass("bigger");
        }
    })
    $(".not-opening-url").click((e) => {
        alert("此項目尚未啟用！");
    })

    $(window).resize(() => {
        dropdownAccount.hide();
        // if ($(window).width() < 991) {
        //     $(dropdownAccountEl).attr("data-bs-toggle","");
        // }
        // else {
        //     $(dropdownAccountEl).attr("data-bs-toggle","dropdown");
        // }
    })

    let accordionA = $(".accordion-item a");
    // let isActive = false;
    $(".accordion-item").removeClass("active");
    accordionA.each((i, v) => {
        let nowLoca = location.pathname.split("/").pop();
        if (!nowLoca.includes(".html")) nowLoca = location.pathname.split("/")[location.pathname.split("/").length - 2];
        if ($(v).attr("href").includes(nowLoca)) {
            $(v).parents(".accordion-item").addClass("active");
            $(v).parents("li").addClass("active");
            // isActive = true;
            // return false;
        }
    })
    // if (!isActive) {
    //     accordionA.parent().find("[href='./index.html']").parents(".accordion-item").addClass("active")
    // }

    // $("#system-main").append(`<div id="all-bg-image"></div>`);
    $(function () {
        if ($(".title-name").text())
            $("#title h5").text($(".title-name").text());
        $(".goto-url").click((e) => {
            let href = $(e.currentTarget).attr("href");
            location.assign(href);
        })
        $("#offcanvasRight .offcanvas-body").html("");
        $(".hash-offset").each((i, hash_ele) => {
            let hash = "#" + $(hash_ele).attr("id");
            let txt = $(hash_ele).parent().find(".card-header h4").text();
            $("#offcanvasRight .offcanvas-body").append(`
            <p>
                <a href="${hash}" class="text-primary">${txt}</a>
            </p>
            `);
        })
    })
}