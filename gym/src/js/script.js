window.addEventListener('DOMContentLoaded', () => {
    const $menuBtn = document.querySelector('#menuBtn');
    const $offCanvasNav = document.querySelector('.nav__list');
    const $overlay = document.querySelector('.overlay');
    const $header = document.querySelector('.js-header');
    const _exerciseLists = document.querySelectorAll('.exercise__list');
    const _submenuBtns = document.querySelectorAll('.nav__link_hasSubMenu');
    let scrollPrev = 0;

    window.addEventListener('scroll', () => {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        scrolled > 100 && scrolled > scrollPrev ?
            $header.classList.add('out') : $header.classList.remove('out');
        scrollPrev = scrolled;
    });

    const toggleMenu = (e) => {
        $menuBtn.classList.toggle('header__menu-button_active');
        $offCanvasNav.classList.toggle('nav__list_active');
        $overlay.classList.toggle('active');
        document.body.classList.toggle('menu_open');
        document.body.addEventListener('click', e => {
            if (e.target.classList.contains('overlay')) {
                toggleMenu()
            }
        });
    };

    _exerciseLists.forEach((item) => {
        let submenuBtn = item.querySelector('.exercise__open');
        item.addEventListener('click', () => {
            submenuBtn.classList.toggle('exercise__open_active')
            document.body.addEventListener('click', (e) => {
                console.log(e.target)
                if (!e.target.classList.contains('exercise__list' ||'exercise__open')) {
                    submenuBtn.classList.remove('exercise__open_active')
                }
            })
        });

    })

    _submenuBtns.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('nav__link_active');
        });
    });

    const items = document.querySelectorAll(".accordion button");

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', () => {
            items[i].classList.toggle('accordion-button--active')
        });
    }

    function toggleAccordion() {
        const itemToggle = this.getAttribute('aria-expanded');

        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('aria-expanded', 'false');

        }

        if (itemToggle === 'false') {
            this.setAttribute('aria-expanded', 'true');
        }


    }

    items.forEach(item => item.addEventListener('click', toggleAccordion));

    $menuBtn.addEventListener('click', () => toggleMenu());
});
