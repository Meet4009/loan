

/**
 * Theme: Crovex - Responsive Bootstrap 4 Admin Dashboard
 * Author: Mannatthemes
 * Module/App: Main Js
 */

    // Add custom alert styles and functions
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
            z-index: 1000;
            padding: 15px 20px;
            border-radius: 5px;
            min-width: 200px;
            max-width: 300px;
            color: white;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .custom-alert.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        .custom-alert.success {
            background-color: #28a745;
        }
        .custom-alert.error {
            background-color: #dc3545;
        }
        .custom-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 5px;
            z-index: 2000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 300px;
        }
        .custom-modal button {
            margin: 10px;
            padding: 8px 16px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            color: white;
        }
        .custom-modal .btn-yes {
            background: #dc3545;
        }
        .custom-modal .btn-no {
            background: #6c757d;
        }
    `;
    document.head.appendChild(style);

    const showAlert = (message, type = 'error') => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert ${type}`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.classList.add('show'), 10);
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    };

    const showConfirm = (message, onYes, onNo) => {
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div style="margin-bottom: 10px;">${message}</div>
            <button class="btn-yes">Yes</button>
            <button class="btn-no">No</button>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.btn-yes').onclick = () => {
            modal.remove();
            if (onYes) onYes();
        };
        modal.querySelector('.btn-no').onclick = () => {
            modal.remove();
            if (onNo) onNo();
        };
    };


document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem('token'); // 🔁 Replace with your actual Bearer token
    if (!token) {
        window.location.href = "index.html" // Redirect to login page
        return;
    }

    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok && result.status) {
            const user = result.user;

            // Update DOM elements
            document.getElementById("user-name").textContent = user.name;
        } else {
            console.error(result);
        }
    } catch (error) {
        console.error(error);
    }
});

(function ($) {

    'use strict';
    function initDateRangrPicker() {
        if ($('#Dash_Date').length == 0) {
            return;
        }

        var picker = $('#Dash_Date');
        var start = moment();
        var end = moment();

        function cb(start, end, label) {
            var title = '';
            var range = '';

            if ((end - start) < 100 || label == 'Today') {
                title = 'Today:';
                range = start.format('MMM D');
            } else if (label == 'Yesterday') {
                title = 'Yesterday:';
                range = start.format('MMM D');
            } else {
                range = start.format('MMM D') + ' - ' + end.format('MMM D');
            }

            picker.find('#Select_date').html(range);
            picker.find('#Day_Name').html(title);
        }

        picker.daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left',
            applyClass: "btn btn-sm btn-primary",
            cancelClass: "btn btn-sm btn-secondary",
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end, '');
    }

    function initMetisMenu() {
        //metis menu
        $(".metismenu").metisMenu();
        $(window).resize(function () {
            initEnlarge();
        });
    }

    function initLeftMenuCollapse() {
        // Left menu collapse
        $('.button-menu-mobile').on('click', function (event) {
            event.preventDefault();
            $("body").toggleClass("enlarge-menu");
        });
    }

    function initEnlarge() {
        if ($(window).width() < 1025) {
            $('body').addClass('enlarge-menu');
        } else {
            // if ($('body').data('keep-enlarged') != true)
            $('body').removeClass('enlarge-menu');
        }
    }

    function initTooltipPlugin() {
        $('[data-toggle="tooltip"]').tooltip()
    }

    function initMainIconTabMenu() {
        $('.main-icon-menu .nav-link').on('click', function (e) {
            $("body").removeClass("enlarge-menu");
            e.preventDefault();
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.main-menu-inner').addClass('active');
            var targ = $(this).attr('href');
            $(targ).addClass('active');
            $(targ).siblings().removeClass('active');
        });
    }


    function initActiveMenu() {
        // === following js will activate the menu in left side bar based on url ====
        $(".leftbar-tab-menu a, .left-sidenav a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).addClass("active");
                $(this).parent().addClass("active"); // add active to li of the current link                 
                $(this).parent().parent().addClass("in");
                $(this).parent().parent().addClass("mm-show");
                $(this).parent().parent().parent().addClass("mm-active");
                $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
                $(this).parent().parent().parent().addClass("active");
                $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link                
                $(this).parent().parent().parent().parent().parent().addClass("mm-active");
                var menu = $(this).closest('.main-icon-menu-pane').attr('id');
                $("a[href='#" + menu + "']").addClass('active');

            }
        });
    }

    function initFeatherIcon() {
        feather.replace()
    }
    // Auto complate

    function initAutoComplate() {
        $(document).ready(function () {
            BindControls();
        });

        function BindControls() {
            var Countries = ['Forms',
                'Tables',
                'Charts',
                'Icones',
                'Maps'];

            $('#AllCompo').autocomplete({
                source: Countries,
                minLength: 0,
                scroll: true
            }).focus(function () {
                $(this).autocomplete("search", "");
            });
        }
    }


    function initMainIconMenu() {
        $(".navigation-menu a").each(function () {
            var pageUrl = window.location.href.split(/[?#]/)[0];
            if (this.href == pageUrl) {
                $(this).parent().addClass("active"); // add active to li of the current link
                $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
                $(this).parent().parent().parent().parent().parent().addClass("active"); // add active class to an anchor
            }
        });
    }

    function initTopbarMenu() {
        $('.navbar-toggle').on('click', function (event) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });

        $('.navigation-menu>li').slice(-2).addClass('last-elements');

        $('.navigation-menu li.has-submenu a[href="#"]').on('click', function (e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
            }
        });
    }

    function init() {
        initDateRangrPicker();
        initMetisMenu();
        initLeftMenuCollapse();
        initEnlarge();
        initTooltipPlugin();
        initMainIconTabMenu();
        initActiveMenu();
        initFeatherIcon();
        initAutoComplate();
        initMainIconMenu();
        initTopbarMenu();
        Waves.init();
    }

    init();

})(jQuery)
