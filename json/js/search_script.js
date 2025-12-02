
document.addEventListener('DOMContentLoaded', function() {
    // داده‌های محصولات 
    const productsData = {
        "product_groups": [{
                "group_id": 1,
                "group_title": "ساندویچ",
                "group_image": "images/burger-7-310x260.png",
                "group_products": [{
                        "product_id": 1,
                        "product_name": "ژامبون مرغ تنوری",
                        "product_type": ["normal"],
                        "product_price": [95000],
                        "product_image": ["images/product-01-542x448.png",
                            "images/product-02-542x448.png",
                            "images/product-05-542x448.png"
                        ],
                        "product_content": [
                            "ژامبون مرغ",
                            "قارچ",
                            "پنیر",
                            "سس مخصوص"
                        ],
                        "product_energy": 45,
                        "product_protein": 83
                    },
                    {
                        "product_id": 2,
                        "product_name": "هات داگ مخصوص",
                        "product_type": ["normal"],
                        "product_price": [100000],
                        "product_image": ["images/product-01-542x448.png",
                            "images/product-02-542x448.png",
                            "images/product-05-542x448.png"
                        ],
                        "product_content": [
                            "هات داگ",
                            "قارچ",
                            "پنیر",
                            "کاهو",
                            "خیارشور",
                            "گوجه"
                        ],
                        "product_energy": 45,
                        "product_protein": 83
                    },
                    {
                        "product_id": 3,
                        "product_name": "چیز برگر",
                        "product_type": ["normal", "double"],
                        "product_price": [110000, 155000],
                        "product_image": ["images/product-01-542x448.png",
                            "images/product-02-542x448.png",
                            "images/product-05-542x448.png"
                        ],
                        "product_content": [
                            "همبرگر90 درصد",
                            "پنیر گودا",
                            "سس مخصوص",
                            "گوجه"
                        ],
                        "product_energy": 45,
                        "product_protein": 83
                    },
                    {
                        "product_id": 4,
                        "product_name": "رویال برگر",
                        "product_type": ["normal"],
                        "product_price": [193000],
                        "product_image": ["images/product-01-542x448.png",
                            "images/product-02-542x448.png",
                            "images/product-05-542x448.png"
                        ],
                        "product_content": [
                            "همبرگر 90 درصد",
                            "ژامبون گوشت",
                            "قارچ",
                            "پنیر"
                        ],
                        "product_energy": 45,
                        "product_protein": 83
                    }
                ]
            },
            {
                "group_id": 2,
                "group_title": "پیتزا",
                "group_image": "images/pizza-7-310x260.png",
                "group_products": [{
                    "product_id": 5,
                    "product_name": "پیتزا فیله مرغ",
                    "product_type": ["mini", "normal", "large"],
                    "product_price": [110000, 145000, 210000],
                    "product_image": ["images/product-01-542x448.png",
                        "images/product-02-542x448.png",
                        "images/product-05-542x448.png"
                    ],
                    "product_content": [
                        "فیله مرغ",
                        "قارچ",
                        "فلفل دلمه",
                        "پنیر",
                        "گوجه",
                        "ذرت"
                    ],
                    "product_energy": 32,
                    "product_protein": 79
                }, {
                    "product_id": 6,
                    "product_name": "پیتزا پنجره ای مخصوص",
                    "product_type": ["mini", "normal", "large"],
                    "product_price": [125000, 185000, 230000],
                    "product_image": ["images/product-01-542x448.png",
                        "images/product-02-542x448.png",
                        "images/product-05-542x448.png"
                    ],
                    "product_content": [
                        "ژامبون بره",
                        "قارچ",
                        "پنیر",
                        "گوشت چرخ کرده",
                        "فلفل دلمه"
                    ],
                    "product_energy": 45,
                    "product_protein": 83
                }, {
                    "product_id": 7,
                    "product_name": "پیتزا پپرونی",
                    "product_type": ["mini", "normal", "large"],
                    "product_price": [105000, 135000, 190000],
                    "product_image": ["images/product-01-542x448.png",
                        "images/product-02-542x448.png",
                        "images/product-05-542x448.png"
                    ],
                    "product_content": [
                        "کالباس پپرونی",
                        "قارچ",
                        "پنیر",
                        "فلفل دلمه"
                    ],
                    "product_energy": 51,
                    "product_protein": 56
                }]
            },
            {
                "group_id": 3,
                "group_title": "کباب",
                "group_image": "images/barbecue-7-310x260.png",
                "group_products": [{
                        "product_id": 8,
                        "product_name": "کوبیده",
                        "product_type": ["single", "double"],
                        "product_price": [45000, 85000],
                        "product_image": ["images/product-01-542x448.png",
                            "images/product-02-542x448.png",
                            "images/product-05-542x448.png"
                        ],
                        "product_content": [
                            "گوشت چرخ کرده",
                            "پیاز",
                            "نمک",
                            "جوش شیرین"
                        ],
                        "product_energy": 45,
                        "product_protein": 83
                    },
                    {
                        "product_id": 9,
                        "product_name": "برگ",
                        "product_type": ["normal"],
                        "product_price": [130000],
                        "product_image": ["images/product-01-542x448.png",
                            "images/product-02-542x448.png",
                            "images/product-05-542x448.png"
                        ],
                        "product_content": [
                            "گوشت گوسفندی",
                            "نمک",
                            "آبلیمو"
                        ],
                        "product_energy": 45,
                        "product_protein": 83
                    }
                ]
            }
        ]
    };
    
   
    const searchBox = document.querySelector('.search-box');
    const searchBtn = document.querySelector('.search-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const searchInput = document.getElementById('q');
    
    // تابع برای فعال کردن باکس جستجو
    function activateSearchBox() {
        searchBox.classList.add('active');
        searchInput.focus();
    }
    
    // تابع برای غیرفعال کردن باکس جستجو
    function deactivateSearchBox() {
        searchBox.classList.remove('active');
        searchInput.value = '';
        hideSearchResults();
    }
    
    // کلیک روی آیکون ذره‌بین
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!searchBox.classList.contains('active')) {
                activateSearchBox();
            } else {
                // اگر باکس فعال است، جستجو کن
                performSearch(searchInput.value);
            }
        });
    }
    
    // کلیک روی آیکون ضربدر
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            deactivateSearchBox();
        });
    }
    
    // کلیک خارج از باکس برای بستن
    document.addEventListener('click', function(event) {
        const isClickInsideSearch = searchBox.contains(event.target);
        const isClickOnSearchBtn = searchBtn.contains(event.target);
        
        if (!isClickInsideSearch && !isClickOnSearchBtn && searchBox.classList.contains('active')) {
            deactivateSearchBox();
        }
    });
    
    // مدیریت Enter برای جستجو
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch(searchInput.value);
            }
        });
    }
    
    // تابع اصلی جستجو
    function performSearch(searchTerm) {
        const trimmedTerm = searchTerm.trim();
        
        if (!trimmedTerm) {
            showMessage('لطفاً کلمه‌ای برای جستجو وارد کنید');
            return;
        }
        
        // نمایش پیام در حال جستجو
        showLoading();
        
        // تأخیر برای نمایش انیمیشن loading
        setTimeout(() => {
            const results = searchInProducts(productsData, trimmedTerm);
            displaySearchResults(results, trimmedTerm);
        }, 300);
    }
    
    // تابع جستجو در محصولات
    function searchInProducts(data, searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        const results = [];
        
        data.product_groups.forEach(group => {
            group.group_products.forEach(product => {
                if (product.product_name.toLowerCase().includes(searchTermLower)) {
                    results.push({
                        groupId: group.group_id,
                        groupTitle: group.group_title,
                        ...product
                    });
                }
            });
        });
        
        return results;
    }
    
    // نمایش نتایج جستجو

function displaySearchResults(results, searchTerm) {
    const resultBox = document.getElementById('search-result-box');
    
    if (!resultBox) return;
    
    if (results.length === 0) {
        resultBox.innerHTML = `
            <h1 class="search-box-title">نتیجه جستجو برای: "${searchTerm}"</h1>
            <p style="text-align: center; color: #666; padding: 20px;">
                محصولی با نام "${searchTerm}" یافت نشد.
            </p>
        `;
        return;
    }
    
    let html = `<h1 class="search-box-title">نتیجه جستجو برای: "${searchTerm}"</h1>`;
    
    results.forEach((item) => {
        // فقط اولین نوع و اولین قیمت را بگیر
        const firstType = item.product_type[0]; // اولین نوع 
        const firstPrice = item.product_price[0]; // اولین قیمت
        const image = item.product_image[0]; // اولین تصویر
        
        // ترجمه نوع به فارسی
        const typeTranslations = {
            'mini': 'کوچک',
            'normal': 'متوسط',
            'large': 'بزرگ',
            'double': 'دوبل',
            'single': 'تکی'
        };
        
        const typePersian = typeTranslations[firstType] || firstType;
        
        html += `
            <div class="search-box-product" data-product-id="${item.product_id}" data-group-id="${item.groupId}" style="cursor: pointer; padding: 15px; border-radius: 8px; border: 1px solid #eee; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <div class="search-box-img-title" style="display: flex; align-items: center;">
                    <img src="${image}" class="search-box-img" alt="${item.product_name}" style="width: 100px; height: 100px; margin-left: 20px; border-radius: 15px;">
                    <div>
                        <h3 style="margin: 0 0 5px 0;">${item.product_name}</h3>
                        <span style="color: #666; font-size: 14px;">${item.groupTitle}</span>
                        <div style="font-size: 13px; color: #888; margin-top: 3px;">نوع: ${typePersian}</div>
                    </div>
                </div>
                <div style="text-align: left;">
                    <strong style="display: block; margin-bottom: 5px; font-size: 16px;">${firstPrice.toLocaleString()} تومان</strong>
                    <small style="color: #888; font-size: 12px;">قیمت پایه</small>
                </div>
            </div>
        `;
    });
    
    resultBox.innerHTML = html;
    
    // اضافه کردن رویداد کلیک برای محصولات
    document.querySelectorAll('.search-box-product').forEach(productDiv => {
        productDiv.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const groupId = this.dataset.groupId;
            window.location.href = `product-single.html?product=${productId}&group=${groupId}`;
        });
    });
}
    
    // مخفی کردن نتایج جستجو
    function hideSearchResults() {
        const resultBox = document.getElementById('search-result-box');
        if (resultBox) {
            resultBox.innerHTML = '';
        }
    }
    
    // نمایش پیام
    function showMessage(message) {
        const resultBox = document.getElementById('search-result-box');
        if (resultBox) {
            resultBox.innerHTML = `<p style="text-align: center; color: #666; padding: 20px;">${message}</p>`;
        }
    }
    
    // نمایش حالت در حال جستجو
    function showLoading() {
        const resultBox = document.getElementById('search-result-box');
        if (resultBox) {
            resultBox.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <div style="display: inline-block; width: 20px; height: 20px; border: 2px solid #f3f3f3; border-top: 2px solid #3c90ff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <p style="color: #666; margin-top: 10px;">در حال جستجو...</p>
                </div>
            `;
        }
    }
    
    // اضافه کردن استایل انیمیشن برای loading
    if (!document.querySelector('#search-styles')) {
        const style = document.createElement('style');
        style.id = 'search-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});