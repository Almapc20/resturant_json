// داده‌های کامل محصولات
const data = {
    product_groups: [
        {
            group_id: 1, group_title: "ساندویچ",
            group_products: [
                {
                    product_id: 1, product_name: "ژامبون مرغ تنوری",
                    product_type: ["normal"], product_price: [95000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["ژامبون مرغ", "قارچ", "پنیر", "سس مخصوص"],
                    product_energy: 45, product_protein: 83
                },
                {
                    product_id: 2, product_name: "هات داگ مخصوص",
                    product_type: ["normal"], product_price: [100000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["هات داگ", "قارچ", "پنیر", "کاهو", "خیارشور", "گوجه"],
                    product_energy: 45, product_protein: 83
                },
                {
                    product_id: 3, product_name: "چیز برگر",
                    product_type: ["normal","double"], product_price: [110000,155000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["همبرگر90 درصد", "پنیر گودا", "سس مخصوص", "گوجه"],
                    product_energy: 45, product_protein: 83
                },
                {
                    product_id: 4, product_name: "رویال برگر",
                    product_type: ["normal"], product_price: [193000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["همبرگر 90 درصد", "ژامبون گوشت", "قارچ", "پنیر"],
                    product_energy: 45, product_protein: 83
                }
            ]
        },
        {
            group_id: 2, group_title: "پیتزا",
            group_products: [
                {
                    product_id: 5, product_name: "پیتزا فیله مرغ",
                    product_type: ["mini","normal","large"], product_price: [110000,145000,210000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["فیله مرغ", "قارچ", "فلفل دلمه", "پنیر", "گوجه", "ذرت"],
                    product_energy: 32, product_protein: 79
                },
                {
                    product_id: 6, product_name: "پیتزا پنجره ای مخصوص",
                    product_type: ["mini","normal","large"], product_price: [125000,185000,230000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["ژامبون بره", "قارچ", "پنیر", "گوشت چرخ کرده", "فلفل دلمه"],
                    product_energy: 45, product_protein: 83
                },
                {
                    product_id: 7, product_name: "پیتزا پپرونی",
                    product_type: ["mini","normal","large"], product_price: [105000,135000,190000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["کالباس پپرونی", "قارچ", "پنیر", "فلفل دلمه"],
                    product_energy: 51, product_protein: 56
                }
            ]
        },
        {
            group_id: 3, group_title: "کباب",
            group_products: [
                {
                    product_id: 8, product_name: "کوبیده",
                    product_type: ["single","double"], product_price: [45000,85000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["گوشت چرخ کرده", "پیاز", "نمک", "جوش شیرین"],
                    product_energy: 45, product_protein: 83
                },
                {
                    product_id: 9, product_name: "برگ",
                    product_type: ["normal"], product_price: [130000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["گوشت گوسفندی", "نمک", "آبلیمو"],
                    product_energy: 45, product_protein: 83
                }
            ]
        }
    ]
};

const discounts = { Discounts: [
    { group_id: 1, discount: 20 }, { group_id: 2, discount: 35 }, { group_id: 3, discount: 50 }
]};

// تابع اصلی

function showProduct() {
    const url = new URLSearchParams(window.location.search);
    const groupId = parseInt(url.get('group')), productId = parseInt(url.get('product'));
    
    if (!groupId || !productId) return;
    
    const group = data.product_groups.find(g => g.group_id === groupId);
    const product = group?.group_products.find(p => p.product_id === productId);
    if (!product) return;
    
    const discount = discounts.Discounts.find(d => d.group_id === groupId)?.discount || 0;
    
    // تنظیم عنوان‌ها
    document.title = `${product.product_name} - ${group.group_title} | رستوران ما`;
    
    // ایجاد ناوبری و عنوان
    createNavigation(product, group, groupId);
    
    // نمایش محتوا
    document.getElementById('product-container').innerHTML = createProductHTML(product, group, discount, groupId);
    

setTimeout(() => {
    setupSizeButtons(); // برای دکمه‌های سایز
    setupAddToCartButton(product, groupId); // برای دکمه اصلی
    updateAddToCartButtonBadge(); // به‌روزرسانی badge
}, 100);


 


    
    // ✅ به‌روزرسانی عدد کنار آیکون سبد (اگر cartManager وجود دارد)
    if (typeof cartManager !== 'undefined') {
        setTimeout(() => {
            cartManager.updateCartIcon();
        }, 200);
    }
}

// تابع تنظیم دکمه "افزودن به سبد خرید"
function setupAddToCartButton(product, groupId) {
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if (!addToCartBtn) {
        console.error('دکمه افزودن به سبد خرید پیدا نشد');
        return;
    }
    
    // حذف listenerهای قبلی
    const newBtn = addToCartBtn.cloneNode(true);
    addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);
    
    // تنظیم listener جدید
    document.getElementById('addToCartBtn').addEventListener('click', function() {
        console.log('دکمه "افزودن به سبد خرید" کلیک شد');
        
        // پیدا کردن سایز انتخاب شده
        const selectedSizeButton = document.querySelector('.type-name.active');
        
        if (!selectedSizeButton) {
            alert('لطفاً ابتدا یک سایز انتخاب کنید');
            return;
        }
        
        // گرفتن اطلاعات از دکمه سایز انتخاب شده
        const productId = selectedSizeButton.dataset.productId;
        const productName = selectedSizeButton.dataset.productName;
        const sizeType = selectedSizeButton.dataset.sizeType;
        const price = selectedSizeButton.dataset.price;
        
        // بررسی وجود cartManager
        if (typeof cartManager === 'undefined') {
            alert('سیستم سبد خرید در دسترس نیست');
            return;
        }
        
        // افزودن به سبد
        const result = cartManager.addToCart(
            parseInt(productId),
            productName,
            sizeType,
            parseInt(price),
            parseInt(groupId)
        );
        
        if (result && result.success) {
            // نمایش پیام
            alert(result.message);
            
            // به‌روزرسانی badge روی دکمه
            updateAddToCartButtonBadge();
        }
    });
}

// تابع به‌روزرسانی badge روی دکمه
function updateAddToCartButtonBadge() {
    const cartBadge = document.querySelector('.cart-count'); // تغییر از .cart-badge به .cart-count
    if (cartBadge && cartManager) {
        const totalItems = cartManager.getUniqueItemsCount();
        cartBadge.textContent = totalItems;
        
        // اضافه کردن کلاس برای اعداد دو رقمی
        if (totalItems >= 10) {
            cartBadge.classList.add('double-digit');
        } else {
            cartBadge.classList.remove('double-digit');
        }
        
        // مخفی کردن اگر صفر است
        if (totalItems === 0) {
            cartBadge.style.display = 'none';
        } else {
            cartBadge.style.display = 'flex';
        }
    }
}


// تابع اتصال دکمه‌های سایز به سبد خرید
function setupSizeButtons() {
    // پیدا کردن همه دکمه‌های سایز
    const sizeButtons = document.querySelectorAll('.type-name');
    
    sizeButtons.forEach(button => {
        // حذف event listenerهای قبلی (برای جلوگیری از duplicate)
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
    
    // اتصال event listener به دکمه‌های جدید
    document.querySelectorAll('.type-name').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            console.log('کلیک روی سایز:', this.dataset);
            
            // گرفتن اطلاعات از dataset
            const productId = parseInt(this.dataset.productId);
            const productName = this.dataset.productName;
            const sizeType = this.dataset.sizeType;
            const price = parseInt(this.dataset.price);
            const groupId = parseInt(this.dataset.groupId);
            
            // بررسی وجود cartManager
            if (typeof cartManager === 'undefined') {
                console.error('cartManager وجود ندارد!');
                alert('سیستم سبد خرید در دسترس نیست. صفحه را رفرش کنید.');
                return;
            }
            
            // ✅ افزودن محصول به سبد خرید
            const success = cartManager.addToCart(
                productId,
                productName,
                sizeType,
                price,
                groupId
            );
            
            if (success) {
                // نمایش پیام موفقیت
                showCartNotification(productName, sizeType);
            }
        });
    });
}



// تابع نمایش پیام سبد خرید
function showCartNotification(productName, sizeType) {
    // حذف نوتیفیکیشن‌های قبلی
    document.querySelectorAll('.cart-notification').forEach(el => el.remove());
    
    // ایجاد نوتیفیکیشن جدید
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>"${productName}" (${sizeType}) به سبد خرید اضافه شد</span>
    `;
    
    // استایل‌دهی
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #2ed573;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: inherit;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: cartNotificationSlideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // حذف خودکار بعد از 3 ثانیه
    setTimeout(() => {
        notification.style.animation = 'cartNotificationSlideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}



// اضافه کردن استایل‌های CSS برای انیمیشن
if (!document.querySelector('#cart-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'cart-notification-styles';
    style.textContent = `
        @keyframes cartNotificationSlideUp {
            from {
                transform: translate(-50%, 100%);
                opacity: 0;
            }
            to {
                transform: translate(-50%, 0);
                opacity: 1;
            }
        }
        
        @keyframes cartNotificationSlideOut {
            from {
                transform: translate(-50%, 0);
                opacity: 1;
            }
            to {
                transform: translate(-50%, 100%);
                opacity: 0;
            }
        }
        
        /* استایل دکمه سایز هنگام hover */
        .type-name:hover {
            background-color: #ff6b6b !important;
            color: white !important;
            transform: translateY(-2px);
            transition: all 0.2s;
        }
        
        /* استایل active برای دکمه سایز */
        .type-name:active {
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}
/////////


// تابع ایجاد ناوبری
function createNavigation(product, group, groupId) {
    const navHTML = `
        <h1 class="title-pro">${product.product_name}</h1>
        <div class="breadcrumb">
            <a href="index.html">خانه</a>
            <span class="separator">/</span>
            <a href="menu-single.html?group=${groupId}">${group.group_title}</a>
            <span class="separator">/</span>
            <span class="current">${product.product_name}</span>
        </div>
    `;
    
    document.querySelector('.section-padding .container').innerHTML = navHTML;
}


// تابع ایجاد HTML محصول
function createProductHTML(product, group, discount, groupId) {
    return `
        <div class="product-layout">
            <div class="product-info-side">
                <div class="protitle">
                    <h1>${product.product_name}</h1>
                    <span class="delishes">خوشمزه</span>
                </div>
                <p class="pro-content">${product.product_content.join('، ')}</p>
                ${createPriceOptions(product, discount, groupId)}
                ${createSpecs(product, group, discount)}
                
                <!-- ✅ بخش جدید: دکمه افزودن به سبد خرید -->
                <div class="add-to-cart-container" style="margin-top: 30px;">
                    <button class="add-to-cart-btn" id="addToCartBtn">
                        <i class="fa fa-shopping-cart"></i>
                        افزودن به سبد خرید
                      
                    </button>
                   
                </div>
            </div>
            <div class="product-gallery-side">
                ${createGallery(product)}
            </div>
        </div>
    `;
}
// تابع ایجاد گزینه‌های قیمت


function createPriceOptions(product, discount, groupId) {
    return `
        <div class="product-types">
            ${product.product_type.map((type, i) => {
                const price = product.product_price[i];
                const finalPrice = discount > 0 ? price * (1 - discount/100) : price;
                
                return `
                    <div class="type-option">
                        ${discount > 0 ? `
                            <span class="original-price">${price.toLocaleString()} تومان</span>
                            <span class="discounted-price">${finalPrice.toLocaleString()} تومان</span>
                        ` : `<span class="normal-price">${price.toLocaleString()} تومان</span>`}
                        
                        <button class="type-name" 
                                data-product-id="${product.product_id}"
                                data-product-name="${product.product_name}"
                                data-size-type="${type}"
                                data-price="${price}"
                                data-group-id="${groupId}">
                            ${type}
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}
// تابع ایجاد مشخصات
function createSpecs(product, group, discount) {
    return `
        <div class="product-specs">
            <p>گروه: ${group.group_title} ${discount > 0 ? `- ${discount}% تخفیف` : ''}</p>
            ${createProgressBar('انرژی', product.product_energy, 'energy')}
            ${createProgressBar('پروتئین', product.product_protein, 'protein')}
        </div>
    `;
}

// تابع ایجاد نمودار
function createProgressBar(label, value, type) {
    return `
        <div class="spec-item">
            <div class="spec-label">${label}:</div>
            <div class="progress-bar">
                <div class="progress-fill ${type}-fill" style="width: ${value}%">
                    <span class="progress-text">${value}%</span>
                </div>
            </div>
        </div>
    `;
}

// تابع ایجاد گالری
function createGallery(product) {
    return `
        <div class="product-gallery">
            <div id="large_image">
                <img src="${product.product_image[0]}" alt="${product.product_name}" class="main-image">
            </div>
            <div id="small_images" class="small-images">
                ${product.product_image.map((img, i) => `
                    <img src="${img}" class="thumbnail ${i === 0 ? 'active' : ''}" 
                         onclick="changeImage('${img}')">
                `).join('')}
            </div>
        </div>
    `;
}

// تابع تغییر تصویر
function changeImage(src) {
    document.querySelector('.main-image').src = src;
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.toggle('active', thumb.src.includes(src));
    });
}







// اجرا
document.addEventListener('DOMContentLoaded', showProduct);



