
// داده‌های کامل محصولات
const menuSingleData = {
    product_groups: [
        {
            group_id: 1,
            group_title: "ساندویچ",
            group_products: [
                {
                    product_id: 1,
                    product_name: "ژامبون مرغ تنوری",
                    product_type: ["normal"],
                    product_price: [95000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["ژامبون مرغ", "قارچ", "پنیر", "سس مخصوص"],
                    product_energy: 45,
                    product_protein: 83
                },
                {
                    product_id: 2,
                    product_name: "هات داگ مخصوص",
                    product_type: ["normal"],
                    product_price: [100000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["هات داگ", "قارچ", "پنیر", "کاهو", "خیارشور", "گوجه"],
                    product_energy: 45,
                    product_protein: 83
                },
                {
                    product_id: 3,
                    product_name: "چیز برگر",
                    product_type: ["normal", "double"],
                    product_price: [110000, 155000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["همبرگر90 درصد", "پنیر گودا", "سس مخصوص", "گوجه"],
                    product_energy: 45,
                    product_protein: 83
                },
                {
                    product_id: 4,
                    product_name: "رویال برگر",
                    product_type: ["normal"],
                    product_price: [193000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["همبرگر 90 درصد", "ژامبون گوشت", "قارچ", "پنیر"],
                    product_energy: 45,
                    product_protein: 83
                }
            ]
        },
        {
            group_id: 2,
            group_title: "پیتزا",
            group_products: [
                {
                    product_id: 5,
                    product_name: "پیتزا فیله مرغ",
                    product_type: ["mini", "normal", "large"],
                    product_price: [110000, 145000, 210000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["فیله مرغ", "قارچ", "فلفل دلمه", "پنیر", "گوجه", "ذرت"],
                    product_energy: 32,
                    product_protein: 79
                },
                {
                    product_id: 6,
                    product_name: "پیتزا پنجره ای مخصوص",
                    product_type: ["mini", "normal", "large"],
                    product_price: [125000, 185000, 230000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["ژامبون بره", "قارچ", "پنیر", "گوشت چرخ کرده", "فلفل دلمه"],
                    product_energy: 45,
                    product_protein: 83
                },
                {
                    product_id: 7,
                    product_name: "پیتزا پپرونی",
                    product_type: ["mini", "normal", "large"],
                    product_price: [105000, 135000, 190000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["کالباس پپرونی", "قارچ", "پنیر", "فلفل دلمه"],
                    product_energy: 51,
                    product_protein: 56
                }
            ]
        },
        {
            group_id: 3,
            group_title: "کباب",
            group_products: [
                {
                    product_id: 8,
                    product_name: "کوبیده",
                    product_type: ["single", "double"],
                    product_price: [45000, 85000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["گوشت چرخ کرده", "پیاز", "نمک", "جوش شیرین"],
                    product_energy: 45,
                    product_protein: 83
                },
                {
                    product_id: 9,
                    product_name: "برگ",
                    product_type: ["normal"],
                    product_price: [130000],
                    product_image: ["images/product-01-542x448.png", "images/product-02-542x448.png", "images/product-05-542x448.png"],
                    product_content: ["گوشت گوسفندی", "نمک", "آبلیمو"],
                    product_energy: 45,
                    product_protein: 83
                }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = parseInt(urlParams.get('group'));
    
    if (groupId) {
        displayGroupProducts(menuSingleData, groupId);
    }
});

function displayGroupProducts(productsData, groupId) {
    const group = productsData.product_groups.find(g => g.group_id === groupId);
    
    if (!group) return;
    
    document.title = `${group.group_title} | منو رستوران`;
    document.getElementById('product-group-title').textContent = group.group_title;
    
    const productDetailsContainer = document.getElementById('product-details');
    productDetailsContainer.innerHTML = '';
    
    group.group_products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <div class="product-card">
                <div class="product-info">
                    <div class="content-product">
                        <h3 class="product-name">
                            <a href="product-single.html?group=${groupId}&product=${product.product_id}" style="color: blue; text-decoration: none; padding: 5px 10px; border-radius: 4px; transition: all 0.3s ease;">
                                ${product.product_name}
                            </a>
                        </h3>
                        <p class="product-price">${product.product_price[0].toLocaleString()} تومان</p>
                    </div>
                    
                    <div class="product-content">
                        ${product.product_content.join('، ')}
                    </div>
                </div>
            </div>
        `;
        productDetailsContainer.appendChild(productElement);
    });
}