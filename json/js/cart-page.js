// مدیریت صفحه سبد خرید
document.addEventListener('DOMContentLoaded', function() {
    const cartManager = new CartManager();
    const cartTableBody = document.getElementById('cartTableBody');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartItemsCount = document.getElementById('cartItemsCount');
    const totalItemsElement = document.getElementById('totalItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // تابع برای پیدا کردن اطلاعات کامل محصول - بدون نیاز به داده‌های اصلی
    function getProductInfo(item) {
        // اینجا باید اطلاعات محصول را از localStorage یا API بگیریم
        // برای حالا از اطلاعات ذخیره شده در item استفاده می‌کنیم
        return {
            name: item.productName,
            size: item.sizeType,
            price: item.price,
            // تصویر پیش‌فرض
            image: "images/product-01-542x448.png",
            // ترجمه سایز به فارسی
            sizePersian: getSizePersian(item.sizeType)
        };
    }

    // تابع ترجمه سایز به فارسی
    function getSizePersian(sizeType) {
        const sizeMap = {
            'mini': 'کوچک',
            'normal': 'متوسط',
            'large': 'بزرگ',
            'double': 'دوبل',
            'single': 'تکی',
            'regular': 'معمولی'
        };
        return sizeMap[sizeType] || sizeType;
    }

    // تابع برای محاسبه تخفیف
    function getProductDiscount(groupId) {
        // اینجا باید تخفیف‌ها را از localStorage یا API بگیریم
        // برای تست، تخفیف‌های ثابت را برگردانیم
        const discountMap = {
            1: 20, // ساندویچ
            2: 35, // پیتزا
            3: 50  // کباب
        };
        return discountMap[groupId] || 0;
    }

    // تابع نمایش آیتم‌های سبد
    function renderCartItems() {
        const cartItems = cartManager.getItems();
        cartTableBody.innerHTML = '';
        
        // آپدیت تعداد آیتم‌ها در هدر
        if (cartItemsCount) {
            cartItemsCount.textContent = cartItems.length;
        }
        
        if (cartItems.length === 0) {
            emptyCartDiv.classList.add('show');
        } else {
            emptyCartDiv.classList.remove('show');
            
            cartItems.forEach(item => {
                const productInfo = getProductInfo(item);
                const discount = getProductDiscount(item.groupId);
                const basePrice = item.price;
                const discountedPrice = discount > 0 ? 
                    Math.round(basePrice * (1 - discount/100)) : basePrice;
                const itemTotal = discountedPrice * item.quantity;
                
                const row = document.createElement('tr');
                
                row.innerHTML = `

                    <td class="quantity-cell">
                        <div class="quantity-control">
                            <button class="qty-btn minus" data-id="${item.id}">
                                <i class="fa fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </td>

                    <td>
                        <img src="${productInfo.image}" alt="${productInfo.name}" class="product-image">
                    </td>
                    <td>
                        <div class="product-name">${productInfo.name}</div>
                        <div class="product-size">سایز: ${productInfo.sizePersian}</div>
                    </td>
                    <td class="price-cell">
                        ${discount > 0 ? `
                            <div class="original-price">
                                ${basePrice.toLocaleString()} تومان
                            </div>
                            <div class="discounted-price">
                                ${discountedPrice.toLocaleString()} تومان
                            </div>
                            <div class="discount-badge">
                                ${discount}% تخفیف
                            </div>
                        ` : `
                            <div>${basePrice.toLocaleString()} تومان</div>
                        `}
                    </td>
                    <td class="quantity-display-cell">
                        ${item.quantity} عدد
                    </td>
                    <td class="total-cell">
                        ${itemTotal.toLocaleString()} تومان
                    </td>
                `;
                
                cartTableBody.appendChild(row);
            });
        }
        
        updateCartSummary();
        attachCartEvents();
    }

    // تابع به‌روزرسانی خلاصه
    function updateCartSummary() {
        const items = cartManager.getItems();
        let totalItems = 0;
        let totalPrice = 0;
        
        // محاسبه کل با در نظر گرفتن تخفیف
        items.forEach(item => {
            const discount = getProductDiscount(item.groupId);
            const itemPrice = discount > 0 ? 
                Math.round(item.price * (1 - discount/100)) : item.price;
            
            totalItems += item.quantity;
            totalPrice += itemPrice * item.quantity;
        });
        
        if (totalItemsElement) totalItemsElement.textContent = totalItems;
        if (totalPriceElement) totalPriceElement.textContent = totalPrice.toLocaleString() + ' تومان';
    }

    // تابع اتصال رویدادها
    function attachCartEvents() {
        // دکمه‌های تغییر تعداد
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = parseInt(this.dataset.id);
                const items = cartManager.getItems();
                const item = items.find(item => item.id === itemId);
                
                if (!item) return;
                
                if (this.classList.contains('plus')) {
                    cartManager.updateQuantity(itemId, item.quantity + 1);
                } else if (this.classList.contains('minus')) {
                    const newQuantity = item.quantity - 1;
                    if (newQuantity > 0) {
                        cartManager.updateQuantity(itemId, newQuantity);
                    } else {
                        if (confirm('آیا می‌خواهید این محصول را حذف کنید؟')) {
                            cartManager.removeItem(itemId);
                        }
                    }
                }
                
                renderCartItems();
            });
        });
    }

    // دکمه خالی کردن سبد
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('آیا مطمئن هستید که می‌خواهید سبد خرید را خالی کنید؟')) {
                cartManager.clearCart();
                renderCartItems();
            }
        });
    }

    // دکمه تکمیل سفارش
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const items = cartManager.getItems();
            if (items.length === 0) {
                alert('سبد خرید شما خالی است!');
                return;
            }
            
            // محاسبه مبلغ نهایی با تخفیف
            let finalPrice = 0;
            items.forEach(item => {
                const discount = getProductDiscount(item.groupId);
                const itemPrice = discount > 0 ? 
                    Math.round(item.price * (1 - discount/100)) : item.price;
                finalPrice += itemPrice * item.quantity;
            });
            
            alert(`سفارش شما با ${items.length} محصول و مبلغ ${finalPrice.toLocaleString()} تومان ثبت شد!`);
            cartManager.clearCart();
            renderCartItems();
        });
    }

    // نمایش اولیه
    renderCartItems();
});