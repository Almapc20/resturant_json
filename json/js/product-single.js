
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
    document.getElementById('product-container').innerHTML = createProductHTML(product, group, discount);
}

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
function createProductHTML(product, group, discount) {
    return `
        <div class="product-layout">
            <div class="product-info-side">
                <div class="protitle">
                    <h1>${product.product_name}</h1>
                    <span class="delishes">خوشمزه</span>
                </div>
                <p class="pro-content">${product.product_content.join('، ')}</p>
                ${createPriceOptions(product, discount)}
                ${createSpecs(product, group, discount)}
            </div>
            <div class="product-gallery-side">
                ${createGallery(product)}
            </div>
        </div>
    `;
}

// تابع ایجاد گزینه‌های قیمت
function createPriceOptions(product, discount) {
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
                        <span class="type-name">${type}</span>
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