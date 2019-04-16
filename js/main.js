$(document).ready(function () {

    var totalPriceArr;
    var storageBasket = JSON.parse(localStorage.getItem('backetList'));
    var totalPriceStorage = JSON.parse(localStorage.getItem('totalPriceStorage'));
    var i = 0;
    var basket;
    var totalPrice;
    var scrollPage = $(window).scrollTop();
    var lastScrollTop = 0;
    var fixedBasket = $('.backet-wrapper').height();
    $(window).on('scroll', function () {
        scrollPage = $(window).scrollTop();
        var $basket = $('.backet-wrapper');
        if (scrollPage < fixedBasket) {
            $basket.removeClass('_fixed');
        } else {
            $basket.addClass('_fixed');

        }

        lastScrollTop = scrollPage;

    });

    if (JSON.parse(localStorage.getItem('backetList')) == null && JSON.parse(localStorage.getItem('totalPriceStorage')) == null) {
        totalPrice = 0;
        basket = [];
    } else {
        totalPrice = totalPriceStorage;
        basket = storageBasket;
    }

        function createBasket() {
            for (i; i < storageBasket.length; i++) {
                var backetItem = ('<div class="backet-inner__products-list-item"><div class="delete-btn__wrapper"><a href="#" class="delete-btn"><img src="img/delete-icon.png" alt=""></a></div><div class="product-name__wrapper"><h3>' + storageBasket[i].name + '</h3></div><div class="product-price__wrapper"><p>' + storageBasket[i].price + ' руб.</p></div></div>')
                $(".backet-inner__products-list").append(backetItem);

            }
            $('.price-counter__wrapper p span').text(totalPriceStorage + ' ' + 'руб.');
        }

        if (JSON.parse(localStorage.getItem('backetList')) != null) {

            createBasket();
        }
        $('.add-in-backet').on('click', function (e) {
            e.preventDefault();
            let productName = $(this).parent().parent().find('.products-list__item-text h2').text();
            let productPrice = $(this).parent().find('.price').text().split(' ')[0];
            var backetItem = ('<div class="backet-inner__products-list-item"><div class="delete-btn__wrapper"><a href="#" class="delete-btn"><img src="img/delete-icon.png" alt=""></a></div><div class="product-name__wrapper"><h3>' + productName + '</h3></div><div class="product-price__wrapper"><p>' + productPrice + ' руб.</p></div></div>')
            $(".backet-inner__products-list").append(backetItem);
            totalPrice = totalPrice + parseInt(productPrice);
            $('.price-counter__wrapper p span').text(totalPrice + ' ' + 'руб.');

            basket.push({
                name: productName,
                price: productPrice,
            })
            localStorage.setItem('totalPriceStorage', JSON.stringify(totalPrice));
            storageBasket = JSON.parse(localStorage.getItem('backetList'));
            localStorage.setItem('backetList', JSON.stringify(basket));
            totalPriceStorage = JSON.parse(localStorage.getItem('totalPriceStorage'));
        })

        var totalPriceRemove = 0;
        $(document).on('click', '.delete-btn', function (e) {
            e.preventDefault();
            $(this).parent().parent().remove();

            var priceRemove = $(this).parent().parent().find('.product-price__wrapper p').text().split(' ')[0];
            var totalPriceRemove = totalPrice - parseInt(priceRemove);
            totalPrice = totalPriceRemove;
            basket = [];
            for (var i = 0; i < $('.backet-inner__products-list-item').length; i++) {
                var price = $('.backet-inner__products-list-item').eq(i).find('.product-price__wrapper p').text().split(' ')[0];
                var nameProd = $('.backet-inner__products-list-item').eq(i).find('.product-name__wrapper h3').text();

                basket.push({
                    name: nameProd,
                    price: price,
                })

            }
            $('.price-counter__wrapper p span').text(totalPriceRemove + ' ' + 'руб.');
            localStorage.setItem('backetList', JSON.stringify(basket));
            storageBasket = JSON.parse(localStorage.getItem('backetList'));

            localStorage.setItem('totalPriceStorage', JSON.stringify(totalPriceRemove));
            totalPriceStorage = JSON.parse(localStorage.getItem('totalPriceStorage'));

        })

        $('.accept-btn').on('click', function (e) {
            e.preventDefault();
            $('.order-list').html('');
            $('.overlay').show();
            $('.popup__wrapper').show();
            var basketElem = $('.product-name__wrapper h3');

            for (var i = 0; i < basketElem.length; i++) {
                var orderList = ('<li class="order-list__item">' + basketElem.eq(i).text() + '</li>');
                $('.order-list').append(orderList);
            }
            $('.total-price-order').text($('.price-counter__wrapper p span').text())
        })

        $('.close-wrapper, .overlay').on('click', function () {
            $('.overlay').hide();
            $('.popup__wrapper').hide();
        })
})
