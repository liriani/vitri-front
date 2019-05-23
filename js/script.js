const json = requisicaoDaApi();
produtoReferencia();
produtoRecomendados();

function requisicaoDaApi() {
    return fetch('https://vitri-json.herokuapp.com/data')
        .then(response => {
            return response.json();
        }).catch(error => {
            console.log(error);
        })
}

function produtoReferencia() {
    json
        .then(data => {
            renderizarProdutoReferencia(data);
        });
}

function produtoRecomendados() {
    json
        .then(data => {
            renderizarProdutosRecomendados(data);
            criarBotoes();
            carrosel();
        });
}

function renderizarProdutoReferencia(data) {
    const produto = data.reference.item;

    const widget = document.querySelector('.widget');
    const item = document.createElement('div');
    const imagem = document.createElement('img');
    const descricao = document.createElement('p');
    const precoAntigo = document.createElement('p');
    const precoP = document.createElement('p');
    const precoSpan = document.createElement('p');
    const condicaoP = document.createElement('p');
    const condicaoSpan = document.createElement('span');

    item.className = 'item';
    item.setAttribute('data-target', 'card');
    item.addEventListener('click', () => {
        window.location = produto.detailUrl;
    });

    imagem.className = 'item__img';
    imagem.alt = 'Produto';
    imagem.src = produto.imageName;

    descricao.innerText = reduzir(produto.name);

    precoAntigo.className = 'item_oldPrice-tag';
    precoAntigo.innerText = 'De ' + produto.oldPrice;

    precoP.className = 'item__price';

    precoSpan.className = 'item__price-tag';
    precoSpan.innerText = 'Para ' + produto.price;

    condicaoP.className = 'item__conditions';

    condicaoSpan.className = 'item__conditions-tag';
    condicaoSpan.innerHTML = produto.productInfo.paymentConditions;

    precoP.appendChild(precoSpan);
    condicaoP.appendChild(condicaoSpan);

    item.appendChild(imagem);
    item.appendChild(descricao);
    item.appendChild(precoAntigo);
    item.appendChild(precoP);
    item.appendChild(condicaoP);

    widget.appendChild(item);

}

function renderizarProdutosRecomendados(data) {
    const widget = document.querySelector('.widget');
    const swiperWrapper = document.createElement('swiper-wrapper');
    const wrapper = document.createElement("div");
    const carousel = document.createElement("div");

    wrapper.className = 'wrapper';

    carousel.className = 'carousel';
    carousel.setAttribute('data-target', 'carousel');

    data.recommendation.forEach(produto => {
        const item = document.createElement("div");
        const imagem = document.createElement('img');
        const descricao = document.createElement('p');
        const precoAntigo = document.createElement('p');
        const precoP = document.createElement('p');
        const precoSpan = document.createElement('p');
        const condicaoP = document.createElement('p');
        const condicaoSpan = document.createElement('span');

        item.className = 'item';
        item.setAttribute('data-target', 'card');
        item.addEventListener('click', () => {
            window.location = produto.detailUrl;
        });

        imagem.className = 'item__img';
        imagem.alt = 'Produto';
        imagem.src = produto.imageName;

        descricao.innerText = reduzir(produto.name);

        if (typeof produto.oldPrice == 'string') {
            precoAntigo.className = 'item_oldPrice-tag';
            precoAntigo.innerText = 'De ' + produto.oldPrice;
        }

        precoP.className = 'item__price';

        precoSpan.className = 'item__price-tag';
        precoSpan.innerText = 'Para ' + produto.price;

        condicaoP.className = 'item__conditions';

        condicaoSpan.className = 'item__conditions-tag';
        condicaoSpan.innerHTML = produto.productInfo.paymentConditions;

        precoP.appendChild(precoSpan);
        condicaoP.appendChild(condicaoSpan);

        item.appendChild(imagem);
        item.appendChild(descricao);
        item.appendChild(precoAntigo);
        item.appendChild(precoP);
        item.appendChild(condicaoP);
        carousel.appendChild(item);
    });
    wrapper.appendChild(carousel);
    swiperWrapper.appendChild(wrapper);
    widget.appendChild(swiperWrapper);

}

function criarBotoes() {
    const wrapper = document.querySelector('.wrapper');
    const botaoDireito = document.createElement('a');
    const botaoEsquerdo = document.createElement('a');

    botaoDireito.className = 'right';
    botaoDireito.setAttribute('data-action', 'slideRight');

    botaoEsquerdo.className = 'left';
    botaoEsquerdo.setAttribute('data-action', 'slideLeft');

    wrapper.appendChild(botaoDireito);
    wrapper.appendChild(botaoEsquerdo);
}

function reduzir(descricao) {
    let n = 80;
    if (descricao.lenght <= n) {
        return descricao
    }
    const sub = descricao.substr(0, n - 1);
    return sub.substr(0, sub.lastIndexOf(' ')) + '...'
}

function carrosel() {


    const carousel = document.querySelector("[data-target='carousel']");
    const card = carousel.querySelector("[data-target='card']");
    const leftButton = document.querySelector("[data-action='slideLeft']");
    const rightButton = document.querySelector("[data-action='slideRight']");
    const carouselWidth = carousel.offsetWidth;
    const cardStyle = card.currentStyle || window.getComputedStyle(card);
    const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
    const cardCount = carousel.querySelectorAll("[data-target='card']").length;

    let offset = 0;
    const maxX = -((cardCount / 4) * carouselWidth +
        (cardMarginRight * (cardCount / 4)) -
        carouselWidth - cardMarginRight);

    leftButton.addEventListener("click", function () {
        if (offset !== 0) {
            offset += carouselWidth + cardMarginRight;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    });

    rightButton.addEventListener("click", function () {
        if (offset > maxX) {
            offset -= carouselWidth + cardMarginRight;
            carousel.style.transform = `translateX(${offset}px)`;
        }
    });
}


