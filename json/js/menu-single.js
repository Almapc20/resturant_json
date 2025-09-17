document.addEventListener('DOMContentLoaded', function() {
    // دریافت پارامترهای URL
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get('group');
    
    if (groupId) {
        // دریافت داده‌های محصولات
        fetch('products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayGroupProducts(data, parseInt(groupId));
            })
            .catch(error => {
                console.error('Error loading products data:', error);
            });
    } else {
        document.getElementById('product-group-title').textContent = 'محصولی یافت نشد';
    }
});

// تابع برای نمایش محصولات گروه انتخاب شده
function displayGroupProducts(productsData, groupId) {
    const group = productsData.product_groups.find(g => g.group_id === groupId);
    
    if (!group) {
        document.getElementById('product-group-title').textContent = 'گروه محصول یافت نشد';
        return;
    }
    
    // نمایش عنوان گروه
    document.getElementById('product-group-title').textContent = group.group_title;
    
    // نمایش محصولات گروه
    const productDetailsContainer = document.getElementById('product-details');
    productDetailsContainer.innerHTML = '';
    
    group.group_products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <div class="product-card">
               
                <div class="product-info">
                    <div class="content-product">
                        <h3 class="product-name">${product.product_name}</h3>
                        <p class="product-price">${product.product_price.toLocaleString()} تومان</p>
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