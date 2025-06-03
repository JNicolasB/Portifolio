// CARRINHO

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos da interface
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.titulo span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('#cart');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.querySelector('.sidebar-close');

    // Variáveis do carrinho
    let cartItems = [];
    let totalAmount = 0;

    // Carregar carrinho do localStorage
    function loadCart() {
        const savedCartItems = localStorage.getItem('cartItems');
        const savedTotalAmount = localStorage.getItem('totalAmount');

        if (savedCartItems) cartItems = JSON.parse(savedCartItems);
        if (savedTotalAmount) totalAmount = parseFloat(savedTotalAmount);
    }

    // Salvar carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('totalAmount', totalAmount.toFixed(2));
    }

    // Atualizar a interface do carrinho
    function updateCartUI() {
        // Atualizar número de itens no ícone
        cartItemCount.textContent = cartItems.reduce((acc, item) => acc + item.quantity, 0);

        // Atualizar lista de itens no carrinho
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">
                    R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    <button class="remove-btn" data-index="${index}">
                        <i class="bi bi-x"></i>
                    </button>
                </span>
            `;
            cartItemsList.appendChild(cartItem);
        });

        // Atualizar total do carrinho
        cartTotal.textContent = `R$ ${totalAmount.toFixed(2).replace('.', ',')}`;

        // Adicionar evento para os botões de remoção
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index || event.target.parentNode.dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    // Adicionar item ao carrinho
    function addItemToCart(name, price) {
        const existingItem = cartItems.find(cartItem => cartItem.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name, price, quantity: 1 });
        }
        totalAmount += price;

        saveCart();
        updateCartUI();
    }

    // Remover item do carrinho
    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;

        saveCart();
        updateCartUI();
    }

    // Lidar com cliques nos botões "Adicionar ao Carrinho"
    if (addToCartButtons.length) {
        addToCartButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const itemName = document.querySelectorAll('.text-content h3')[index].textContent.trim();
                const itemPrice = parseFloat(
                    document.querySelectorAll('.preco')[index].textContent.replace('R$', '').replace(',', '.').trim()
                );
                addItemToCart(itemName, itemPrice);
            });
        });
    }

    // Abrir e fechar o carrinho
    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // Inicializar o carrinho ao carregar a página
    loadCart();
    updateCartUI();
});